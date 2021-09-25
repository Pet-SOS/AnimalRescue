using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.Common.Query;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IRequestService : IBlFullCrud<RequestDto, RequestDto, Guid>
    {
        Task<BlCollectonResponse<RequestDto>> GetAsync(ApiQueryRequest queryRequest, ICollection<Claim> roles);
        Task<RequestDto> CreateAsync(RequestDto itemDto, ICollection<Claim> roles);
        Task<RequestDto> GetAsync(Guid id, ICollection<Claim> roles);
        Task UpdateAsync(RequestDto itemDto, ICollection<Claim> roles);
    }
}
