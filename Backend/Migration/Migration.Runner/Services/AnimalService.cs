using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using Migration.Runner.Configurations;
using Migration.Runner.Models;
using Migration.Runner.Providers;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Migration.Runner.Services
{
    public class AnimalService : IAnimalSerivce
    {
        private readonly ISequenceRepository _sequenceRepository;
        private readonly IImageService _imageService;
        private readonly IBaseRepository<Animal> _animalRepository;
        private readonly IAnimalsProvider _animalsProvider;
        private readonly ImportConfiguration _importConfig;

        public AnimalService(
            ISequenceRepository sequenceRepository,
            IImageService imageService,
            IBaseRepository<Animal> animalRepository,
            IAnimalsProvider animalsProvider,
            ImportConfiguration importConfig)
        {
            _sequenceRepository = sequenceRepository;
            _imageService = imageService;
            _animalRepository = animalRepository;
            _animalsProvider = animalsProvider;
            _importConfig = importConfig;
        }

        public async Task Create(IEnumerable<AnimalV0> animals)
        {
            var seq = await GetOrCreateSeq().ConfigureAwait(false);

            foreach (var animal in animals)
            {
                seq.Number += 1;

                var images = await DownloadAndSaveImages(animal);
                await _animalRepository.CreateAsync(Map(animal, seq.Number, images)).ConfigureAwait(false);
            }

            await _sequenceRepository.UpdateAsync(seq).ConfigureAwait(false);
        }

        private async Task<Sequence> GetOrCreateSeq()
        {
            var seq = await _sequenceRepository.GetAsync().ConfigureAwait(false);

            if (seq == null)
            {
                seq = new Sequence
                {
                    Number = 1
                };

                await _sequenceRepository.CreateAsync(seq).ConfigureAwait(false);
            }

            return seq;
        }

        private static Animal Map(AnimalV0 animal, int number, IEnumerable<string> images)
        {
            return new Animal
            {
                Number = number,
                LocationName = animal.Location,
                Names = new List<LanguageValue>
                {
                    new LanguageValue
                    {
                        Lang = "ru",
                        Value = animal.Name
                    }
                },
                KindOfAnimal = animal.Type + "\n" + animal.Breed + "\n" + animal.Color,
                Gender = animal.Sex,
                Birthday = animal.Birthday.Date,
                AdoptivePhone = animal.Phone,
                Description = new List<LanguageValue>
                {
                    new LanguageValue
                    {
                        Lang = "ru",
                        Value = animal.Description
                    }
                },
                IsDeleted = animal.Deleted,
                IsDeletable = true,
                ImageIds = images.ToList()
            };
        }

        private async Task<IEnumerable<string>> DownloadAndSaveImages(AnimalV0 animal)
        {
            var imagesToDownload = new List<string>(animal.Photos.Select(p => p.Url))
            {
                animal.Preview
            };

            using var semaphore = new SemaphoreSlim(4);

            var imageDownloadTasks = imagesToDownload.Select(async (url) =>
            {
                await semaphore.WaitAsync();

                try
                {
                    var (stream, fileName, contentType) = await _animalsProvider.GetImage(url).ConfigureAwait(false);

                    var id = await _imageService.Create(stream, fileName, contentType).ConfigureAwait(false);

                    stream.Dispose();

                    return id;
                }
                finally
                {
                    semaphore.Release();
                }
            }).ToList();

            await Task.WhenAll(imageDownloadTasks);

            return imageDownloadTasks.Select(t => t.Result);
        }
    }
}
