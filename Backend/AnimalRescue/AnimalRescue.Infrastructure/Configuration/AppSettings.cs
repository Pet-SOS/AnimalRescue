using System;
using System.Collections.Generic;
using System.Text;

namespace AnimalRescue.Infrastructure.Configurations
{
    public class AppSettings
    {

        public string JwtIssuer { get; set; }
        public string JwtAudience { get; set; }
        public string JwtKey { get; set; }
        public int JwtExpireHours { get; set; }
        public int JwtExpireDaysGain { get; set; }

        public int JwtExpireDays { get; set; }
        public string EnvironmentName { get; set; }
    }
}
