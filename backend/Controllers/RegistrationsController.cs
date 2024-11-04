// File: Controllers/RegistrationsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using System;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegistrationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RegistrationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Enrollment>> CreateRegistration(Enrollment enrollment)
        {
            var course = await _context.Courses.FindAsync(enrollment.CourseId);

            if (course == null)
            {
                return BadRequest("Course not found");
            }

            if (!course.IsRegistrationOpen)
            {
                return BadRequest("Registration is closed for this course");
            }

            enrollment.EnrolledAt = DateTime.UtcNow;
            enrollment.Status = "Pending";

            _context.Enrollments.Add(enrollment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRegistration), new { id = enrollment.Id }, enrollment);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Enrollment>> GetRegistration(int id)
        {
            var enrollment = await _context.Enrollments
                .Include(r => r.Course)
                .Include(r => r.Student)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (enrollment == null)
            {
                return NotFound();
            }

            return enrollment;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Enrollment>>> GetAllRegistrations()
        {
            return await _context.Enrollments
                .Include(r => r.Course)
                .Include(r => r.Student)
                .ToListAsync();
        }
    }
}