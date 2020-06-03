using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.BusinessLogic.Models.History;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.Infrastructure.Validation;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Queries
{
    public class HistoryRequestDecorator : HistoryDecorator<RequestDto, RequestDto, Guid>, IRequestService
    {
        private readonly IRequestService requestService;

        public HistoryRequestDecorator(IRequestService requestService, IBlFullCrud<HistoryDto, HistoryDto, Guid> historyService) : base(requestService, historyService)
        {
            Require.Objects.NotNull(requestService, nameof(requestService));
            this.requestService = requestService;
        }

        public async Task<BlCollectonResponse<RequestDto>> GetAsync(ApiQueryRequest queryRequest, ICollection<Claim> roles) => await requestService.GetAsync(queryRequest, roles);

        public async Task<RequestDto> GetAsync(Guid id, ICollection<Claim> roles) => await requestService.GetAsync(id, roles);

        public async Task<RequestDto> CreateAsync(RequestDto itemDto, ICollection<Claim> roles)
        {
            var result = await requestService.CreateAsync(itemDto, roles);
            await CreateHistoryAsync(result);
            return result;
        }

        public async Task UpdateAsync(RequestDto itemDto, ICollection<Claim> roles)
        {
            var previousItem = await requestService.GetAsync(itemDto.Id);
            await requestService.UpdateAsync(itemDto, roles);
            await CreateUpdatedHistoryAsync(itemDto, previousItem);
        }
    }
}
