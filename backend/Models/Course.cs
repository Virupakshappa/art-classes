// File: Models/Course.cs
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
    public string Level { get; set; }  // Beginner, Intermediate, Advanced
    public bool IsRegistrationOpen { get; set; }
}