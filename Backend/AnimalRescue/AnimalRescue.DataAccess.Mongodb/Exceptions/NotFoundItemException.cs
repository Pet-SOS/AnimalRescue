using AnimalRescue.Infrastructure.Http;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace AnimalRescue.DataAccess.Mongodb.Exceptions
{
    internal class NotFoundItemException : Exception, IAppException
    {
        public NotFoundItemException(string message)
            : base(message)
        {
        }

        public string ErrorCode => ErrorCodes.NotFound;
        public HttpStatusCode HttpStatusCode => HttpStatusCode.NotFound;
    }
}
