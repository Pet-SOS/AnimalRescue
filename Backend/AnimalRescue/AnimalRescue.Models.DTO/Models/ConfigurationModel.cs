using System.Collections.Generic;

namespace AnimalRescue.Models.DTO
{
    public class ConfigurationModel
    {
        public List<string> Phones { get; set; }
        
        public Dictionary<string, string> SocialLinks { get; set; }
    }
}
