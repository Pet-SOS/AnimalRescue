using AnimalRescue.Infrastructure.Http;

using System;
using System.Net;

namespace AnimalRescue.Contracts.Exceptions
{
    public class BadRequestException : Exception, IAppException
    {
        public BadRequestException(string message)
            : base(message)
        {
        }

        public string ErrorCode => ErrorCodes.InvalidParameter;
        public HttpStatusCode HttpStatusCode => HttpStatusCode.BadRequest;
    }
}
