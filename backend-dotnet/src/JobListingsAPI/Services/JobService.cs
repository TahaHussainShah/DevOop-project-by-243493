using JobListingsAPI.Models;

namespace JobListingsAPI.Services;

public interface IJobService
{
    IEnumerable<Job> GetAll();
    Job? GetById(string id);
    Job Create(CreateJobRequest request);
    bool Delete(string id);
}

public class JobService : IJobService
{
    private readonly List<Job> _jobs = new()
    {
        new Job { Id="1", Title="Senior Frontend Engineer", Company="Vercel",     Location="Remote",          Type="Remote",    Category="Engineering", Salary="$120k-$160k", Description="Build the future of web infrastructure with Next.js and edge computing.", PostedAt=DateTime.UtcNow.AddDays(-7) },
        new Job { Id="2", Title="Backend Engineer (.NET)",  Company="Microsoft",  Location="Islamabad, PK",   Type="Full-time", Category="Engineering", Salary="$100k-$140k", Description="Build scalable APIs and cloud services using ASP.NET Core and Azure.",    PostedAt=DateTime.UtcNow.AddDays(-9) },
        new Job { Id="3", Title="DevOps Engineer",          Company="HashiCorp",  Location="Hybrid",          Type="Full-time", Category="DevOps",      Salary="$115k-$150k", Description="Work with Terraform, Vault, and Nomad for infrastructure automation.",    PostedAt=DateTime.UtcNow.AddDays(-10) },
        new Job { Id="4", Title="Python Data Engineer",     Company="Stripe",     Location="Remote",          Type="Remote",    Category="Data",        Salary="$130k-$170k", Description="Design and build data pipelines that power Stripe's financial platform.", PostedAt=DateTime.UtcNow.AddDays(-12) },
        new Job { Id="5", Title="Product Designer",         Company="Figma",      Location="San Francisco",   Type="Full-time", Category="Design",      Salary="$110k-$145k", Description="Shape design tools used by designers worldwide.",                        PostedAt=DateTime.UtcNow.AddDays(-13) },
        new Job { Id="6", Title="Cloud Architect",          Company="AWS",        Location="Remote",          Type="Contract",  Category="DevOps",      Salary="$150k-$200k", Description="Design multi-region fault-tolerant architectures for enterprise clients.", PostedAt=DateTime.UtcNow.AddDays(-14) },
    };

    public IEnumerable<Job> GetAll() => _jobs.OrderByDescending(j => j.PostedAt);
    public Job? GetById(string id)   => _jobs.FirstOrDefault(j => j.Id == id);

    public Job Create(CreateJobRequest r)
    {
        var job = new Job { Title=r.Title, Company=r.Company, Location=r.Location, Type=r.Type, Category=r.Category, Salary=r.Salary, Description=r.Description };
        _jobs.Add(job);
        return job;
    }

    public bool Delete(string id)
    {
        var job = GetById(id);
        if (job is null) return false;
        _jobs.Remove(job);
        return true;
    }
}
