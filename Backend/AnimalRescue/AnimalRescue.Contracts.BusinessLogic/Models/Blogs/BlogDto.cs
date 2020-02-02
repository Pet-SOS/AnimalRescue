using AnimalRescue.Contracts.BusinessLogic.Attributes;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Blogs
{
    public class BlogDto : BlogBaseDto
    {
        [CouplingPropertyDto(common.BlogType)]
        public string Type { get; set; } 
    }
}
