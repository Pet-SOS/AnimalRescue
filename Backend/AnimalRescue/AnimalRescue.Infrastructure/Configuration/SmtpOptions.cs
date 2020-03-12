using System;
using System.Collections.Generic;
using System.Text;

namespace AnimalRescue.Infrastructure.Configurations
{
    public class SmtpOptions
    {
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string Host { get; set; }
        public string Port { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool UseSsl { get; set; }
    }
}
