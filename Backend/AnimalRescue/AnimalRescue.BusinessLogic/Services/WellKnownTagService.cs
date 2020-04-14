using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.Tag;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models.Tag;
using AnimalRescue.Infrastructure.Utilities;

using AutoMapper;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class WellKnownTagService : BaseService<WellKnownTagDto, WellKnownTag>, IWellKnownTagService
    {
        private readonly IWellKnownTagRepository _wellKnownTagRepository;

        public WellKnownTagService(IWellKnownTagRepository repository, IMapper mapper) : base(repository, mapper)
        {
            _wellKnownTagRepository = repository;
        }

        public async Task<List<WellKnownTagDto>> WhereAsync(List<WellKnownTagDto> value)
        {
            var wellKnownTags = _mapper.Map<List<WellKnownTagDto>, List<WellKnownTag>>(value);
            var wellKnownTagDtos = _mapper.Map<List<WellKnownTag>, List<WellKnownTagDto>>(await _wellKnownTagRepository.WhereAsync(wellKnownTags));

            return wellKnownTagDtos;
        }

        public async Task CreateIfNotExistAsync(IEnumerable<WellKnownTagDto> tags)
        {
            IEnumerable<WellKnownTagDto> tagsFroSafe = await GetFilteredTags(tags.ToList());
            var WellKnownTag = _mapper.Map<IEnumerable<WellKnownTagDto>, IEnumerable<WellKnownTag>>(tagsFroSafe);
            await _wellKnownTagRepository.CreateAsync(WellKnownTag);
        }

        private async Task<List<WellKnownTagDto>> GetFilteredTags(List<WellKnownTagDto> wellKnownTagDtos) => wellKnownTagDtos
            .Except(await WhereAsync(wellKnownTagDtos), new EntityComparer<WellKnownTagDto>(IsEqual)) 
            .ToList();

        private static bool IsEqual(WellKnownTagDto x, WellKnownTagDto y) =>
            x.Code == y.Code && x.KindOfAnimal == y.KindOfAnimal;  
    }
}
