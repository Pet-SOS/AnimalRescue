using AnimalRescue.Infrastructure.Validation;

using System;
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;

namespace AnimalRescue.DataAccess.Mongodb.Migrations.Engine
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
    public class MigrationAttribute: Attribute
    {
        readonly Regex _propNameRegex = new Regex("^(\\d{12})_.*", RegexOptions.Compiled);
        readonly Regex _fileNameRegex = new Regex(".*?(\\d{12}_.*?)\\.cs", RegexOptions.Compiled);
        public string Name { get; set; }

        public MigrationAttribute(
            string migrationName,
            [CallerFilePath] string file = "")
        {
            Require.Strings.NotNullOrWhiteSpace(migrationName, "migration name should not be null or white space");
            Require.Booleans.IsTrue(_propNameRegex.IsMatch(migrationName), "migration name should has 12 digests of date time sign '_' and migration name");
            Require.Booleans.IsTrue(_fileNameRegex.IsMatch(file), "file name should has 12 digests of date time sign '_' and migration name");
            var fileName = _fileNameRegex.Match(file).Groups[1].Value;
            Require.Booleans.IsTrue(string.Equals(fileName, migrationName), "file name and attribute migration name should be the same");

            Name = migrationName;
        }
    }
}
