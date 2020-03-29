using System;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    public class Alias
    {
        public string PropertyName { get; set; }
        public string DataBasePropertyName { get; set; }
        public string AliasePropertyName { get; set; }
        public Type PropertyType { get; set; }         
    }
}
