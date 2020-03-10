using System;
using System.Collections.Generic;
using System.Text;

namespace AnimalRescue.Infrastructure.Helpers
{
    public class DateHelper
    {
        public static DateTime GetUtc()
        {
            var now = DateTime.UtcNow;
            return new DateTime(now.Ticks / 100000 * 100000, now.Kind);
        }
    }
}
