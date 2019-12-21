using AnimalRescue.Contracts.Common.Http;
using AnimalRescue.Contracts.Common.Interfaces.Exceptions;
using System;
using System.Net;

namespace AnimalRescue.Contracts.Common.Exceptions
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
