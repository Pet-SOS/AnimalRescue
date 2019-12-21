using System.Collections.Generic;

namespace AnimalRescue.BusinessLogic.Models
{
    public class BlCollectonResponse<TItem>
    {
        public List<TItem> Collection { get; set; }
        public int TotalCount { get; set; }
    }
}
