// File: Models/CourseModule.cs
using System.Collections.Generic;

namespace backend.Models
{
    public class CourseModule
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Order { get; set; }
        public string Content { get; set; } = string.Empty;
        public string ResourcesUrl { get; set; } = string.Empty;

        // Navigation properties
        public virtual Course? Course { get; set; }
        public virtual ICollection<Assignment>? Assignments { get; set; }
    }
}