﻿using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models.Animals;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.Infrastructure.Validation;

using AutoMapper;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    public class AnimalsController : ApiControllerBase
    {
        private readonly IBlFullCrud<AnimalDto, AnimalDto> _animalService;
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;

        public AnimalsController(
            IMapper mapper,
            IBlFullCrud<AnimalDto, AnimalDto> animalService,
            IImageService imageService)
        {
            Require.Objects.NotNull(mapper, nameof(mapper));
            Require.Objects.NotNull(animalService, nameof(animalService));
            Require.Objects.NotNull(imageService, nameof(imageService));

            _mapper = mapper;
            this._animalService = animalService;
            _imageService = imageService;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<AnimalModel>> GetItemByIdAsync([BindRequired, FromRoute] Guid id)
        {
            return await GetItemAsync<AnimalDto, AnimalModel>(_animalService, id, _mapper);
        }

        [HttpPost("bunch")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<List<AnimalModel>>> GetItemsByIdsAsync([BindRequired, FromForm] AnimalBanch animalBanch)
        {
            List<AnimalModel> result = new List<AnimalModel>(animalBanch.AnimalIds.Count);
            foreach (Guid item in animalBanch.AnimalIds)
            {
                var data = await _animalService.GetAsync(item);
                if (data != null)
                    result.Add(_mapper.Map<AnimalDto, AnimalModel>(data));
            }

            return Item(result);
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<CollectionSegmentApiResponse<AnimalModel>>> GetAsync([FromQuery]ApiQueryRequest queryRequest)
        {
            return await GetCollectionAsync<AnimalDto, AnimalModel>(_animalService, queryRequest, _mapper);
        }

        [HttpGet("Counter")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<int>> GetCountAsync()
        {
            return Item(await _animalService.GetCountAsync(new ApiQueryRequest()));
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<AnimalModel>> CreateItemAsync([FromForm] AnimalCreateUpdateModel animalCreateModel)
        {
            var imageIds = await _imageService.CreateAsync(animalCreateModel.Images);

            var animalModel = _mapper.Map<AnimalCreateUpdateModel, AnimalModel>(animalCreateModel);

            if (imageIds?.Count > 0)
            {
                animalModel.ImageIds = imageIds;
            }


            return await CreatedItemAsync(_animalService, animalModel, _mapper);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateAsync([BindRequired, FromRoute] Guid id, [FromForm] AnimalCreateUpdateModel animalUpdateModel)
        {
            var imageIds = await _imageService.CreateAsync(animalUpdateModel.Images);

            var animalModel = _mapper.Map<AnimalCreateUpdateModel, AnimalModel>(animalUpdateModel);
            animalModel.Id = id;
            animalModel.ImageIds = (await _animalService.GetAsync(animalModel.Id)).ImageIds;

            if (imageIds?.Count > 0)
            {
                animalModel.ImageIds.AddRange(imageIds);
            }

            await UpdateDataAsync(_animalService, id, animalModel, _mapper);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task DeleteAsync([BindRequired, FromRoute] Guid id)
        {
            await _animalService.DeleteAsync(id);
        }
    }
}