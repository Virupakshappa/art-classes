using System.Collections.Generic;

namespace backend.Models
{
    public class StudentProfile
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Bio { get; set; } = string.Empty;
        public string ArtInterests { get; set; } = string.Empty;
        public string SkillLevel { get; set; } = string.Empty;

        // Navigation properties
        public virtual User? User { get; set; }
        public virtual ICollection<Enrollment>? Enrollments { get; set; }
    }
}