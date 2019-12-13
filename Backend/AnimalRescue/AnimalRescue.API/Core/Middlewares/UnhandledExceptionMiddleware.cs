using AnimalRescue.API.Core.Configuration;
using AnimalRescue.Contracts.Exceptions;
using AnimalRescue.Contracts.Responses;

using Hilti.Pegasus.Phoenix.Anchors.API.Infrastructure.Http;

using Microsoft.ApplicationInsights.AspNetCore.Extensions;
using Microsoft.AspNetCore.Http;

using Newtonsoft.Json;

using System;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace AnimalRescue.API.Core.Middlewares
{
    public class UnhandledExceptionMiddleware : IMiddleware
    {
        private readonly IRuntimeConfiguration _configuration;

        public UnhandledExceptionMiddleware(IRuntimeConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (BadRequestException e)
            {
                await BuildExceptionResponse(context, BuildErrorResponse(context.Request, e, ErrorCodes.InvalidParameter), HttpStatusCode.BadRequest);
            }
            catch (NotFoundException e)
            {
                await BuildExceptionResponse(context, BuildErrorResponse(context.Request, e, ErrorCodes.NotFound), HttpStatusCode.NotFound);
            }
            catch (Exception e)
            {
                if (e.InnerException is UnauthorizedException)
                {
                    await BuildExceptionResponse(context, BuildErrorResponse(context.Request, e.InnerException, ErrorCodes.InvalidAuthorization), HttpStatusCode.Unauthorized);
                }
                else
                {
                    await BuildExceptionResponse(context, BuildErrorResponse(context.Request, e), HttpStatusCode.InternalServerError);
                }
            }
        }

        private static async Task BuildExceptionResponse(HttpContext context, string message, HttpStatusCode statusCode)
        {
            context.Response.StatusCode = (int)statusCode;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(message);
        }

        private static string BuildFullStackTrace(Exception e)
        {
            var builder = new StringBuilder();
            builder.AppendLine(e.Message);
            builder.AppendLine(e.StackTrace);

            Exception innEx = e.InnerException;
            while (innEx != null)
            {
                builder.AppendLine();
                builder.Append("--- Inner Exception: ");
                builder.AppendLine(innEx.Message);
                builder.AppendLine(innEx.StackTrace);
                innEx = innEx.InnerException;
            }

            return builder.ToString();
        }

        private string BuildErrorResponse(HttpRequest request, Exception e, string errorCode = ErrorCodes.UnknownError)
        {
            string self = request.GetUri().ToString();

            var response = _configuration.IncludeErrorDetails
                ? new DetailedErrorResponse<string>(errorCode, e.Message, self, BuildFullStackTrace(e))
                : new ErrorResponse<string>(errorCode, e.Message, self);

            return JsonConvert.SerializeObject(response);
        }
    }
}