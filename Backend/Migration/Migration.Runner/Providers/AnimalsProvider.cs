using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Migration.Runner.Configurations;
using Migration.Runner.Models;

namespace Migration.Runner.Providers
{
    public class AnimalsProvider : IAnimalsProvider
    {
        private readonly HttpClient _httpClient;
        private readonly ImportConfiguration _importConfig;

        public AnimalsProvider(HttpClient httpClient, ImportConfiguration importConfig)
        {
            _httpClient = httpClient;
            _importConfig = importConfig;
        }

        public async Task<IEnumerable<AnimalV0>> GetAnimals()
        {
            var exportUrl = $"{_importConfig.Url}/export.html?include-deleted={_importConfig.IncludeDeleted.ToString().ToLower()}&limit={_importConfig.Limit}";

            using var response = await _httpClient.GetAsync(exportUrl);

            response.EnsureSuccessStatusCode();

            var animals = await JsonSerializer.DeserializeAsync<BaseResponse<AnimalV0>>(await response.Content.ReadAsStreamAsync());

            return animals.List.Where(a => _importConfig.IncludeInactive || a.Active);
        }

        public async Task<(Stream Stream, string FileName, string ContentType)> GetImage(string path)
        {
            var imageUrl = $"{_importConfig.Url}/{path}";

            var imageResponse = await _httpClient.GetAsync(imageUrl);

            var imageName = path.Split("/").LastOrDefault();
            var contentType = imageResponse.Content.Headers.GetValues("Content-Type").FirstOrDefault();

            return (await imageResponse.Content.ReadAsStreamAsync(), imageName, contentType);
        }
    }
}
