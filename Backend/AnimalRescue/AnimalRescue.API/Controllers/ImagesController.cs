using Microsoft.Extensions.Logging;

namespace AnimalRescue.API.Controllers
{
    public class ImagesController : ApiControllerBase
    {
        private readonly ILogger<ImagesController> _logger;

        public ImagesController(ILogger<ImagesController> logger)
        {
            _logger = logger;
        }
    }
}
