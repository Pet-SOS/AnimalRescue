using AnimalRescue.Contracts.BusinessLogic.Services;
using AnimalRescue.Infrastructure.Configurations;
using Microsoft.Extensions.Options;
using System;
using System.IO;
using System.Net.Mail;

namespace AnimalRescue.BusinessLogic.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly SmtpOptions _smtpOptions;

        public EmailSender(IOptions<SmtpOptions> smtpOptions)
        {
            _smtpOptions = smtpOptions.Value;
        }


        public bool SendMail(string email, string subject, string message)
        {
            try
            {
                var mailMessage = new MailMessage();

                mailMessage.From = new MailAddress(_smtpOptions.Email, _smtpOptions.DisplayName);
                mailMessage.To.Add(email);
                mailMessage.IsBodyHtml = true;
                mailMessage.Subject = subject;
                mailMessage.Body = message;
                using (var smtpClient = new SmtpClient(_smtpOptions.Host))
                {
                    smtpClient.Port = Convert.ToInt32(_smtpOptions.Port);
                    smtpClient.UseDefaultCredentials = false;
                    smtpClient.Credentials = new System.Net.NetworkCredential(_smtpOptions.Username, _smtpOptions.Password);
                    smtpClient.EnableSsl = Convert.ToBoolean(_smtpOptions.UseSsl);
                    smtpClient.Timeout = 10000;

                    smtpClient.Send(mailMessage);
                }
            }
            catch (Exception ex)
            {
                //ignore
                return false;
            }

            return true;
        }


        private class EmailConstants
        {
            public string Href { get; set; }
            public string Id { get; set; }
        }

        private Attachment CreateAttachment(string href, string path = null)
        {
            if (string.IsNullOrWhiteSpace(path))
            {
                path = AppDomain.CurrentDomain.BaseDirectory;
            }
            string fullPath = Path.Combine(path, href);
            Attachment attach = new Attachment(fullPath);
            return attach;
        }
    }
}
