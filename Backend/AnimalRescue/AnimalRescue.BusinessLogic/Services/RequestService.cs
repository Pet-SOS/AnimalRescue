using AnimalRescue.BusinessLogic.Extensions;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Interfaces.UsersManagement;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.BusinessLogic.Services;
using AnimalRescue.Contracts.Common.Constants;
using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class RequestService :
        BaseService<RequestDto, Request, Guid>, 
        IRequestService
    {
        public RequestService(
            IRequestRepository repository,
            IRecoverDataService recoverDataService,
            IWellKnownTagService wellKnownTagService,
            IEmailSender emailSender,
            IUsersManagementService usersManagementService,
            IMapper mapper)
            : base(repository, recoverDataService, mapper)
        {
        }

        private bool IsRoleOperatorOrAdmin(ICollection<Claim> roles)
        {
            var isAdmin = DoesRoleMatch(PropertyConstants.UserRole.Admin, roles);
            var isOperator = DoesRoleMatch(PropertyConstants.UserRole.Operator, roles);
            return isOperator || isAdmin;
        }

        private bool IsRoleAdmin(ICollection<Claim> roles)
        {
            return DoesRoleMatch(PropertyConstants.UserRole.Admin, roles);
        }

        private static bool DoesItemMatchesStatus(RequestDto itemDto, List<string> requestStatuses)
        {
            return requestStatuses.Contains(itemDto.Status.Id);
        }

        private bool CheckRole(ICollection<Claim> roles, string roleName)
        {
            return DoesRoleMatch(roleName, roles);
        }

        private List<string> GetViewRequestStatuses(ICollection<Claim> roles)
        {
            List<string> requestStatuses = new List<string>();
            var isOperator = CheckRole(roles, PropertyConstants.UserRole.Operator);
            if (isOperator)
            {
                requestStatuses.Add(TagsConstants.RequestStatuses.RequestStatusForProcessing);
            }

            var isRescuer = CheckRole(roles, PropertyConstants.UserRole.Rescuer);
            if (isRescuer)
            {
                requestStatuses.Add(TagsConstants.RequestStatuses.RequestStatusUrgent);
                requestStatuses.Add(TagsConstants.RequestStatuses.RequestStatusWork);
            }

            return requestStatuses;
        }

        private List<string> GetUpdateRequestStatuses(ICollection<Claim> roles)
        {
            List<string> requestStatuses = new List<string>();
            var isOperator = CheckRole(roles, PropertyConstants.UserRole.Operator);
            if (isOperator)
            {
                requestStatuses.Add(TagsConstants.RequestStatuses.RequestStatusUrgent);
                requestStatuses.Add(TagsConstants.RequestStatuses.RequestStatusWork);
            }

            var isRescuer = CheckRole(roles, PropertyConstants.UserRole.Rescuer);
            if (isRescuer)
            {
                requestStatuses.Add(TagsConstants.RequestStatuses.RequestStatusAnimalIsTakenToShelter);
                requestStatuses.Add(TagsConstants.RequestStatuses.RequestStatusAnimalIsSavedNoNeedShelter);
                requestStatuses.Add(TagsConstants.RequestStatuses.RequestStatusAnimalIsInVeryPoorCondition);
                requestStatuses.Add(TagsConstants.RequestStatuses.RequestStatusAnimalNotFound);
                requestStatuses.Add(TagsConstants.RequestStatuses.RequestStatusAnimalDied);
            }

            return requestStatuses;
        }

        public async Task<BlCollectonResponse<RequestDto>> GetAsync(ApiQueryRequest queryRequest, ICollection<Claim> roles)
        {
            var dbQuery = queryRequest.ToDbQuery();

            var isAdmin = IsRoleAdmin(roles);
            if (!isAdmin)
            {
                List<string> requestStatuses = GetViewRequestStatuses(roles);

                string filterExpr = string.Empty;
                if (requestStatuses.Count > 0)
                {
                    foreach (var status in requestStatuses)
                    {
                        filterExpr += @"{status.id~" + StrictFilterContractConstants.Eq + "~'" + status + "'}OR";
                    }
                    filterExpr = filterExpr.Substring(0, filterExpr.Length - 2);

                    dbQuery.Filter += filterExpr;
                }
                else
                {
                    throw new ForbiddenOperationRequestException("User does not have a role to view this Request");
                }
            }

            var count = await _repository.GetCountAsync(dbQuery);
            var filteredByRoleItems = await GetCollectionAsync(count, dbQuery);
            return new BlCollectonResponse<RequestDto>
            {
                Collection = filteredByRoleItems,
                TotalCount = count
            };
        }

        public async Task<RequestDto> GetAsync(Guid id, ICollection<Claim> roles)
        {
            string itemId = IdExtensions.GetStringId(id);
            var itemDbo = await _repository.GetAsync(itemId);
            var itemDto = _mapper.Map<Request, RequestDto>(itemDbo);

            var isAdmin = IsRoleAdmin(roles);
            if (isAdmin)
            {
                return itemDto;
            }
            else
            {
                List<string> requestStatuses = GetViewRequestStatuses(roles);
                if (requestStatuses.Count > 0)
                {
                    var isAllowedItem = DoesItemMatchesStatus(itemDto, requestStatuses);
                    if (isAllowedItem)
                    {
                        return itemDto;
                    }
                    else
                    {
                        throw new ForbiddenOperationRequestException("User does not have a role to view this Request");
                    }
                }
                throw new ForbiddenOperationRequestException("User does not have a role to view this Request");
            }
        }


        public async Task<RequestDto> CreateAsync(RequestDto itemDto, ICollection<Claim> roles)
        {
            var isAllowed = IsRoleOperatorOrAdmin(roles);
            if (isAllowed)
            {
                if (itemDto.Status.Id == TagsConstants.RequestStatuses.RequestStatusForProcessing)
                {
                    itemDto = await base.CreateAsync(itemDto);
                    return itemDto;
                }
                else
                {
                    throw new ForbiddenOperationRequestException("Request has wrong status for creation");
                }
            }
            else
            {
                throw new ForbiddenOperationRequestException("User does not have a role assinged to perform this operation");
            }
        }


        public async Task UpdateAsync(RequestDto itemDto, ICollection<Claim> roles)
        {
            var isAdmin = IsRoleAdmin(roles);
            if (isAdmin)
            {
                await base.UpdateAsync(itemDto);
            }
            else
            {
                List<string> requestStatuses = GetUpdateRequestStatuses(roles);
                if (requestStatuses.Count > 0)
                {
                    var doesStatusMatches = DoesItemMatchesStatus(itemDto, requestStatuses);
                    if (doesStatusMatches)
                    {
                        await base.UpdateAsync(itemDto);
                    }
                    else
                    {
                        throw new ForbiddenOperationRequestException("The status of this Request cannot be changed to " + itemDto.Status.Id);
                    }
                }
                else
                {
                    throw new ForbiddenOperationRequestException("User does not have a role to change the status of this Request");
                }
            }
        }
    }
}
