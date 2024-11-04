using System;

namespace backend.Models
{
    public class Registration
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public string StudentName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime RegistrationDate { get; set; }
        public string Status { get; set; }

        public virtual Course Course { get; set; }
    }
}