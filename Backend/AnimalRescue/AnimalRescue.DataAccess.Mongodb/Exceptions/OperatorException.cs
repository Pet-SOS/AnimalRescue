using AnimalRescue.Infrastructure.Http;

using System;
using System.Net;

namespace AnimalRescue.DataAccess.Mongodb.Exceptions
{
    internal class OperatorException : Exception, IAppException
    {
        public OperatorException(string message)
            : base(message)
        {
        }

        public string ErrorCode => ErrorCodes.InvalidParameter;
        public HttpStatusCode HttpStatusCode => HttpStatusCode.BadRequest;
    }
}
