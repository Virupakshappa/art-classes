// File: Models/Registration.cs
using System;

namespace backend.Models
{
    public class Registration
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public string StudentName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public DateTime RegistrationDate { get; set; }
        public string Status { get; set; } = string.Empty;

        public Course? Course { get; set; }
    }
}