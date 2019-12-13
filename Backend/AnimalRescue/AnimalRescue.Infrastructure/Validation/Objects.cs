using System;

namespace AnimalRescue.Infrastructure.Validation
{
    public static partial class Require
    {
        public static class Objects
        {
            private static bool EqualsNull(object value) => value == null;
            #region Not Null Region
            public static void NotNull(object value, Func<string> message)
            {
                NotNull<ArgumentNullException>(value, message);
            }

            public static void NotNull(object value, string message)
            {
                NotNull<ArgumentNullException>(value, message);
            }

            public static void NotNull<TE>(object value, Func<string> message)
                where TE : Exception
            {
                InnerCheck<TE, object>(value, EqualsNull, message);
            }

            public static void NotNull<TE>(object value, string message)
                where TE : Exception
            {
                InnerCheck<TE, object>(value, EqualsNull, message);
            }
            #endregion
        }
    }
}