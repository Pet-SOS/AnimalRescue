using AnimalRescue.Contracts.Common.Http;
using AnimalRescue.Contracts.Common.Interfaces.Exceptions;
using System;
using System.Net;

namespace AnimalRescue.Contracts.Common.Exceptions
{
    public class NotFoundException : Exception, IAppException
    {
        public NotFoundException(string message)
            : base(message)
        {
        }

        public string ErrorCode => ErrorCodes.NotFound;
        public HttpStatusCode HttpStatusCode => HttpStatusCode.NotFound;
    }
}