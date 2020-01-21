using AnimalRescue.BusinessLogic.Extensions;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;
using AnimalRescue.Contracts.Common.Constants;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure.Validation;

using AutoMapper;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class ArticleService : IArticleService
    {
        private readonly IArticleRepository _articleRepository;
        private readonly IMapper mapper;

        public ArticleService(IArticleRepository articleRepository, IMapper mapper)
        {
            Require.Objects.NotNull(articleRepository, nameof(articleRepository));
            Require.Objects.NotNull(mapper, nameof(mapper));

            this._articleRepository = articleRepository;
            this.mapper = mapper;
        }

        public async Task<ArticleDto> CreateAsync(ArticleDto articleDto)
        {
            articleDto.Id = string.Empty;

            var article = mapper.Map<ArticleDto, Article>(articleDto);
            article = await _articleRepository.CreateAsync(article);
            articleDto = mapper.Map<Article, ArticleDto>(article);

            return articleDto;
        }

        public async Task<BlCollectonResponse<ArticleDto>> GetAsync(ApiQueryRequest queryRequest)
        {
            var dbQuery = queryRequest.ToDbQuery();
            dbQuery.Filter += $"{PropertyConstants.Common.Type}~eq~'{PropertyConstants.EntityType.Article}'";

            var articles = await _articleRepository.GetAsync(dbQuery);
            var articleDtos = mapper.Map<List<Article>, List<ArticleDto>>(articles);
            var count = await _articleRepository.GetCountAsync(dbQuery);

            return new BlCollectonResponse<ArticleDto>
            {
                Collection = articleDtos,
                TotalCount = count
            };
        }

        public async Task<ArticleDto> GetAsync(string id)
        {
            var article = await _articleRepository.GetAsync(id);
            var articleDto = mapper.Map<Article, ArticleDto>(article);

            return articleDto;
        }

        public async Task UpdateAsync(ArticleDto articleDto)
        {
            var article = mapper.Map<ArticleDto, Article>(articleDto);

            await _articleRepository.UpdateAsync(article);
        }

        public async Task DeleteAsync(string id)
        {
            await _articleRepository.DeleteAsync(id);
        }
    }
}
