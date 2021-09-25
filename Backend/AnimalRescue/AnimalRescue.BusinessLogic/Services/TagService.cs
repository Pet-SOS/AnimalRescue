using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure.Utilities;

using AutoMapper;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class TagService :
        BaseService<TagDto, Tags, Guid>, 
        ITagService
    {
        private readonly ITagRepository _tagRepository;

        public TagService(
            ITagRepository repository,
            IRecoverDataService recoverDataService,
            IMapper mapper)
            : base(repository, recoverDataService, mapper)
        {
            _tagRepository = repository;
        }

        public async Task<IEnumerable<TagDto>> WhereAsync(IEnumerable<TagDto> value)
        {
            var tags = _mapper.Map<IEnumerable<TagDto>, IEnumerable<Tags>>(value);
            var tagDtos = _mapper.Map<IEnumerable<Tags>, IEnumerable<TagDto>>(await _tagRepository.WhereAsync(tags));

            return tagDtos;
        }

        public async Task<IEnumerable<TagDto>> CreateIfNotExistAsync(IEnumerable<TagDto> tags)
        {
            IEnumerable<TagDto> tagsForSafe = await GetFilteredTags(tags.ToList());
            var tag = _mapper.Map<IEnumerable<TagDto>, IEnumerable<Tags>>(tagsForSafe);
            tag = await _tagRepository.CreateAsync(tag);
            return _mapper.Map<IEnumerable<Tags>, IEnumerable<TagDto>>(tag);
        }

        private async Task<List<TagDto>> GetFilteredTags(List<TagDto> tags) => tags
            .Except(await WhereAsync(tags), new EntityComparer<TagDto>(IsEqual)) 
            .ToList();

        private static bool IsEqual(TagDto x, TagDto y) =>
            x.Title == y.Title && x.Type == y.Type;  
    }
}
