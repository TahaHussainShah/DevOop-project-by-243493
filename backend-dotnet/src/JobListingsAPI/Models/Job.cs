namespace JobListingsAPI.Models;

public class Job
{
    public string   Id          { get; set; } = Guid.NewGuid().ToString();
    public string   Title       { get; set; } = string.Empty;
    public string   Company     { get; set; } = string.Empty;
    public string   Location    { get; set; } = string.Empty;
    public string   Type        { get; set; } = "Full-time";
    public string   Category    { get; set; } = string.Empty;
    public string   Salary      { get; set; } = string.Empty;
    public string   Description { get; set; } = string.Empty;
    public DateTime PostedAt    { get; set; } = DateTime.UtcNow;
}

public class CreateJobRequest
{
    public string Title       { get; set; } = string.Empty;
    public string Company     { get; set; } = string.Empty;
    public string Location    { get; set; } = string.Empty;
    public string Type        { get; set; } = "Full-time";
    public string Category    { get; set; } = string.Empty;
    public string Salary      { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}

public class ApplicationRequest
{
    public string JobId   { get; set; } = string.Empty;
    public string Name    { get; set; } = string.Empty;
    public string Email   { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}
