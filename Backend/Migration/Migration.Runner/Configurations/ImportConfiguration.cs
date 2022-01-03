using System;
namespace Migration.Runner.Configurations
{
    public class ImportConfiguration
    {
        public string Url { get; set; }

        public int Limit { get; set; }

        public bool IncludeDeleted { get; set; }

        public bool IncludeInactive { get; set; }
    }
}
