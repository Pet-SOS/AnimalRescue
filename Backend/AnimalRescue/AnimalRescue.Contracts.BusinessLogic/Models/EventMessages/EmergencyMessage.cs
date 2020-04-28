namespace AnimalRescue.Contracts.BusinessLogic.Models.EventMessages
{
    public class EmergencyMessage : IEventMessage
    {
        public string Title { get; set; }
        public string Address { get; set; }
    }
}
