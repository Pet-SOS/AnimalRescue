using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models.Blogs.Blogs;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.Infrastructure.Validation;

using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

using System;
using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    [Authorize]
    public class BlogsController : ApiControllerBase
    {
        private readonly IBlFullCrud<BlogDto, BlogDto> _blogService;
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;

        public BlogsController(IBlFullCrud<BlogDto, BlogDto> blogService,
            IImageService imageService,
            IMapper mapper)
        {
            Require.Objects.NotNull(mapper, nameof(mapper));
            Require.Objects.NotNull(blogService, nameof(blogService));
            Require.Objects.NotNull(imageService, nameof(imageService));

            _blogService = blogService;
            _imageService = imageService;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<BlogInfoModel>> GetItemByIdAsync([BindRequired, FromRoute] Guid id)
        {
            //Require.Strings.NotNullOrWhiteSpace(id, nameof(id));

            return await GetItemAsync<BlogDto, BlogInfoModel>(_blogService, id, _mapper);
        }


        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<CollectionSegmentApiResponse<BlogInfoModel>>> GetAsync([FromQuery]ApiQueryRequest queryRequest)
        {
            return await GetCollectionAsync<BlogDto, BlogInfoModel>(_blogService, queryRequest, _mapper);
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<BlogInfoModel>> CreateBlogAsync([FromForm] BlogCreateModel blogCreateModel)
        {
            Require.Objects.NotNull(blogCreateModel, nameof(blogCreateModel));

            return await CreatedItemAsync<BlogDto, BlogCreateModel, BlogInfoModel>(_blogService, _imageService, blogCreateModel, blogCreateModel.Images, _mapper);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task DeleteBlogAsync([BindRequired, FromRoute] Guid id)
        {
            //Require.Strings.NotNullOrWhiteSpace(id, nameof(id));

            await _blogService.DeleteAsync(id);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateBlogAsync([BindRequired, FromRoute] Guid id, [FromForm] BlogCreateModel blogUpdateModel)
        {
            Require.Objects.NotNull(blogUpdateModel, nameof(blogUpdateModel));

            await UpdateDataAsync(_blogService, _imageService, id, blogUpdateModel, blogUpdateModel.Images, _mapper);
        }
    }
}