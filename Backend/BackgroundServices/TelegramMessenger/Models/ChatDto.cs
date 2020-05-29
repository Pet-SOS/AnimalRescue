using System.ComponentModel.DataAnnotations;

namespace TelegramMessenger.Models
{
    public class ChatDto
    {
        [Required]
        public long Id { get; set; }

        public string Name { get; set; }
    }
}
