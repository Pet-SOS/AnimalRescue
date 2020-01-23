using AnimalRescue.Contracts.BusinessLogic.Attributes;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Blogs
{
    public class BlogBaseDto : BaseCommonDto
    {
        [CouplingPropertyDto(common.Title)]
        public string Title { get; set; }

        [CouplingPropertyDto(common.Body)]
        public string Body { get; set; }
    }
}
