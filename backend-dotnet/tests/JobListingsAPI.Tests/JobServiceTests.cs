using FluentAssertions;
using JobListingsAPI.Models;
using JobListingsAPI.Services;
using Xunit;

namespace JobListingsAPI.Tests;

public class JobServiceTests
{
    private readonly JobService _svc = new();

    [Fact] public void GetAll_ReturnsJobs()                  => _svc.GetAll().Should().NotBeEmpty();
    [Fact] public void GetById_Existing_ReturnsJob()         => _svc.GetById("1").Should().NotBeNull();
    [Fact] public void GetById_NonExisting_ReturnsNull()     => _svc.GetById("999").Should().BeNull();

    [Fact]
    public void Create_AddsJob()
    {
        var req    = new CreateJobRequest { Title="Tester", Company="Co", Location="Remote", Type="Remote", Category="QA", Salary="$70k", Description="Test" };
        var before = _svc.GetAll().Count();
        var job    = _svc.Create(req);
        _svc.GetAll().Count().Should().Be(before + 1);
        job.Title.Should().Be("Tester");
    }

    [Fact]
    public void Delete_Existing_ReturnsTrue()
    {
        var req = new CreateJobRequest { Title="Del", Company="Co", Location="Remote", Type="Remote", Category="X", Salary="$1", Description="D" };
        var job = _svc.Create(req);
        _svc.Delete(job.Id).Should().BeTrue();
        _svc.GetById(job.Id).Should().BeNull();
    }

    [Fact] public void Delete_NonExisting_ReturnsFalse() => _svc.Delete("nope").Should().BeFalse();

    [Fact]
    public void GetAll_OrderedByDate()
    {
        var jobs = _svc.GetAll().ToList();
        for (int i = 1; i < jobs.Count; i++)
            jobs[i - 1].PostedAt.Should().BeOnOrAfter(jobs[i].PostedAt);
    }
}
