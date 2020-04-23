using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;
using AnimalRescue.Infrastructure.Validation;

using System.Linq;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class SequenceRepository : 
        ISequenceRepository
    {
        private readonly IBaseCollection<Sequence> _baseCollection;

        public SequenceRepository(IBaseCollection<Sequence> baseCollection)
        {
            Require.Objects.NotNull(baseCollection, nameof(baseCollection));

            _baseCollection = baseCollection;
        }

        public async Task<Sequence> GetAsync()
        {
            DbQuery dbQuery = new DbQuery();
            var all = await _baseCollection.GetAsync(dbQuery);
            return all.FirstOrDefault();
        }

        public async Task<Sequence> CreateAsync(Sequence sequence)
        {
            Require.Objects.NotNull(sequence, nameof(sequence));
            return await _baseCollection.CreateAsync(sequence);
        }

        public async Task UpdateAsync(Sequence sequence)
        {
            Require.Objects.NotNull(sequence, nameof(sequence));

            var oldSequence = await _baseCollection.GetAsync(sequence.Id);
            if (oldSequence != null)
            {
                oldSequence.Number = sequence.Number;
                await _baseCollection.UpdateAsync(oldSequence);
            }
        }
    }
}
