using System.Collections.Generic;

namespace AnimalRescue.Contracts.Common.Constants
{
    public static class PropertyConstants
    {
        public static IEnumerable<string> ArticleTypes()
        {
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
            public const string Donation = "donation";
            public const string Contacts = "contacts";
            public const string Phones = "phones";
            public const string SocialLinks = "socialLinks";
            public const string CardNumber = "cardNumber";
            public const string BankCard = "bankCard";
            public const string EDRPOU = "edrpou";
            public const string BankName = "bankName";
        }
        public static class Person
        {
            public const string FirstName = "firstName";
            public const string LastName = "lastName";
            public const string Phone = "phoneNumber";
            public const string Email = "email";
            public const string Emails = "emails";
            public const string Address = "address";
            public const string Addresses = "addresses";
            public const string Birthday = "birthday";
            public const string ProfilePhoto = "profilePhoto";
            public const string LastPasswordChange = "lastPasswordChange";
        }

        public static class Animal
        {
            public const string Number = "number";
            public const string KindOfAnimal = "kindOfAnimal";
            public const string Gender = "gender";
            public const string Age = "age";
            public const string DateOfFound = "dateOfFound";
            public const string DateOfAdopted = "dateOfAdopted";
            public const string CoverImage = "coverImage";
            public const string Birthday = "birthday";
            public const string Character = "character";
            public const string Status = "status";
            public const string LocationType = "locationType";
            public const string LocationName = "locationName";
            public const string IsDonationActive = "isDonationActive";
            public const string BannerText = "bannerText";
        }

        public static class Common
        {
            public const string Title = "title";
            public const string Lang = "lang";
            public const string Language = "language";
            public const string Category = "category";
            public const string Code = "code";
            public const string Values = "values";
            public const string Value = "value";
            public const string Body = "body";
            public const string Name = "name";
            public const string Data = "data";
            public const string Description = "description";
            public const string ImageIds = "imageIds";
            public const string Tags = "tags";
            public const string NewTags = "newTags";
            public const string CommonTag = "commonTag";
            public const string Images = "images";
            public const string IsRescued = "isRescued";
            public const string Type = "type";
            public const string BlogType = "blogType";
            public const string ContentType = "contentType";
            public const string Price = "price";
        }

        public static class BaseItem
        {
            public const string Id = "id";
            public const string CreatedAt = "createdAt";
            public const string ModifiedAt = "modifiedAt";
            public const string CreatedBy = "createdBy";
            public const string ModifiedBy = "modifiedBy";
            public const string IsDeleted = "isDeleted";
        }

        public static class FinancialReport
        {
            public const string File = "file";
            public const string FileId = "fileId";
            public const string Date = "date";
        }

        public static class UserRole
        {
            public const string Admin = "Admin";
            public const string Operator = "Operator";
            public const string Rescuer = "Rescuer";
            public const string Media = "Media";
        }
    }
}
