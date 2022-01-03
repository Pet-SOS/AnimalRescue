using System;
using System.IO;
using System.Threading.Tasks;

namespace Migration.Runner.Services
{
    public interface IImageService
    {
        Task<string> Create(Stream imageStream, string fileName, string contentType); 
    }
}
