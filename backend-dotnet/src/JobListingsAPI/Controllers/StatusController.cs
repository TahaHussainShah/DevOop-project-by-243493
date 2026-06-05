using Microsoft.AspNetCore.Mvc;
using JobListingsAPI.Services;

namespace JobListingsAPI.Controllers;

[ApiController]
[Route("api/status")]
public class StatusController : ControllerBase
{
    private readonly IRedisService _redis;
    public StatusController(IRedisService redis) { _redis = redis; }

    [HttpGet]
    public IActionResult Get() => Ok(new
    {
        status    = "ok",
        service   = "JobListingsAPI",
        version   = "1.0.0",
        timestamp = DateTime.UtcNow,
        redis     = _redis.IsConnected ? "connected" : "unavailable",
    });
}
