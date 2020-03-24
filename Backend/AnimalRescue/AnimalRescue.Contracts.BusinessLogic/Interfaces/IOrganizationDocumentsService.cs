﻿using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models.Document;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IOrganizationDocumentService :
        IBlDeleteAsync,
        IBlCollectinQueryAsyncy<GetDocumentsOrganizationViewItem>
    {
        Task<GetDocumentsOrganizationViewItem> CreateAsync(UploadDocumentModel model, string userId);
    }
}