namespace AnimalRescue.Contracts.Responses
{
    public class DetailedErrorResponse<T> : ErrorResponse<T>
    {
        public string Stack { get; set; }

        public DetailedErrorResponse(string code, T error, string self, string stack)
            : base(code, error, self)
        {
            Stack = stack;
        }
    }
}
