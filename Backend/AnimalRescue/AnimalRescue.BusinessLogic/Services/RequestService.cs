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
using AnimalRescue.BusinessLogic.Extensions;
using AnimalRescue.Contracts.BusinessLogic.Models.Tag;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class RequestService :
        BaseService<RequestDto, Request, Guid>, 
        IBlFullCrud<RequestDto, RequestDto, Guid>,
        IRequestService
    {
        protected readonly IWellKnownTagService _wellKnownTagService;

        public RequestService(
            IRequestRepository repository,
            IRecoverDataService recoverDataService,
            IWellKnownTagService wellKnownTagService,
            IMapper mapper)
            : base(repository, recoverDataService, mapper)
        {
            _wellKnownTagService = wellKnownTagService;
        }

        private bool IsRoleOperatorOrAdmin(ICollection<Claim> roles)
        {
            var isAdmin = DoesRoleMatch(PropertyConstants.UserRole.Admin, roles);
            var isOperator = DoesRoleMatch(PropertyConstants.UserRole.Operator, roles);
            return isOperator || isAdmin;
        }

        private bool DoesRoleMatch(string role, ICollection<Claim> roles)
        {
            var roleMatched = roles.ToList().FirstOrDefault(x => string.Equals(x.Value, role, StringComparison.OrdinalIgnoreCase));
            return roleMatched != null;
        }

        private List<RequestDto> GetOperatorItems(List<RequestDto> itemDtos)
        {
            var filteredByRoleItems = itemDtos.Where(p => IsOperatorsItem(_wellKnownTagService, p, TagsConstants.RequestStatuses.RequestStatusForProcessing)).ToList();
            return filteredByRoleItems;
        }

        private static bool IsOperatorsItem(IWellKnownTagService wellKnownTagService, RequestDto itemDto, string tagId)
        {
            var tagStatus = wellKnownTagService.GetAsync(tagId);
            return string.Equals(itemDto.Status.Id, tagStatus.Result.Id, StringComparison.OrdinalIgnoreCase);
        }

        private static WellKnownTagDto GetRequestStatus(IWellKnownTagService wellKnownTagService, string tagId)
        {
            return wellKnownTagService.GetAsync(tagId).Result;
        }

        private bool IsRoleOperator(ICollection<Claim> roles)
        {
            return DoesRoleMatch(PropertyConstants.UserRole.Operator, roles);
        }

        public async Task<BlCollectonResponse<RequestDto>> GetAsync(ApiQueryRequest queryRequest, ICollection<Claim> roles)
        {
            var dbQuery = queryRequest.ToDbQuery();
            var count = await _repository.GetCountAsync(dbQuery);
            List<RequestDto> itemDtos = await GetCollectionAsync(count, dbQuery);

            List<RequestDto> filteredByRoleItems;
            filteredByRoleItems = GetOperatorItems(itemDtos);



            //var isOperator = IsRoleOperator(roles);
            //if (isOperator)
            //{
            //    filteredByRoleItems = GetOperatorItems(itemDtos);
            //}
            //else
            //{
            //    filteredByRoleItems = itemDtos;
            //}

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

            var isOperator = IsRoleOperator(roles);
            var isOperatorsItem = IsOperatorsItem(_wellKnownTagService, itemDto, TagsConstants.RequestStatuses.RequestStatusForProcessing);
            if (isOperator)
            {
                if (isOperatorsItem)
                {
                    return itemDto;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return itemDto;
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
                    return null;
                }
            }
            else
            {
                return null;
            }
        }


        public async Task UpdateAsync(RequestDto itemDto, ICollection<Claim> roles)
        {
            var isAllowed = IsRoleOperatorOrAdmin(roles);
            if (isAllowed)
            {
                await _recoverDataService.RecoverDataAsync<RequestDto, Request>(itemDto);

                var itemDbo = _mapper.Map<RequestDto, Request>(itemDto);

                await _repository.UpdateAsync(itemDbo);
            }
        }

    }
}
