using System.ComponentModel.DataAnnotations;

namespace BookApi.Models
{
    public class Book
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Titel är obligatorisk")]
        [MinLength(2, ErrorMessage = "Titel måste vara minst 2 tecken")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Författare är obligatorisk")]
        [MinLength(2, ErrorMessage = "Författare måste vara minst 2 tecken")]
        public string Author { get; set; }

        [Required(ErrorMessage = "Publiceringsdatum är obligatoriskt")]
        [DataType(DataType.Date, ErrorMessage = "Publiceringsdatum måste vara ett giltigt datum")]
        public DateTime PublishedDate { get; set; }
    }
}
