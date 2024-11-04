// File: Models/InstructorProfile.cs
using System.Collections.Generic;

namespace backend.Models
{
    public class InstructorProfile
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Bio { get; set; } = string.Empty;
        public string Specialization { get; set; } = string.Empty;
        public string Qualifications { get; set; } = string.Empty;
        public string ProfileImageUrl { get; set; } = string.Empty;

        // Navigation properties
        public virtual User? User { get; set; }
        public virtual ICollection<Course>? Courses { get; set; }
    }
}