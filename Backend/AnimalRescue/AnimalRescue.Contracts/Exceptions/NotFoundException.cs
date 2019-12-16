using AnimalRescue.Infrastructure.Http;

using System;
using System.Net;

namespace AnimalRescue.Contracts.Exceptions
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