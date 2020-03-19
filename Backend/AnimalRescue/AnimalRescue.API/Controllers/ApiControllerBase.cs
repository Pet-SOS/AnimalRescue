using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.Common.Query;

using AutoMapper;

using Microsoft.ApplicationInsights.AspNetCore.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApiControllerBase : ControllerBase
    {
        private const string GetItemByIdMethodName = "Get";

        protected async Task<ActionResult<CollectionSegmentApiResponse<TResponse>>> GetCollectionAsync<TCollectin, TResponse>(
            IBlCollectinQueryAsyncy<TCollectin> service,
            ApiQueryRequest queryRequest,
            IMapper mapper)
            where TResponse : class
        {
            BlCollectonResponse<TCollectin> serviceResponse = await service.GetAsync(queryRequest);
            List<TResponse> result = mapper.Map<List<TCollectin>, List<TResponse>>(serviceResponse.Collection);

            return Collection(result, serviceResponse.TotalCount, queryRequest.Page, queryRequest.Size);
        }

        protected ActionResult<CollectionSegmentApiResponse<T>> Collection<T>(
            IReadOnlyCollection<T> source,
            int totalCount,
            int pageNumber,
            int pageSize)
            where T : class
        {

            if (!IsPagingValid(pageNumber, pageSize, totalCount))
            {
                return BadRequest("Page criteria oversizes the total quantity of items in the list.");
            }

            int pageCount = totalCount / pageSize + (totalCount % pageSize == 0 ? 0 : 1);

            return new CollectionSegmentApiResponse<T>
            {
                Data = source,
                TotalCount = totalCount,
                PageNumber = pageNumber,
                PageSize = pageSize,
                PageCount = pageCount,
                Self = BuildSelf()
            };
        }

        protected async Task<ActionResult<TModel>> CreatedItemAsync<TDtoIn, TModel>(
            IBlCreateAsync<TDtoIn, TDtoIn> service,
            TModel value,
            IMapper mapper) where TModel : BaseModel
        {
            TDtoIn itemDto = mapper.Map<TModel, TDtoIn>(value);
            itemDto = await service.CreateAsync(itemDto);
            var itemModel = mapper.Map<TDtoIn, TModel>(itemDto);

            return CreatedItem(itemModel);
        }
        protected async Task<ActionResult<TOutModel>> CreatedItemAsync<TDtoIn, TInModel, TOutModel>(
            IBlCreateAsync<TDtoIn, TDtoIn> service,
            TInModel value,
            IMapper mapper) where TOutModel : BaseModel
        {
            TDtoIn itemDto = mapper.Map<TInModel, TDtoIn>(value);
            itemDto = await service.CreateAsync(itemDto);
            var itemModel = mapper.Map<TDtoIn, TOutModel>(itemDto);

            return CreatedItem(itemModel);
        }

        protected async Task<ActionResult<TOutModel>> CreatedItemAsync<TDto, TInModel, TOutModel>(
            IBlCreateAsync<TDto, TDto> service,
            IImageService imageService,
            TInModel value,
            List<IFormFile> files,
            IMapper mapper)
            where TOutModel : BaseModel
            where TDto : BaseCommonDto
        {
            TDto itemDto = mapper.Map<TInModel, TDto>(value);
            itemDto.ImageIds = await imageService.CreateAsync(files);
            itemDto = await service.CreateAsync(itemDto);
            var itemModel = mapper.Map<TDto, TOutModel>(itemDto);

            return CreatedItem(itemModel);
        }
        protected ActionResult<T> CreatedItem<T>(T item) where T : BaseModel
        {
            return CreatedAtAction(
                GetItemByIdMethodName,
                new { id = item.Id },
                BuildContentApiResponse(item));
        }
        protected ActionResult<T> CreatedItem<T>(string actionName, string controllerName, object routeValues, T item)
            where T : struct
        {
            return CreatedAtAction(
                actionName,
                controllerName,
                routeValues,
                BuildContentApiResponse(item));
        }

        protected async Task UpdateDataAsync<TDto, TModel>(
            IBlUpdateAsync<TDto> service,
            //string id,
            Guid id,
            TModel value,
            IMapper mapper)
            where TDto : BaseDto
        {
            var dto = mapper.Map<TModel, TDto>(value);
            dto.Id = id;

            await service.UpdateAsync(dto);
        }
        protected async Task UpdateDataAsync<TDto, TModel>(
            IBlUpdateAsync<TDto> service,
            IImageService imageService,
            Guid id,
            TModel value,
            List<IFormFile> files,
            IMapper mapper)
            where TDto : BaseCommonDto
        {
            var dto = mapper.Map<TModel, TDto>(value);
            dto.Id = id;
            dto.ImageIds = await imageService.CreateAsync(files);

            await service.UpdateAsync(dto);
        }
        protected async Task<ActionResult<TModel>> GetItemAsync<TDto, TModel>(
            IBlOneItemQueryAsyncy<TDto> service,
            Guid id,
            IMapper mapper)
        {
            if (service is null)
            {
                throw new ArgumentNullException(nameof(service));
            }

            if (mapper is null)
            {
                throw new ArgumentNullException(nameof(mapper));
            }

            var data = await service.GetAsync(id);

            var result = mapper.Map<TModel>(data);

            return Item(result);
        }
        protected ActionResult<T> Item<T>(T source)
        {
            if (source == null)
            {
                return NotFound();
            }

            return Ok(BuildContentApiResponse(source));
        }

        protected ApiResponse EmptyContent()
        {
            return new ApiResponse
            {
                Self = BuildSelf()
            };
        }

        private static bool IsPagingValid(int pageNumber, int pageSize, int totalCount)
        {
            if (pageNumber > 1)
            {
                int startItemNumber = ((pageNumber - 1) * pageSize) + 1;
                return startItemNumber <= totalCount;
            }

            return true;
        }

        private ContentApiResponse<T> BuildContentApiResponse<T>(T source)
        {
            return new ContentApiResponse<T>
            {
                Data = source,
                Self = BuildSelf()
            };
        }

        private string BuildSelf()
        {
            return Request.GetUri().ToString();
        }
    }
}
