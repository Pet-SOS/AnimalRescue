using AnimalRescue.Contracts.Common.Http;
using AnimalRescue.Contracts.Common.Interfaces.Exceptions;
using System;
using System.Net;

namespace AnimalRescue.Contracts.Common.Exceptions
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
