using System;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IImageService
    {
        Task<Dictionary<string, Guid>> SaveImage(IFormFile sourceImage);
    }
}
