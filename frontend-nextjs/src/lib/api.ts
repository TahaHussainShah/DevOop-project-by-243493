const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface Job {
  id: string; title: string; company: string; location: string;
  type: "Full-time" | "Part-time" | "Remote" | "Contract";
  category: string; salary: string; description: string; postedAt: string;
}

export interface ApiStatus {
  status: string; version: string; timestamp: string; service: string; redis: string;
}

export const MOCK_JOBS: Job[] = [
  { id:"1", title:"Senior Frontend Engineer", company:"Vercel",    location:"Remote",        type:"Remote",    category:"Engineering", salary:"$120k-$160k", description:"Build the future of web infrastructure with Next.js and edge computing.",    postedAt:"2025-05-20T09:00:00Z" },
  { id:"2", title:"Backend Engineer (.NET)",  company:"Microsoft", location:"Islamabad, PK", type:"Full-time", category:"Engineering", salary:"$100k-$140k", description:"Build scalable APIs using ASP.NET Core and Azure distributed systems.",       postedAt:"2025-05-18T10:00:00Z" },
  { id:"3", title:"DevOps Engineer",          company:"HashiCorp", location:"Hybrid",        type:"Full-time", category:"DevOps",      salary:"$115k-$150k", description:"Work with Terraform, Vault, and Nomad for infrastructure automation.",        postedAt:"2025-05-17T08:00:00Z" },
  { id:"4", title:"Python Data Engineer",     company:"Stripe",    location:"Remote",        type:"Remote",    category:"Data",        salary:"$130k-$170k", description:"Design and build data pipelines powering Stripe's financial platform.",       postedAt:"2025-05-15T14:00:00Z" },
  { id:"5", title:"Product Designer",         company:"Figma",     location:"San Francisco", type:"Full-time", category:"Design",      salary:"$110k-$145k", description:"Shape design tools used by millions of designers worldwide.",                 postedAt:"2025-05-14T11:00:00Z" },
  { id:"6", title:"Cloud Architect",          company:"AWS",       location:"Remote",        type:"Contract",  category:"DevOps",      salary:"$150k-$200k", description:"Design multi-region fault-tolerant architectures for enterprise customers.", postedAt:"2025-05-13T09:00:00Z" },
];

export async function getJobs(): Promise<Job[]> {
  try {
    const res = await fetch(`${API_URL}/api/jobs`, { next: { revalidate: 30 } });
    if (!res.ok) throw new Error("failed");
    return res.json();
  } catch { return MOCK_JOBS; }
}

export async function getJob(id: string): Promise<Job | null> {
  try {
    const res = await fetch(`${API_URL}/api/jobs/${id}`, { next: { revalidate: 30 } });
    if (!res.ok) return null;
    return res.json();
  } catch { return MOCK_JOBS.find(j => j.id === id) ?? null; }
}

export async function getStatus(): Promise<ApiStatus | null> {
  try {
    const res = await fetch(`${API_URL}/api/status`, { next: { revalidate: 10 } });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

export async function submitApplication(data: { jobId: string; name: string; email: string; message: string }) {
  try {
    const res = await fetch(`${API_URL}/api/tasks`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("failed");
    return { success: true, message: "Application submitted successfully!" };
  } catch { return { success: false, message: "Could not submit. Please try again." }; }
}
