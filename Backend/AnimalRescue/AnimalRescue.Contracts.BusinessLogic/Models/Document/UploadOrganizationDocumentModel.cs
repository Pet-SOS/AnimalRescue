using System;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Document
{
    public class UploadOrganizationDocumentModel
    {
        public Guid BucketId { get; set; }
        public string FileName { get; set; }
        public string UserId { get; set; }
    }
}
