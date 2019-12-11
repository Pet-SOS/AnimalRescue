namespace AnimalRescue.Contracts.Responses
{
    public class ContentApiResponse<T> : ApiResponse
    {
        public T Data { get; set; }
    }
}