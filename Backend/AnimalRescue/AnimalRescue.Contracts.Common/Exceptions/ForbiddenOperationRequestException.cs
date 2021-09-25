using AnimalRescue.Contracts.Common.Http;
using AnimalRescue.Contracts.Common.Interfaces.Exceptions;
using System;
using System.Net;

namespace AnimalRescue.Contracts.Common.Exceptions
{
    public class ForbiddenOperationRequestException : Exception, IAppException
    {
        public ForbiddenOperationRequestException(string message)
            : base(message)
        {
        }

        public string ErrorCode => ErrorCodes.ForbiddenOperation;
        public HttpStatusCode HttpStatusCode => HttpStatusCode.Forbidden;
    }
}
