using System;

namespace AnimalRescue.Infrastructure.Validation
{
    public static partial class Require
    {
        public static class Strings
        {
            #region Not Null Or White Space Region
            public static void NotNullOrWhiteSpace(string value, Func<string> message)
            {
                NotNullOrWhiteSpace<ArgumentNullException>(value, message);
            }

            public static void NotNullOrWhiteSpace(string value, string message)
            {
                NotNullOrWhiteSpace<ArgumentNullException>(value, message);
            }

            public static void NotNullOrWhiteSpace<TE>(string value, Func<string> message)
                where TE : Exception
            {
                InnerCheck<TE, string>(value, string.IsNullOrWhiteSpace, message);
            }

            public static void NotNullOrWhiteSpace<TE>(string value, string message)
                where TE : Exception
            {
                InnerCheck<TE, string>(value, string.IsNullOrWhiteSpace, message);
            }
            #endregion
        }
    }
}