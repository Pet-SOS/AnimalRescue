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
            public const string PersonState = "personState";
        }

        public static class Animal
        {
            public const string Number = "number";
            public const string KindOfAnimal = "kindOfAnimal";
            public const string Gender = "gender";
            public const string DateOfFound = "dateOfFound";
            public const string DateOfAdopted = "dateOfAdopted";
            public const string CoverImage = "coverImage";
            public const string Birthday = "birthday";
            public const string Character = "character";
            public const string Status = "status";
            public const string LocationTypeId = "locationTypeId";
            public const string LocationName = "locationName";
            public const string IsDonationActive = "isDonationActive";
            public const string BannerText = "bannerText";
            public const string AnimalState = "animalState";
        }

        public static class Common
        {
            public const string Number = "number";
            public const string Title = "title";
            public const string TitleId = "titleId";
            public const string Lang = "lang";
            public const string Language = "language";
            public const string Languages = "languages";
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
            public const string Case = "case";
            public const string CaseDescription = "caseDescription";
            public const string UserRole = "userRole";
            public const string Action = "action";
            public const string TagId = "tag";
            public const string IsMessageSent = "isMessageSent";
            public const string ChatName = "chatName";
            public const string Paragraphs = "paragraphs";
            public const string Text = "text";
            public const string TextId = "textId";
        }

        public static class BaseItem
        {
            public const string Id = "id";
            public const string CreatedAt = "createdAt";
            public const string ModifiedAt = "modifiedAt";
            public const string CreatedBy = "createdBy";
            public const string ModifiedBy = "modifiedBy";
            public const string IsDeleted = "isDeleted";
            public const string IsDeletable = "isDeletable";
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

        public static class Migration
        {
            public const string MigrationId = "MigrationId";
        }

        public static class History
        {
            public const string EntityName = "entityName";
            public const string EntityId = "entityId";
            public const string IsEntityDeleted = "isEntityDeleted";
            public const string Differences = "differences";
            public const string PropertyName = "propertyName";
            public const string LastValue = "lastValue";
            public const string NewValue = "newValue";
        }

        public static class RequestAdoptAnimal
        {
            public const string AnimalId = "animalId";
            public const string AnimalName = "animalName";
            public const string AdoptiveName = "adoptiveName";
        }

        public static class FinancialReportYearInfo
        {
            public const string Year = "year";
        }
    }
}
