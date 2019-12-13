using System;

namespace AnimalRescue.Infrastructure.Validation
{
    public static partial class Require
    {
        public static class Booleans
        {
            private static bool EqualsFalse(bool value) => value == false;

            #region Is true region
            public static void IsTrue(bool value, Func<string> message)
            {
                IsTrue<ArgumentException>(value, message);
            }

            public static void IsTrue(bool value, string message)
            {
                IsTrue<ArgumentException>(value, message);
            }

            public static void IsTrue<TE>(bool value, Func<string> message)
                where TE : Exception
            {
                InnerCheck<TE, bool>(value, EqualsFalse, message);
            }

            public static void IsTrue<TE>(bool value, string message)
                where TE : Exception
            {
                InnerCheck<TE, bool>(value, EqualsFalse, message);
            }
            #endregion  
        }
    }
}