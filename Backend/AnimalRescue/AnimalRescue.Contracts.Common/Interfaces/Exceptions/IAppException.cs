using System.Net;

namespace AnimalRescue.Contracts.Common.Interfaces.Exceptions
{
    public interface IAppException
    {
        string ErrorCode { get; }
        HttpStatusCode HttpStatusCode { get; }
    }
}
