using AnimalRescue.BusinessLogic.Extensions;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using AnimalRescue.DataAccess.Mongodb.Query;
using AnimalRescue.Infrastructure.Validation;

using AutoMapper;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class BaseService<TEntityDto, TEntityDbo, TId> : IBlFullCrud<TEntityDto, TEntityDto, TId>
        where TEntityDto : BaseAndTimeDto<TId>
        where TEntityDbo : IBaseAuditItem
    {
        protected readonly IBaseRepository<TEntityDbo> _repository;
        private readonly IRecoverDataService _recoverDataService;
        protected readonly IMapper _mapper;


        public BaseService(
            IBaseRepository<TEntityDbo> repository,
            IRecoverDataService recoverDataService,
            IMapper mapper)
        {
            Require.Objects.NotNull(repository, nameof(repository));
            Require.Objects.NotNull(recoverDataService, nameof(recoverDataService));
            Require.Objects.NotNull(mapper, nameof(mapper));

            _repository = repository;
            _recoverDataService = recoverDataService;
            _mapper = mapper;
        }

        public virtual async Task<TEntityDto> CreateAsync(TEntityDto itemDto)
        {
            await _recoverDataService.RecoverDataAsync<TEntityDto, TEntityDbo>(itemDto);

            var itemDbo = _mapper.Map<TEntityDto, TEntityDbo>(itemDto);

            if (!IsHasDeletableInterface(itemDbo))
            {
                itemDbo.IsDeletable = true;
            }

            itemDbo = await _repository.CreateAsync(itemDbo);
            itemDto = _mapper.Map<TEntityDbo, TEntityDto>(itemDbo);

            return itemDto;
        }

        public virtual async Task<BlCollectonResponse<TEntityDto>> GetAsync(ApiQueryRequest queryRequest)
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
            string itemId = IdExtensions.GetStringId(id);

            var itemDbo = await _repository.GetAsync(itemId);
            var itemDto = _mapper.Map<TEntityDbo, TEntityDto>(itemDbo);

            return itemDto;
        }

        public virtual async Task UpdateAsync(TEntityDto itemDto)
        {
            await _recoverDataService.RecoverDataAsync<TEntityDto, TEntityDbo>(itemDto);

            var itemDbo = _mapper.Map<TEntityDto, TEntityDbo>(itemDto);

            await _repository.UpdateAsync(itemDbo);
        }

        public async Task DeleteAsync(TId id)
        {
            string itemId = IdExtensions.GetStringId(id);

            var itemDbo = await _repository.GetAsync(itemId);

            Require.Objects.NotNull<NotFoundException>(
                itemDbo,
                () => $"Record with id: {id} does not exist");

            Require.Booleans.IsFalse<ForbiddenOperationRequestException>(
                itemDbo.IsDeleted,
                $"You try remove the record that was already removed");

            if (IsHasDeletableInterface(itemDbo))
            {
                Require.Booleans.IsTrue<ForbiddenOperationRequestException>(
                    itemDbo.IsDeletable,
                    $"This record shoul not be removed");
            }

            itemDbo.IsDeleted = true;
            await _repository.UpdateAsync(itemDbo);
        }

        public async Task<int> GetCountAsync(ApiQueryRequest query)
        {
            var dbQuery = query.ToDbQuery();

            return await _repository.GetCountAsync(dbQuery);
        }

        private static bool IsHasDeletableInterface<T>(T itemDbo)
            => typeof(IDeletableItem).IsAssignableFrom(itemDbo.GetType());
    }
}