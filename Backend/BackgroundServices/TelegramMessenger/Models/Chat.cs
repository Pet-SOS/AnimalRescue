using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using System.ComponentModel.DataAnnotations;

namespace TelegramMessenger.Models
{
    public class Chat : BaseAndTimeItem
    {
        [Required]
        public long ChatId { get; set; }
    }
}
