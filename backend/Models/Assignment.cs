using System;
using System.Collections.Generic;

namespace backend.Models
{
    public class Assignment
    {
        public int Id { get; set; }
        public int ModuleId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime DueDate { get; set; }
        public int MaxPoints { get; set; }

        // Navigation properties
        public virtual CourseModule? Module { get; set; }
        public virtual ICollection<AssignmentSubmission>? Submissions { get; set; }
    }
}