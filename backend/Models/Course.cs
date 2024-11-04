// File: Models/Course.cs
using System;
using System.Collections.Generic;

namespace backend.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string DetailedDescription { get; set; } = string.Empty;
        public int InstructorId { get; set; }
        public int CategoryId { get; set; }
        public string Level { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int MaxStudents { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Schedule { get; set; } = string.Empty;
        public bool IsRegistrationOpen { get; set; }

        // Navigation properties
        public virtual Category? Category { get; set; }
        public virtual InstructorProfile? Instructor { get; set; }
        public virtual ICollection<Enrollment>? Enrollments { get; set; }
        public virtual ICollection<CourseModule>? Modules { get; set; }
    }
}