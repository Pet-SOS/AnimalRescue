using AnimalRescue.BusinessLogic.Extensions;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class BlogTagService: IBlogTagService
    {
        private readonly IBlogTagRepository _blogTagRepository;

        private readonly IMapper mapper;

        public BlogTagService(IBlogTagRepository blogTagRepository, IMapper mapper)
        {
            _blogTagRepository = blogTagRepository;
            this.mapper = mapper;
        }

        public async Task<BlCollectonResponse<BlogTagDto>> GetAsync(ApiQueryRequest queryRequest)
        {
            var dbQuery = queryRequest.ToDbQuery();

            var totalCount = await _blogTagRepository.GetCountAsync(dbQuery);
            if (totalCount == 0)
            {
                return new BlCollectonResponse<BlogTagDto>
                {
                    Collection = new List<BlogTagDto>(),
                    TotalCount = 0
                };
            }

            var blogTags = await _blogTagRepository.GetAsync(dbQuery);
            var blogTagDtos = mapper.Map<List<BlogTag>, List<BlogTagDto>>(blogTags);

            return new BlCollectonResponse<BlogTagDto>
            {
                Collection = blogTagDtos,
                TotalCount = totalCount
            };
        }

        public async Task<BlogTagDto> GetAsync(string query)
        {
            var blogTag = await _blogTagRepository.GetAsync(query);
            var blogTagDto = mapper.Map<BlogTag, BlogTagDto>(blogTag);

            return blogTagDto;
        }

        public async Task<BlogTagDto> CreateAsync(BlogTagDto blogTagDto)
        {
            var blogTag = mapper.Map<BlogTagDto, BlogTag>(blogTagDto);
            blogTag = await _blogTagRepository.CreateAsync(blogTag);
            blogTagDto = mapper.Map<BlogTag, BlogTagDto>(blogTag);

            return blogTagDto;
        }

        public async Task UpdateAsync(BlogTagDto blogTagDto)
        {
            var blogTag = mapper.Map<BlogTagDto, BlogTag>(blogTagDto);

            await _blogTagRepository.UpdateAsync(blogTag);
        }

        public async Task DeleteAsync(string id)
        {
            await _blogTagRepository.DeleteAsync(id);
        }
    }
}
