using System;

namespace AnimalRescue.Infrastructure.Validation
{
    public static partial class Require
    {
        public static class Booleans
        {
            private static bool EqualsFalse(bool value) => value == false;
            private static bool EqualsTrue(bool value) => value == true;

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

            #region Is false region
            public static void IsFalse(bool value, Func<string> message)
            {
                IsFalse<ArgumentException>(value, message);
            }

            public static void IsFalse(bool value, string message)
            {
                IsFalse<ArgumentException>(value, message);
            }

            public static void IsFalse<TE>(bool value, Func<string> message)
                where TE : Exception
            {
                InnerCheck<TE, bool>(value, EqualsTrue, message);
            }

            public static void IsFalse<TE>(bool value, string message)
                where TE : Exception
            {
                InnerCheck<TE, bool>(value, EqualsTrue, message);
            }
            #endregion  
        }
    }
}