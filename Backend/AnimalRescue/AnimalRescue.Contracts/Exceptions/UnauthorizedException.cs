using AnimalRescue.Infrastructure.Http;

using System;
using System.Net;

namespace AnimalRescue.Contracts.Exceptions
{
    public class UnauthorizedException : Exception, IAppException
    {
        public UnauthorizedException(string message)
            : base(message)
        {
        }

        public string ErrorCode => ErrorCodes.InvalidAuthorization; 
        public HttpStatusCode HttpStatusCode => HttpStatusCode.Unauthorized;
    }
}
