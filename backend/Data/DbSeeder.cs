// File: Data/DbSeeder.cs
using backend.Models;
using BCrypt.Net;

namespace backend.Data
{
    public class DbSeeder
    {
        private readonly ApplicationDbContext _context;

        public DbSeeder(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SeedData()
        {
            // Add Categories
            var categories = new List<Category>
            {
                new Category { Name = "Painting", Description = "Oil, Acrylic, and Watercolor painting courses" },
                new Category { Name = "Drawing", Description = "Pencil, Charcoal, and Digital drawing courses" },
                new Category { Name = "Sculpture", Description = "Clay, Metal, and Wood sculpting courses" }
            };

            await _context.Categories.AddRangeAsync(categories);
            await _context.SaveChangesAsync();

            // Add Users with corrected BCrypt usage
            var users = new List<User>
            {
                new User
                {
                    FirstName = "John",
                    LastName = "Student",
                    Email = "student@test.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("student123", BCrypt.Net.BCrypt.GenerateSalt()),
                    Role = "Student",
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true
                },
                new User
                {
                    FirstName = "Sarah",
                    LastName = "Instructor",
                    Email = "instructor@test.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("instructor123", BCrypt.Net.BCrypt.GenerateSalt()),
                    Role = "Instructor",
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true
                }
            };

            await _context.Users.AddRangeAsync(users);
            await _context.SaveChangesAsync();

            // Add Profiles
            var studentProfile = new StudentProfile
            {
                UserId = users[0].Id,
                Bio = "Aspiring artist with a passion for painting",
                ArtInterests = "Oil painting, Watercolor",
                SkillLevel = "Beginner"
            };

            var instructorProfile = new InstructorProfile
            {
                UserId = users[1].Id,
                Bio = "Professional artist with 10 years of teaching experience",
                Specialization = "Oil Painting, Portrait Art",
                Qualifications = "MFA in Fine Arts"
            };

            await _context.StudentProfiles.AddAsync(studentProfile);
            await _context.InstructorProfiles.AddAsync(instructorProfile);
            await _context.SaveChangesAsync();

            // Add Courses
            var courses = new List<Course>
            {
                new Course
                {
                    Title = "Introduction to Oil Painting",
                    Description = "Learn the basics of oil painting",
                    CategoryId = categories[0].Id,
                    InstructorId = instructorProfile.Id,
                    Level = "Beginner",
                    Price = 299.99M,
                    MaxStudents = 15,
                    StartDate = DateTime.UtcNow.AddDays(30),
                    EndDate = DateTime.UtcNow.AddDays(90),
                    IsRegistrationOpen = true
                },
                new Course
                {
                    Title = "Advanced Portrait Drawing",
                    Description = "Master the art of portrait drawing",
                    CategoryId = categories[1].Id,
                    InstructorId = instructorProfile.Id,
                    Level = "Advanced",
                    Price = 399.99M,
                    MaxStudents = 10,
                    StartDate = DateTime.UtcNow.AddDays(45),
                    EndDate = DateTime.UtcNow.AddDays(105),
                    IsRegistrationOpen = true
                }
            };

            await _context.Courses.AddRangeAsync(courses);
            await _context.SaveChangesAsync();
        }
    }
}