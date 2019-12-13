using System;
using System.Collections;
using System.Collections.Generic;

namespace AnimalRescue.Infrastructure.Validation
{
    public static partial class Require
    {
        public static class Collections
        {
            private static bool EqualsNullOrEmpty(ICollection collection) => collection == null || collection?.Count == 0;
            private static bool NotEqualsNullOrEmpty(ICollection collection) => !EqualsNullOrEmpty(collection);
            private static bool EqualsNullOrEmpty<TItem>(ICollection<TItem> collection) => collection == null || collection?.Count == 0;
            private static bool NotEqualsNullOrEmpty<TItem>(ICollection<TItem> collection) => !EqualsNullOrEmpty(collection);

            #region Should Be Empty Region
            public static void ShouldBeEmpty<TItem>(ICollection<TItem> collection, Func<string> message)
            {
                ShouldBeEmpty<ArgumentNullException, TItem>(collection, message);
            }

            public static void ShouldBeEmpty<TItem>(ICollection<TItem> collection, string message)
            {
                ShouldBeEmpty<ArgumentNullException, TItem>(collection, message);
            }

            public static void ShouldBeEmpty<TE>(ICollection collection, Func<string> message)
                where TE : Exception
            {
                InnerCheck<TE, ICollection>(collection, NotEqualsNullOrEmpty, message);
            }

            public static void ShouldBeEmpty<TE>(ICollection collection, string message)
                where TE : Exception
            {
                InnerCheck<TE, ICollection>(collection, NotEqualsNullOrEmpty, message);
            }
            public static void ShouldBeEmpty<TE, TItem>(ICollection<TItem> collection, Func<string> message)
                where TE : Exception
            {
                InnerCheck<TE, ICollection<TItem>>(collection, NotEqualsNullOrEmpty, message);
            }

            public static void ShouldBeEmpty<TE, TItem>(ICollection<TItem> collection, string message)
                where TE : Exception
            {
                InnerCheck<TE, ICollection<TItem>>(collection, NotEqualsNullOrEmpty, message);
            } 
            #endregion

            #region Not Empty Region

            public static void NotEmpty<TItem>(ICollection<TItem> collection, Func<string> message)
            {
                NotEmpty<ArgumentNullException, TItem>(collection, message);
            }

            public static void NotEmpty<TItem>(ICollection<TItem> collection, string message)
            {
                NotEmpty<ArgumentNullException, TItem>(collection, message);
            }

            public static void NotEmpty<TE, TItem>(ICollection<TItem> collection, Func<string> message)
                where TE : Exception
            {
                InnerCheck<TE, ICollection<TItem>>(collection, EqualsNullOrEmpty, message);
            }

            public static void NotEmpty<TE, TItem>(ICollection<TItem> collection, string message)
                where TE : Exception
            {
                InnerCheck<TE, ICollection<TItem>>(collection, EqualsNullOrEmpty, message);
            } 
            #endregion
        }
    }
}