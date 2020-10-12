
namespace AnimalRescue.Contracts.BusinessLogic.Models.EventMessages
{
    public class AdoptAnimalEmailMessage : IEventMessage
    {
        public string Address { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
    }
}
