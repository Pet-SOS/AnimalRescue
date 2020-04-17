namespace AnimalRescue.DataAccess.Mongodb.Models.BaseItems
{
    public interface IDeletableItem
    {
        bool IsDeletable { get; set; }
    }
}
