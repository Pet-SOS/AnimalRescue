﻿using AnimalRescue.BusinessLogic.Extensions;
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
using System.Text.RegularExpressions;
using AnimalRescue.Contracts.BusinessLogic.Models.EventMessages;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class RequestService :
        BaseService<RequestDto, Request, Guid>, 
        IRequestService
    {
        private readonly IUserRoleActionRepository _userRoleActionRepository;
        private readonly IEventEmittingService _eventEmittingService;
        private readonly string _messageMissingRole = "User does not have a role to view this Request";
        private readonly string _messageForbiddenFields = "Filter contains forbidden fields";

        public RequestService(
            IBaseRepository<Request> repository,
            IRecoverDataService recoverDataService,
            IEventEmittingService eventEmittingService,
            IUserRoleActionRepository userRoleActionRepository,
            IMapper mapper)
            : base(repository, recoverDataService, mapper)
        {
            _userRoleActionRepository = userRoleActionRepository;
            _eventEmittingService = eventEmittingService;
        }

        public async Task<BlCollectonResponse<RequestDto>> GetAsync(ApiQueryRequest queryRequest, ICollection<Claim> roles)
        {
            var initStatuses = GetQueryStatuses(queryRequest.Filter, $"status.id~{StrictFilterContractConstants.Eq}~");

            var dbQuery = queryRequest.ToDbQuery();
            var isAdmin = IsRoleAdmin(roles);
            if (!isAdmin)
            {
                List<string> requestStatuses = GetRequestStatuses(roles, actions.Get);

                foreach (var initStatus in initStatuses)
                {
                    var isContain = requestStatuses.Contains(initStatus);
                    if (!isContain)
                    {
                        throw new ForbiddenOperationRequestException(_messageForbiddenFields);
                    }
                }

                string filterExpr = string.Empty;
                if (requestStatuses.Count > 0)
                {
                    filterExpr = string.Join("OR", requestStatuses.Select(x => @"{status.id~" + StrictFilterContractConstants.Eq + "~'" + x + "'}").ToList());
                    dbQuery.Filter = filterExpr;
                }
                else
                {
                    throw new ForbiddenOperationRequestException(_messageMissingRole);
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
                }
                throw new ForbiddenOperationRequestException(_messageMissingRole);
            }
        }

        public async Task<RequestDto> CreateAsync(RequestDto itemDto, ICollection<Claim> roles)
        {
            var isAllowed = IsRoleOperatorOrAdmin(roles);
            if (isAllowed)
            {
                var requestStatuses = GetStatusesByRoleAndAction(PropertyConstants.UserRole.Operator.ToUpper(), actions.Create);
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
                SendMessage(itemDto);
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
                        SendMessage(itemDto);
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

        private void SendMessage(RequestDto itemDto)
        {
            var operatorStatuses = GetStatusesByRoleActionIsMessageSent(PropertyConstants.UserRole.Operator.ToUpper(), actions.Update, true);
            if (operatorStatuses.Contains(itemDto.Status.Id))
            {
                EmergencyMessage emergencyMessage = new EmergencyMessage();
                emergencyMessage.Title = "New Request (" + itemDto.Case + ")";
                emergencyMessage.Message = "A " + itemDto.KindOfAnimal + " " + " has been found in " + itemDto.AnimalState.ToString() + " state." + Environment.NewLine;
                emergencyMessage.Message += itemDto.CaseDescription + Environment.NewLine;
                emergencyMessage.Message += "Contact info: " + itemDto.FirstName + " " + itemDto.LastName + ", phone: " + itemDto.Phone;
                emergencyMessage.Address = itemDto.Address;

                _eventEmittingService.PublishMessage(emergencyMessage);
            }
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

        private List<string> GetStatusesByRoleAndAction(string role, string action)
        {
            var filter = common.UserRole + "~" + StrictFilterContractConstants.Eq + "~'" + role + "';"
                       + common.Action + "~" + StrictFilterContractConstants.Eq + "~'" + action + "'";
            DbQuery dbQuery = new DbQuery
            {
                Filter = filter,
                Page = 1,
                Size = 100
            };
            return _userRoleActionRepository.GetAsync(dbQuery).Result.ToList().Select(x => x.TagId).ToList();
        }

        private List<string> GetStatusesByRoleActionIsMessageSent(string role, string action, bool isMessageSent)
        {
            var filter = common.UserRole + "~" + StrictFilterContractConstants.Eq + "~'" + role + "';"
                       + common.Action + "~" + StrictFilterContractConstants.Eq + "~'" + action + "';"
                       + common.IsMessageSent + "~" + StrictFilterContractConstants.Eq + "~'" + isMessageSent + "'";
            DbQuery dbQuery = new DbQuery
            {
                Filter = filter,
                Page = 1,
                Size = 100
            };
            return _userRoleActionRepository.GetAsync(dbQuery).Result.ToList().Select(x => x.TagId).ToList();
        }

        private List<string> GetRequestStatuses(ICollection<Claim> roles, string action)
        {
            List<string> requestStatuses = new List<string>();
            foreach (var role in roles.Where(role => role.Value != PropertyConstants.UserRole.Admin).Select(role => role))
            {
                requestStatuses.AddRange(GetStatusesByRoleAndAction(role.Value.ToUpper(), action));
            }
            return requestStatuses;
        }

        private List<string> GetQueryStatuses(string source, string matchString)
        {
            List<string> res = new List<string>();
            if (source == null)
            {
                return res;
            }

            const int minExprLen = 8;
            source = Regex.Replace(source, @"\s+", "");
            var splittedValues = source.Split('{', '}');
            foreach (var singleExpr in splittedValues)
            {
                var splittedAnds = singleExpr.Split(';');
                foreach (var itemAnd in splittedAnds)
                {
                    if (itemAnd.Length >= minExprLen)
                    {
                        if (itemAnd.Contains(matchString))
                        {
                            Regex regName = new Regex("'(.*)'");
                            Match match = regName.Match(itemAnd);
                            if (match.Success)
                            {
                                var status = match.Value.Substring(1, match.Value.Length - 2);
                                res.Add(status);
                            }
                        }
                        else
                        {
                            throw new ForbiddenOperationRequestException(_messageForbiddenFields);
                        }
                    }
                }
            }
            return res;
        }
    }
}
