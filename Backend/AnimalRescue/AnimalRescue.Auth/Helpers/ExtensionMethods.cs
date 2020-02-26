using AnimalRescue.Auth.Entities;

namespace AnimalRescue.Auth.Helpers
{
    public static class ExtensionMethods
    {
        public static User WithoutPassword(this User user)
        {
            user.Password = null;
            return user;
        }
    }
}