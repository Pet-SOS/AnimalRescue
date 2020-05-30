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
using System.Linq;
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

        //private List<RequestDto> GetOperatorItems(List<RequestDto> itemDtos, List<string> requestStatuses)
        //{
        //    var filteredByRoleItems = itemDtos.Where(p => requestStatuses.Contains(p.Status.Id)).ToList();
        //    return filteredByRoleItems;
        //}

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
            var count = await _repository.GetCountAsync(dbQuery);
//            List<RequestDto> itemDtos = await GetCollectionAsync(count, dbQuery);
            List<RequestDto> itemDtos;

            List<RequestDto> filteredByRoleItems;
            var isAdmin = IsRoleAdmin(roles);
            //if (isAdmin)
            //{
            //    filteredByRoleItems = await GetCollectionAsync(count, dbQuery);
            //}
            //else
            //{
                List<string> requestStatuses = GetViewRequestStatuses(roles);
                if (requestStatuses.Count > 0)
                {
                    //                    filteredByRoleItems = GetOperatorItems(itemDtos, requestStatuses);
                    var expr = $"Status~{StrictFilterContractConstants.Eq}~" + requestStatuses[0];
                    var firstFilter = requestStatuses[0];
                    dbQuery.Filter = expr;
//                    var isNotDeletedExpr = $"{baseItem.IsDeleted}~{StrictFilterContractConstants.Eq}~'false'";



                    filteredByRoleItems = await GetCollectionAsync(count, dbQuery);
                }
                else
                {
                    throw new ForbiddenOperationRequestException("User does not have a role to view this Request");
                }
//            }

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
