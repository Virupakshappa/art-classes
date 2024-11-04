using System;

namespace backend.Models
{
    public class AssignmentSubmission
    {
        public int Id { get; set; }
        public int AssignmentId { get; set; }
        public int StudentId { get; set; }
        public string SubmissionUrl { get; set; } = string.Empty;
        public string Comments { get; set; } = string.Empty;
        public int? Score { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime SubmittedAt { get; set; }

        // Navigation properties
        public virtual Assignment? Assignment { get; set; }
        public virtual StudentProfile? Student { get; set; }
    }
}