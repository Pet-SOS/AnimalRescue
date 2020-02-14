using AnimalRescue.BusinessLogic.Extensions;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.DataAccess.Mongodb.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Query;
using AnimalRescue.Infrastructure.Validation;

using AutoMapper;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class BaseService<TEntityDto, TEntityDbo> : IBlFullCrud<TEntityDto, TEntityDto>
        where TEntityDto : BaseAndTimeDto
    {
        protected readonly IBaseRepository<TEntityDbo> _repository;
        private readonly IMapper _mapper;

        public BaseService(IBaseRepository<TEntityDbo> repository, IMapper mapper)
        {
            Require.Objects.NotNull(repository, nameof(repository));
            Require.Objects.NotNull(mapper, nameof(mapper));

            _repository = repository;
            _mapper = mapper;
        }

        public async Task<TEntityDto> CreateAsync(TEntityDto itemDto)
        {
            itemDto.Id = Guid.Empty;

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
            if(count == 0)
            {
                return new List<TEntityDto>();
            }

            var itemDbos = await _repository.GetAsync(dbQuery);
            var itemDtos = _mapper.Map<List<TEntityDbo>, List<TEntityDto>>(itemDbos);
            return itemDtos;
        }

        public async Task<TEntityDto> GetAsync(Guid id)
        {
            var itemDbo = await _repository.GetAsync(id.AsObjectIdString());
            var itemDto = _mapper.Map<TEntityDbo, TEntityDto>(itemDbo);

            return itemDto;
        }

        public async Task UpdateAsync(TEntityDto itemDto)
        {
            var itemDbo = _mapper.Map<TEntityDto, TEntityDbo>(itemDto);

            await _repository.UpdateAsync(itemDbo);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _repository.DeleteAsync(id.AsObjectIdString());
        }

        public async Task<int> GetCountAsync(ApiQueryRequest query)
        {
            var dbQuery = query.ToDbQuery();

            return await _repository.GetCountAsync(dbQuery);
        }
    }
}                   