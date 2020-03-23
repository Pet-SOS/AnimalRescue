using System.Collections.Generic;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class BlCollectonResponse<TItem>
    {
        public List<TItem> Collection { get; set; }
        public int TotalCount { get; set; }

        public BlCollectonResponse()
        {
            Collection = new List<TItem>();
        }
    }
}
