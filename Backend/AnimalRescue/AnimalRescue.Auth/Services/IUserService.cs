using System.Collections.Generic;
using AnimalRescue.Auth.Entities;

namespace AnimalRescue.Auth.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
    }
}
