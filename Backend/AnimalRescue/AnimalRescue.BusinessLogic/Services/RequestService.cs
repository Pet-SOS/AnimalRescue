using AnimalRescue.BusinessLogic.Extensions;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.Common.Constants;
using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;
using actions = AnimalRescue.Contracts.Common.Constants.TagsConstants.Actions;
using System.Linq;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class RequestService :
        BaseService<RequestDto, Request, Guid>, 
        IRequestService
    {
        private readonly IUserRoleActionRepository _userRoleActionRepository;

        public RequestService(
            IRequestRepository repository,
            IRecoverDataService recoverDataService,
            IUserRoleActionRepository userRoleActionRepository,
            IMapper mapper)
            : base(repository, recoverDataService, mapper)
        {
            _userRoleActionRepository = userRoleActionRepository;
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

        private List<UserRoleAction> GetStatusesByRoleAndAction(string role, string action)
        {
            var filter = common.UserRole + "~" + StrictFilterContractConstants.Eq + "~'" + role + "';"
                       + common.Action + "~" + StrictFilterContractConstants.Eq + "~'" + action + "'";
            DbQuery dbQuery = new DbQuery
            {
                Filter = filter,
                Page = 1,
                Size = 100
            };
            return _userRoleActionRepository.GetAsync(dbQuery).Result.ToList();
        }

        private List<string> GetRequestStatuses(ICollection<Claim> roles, string action)
        {
            List<string> requestStatuses = new List<string>();
            foreach(var role in roles)
            {
                if (role.Value != PropertyConstants.UserRole.Admin)
                {
                    requestStatuses.AddRange(GetStatusesByRoleAndAction(role.Value.ToUpper(), action).Select(status => status.TagId));
                }
            }
            return requestStatuses;
        }


        public async Task<BlCollectonResponse<RequestDto>> GetAsync(ApiQueryRequest queryRequest, ICollection<Claim> roles)
        {
            var dbQuery = queryRequest.ToDbQuery();
            var isAdmin = IsRoleAdmin(roles);
            if (!isAdmin)
            {
                List<string> requestStatuses = GetRequestStatuses(roles, actions.Get);

                string filterExpr = string.Empty;
                if (requestStatuses.Count > 0)
                {
                    foreach (var status in requestStatuses)
                    {
                        filterExpr += @"{status.id~" + StrictFilterContractConstants.Eq + "~'" + status + "'}OR";
                    }
                    filterExpr = filterExpr.Substring(0, filterExpr.Length - 2);
                    dbQuery.Filter = filterExpr;
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
                List<string> requestStatuses = GetRequestStatuses(roles, actions.Get);
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
                var requestStatuses = GetStatusesByRoleAndAction(PropertyConstants.UserRole.Operator.ToUpper(), actions.Create).Select(status => status.TagId);
                if (requestStatuses.Contains(itemDto.Status.Id))
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
                List<string> requestStatuses = GetRequestStatuses(roles, actions.Update);
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
