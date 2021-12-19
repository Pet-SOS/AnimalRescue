using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Migration.Runner.Models;

namespace Migration.Runner.Providers
{
    public class AnimalsProvider : IAnimalsProvider
    {
        private const string Url = "https://adopt.spt.kh.ua/export.html";
        private readonly HttpClient _httpClient;

        public AnimalsProvider(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<AnimalV0>> GetAnimals(int limit = 10, bool includeDeleted = false, bool includeInactive = false)
        {
            var url = $"{Url}?include-deleted={includeDeleted}&limit={limit}";

            using var response = await _httpClient.GetAsync(url);

            response.EnsureSuccessStatusCode();

            var str = await response.Content.ReadAsStringAsync(); 

            var animals = await JsonSerializer.DeserializeAsync<BaseResponse<AnimalV0>>(await response.Content.ReadAsStreamAsync());

            return animals.List.Where(a => includeDeleted || a.Active);
        }
    }
}
