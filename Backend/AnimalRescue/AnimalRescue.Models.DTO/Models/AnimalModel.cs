using System;
using System.Collections.Generic;
using System.Text;

namespace AnimalRescue.Models.DTO.Models
{
    public class AnimalModel
    {
        public DateTime DateOfFound { get; set; }
        public DateTime? DateOfAdopted { get; set; }
        public string Name { get; set; }
        public List<string> Tags { get; set; }
    }
}
