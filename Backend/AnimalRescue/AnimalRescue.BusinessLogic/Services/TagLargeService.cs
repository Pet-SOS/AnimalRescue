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
    internal class TagLargeService : 
        BaseService<TagLargeDto, TagLarge, string>, 
        ITagLargeService
    {
        private readonly ITagLargeRepository _tagLargeRepository;

        public TagLargeService(
            ITagLargeRepository tagLargeRepository,
            IRecoverDataService recoverDataService,
            IMapper mapper)
            : base(tagLargeRepository, recoverDataService, mapper)
        {
            _tagLargeRepository = tagLargeRepository;
        }

        public async Task<List<TagLargeDto>> WhereAsync(List<TagLargeDto> value)
        {
            var tagLarges = _mapper.Map<List<TagLargeDto>, List<TagLarge>>(value);
            var tagLargeDtos = _mapper.Map<List<TagLarge>, List<TagLargeDto>>(await _tagLargeRepository.WhereAsync(tagLarges));

            return tagLargeDtos;
        }

        public async Task<IEnumerable<TagLargeDto>> CreateIfNotExistAsync(IEnumerable<TagLargeDto> tags)
        {
            IEnumerable<TagLargeDto> tagsFroSafe = await GetFilteredTags(tags.ToList());
            var tagLarge = _mapper.Map<IEnumerable<TagLargeDto>, IEnumerable<TagLarge>>(tagsFroSafe);
            tagLarge = await _tagLargeRepository.CreateAsync(tagLarge);
            return _mapper.Map<IEnumerable<TagLarge>, IEnumerable<TagLargeDto>>(tagLarge);
        }

        private async Task<List<TagLargeDto>> GetFilteredTags(List<TagLargeDto> tagLargeDtos) => tagLargeDtos
            .Except(await WhereAsync(tagLargeDtos), new EntityComparer<TagLargeDto>(IsEqual)) 
            .ToList();

        private static bool IsEqual(TagLargeDto x, TagLargeDto y) => x.Code == y.Code;  
    }
}
