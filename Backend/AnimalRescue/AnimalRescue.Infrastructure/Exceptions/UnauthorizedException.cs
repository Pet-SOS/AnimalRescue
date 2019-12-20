using AnimalRescue.Infrastructure.Http;
using AnimalRescue.Infrastructure.Interfaces.Exceptions;
using System;
using System.Net;

namespace AnimalRescue.Infrastructure.Exceptions
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
