using System;

namespace backend.Models
{
    public class Enrollment
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public int StudentId { get; set; }
        public DateTime EnrolledAt { get; set; }
        public string Status { get; set; } = string.Empty;
        public decimal PaymentAmount { get; set; }
        public string PaymentStatus { get; set; } = string.Empty;

        // Navigation properties
        public virtual Course? Course { get; set; }
        public virtual StudentProfile? Student { get; set; }
    }
}