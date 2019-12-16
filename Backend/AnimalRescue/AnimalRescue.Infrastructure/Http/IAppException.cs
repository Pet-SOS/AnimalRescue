using System.Net;

namespace AnimalRescue.Infrastructure.Http
{
    public interface IAppException
    {
        string ErrorCode { get; }
        HttpStatusCode HttpStatusCode { get; }
    }
}
