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
    internal class TagService : BaseService<TagDto, Tags, Guid>, ITagService
    {
        private readonly ITagRepository _tagRepository;
        private readonly IMapper _mapper;

        public TagService(ITagRepository repository, IMapper mapper) : base(repository, mapper)
        {
            _tagRepository = repository;
            _mapper = mapper;
        }

        public async Task CreateAsync(IEnumerable<TagDto> tagDto)
        {
            var tag = _mapper.Map<IEnumerable<TagDto>, IEnumerable<Tags>>(tagDto);
            await _tagRepository.CreateAsync(tag);
        }

        public async Task<List<TagDto>> WhereAsync(List<TagDto> value)
        {
            var tags = _mapper.Map<List<TagDto>, List<Tags>>(value);
            var tagDtos = _mapper.Map<List<Tags>, List<TagDto>>(await _tagRepository.WhereAsync(tags));

            return tagDtos;
        }

        public async Task CreateIfNotExistAsync(IEnumerable<TagDto> tags)
        {
            IEnumerable<TagDto> tagsFroSafe = await GetFilteredTags(tags.ToList());
            var tag = _mapper.Map<IEnumerable<TagDto>, IEnumerable<Tags>>(tagsFroSafe);
            await _tagRepository.CreateAsync(tag);
        }

        private async Task<List<TagDto>> GetFilteredTags(List<TagDto> tags) => tags
            .Except(await WhereAsync(tags), new EntityComparer<TagDto>(IsEqual)) 
            .ToList();

        private static bool IsEqual(TagDto x, TagDto y) =>
            x.Title == y.Title && x.Type == y.Type;  
    }
}
