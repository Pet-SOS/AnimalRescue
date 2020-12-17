using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models.Animals;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.Infrastructure.Validation;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    /// <summary>
    /// API management for animals
    /// </summary>
    //[ApiVersion("1")]
    [Authorize("Bearer")]
    public class AnimalsController : ApiControllerBase
    {
        private readonly IBlFullCrud<AnimalDto, AnimalDto, Guid> _animalService;
        private readonly IImageService _imageService;
        private readonly IDocumentService _documentService;
        private readonly ISequenceService _sequenceService;
        private readonly IMapper _mapper;

        public AnimalsController(
            IMapper mapper,
            IBlFullCrud<AnimalDto, AnimalDto, Guid> animalService,
            IImageService imageService,
            IDocumentService documentService,
            ISequenceService sequenceService
            )
        {
            Require.Objects.NotNull(mapper, nameof(mapper));
            Require.Objects.NotNull(animalService, nameof(animalService));
            Require.Objects.NotNull(imageService, nameof(imageService));

            _mapper = mapper;
            this._animalService = animalService;
            _imageService = imageService;
            _documentService = documentService;
            _sequenceService = sequenceService;
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<AnimalModel>> GetItemByIdAsync([BindRequired, FromRoute] Guid id)
        {
            return await GetItemAsync<AnimalDto, AnimalModel, Guid>(_animalService, id, _mapper);
        }

        [AllowAnonymous]
        [HttpPost("bunch")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CollectionSegmentApiResponse<AnimalModel>>> GetItemsByIdsAsync([BindRequired, FromBody] AnimalBanch animalBanch)
        {
            List<AnimalModel> resultModels = new List<AnimalModel>(animalBanch.AnimalIds.Count);
            foreach (Guid item in animalBanch.AnimalIds)
            {
                var data = await _animalService.GetAsync(item);
                if (data != null)
                {
                    var newItem = _mapper.Map<AnimalDto, AnimalModel>(data);
                    resultModels.Add(newItem);
                }
            }
            return Collection(resultModels, resultModels.Count, 1, resultModels.Count);
        }

        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CollectionSegmentApiResponse<AnimalModel>>> GetAsync([FromQuery]ApiQueryRequest queryRequest)
        {
            return await GetCollectionAsync<AnimalDto, AnimalModel>(_animalService, queryRequest, _mapper);
        }

        [AllowAnonymous]
        [HttpGet("Counter")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<int>> GetCountAsync()
        {
            return Item(await _animalService.GetCountAsync(new ApiQueryRequest()));
        }

        /// <summary>
        /// Create an animal
        /// </summary>
        /// <param name="animalCreateModel"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<AnimalModel>> CreateItemAsync([FromForm] AnimalCreateUpdateModel animalCreateModel)
        {
            var imageIds = await _imageService.CreateAsync(animalCreateModel.Images);

            var animalModel = _mapper.Map<AnimalCreateUpdateModel, AnimalModel>(animalCreateModel);

            if (animalCreateModel.AdoptionContractFile != null)
            {
                var document = await _documentService.UploadFileAsync(animalCreateModel.AdoptionContractFile);
                animalModel.AdoptionContractFileId = document.Id;
            }

            if (imageIds?.Count > 0)
            {
                animalModel.ImageIds = imageIds;
            }

            var sequenceDto = _sequenceService.GetNextAsync();
            animalModel.Number = sequenceDto.Result.Number;

            return await CreatedItemAsync<AnimalDto, AnimalModel, Guid>(_animalService, animalModel, _mapper);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task UpdateAsync([BindRequired, FromRoute] Guid id, [FromForm] AnimalCreateUpdateModel animalUpdateModel)
        {
            var imageIds = await _imageService.CreateAsync(animalUpdateModel.Images);

            var animalModel = _mapper.Map<AnimalCreateUpdateModel, AnimalModel>(animalUpdateModel);
            animalModel.Id = id;

            if (animalUpdateModel.AdoptionContractFile != null)
            {
                var document = await _documentService.UploadFileAsync(animalUpdateModel.AdoptionContractFile);
                animalModel.AdoptionContractFileId = document.Id;
            }
            else if (animalUpdateModel.AdoptionContractContractOldFileId.HasValue)
            {
                animalModel.AdoptionContractFileId = animalUpdateModel.AdoptionContractContractOldFileId;
            }

            if (imageIds?.Count > 0)
            {
                animalModel.ImageIds.AddRange(imageIds);
            }

            await UpdateDataAsync(_animalService, id, animalModel, _mapper);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task DeleteAsync([BindRequired, FromRoute] Guid id)
        {
            await _animalService.DeleteAsync(id);
        }
    }
}