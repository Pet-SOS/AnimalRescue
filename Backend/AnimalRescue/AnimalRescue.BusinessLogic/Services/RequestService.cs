using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;

using AutoMapper;

using System;

using AnimalRescue.Contracts.Common.Query;
using System.Collections.Generic;
using System.Threading.Tasks;
using AnimalRescue.Contracts.Common.Constants;
using System.Security.Claims;
using System.Linq;
using AnimalRescue.Contracts.BusinessLogic.Models.Tag;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class RequestService :
        BaseService<RequestDto, Request, Guid>, 
        IBlFullCrud<RequestDto, RequestDto, Guid>
    {
        public RequestService(
            IRequestRepository repository,
            IRecoverDataService recoverDataService,
            IMapper mapper)
            : base(repository, recoverDataService, mapper)
        {
        }

        private bool DoesRoleMatch(string role, ICollection<Claim> roles)
        {
            var roleMatched = roles.ToList().FirstOrDefault(x => string.Equals(x.Value, role, StringComparison.OrdinalIgnoreCase));
            return roleMatched != null;
        }

        public override async Task<BlCollectonResponse<RequestDto>> GetAsync(ApiQueryRequest queryRequest)
        {
            var isAdmin = DoesRoleMatch(PropertyConstants.UserRole.Admin, queryRequest.Roles);
            var isOperator = DoesRoleMatch(PropertyConstants.UserRole.Operator, queryRequest.Roles);
            if (isOperator || isAdmin)
            {
                WellKnownTagDto tagStatus = new WellKnownTagDto();
                tagStatus.Id = "Urgent";

                var requestedItems = await base.GetAsync(queryRequest);
                var filteredByRoleItems = requestedItems.Collection.Where(p => string.Equals(p.Status.Id, tagStatus.Id, StringComparison.OrdinalIgnoreCase)).ToList();
                return new BlCollectonResponse<RequestDto>
                {
                    Collection = filteredByRoleItems,
                    TotalCount = filteredByRoleItems.Count
                };
            }
            else
            {
                return new BlCollectonResponse<RequestDto>();
            }
        }
    }
}
