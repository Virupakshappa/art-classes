using System;
using System.Collections.Generic;

namespace backend.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal Price { get; set; }
        public int Capacity { get; set; }
        public string ImageUrl { get; set; }
        public string Level { get; set; }
        public bool IsRegistrationOpen { get; set; }
        public int CategoryId { get; set; }
        public int InstructorId { get; set; }

        public virtual Category Category { get; set; }
        public virtual Instructor Instructor { get; set; }
        public virtual ICollection<Registration> Registrations { get; set; }
    }
}