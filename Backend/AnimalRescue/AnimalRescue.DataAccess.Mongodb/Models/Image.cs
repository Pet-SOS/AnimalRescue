using System;
using System.Collections.Generic;
using System.Text;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    public class Image : BaseItem
    {
        public byte[] Bady { get; set; }
        public string Title { get; set; }
    }
}
