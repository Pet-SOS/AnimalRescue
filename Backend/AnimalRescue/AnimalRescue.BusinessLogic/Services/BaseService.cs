using AnimalRescue.BusinessLogic.Extensions;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using AnimalRescue.DataAccess.Mongodb.Query;
using AnimalRescue.Infrastructure.Validation;

using AutoMapper;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class BaseService<TEntityDto, TEntityDbo, TId> : IBlFullCrud<TEntityDto, TEntityDto, TId>
        where TEntityDto : BaseAndTimeDto<TId>
        where TEntityDbo : IBaseAuditItem
    {
        protected readonly IBaseRepository<TEntityDbo> _repository;
        protected readonly IMapper _mapper;

        public BaseService(IBaseRepository<TEntityDbo> repository, IMapper mapper)
        {
            Require.Objects.NotNull(repository, nameof(repository));
            Require.Objects.NotNull(mapper, nameof(mapper));

            _repository = repository;
            _mapper = mapper;
        }

        public virtual async Task<TEntityDto> CreateAsync(TEntityDto itemDto)
        {
            var itemDbo = _mapper.Map<TEntityDto, TEntityDbo>(itemDto);
            itemDbo = await _repository.CreateAsync(itemDbo);
            itemDto = _mapper.Map<TEntityDbo, TEntityDto>(itemDbo);

            return itemDto;
        }

        public async Task<BlCollectonResponse<TEntityDto>> GetAsync(ApiQueryRequest queryRequest)
        {
            var dbQuery = queryRequest.ToDbQuery();
            var count = await _repository.GetCountAsync(dbQuery);
            List<TEntityDto> itemDtos = await GetCollectionAsync(count, dbQuery);

            return new BlCollectonResponse<TEntityDto>
            {
                Collection = itemDtos,
                TotalCount = count
            };
        }

        private async Task<List<TEntityDto>> GetCollectionAsync(int count, DbQuery dbQuery)
        {
            if (count == 0)
            {
                return new List<TEntityDto>();
            }

            var itemDbos = await _repository.GetAsync(dbQuery);
            var itemDtos = _mapper.Map<List<TEntityDbo>, List<TEntityDto>>(itemDbos);
            return itemDtos;
        }

        public async Task<TEntityDto> GetAsync(TId id)
        {
            string itemId = GetStringId(id);

            var itemDbo = await _repository.GetAsync(itemId);
            var itemDto = _mapper.Map<TEntityDbo, TEntityDto>(itemDbo);

            return itemDto;
        }

        private static string GetStringId(TId id)
        {
            string itemId = string.Empty;

            if (id is Guid guid)
            {
                itemId = guid.AsObjectIdString();
            }
            if (Guid.TryParse(id.ToString(), out Guid guid2))
            {
                itemId = guid2.AsObjectIdString();
            }
            else
            {
                itemId = id.ToString();
            }

            return itemId;
        }

        public virtual async Task UpdateAsync(TEntityDto itemDto)
        {
            var itemDbo = _mapper.Map<TEntityDto, TEntityDbo>(itemDto);

            await _repository.UpdateAsync(itemDbo);
        }

        public async Task DeleteAsync(TId id)
        {
            string itemId = GetStringId(id);

            var item = await _repository.GetAsync(itemId);

            Require.Objects.NotNull<NotFoundException>(item, () => $"Record with id: {id} does not exist");
            Require.Booleans.IsTrue<ForbiddenOperationRequestException>(item.IsDeletable, $"This record shoul not be removed");

            item.IsDeleted = true;
            await _repository.UpdateAsync(item);
        }

        public async Task<int> GetCountAsync(ApiQueryRequest query)
        {
            var dbQuery = query.ToDbQuery();

            return await _repository.GetCountAsync(dbQuery);
        }
    }
}