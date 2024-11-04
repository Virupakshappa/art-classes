using System.Collections.Generic;

namespace backend.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        // Navigation property
        public virtual ICollection<Course>? Courses { get; set; }
    }
}