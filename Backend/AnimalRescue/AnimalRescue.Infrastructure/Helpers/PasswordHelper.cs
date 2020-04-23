using System;

namespace AnimalRescue.Infrastructure.Helpers
{
    public static class PasswordHelper
    {
        public static string GeneratePassword(int len)
        {
            var capchars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var smachars = "abcdefghijklmnopqrstuvwxyz";
            var numbers = "0123456789";
            var spechars = "!@#$%^&*()+=-";
            if (len < 8)
            {
                len = 8;
            }
            var stringChars = new char[len];
            var random = new Random();

            for (int i = 0; i < 2; i++)
            {
                stringChars[i] = capchars[random.Next(capchars.Length)];
            }
            for (int i = 2; i < 4; i++)
            {
                stringChars[i] = numbers[random.Next(numbers.Length)];
            }
            for (int i = 4; i < 6; i++)
            {
                stringChars[i] = spechars[random.Next(spechars.Length)];
            }
            for (int i = 6; i < len; i++)
            {
                stringChars[i] = smachars[random.Next(smachars.Length)];
            }

            var finalString = new string(stringChars);
            return finalString;
        }
    }
}
