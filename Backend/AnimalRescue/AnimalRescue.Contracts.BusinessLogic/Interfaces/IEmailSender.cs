using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.BusinessLogic.Services
{
    public interface IEmailSender
    {
        bool SendMail(string email, string subject, string message);
    }
}
