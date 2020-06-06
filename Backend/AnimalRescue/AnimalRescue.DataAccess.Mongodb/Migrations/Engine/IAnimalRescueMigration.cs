using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Migrations.Engine
{
    internal interface IAnimalRescueMigration
    {
        Task Execute();
    }
}
