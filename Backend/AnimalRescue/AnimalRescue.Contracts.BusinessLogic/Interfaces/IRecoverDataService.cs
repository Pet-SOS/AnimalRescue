using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IRecoverDataService
    {
        Task RecoverDataAsync<TEntityDto, TEntityDbo>(TEntityDto itemDto);
    }
}
