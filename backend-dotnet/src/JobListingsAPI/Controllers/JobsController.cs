using Microsoft.AspNetCore.Mvc;
using JobListingsAPI.Models;
using JobListingsAPI.Services;

namespace JobListingsAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class JobsController : ControllerBase
{
    private readonly IJobService _jobs;
    private readonly ILogger<JobsController> _logger;

    public JobsController(IJobService jobs, ILogger<JobsController> logger)
    { _jobs = jobs; _logger = logger; }

    [HttpGet]
    public IActionResult GetAll() => Ok(_jobs.GetAll());

    [HttpGet("{id}")]
    public IActionResult GetById(string id)
    {
        var job = _jobs.GetById(id);
        return job is null ? NotFound(new { message = $"Job {id} not found." }) : Ok(job);
    }

    [HttpPost]
    public IActionResult Create([FromBody] CreateJobRequest r)
    {
        if (string.IsNullOrWhiteSpace(r.Title)) return BadRequest(new { message = "Title is required." });
        var job = _jobs.Create(r);
        _logger.LogInformation("Job created: {Title}", job.Title);
        return CreatedAtAction(nameof(GetById), new { id = job.Id }, job);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
        => _jobs.Delete(id) ? NoContent() : NotFound(new { message = $"Job {id} not found." });
}
