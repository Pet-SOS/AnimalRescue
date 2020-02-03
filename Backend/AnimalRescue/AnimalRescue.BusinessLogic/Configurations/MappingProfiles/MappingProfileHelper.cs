using AnimalRescue.DataAccess.Mongodb.Exceptions;
using System;
using System.Collections.Generic;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    // TODO this code should be replaced when an ObjectId will be replaced by a Guid type
    public static class MappingProfileHelper
    {
        public static Dictionary<string, Guid> ConvertToDtoDictionary(Dictionary<string, string> dictionary)
        {
            var newDictionary = new Dictionary<string, Guid>();

            foreach (var keyValuePair in dictionary)
            {
                newDictionary.Add(keyValuePair.Key, keyValuePair.Value.AsGuid());
            }

            return newDictionary;
        }

        public static Dictionary<string, string> ConvertToEntityDictionary(Dictionary<string, Guid> dictionary)
        {
            var newDictionary = new Dictionary<string, string>();

            foreach (var keyValuePair in dictionary)
            {
                newDictionary.Add(keyValuePair.Key, keyValuePair.Value.AsObjectIdString());
            }

            return newDictionary;
        }
    }
}
