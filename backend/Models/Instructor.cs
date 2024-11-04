using System.Collections.Generic;

namespace backend.Models
{
    public class Instructor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Bio { get; set; }
        public string ImageUrl { get; set; }
        public string Specialization { get; set; }

        public virtual ICollection<Course> Courses { get; set; }
    }
}