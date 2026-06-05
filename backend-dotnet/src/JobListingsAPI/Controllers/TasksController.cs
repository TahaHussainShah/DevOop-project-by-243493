using Microsoft.AspNetCore.Mvc;
using JobListingsAPI.Models;
using JobListingsAPI.Services;

namespace JobListingsAPI.Controllers;

[ApiController]
[Route("api/tasks")]
public class TasksController : ControllerBase
{
    private readonly IRedisService _redis;
    private readonly ILogger<TasksController> _logger;

    public TasksController(IRedisService redis, ILogger<TasksController> logger)
    { _redis = redis; _logger = logger; }

    [HttpPost]
    public async Task<IActionResult> Submit([FromBody] ApplicationRequest r)
    {
        if (string.IsNullOrWhiteSpace(r.Email))  return BadRequest(new { message = "Email is required." });
        if (string.IsNullOrWhiteSpace(r.JobId))  return BadRequest(new { message = "JobId is required." });

        var payload = new { r.JobId, r.Name, r.Email, r.Message, SubmittedAt = DateTime.UtcNow };
        await _redis.PushApplicationAsync(payload);
        _logger.LogInformation("Application from {Email} for job {JobId}", r.Email, r.JobId);
        return Ok(new { message = "Application submitted successfully!", queued = true });
    }
}
