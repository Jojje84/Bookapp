/*
 * Bookapp - Book Management System Backend
 * Copyright (c) 2025 Jorge Avila
 * Author: Jorge Avila (jorgeavilas@icloud.com)
 * Repository: https://github.com/Jojje84/Bookapp
 * License: MIT License - see LICENSE file for details
 * 
 * This file contains the Book model with validation attributes.
 * Original work by Jorge Avila - please maintain attribution.
 */

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
