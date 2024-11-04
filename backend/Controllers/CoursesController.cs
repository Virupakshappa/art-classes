using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Cors;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowReactApp")]
    public class CoursesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CoursesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
        {
            try
            {
                var courses = await _context.Courses
                    .Include(c => c.Instructor)
                    .Select(c => new
                    {
                        c.Id,
                        c.Title,
                        c.Description,
                        c.Level,
                        c.Price,
                        c.StartDate,
                        c.EndDate,
                        c.MaxStudents,
                        c.IsRegistrationOpen,
                        Instructor = c.Instructor != null ? new
                        {
                            Name = c.Instructor.User.FirstName + " " + c.Instructor.User.LastName,
                            c.Instructor.Specialization
                        } : null,
                        Duration = c.EndDate.Subtract(c.StartDate).Days / 7 + " weeks",
                        EnrollmentCount = c.Enrollments.Count,
                        Category = c.Category.Name
                    })
                    .ToListAsync();

                return Ok(courses);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, new { message = "An error occurred while fetching courses." });
            }
        }
    }
}