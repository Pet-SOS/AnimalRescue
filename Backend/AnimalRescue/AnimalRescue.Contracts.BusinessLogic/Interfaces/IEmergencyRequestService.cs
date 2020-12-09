using AnimalRescue.Contracts.BusinessLogic.Models;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public  interface IEmergencyRequestService
    {
        Task Notify(RequestDto request);
    }
}
