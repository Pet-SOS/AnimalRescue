namespace AnimalRescue.DataAccess.Mongodb.Models
{
    public class Image : BaseNestedItem
    {
        public byte[] Body { get; set; }
        public string Title { get; set; }
    }
}
