using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure.Validation;
using AutoMapper;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class SequenceService : ISequenceService
    {
        private readonly ISequenceRepository _sequenceRepository;
        private readonly IMapper _mapper;

        public SequenceService(ISequenceRepository repository, IMapper mapper)
        {
            Require.Objects.NotNull(repository, nameof(repository));
            Require.Objects.NotNull(mapper, nameof(mapper));

            _sequenceRepository = repository;
            _mapper = mapper;
        }

        public async Task<SequenceDto> GetCurrentAsync()
        {
            var sequence = await GetOrCreate();

            var sequenceDto = _mapper.Map<Sequence, SequenceDto>(sequence);
            return sequenceDto;
        }

        public async Task<SequenceDto> GetNextAsync()
        {
            var sequence = await GetOrCreate();
            sequence.Number = sequence.Number + 1;
            await _sequenceRepository.UpdateAsync(sequence);

            var sequenceDto = _mapper.Map<Sequence, SequenceDto>(sequence);
            return sequenceDto;
        }

        private async Task<Sequence> GetOrCreate()
        {
            Sequence sequence = await _sequenceRepository.GetAsync();
            if (sequence == null)
            {
                sequence = new Sequence();
                sequence.Number = 1;
                sequence = await _sequenceRepository.CreateAsync(sequence);
            }
            return sequence;
        }
    }
}
