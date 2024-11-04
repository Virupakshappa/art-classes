// File: Data/ApplicationDbContext.cs
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Define all DbSet properties
        public DbSet<User> Users => Set<User>();
        public DbSet<Course> Courses => Set<Course>();
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<CourseModule> CourseModules => Set<CourseModule>();
        public DbSet<Assignment> Assignments => Set<Assignment>();
        public DbSet<AssignmentSubmission> AssignmentSubmissions => Set<AssignmentSubmission>();
        public DbSet<Enrollment> Enrollments => Set<Enrollment>();
        public DbSet<StudentProfile> StudentProfiles => Set<StudentProfile>();
        public DbSet<InstructorProfile> InstructorProfiles => Set<InstructorProfile>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Course configurations
            modelBuilder.Entity<Course>()
                .HasOne(c => c.Instructor)
                .WithMany(i => i.Courses)
                .HasForeignKey(c => c.InstructorId);

            modelBuilder.Entity<Course>()
                .HasOne(c => c.Category)
                .WithMany(cat => cat.Courses)
                .HasForeignKey(c => c.CategoryId);

            // User profile configurations
            modelBuilder.Entity<User>()
                .HasOne(u => u.StudentProfile)
                .WithOne(sp => sp.User)
                .HasForeignKey<StudentProfile>(sp => sp.UserId);

            modelBuilder.Entity<User>()
                .HasOne(u => u.InstructorProfile)
                .WithOne(ip => ip.User)
                .HasForeignKey<InstructorProfile>(ip => ip.UserId);

            // Enrollment configurations
            modelBuilder.Entity<Enrollment>()
                .HasOne(e => e.Course)
                .WithMany(c => c.Enrollments)
                .HasForeignKey(e => e.CourseId);

            modelBuilder.Entity<Enrollment>()
                .HasOne(e => e.Student)
                .WithMany(s => s.Enrollments)
                .HasForeignKey(e => e.StudentId);

            // CourseModule configurations
            modelBuilder.Entity<CourseModule>()
                .HasOne(m => m.Course)
                .WithMany(c => c.Modules)
                .HasForeignKey(m => m.CourseId);

            // Assignment configurations
            modelBuilder.Entity<Assignment>()
                .HasOne(a => a.Module)
                .WithMany(m => m.Assignments)
                .HasForeignKey(a => a.ModuleId);

            // AssignmentSubmission configurations
            modelBuilder.Entity<AssignmentSubmission>()
                .HasOne(s => s.Assignment)
                .WithMany(a => a.Submissions)
                .HasForeignKey(s => s.AssignmentId);

            modelBuilder.Entity<AssignmentSubmission>()
                .HasOne(s => s.Student)
                .WithMany()
                .HasForeignKey(s => s.StudentId);
        }
    }
}