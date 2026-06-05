import { MOCK_JOBS } from "@/lib/api";

describe("MOCK_JOBS", () => {
  it("has jobs",              () => expect(MOCK_JOBS.length).toBeGreaterThan(0));
  it("all have required fields", () => {
    MOCK_JOBS.forEach(job => {
      expect(job.id).toBeDefined();
      expect(job.title).toBeDefined();
      expect(job.company).toBeDefined();
      expect(job.salary).toBeDefined();
    });
  });
  it("types are valid", () => {
    const valid = ["Full-time", "Part-time", "Remote", "Contract"];
    MOCK_JOBS.forEach(job => expect(valid).toContain(job.type));
  });
});
