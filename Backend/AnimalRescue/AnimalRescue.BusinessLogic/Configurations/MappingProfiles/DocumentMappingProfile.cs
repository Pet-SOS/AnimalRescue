using AnimalRescue.Contracts.BusinessLogic.Models.Document;
using AnimalRescue.DataAccess.Mongodb.Models;
using AutoMapper;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    public class DocumentMappingProfile : Profile
    {
        public DocumentMappingProfile()
        {
            CreateMap<UploadOrganizationDocumentModel, OrganizationDocument>()
                .ForMember(x => x.BucketId, o => o.MapFrom(y => y.BucketId))
                .ForMember(x => x.Name, o => o.MapFrom(y => y.FileName))
                .ForMember(x => x.CreatedBy, o => o.MapFrom(y => y.UserId));
        }
    }
}
