namespace AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Donations
{
    public class DonationConfigurationDto : BaseDto
    {
        public BankCardDto BankCard { get; set; }

        public string Title { get; set; }

        public string Body { get; set; }
    }
}
