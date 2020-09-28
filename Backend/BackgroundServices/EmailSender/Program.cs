using AnimalRescue.BusinessLogic.Configurations;
using AnimalRescue.BusinessLogic.Services;
using AnimalRescue.Contracts.BusinessLogic.Models.EventMessages;
using AnimalRescue.Contracts.BusinessLogic.Services;
using AnimalRescue.Infrastructure.Configuration;
using AnimalRescue.Infrastructure.Configurations;
using EmailSender.Services;
using System;

namespace EmailSender
{
    class Program
    {
        private static IEmailSender _emailSender;
        static void Main(string[] args)
        {
            IPublisherSettings publisherSettings = ConfigurationUtil
                .GetConfiguration()
                .GetTypedSection<PublisherSettings>(nameof(PublisherSettings));

            SmtpOptions smtpOptions = ConfigurationUtil
                .GetConfiguration()
                .GetTypedSection<SmtpOptions>("Smtp");

            using EventReceivingService eventReceivingService = new EventReceivingService(publisherSettings);

            _emailSender = new EmailSenderService(smtpOptions);
            eventReceivingService.Run<AdoptAnimalEmailMessage>((message) => _emailSender.SendMail(message.Address, message.Title, message.Message));

            Console.ReadLine();
        }
    }
}
