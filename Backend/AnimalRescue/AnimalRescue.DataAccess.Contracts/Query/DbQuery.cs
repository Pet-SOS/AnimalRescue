namespace AnimalRescue.DataAccess.Contracts.Query
{
    public class DbQuery
    {
        public int Skip => (Page - 1) * Size;

        public int Page { get; set; }

        public int Size { get; set; }

        public string Filter { get; set; }

        public string Sort { get; set; } 
    }
}
