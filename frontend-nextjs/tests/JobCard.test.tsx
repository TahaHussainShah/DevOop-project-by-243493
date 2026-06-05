import { render, screen } from "@testing-library/react";
import JobCard from "@/components/JobCard";
import { Job } from "@/lib/api";

const mockJob: Job = {
  id: "1", title: "Senior Frontend Engineer", company: "Vercel",
  location: "Remote", type: "Remote", category: "Engineering",
  salary: "$120k-$160k", description: "Build the future of web.", postedAt: "2025-05-20T09:00:00Z",
};

describe("JobCard", () => {
  it("renders job title",    () => { render(<JobCard job={mockJob} index={0} />); expect(screen.getByText("Senior Frontend Engineer")).toBeInTheDocument(); });
  it("renders company",      () => { render(<JobCard job={mockJob} index={0} />); expect(screen.getByText("Vercel")).toBeInTheDocument(); });
  it("renders salary",       () => { render(<JobCard job={mockJob} index={0} />); expect(screen.getByText("$120k-$160k")).toBeInTheDocument(); });
  it("renders type badge",   () => { render(<JobCard job={mockJob} index={0} />); expect(screen.getByText("Remote")).toBeInTheDocument(); });
  it("links to detail page", () => { render(<JobCard job={mockJob} index={0} />); expect(screen.getByRole("link")).toHaveAttribute("href", "/jobs/1"); });
});
