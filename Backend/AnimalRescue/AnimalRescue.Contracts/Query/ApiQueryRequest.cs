using System.ComponentModel.DataAnnotations;

namespace AnimalRescue.Contracts.Query
{
    public class ApiQueryRequest
    {
        public const int DefaultPageSize = 10;
        public const int MaxPageSize = 100;

        [Range(1, int.MaxValue)]
        public int Page { get; set; }

        [Range(1, MaxPageSize)]
        public int Size { get; set; }

        public string Filter { get; set; } 

        public string Sort { get; set; } 

        public ApiQueryRequest()
        {
            Page = 1;
            Size = DefaultPageSize;
        }
    }
}