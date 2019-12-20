namespace AnimalRescue.API.Core.Responses
{
    public class ContentApiResponse<T> : ApiResponse
    {
        public T Data { get; set; }
    }
}