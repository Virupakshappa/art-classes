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
    public async Task<ActionResult<Registration>> CreateRegistration(Registration registration)
    {
        var course = await _context.Courses.FindAsync(registration.CourseId);

        if (course == null)
        {
            return BadRequest("Course not found");
        }

        if (!course.IsRegistrationOpen)
        {
            return BadRequest("Registration is closed for this course");
        }

        registration.RegistrationDate = DateTime.UtcNow;
        registration.Status = "Pending";

        _context.Registrations.Add(registration);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetRegistration), new { id = registration.Id }, registration);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Registration>> GetRegistration(int id)
    {
        var registration = await _context.Registrations
            .Include(r => r.Course)
            .FirstOrDefaultAsync(r => r.Id == id);

        if (registration == null)
        {
            return NotFound();
        }

        return registration;
    }
}