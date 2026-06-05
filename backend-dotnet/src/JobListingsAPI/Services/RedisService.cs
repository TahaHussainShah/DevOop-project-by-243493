using StackExchange.Redis;
using Newtonsoft.Json;

namespace JobListingsAPI.Services;

public interface IRedisService
{
    Task PushApplicationAsync(object application);
    bool IsConnected { get; }
}

public class RedisService : IRedisService
{
    private readonly ILogger<RedisService> _logger;
    private IDatabase? _db;
    private ConnectionMultiplexer? _redis;

    public bool IsConnected => _redis?.IsConnected ?? false;

    public RedisService(IConfiguration config, ILogger<RedisService> logger)
    {
        _logger = logger;
        var conn = config["REDIS_CONNECTION"] ?? "localhost:6379";
        try
        {
            _redis = ConnectionMultiplexer.Connect(conn);
            _db    = _redis.GetDatabase();
            _logger.LogInformation("Redis connected: {Conn}", conn);
        }
        catch (Exception ex)
        {
            _logger.LogWarning("Redis unavailable: {Msg}", ex.Message);
        }
    }

    public async Task PushApplicationAsync(object application)
    {
        if (_db is null) { _logger.LogWarning("Redis not available — skipping push."); return; }
        var json = JsonConvert.SerializeObject(application);
        await _db.ListRightPushAsync("applications_queue", json);
        _logger.LogInformation("Application pushed to Redis queue.");
    }
}
