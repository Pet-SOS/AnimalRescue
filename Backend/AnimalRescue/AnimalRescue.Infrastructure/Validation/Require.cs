using System;

namespace AnimalRescue.Infrastructure.Validation
{
    public static partial class Require
    {
        private static void InnerCheck<TE, TIn>(TIn data, Func<TIn, bool> operation, Func<string> message) 
            where TE : Exception
        {
            if (operation(data))
            {
                CreateInstanceException<TE>(message());
            }
        }

        private static void InnerCheck<TE, TIn>(TIn data, Func<TIn, bool> operation, string message)
            where TE : Exception
        {
            if (operation(data))
            {
                CreateInstanceException<TE>(message);
            }
        }

        private static void CreateInstanceException<TE>(string message) where TE : Exception
        {
            throw (TE)Activator.CreateInstance(typeof(TE), message);
        }
    }
}
