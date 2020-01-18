using System.Collections.Generic;

namespace AnimalRescue.Contracts.Common.Constants
{
    public static class PropertyConstants
    {
        public static IEnumerable<string> ArticleTypes(){
            yield return EntityType.Article;
            yield return EntityType.Blog;
            yield return EntityType.Story;
        }

        public static class EntityType
        {
            public const string Cms = "cms";
            public const string Animal = "animal";
            public const string Article = "article";
            public const string Blog = "blog";
            public const string Story = "story";
        }

        public static class Cms
        {
            public const string Phones = "phones";
            public const string SocialLinks = "socialLinks";
        }

        public static class Animal
        {
            public const string Number = "number";
            public const string KindOfAnimal = "kindOfAnimal";
            public const string Gender = "gender";
            public const string Age = "age";
            public const string DateOfFound = "dateOfFound";
            public const string DateOfAdopted = "dateOfAdopted";
        }

        public static class Common
        {
            public const string Title = "title";
            public const string Body = "body";
            public const string Name = "name";
            public const string Data = "data";
            public const string Description = "description";
            public const string ImageIds = "imageIds";
            public const string Tags = "tags";
            public const string Images = "images";
            public const string IsRescued = "isRescued";
            public const string Type = "type";
        }

        public static class BaseItem
        {
            public const string Id = "id";
            public const string CreatedAt = "createdAt";
            public const string ModifiedAt = "modifiedAt";
            public const string CreatedBy = "createdBy";
            public const string ModifiedBy = "modifiedBy";
        }
    }
}
