using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure.Utilities;

using AutoMapper;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class SequenceService : ISequenceService
    {
        private readonly ISequenceRepository _sequenceRepository;
        private readonly IMapper _mapper;

        public SequenceService(ISequenceRepository repository, IMapper mapper)
        {
            _sequenceRepository = repository;
            _mapper = mapper;
        }


        public async Task<SequenceDto> GetCurrentSequenceAsync()
        {
            Sequence x = await _sequenceRepository.GetCurrentSequenceAsync();
            var sequence = _mapper.Map<Sequence, SequenceDto>(x);
            return sequence;
        }

        public async Task UpdateSequenceAsync(SequenceDto sequenceDto)
        {
            sequenceDto.Number = sequenceDto.Number + 1;
            var sequence = _mapper.Map<SequenceDto, Sequence>(sequenceDto);
            await _sequenceRepository.UpdateSequenceAsync(sequence);
        }
    }
}
