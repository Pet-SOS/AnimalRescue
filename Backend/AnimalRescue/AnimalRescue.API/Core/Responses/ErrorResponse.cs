namespace AnimalRescue.API.Core.Responses
{
    public class ErrorResponse<T> : ApiResponse
    {
        public string Code { get; set; }

        public T Error { get; set; }

        public ErrorResponse(string code, T error, string self)
        {
            Code = code;
            Error = error;
            Self = self;
        }
    }
}
