using System.Net;

namespace AnimalRescue.Infrastructure.Interfaces.Exceptions
{
    public interface IAppException
    {
        string ErrorCode { get; }
        HttpStatusCode HttpStatusCode { get; }
    }
}
