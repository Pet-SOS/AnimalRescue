using AnimalRescue.Contracts.BusinessLogic.Services;
using AnimalRescue.Infrastructure.Configurations;
using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Text;

namespace EmailSender.Services
{
    class EmailSenderService : IEmailSender
    {
        private SmtpOptions _smtpOptions;

        public EmailSenderService(SmtpOptions smtpOptions)
        {
            _smtpOptions = smtpOptions;
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
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);

                return false;
            }
            return true;           
        }
    }
}
