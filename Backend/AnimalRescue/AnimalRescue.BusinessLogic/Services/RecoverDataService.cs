using AnimalRescue.BusinessLogic.Extensions;
using AnimalRescue.Contracts.BusinessLogic.Attributes;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.BusinessLogic.Models.Tag;
using AnimalRescue.Contracts.Common.Interfaces.CRUD;
using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Models.Tag;
using AnimalRescue.Infrastructure.Validation;
using AutoMapper;

using System;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    public class RecoverDataService : IRecoverDataService
    {
        private readonly IWellKnownTagRepository _wellKnownTagRepository;
        private readonly ILocationRepository _locationRepository;
        private readonly IMapper _mapper;

        public RecoverDataService(
            IWellKnownTagRepository wellKnownTagRepository,
            ILocationRepository locationRepository,
            IMapper mapper)
        {
            Require.Objects.NotNull(wellKnownTagRepository, nameof(wellKnownTagRepository));
            Require.Objects.NotNull(locationRepository, nameof(locationRepository));
            Require.Objects.NotNull(mapper, nameof(mapper));

            this._wellKnownTagRepository = wellKnownTagRepository;
            this._locationRepository = locationRepository;
            this._mapper = mapper;
        }

        public async Task RecoverDataAsync<TEntityDto, TEntityDbo>(TEntityDto itemDto)
        {
            await RecoverWellKnownTagsAsync2<TEntityDto, TEntityDbo, WellKnownTag, WellKnownTagDto, string>(itemDto, _wellKnownTagRepository);
            await RecoverWellKnownTagsAsync2<TEntityDto, TEntityDbo, Location, LocationDto, Guid>(itemDto, _locationRepository);
        }

        private static (PropertyInfo propertyInfo, string aliasName) GetDtoData(PropertyInfo propertyInfo)
            => (propertyInfo, (propertyInfo.GetCustomAttribute<CouplingPropertyDtoAttribute>() as CouplingPropertyDtoAttribute)?.AliasName);

        private static (PropertyInfo propertyInfo, string aliasName) GetDboData(PropertyInfo propertyInfo)
            => (propertyInfo, (propertyInfo.GetCustomAttribute<CouplingPropertyNameAttribute>() as CouplingPropertyNameAttribute)?.AliasName);

        private static (PropertyInfo propertyInfo, string aliasName, TFindDtoEntity dataWithId) GetIdData<TDto, TFindDtoEntity, TFindDtoEntityId>(
            TDto dto,
            (PropertyInfo propertyInfo, string aliasName) data)
            where TFindDtoEntity : class, IBaseDto<TFindDtoEntityId>
            => (data.propertyInfo, data.aliasName, data.propertyInfo.GetValue(dto, null) as TFindDtoEntity);

        private static async Task<(PropertyInfo propertyInfo, TRepositoryEntity repositoryEntity)> GetDataFromRepository<TFindDtoEntity, TFindDtoEntityId, TRepositoryEntity>(
            (PropertyInfo propertyInfo, string aliasName, TFindDtoEntity dataWithId) data,
            IBaseQueryAsync<TRepositoryEntity, string> repository)
            where TFindDtoEntity : class, IBaseDto<TFindDtoEntityId>
            where TRepositoryEntity : class
            => (data.propertyInfo, (await repository.GetAsync(IdExtensions.GetStringId(data.dataWithId.Id))) as TRepositoryEntity);

        private async Task RecoverWellKnownTagsAsync2<TEntityDto, TEntityDbo, TRepositoryEntity, TFindDtoEntity, TFindDtoEntityId>(
            TEntityDto instanseDto,
            IBaseQueryAsync<TRepositoryEntity, string> repository)
            where TFindDtoEntity : class, IBaseDto<TFindDtoEntityId>
            where TRepositoryEntity : class
        {
            var propertiesOfDataBase = typeof(TEntityDbo).GetProperties()
                .Where(x => x.PropertyType == typeof(TRepositoryEntity))
                .Select(GetDboData)
                .ToList();

            var taskCollection = instanseDto.GetType().GetProperties()
                .Select(GetDtoData)
                .Where(x => propertiesOfDataBase.Any(dbo => dbo.aliasName == x.aliasName))
                .Select(x => GetIdData<TEntityDto, TFindDtoEntity, TFindDtoEntityId>(instanseDto, x))
                .Where(x => x.dataWithId != null && !string.IsNullOrWhiteSpace(x.dataWithId.Id.ToString()))
                .Select(x => GetDataFromRepository<TFindDtoEntity, TFindDtoEntityId, TRepositoryEntity>(x, repository))
                .ToArray();

            await Task.WhenAll(taskCollection);

            taskCollection.Select(x => x.Result)
                .Where(x => x.repositoryEntity != null)
                .ToList()
                .ForEach(x =>
                {
                    var value = _mapper.Map<TRepositoryEntity, TFindDtoEntity>(x.repositoryEntity);
                    x.propertyInfo.SetValue(instanseDto, value);
                });
        }
    }
}
