namespace AnimalRescue.Contracts.BusinessLogic.Models.EventMessages
{
    public class EmergencyMessage : IEventMessage
    {
        public string Message { get; set; }
    }
}
