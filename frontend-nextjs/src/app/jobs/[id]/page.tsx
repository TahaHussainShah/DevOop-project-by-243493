import { getJob } from "@/lib/api";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import ApplyForm from "@/components/ApplyForm";

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const job = await getJob(params.id);
  if (!job) notFound();

  const typeColor: Record<string, string> = {
    "Remote":    "#4ade80",
    "Full-time": "#60a5fa",
    "Part-time": "#facc15",
    "Contract":  "#c084fc",
  };

  return (
    <div className="min-h-screen" style={{ background: "#0a0f0d" }}>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <a href="/" className="inline-block mb-6 text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "JetBrains Mono, monospace" }}>← Back to listings</a>
        <div className="flex items-start justify-between gap-4 flex-wrap mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "Syne, sans-serif" }}>{job.title}</h1>
            <p style={{ color: "#4ade80", fontSize: "18px", fontWeight: 500 }}>{job.company}</p>
          </div>
          <span className="px-4 py-1 rounded-full text-sm" style={{ fontFamily: "JetBrains Mono, monospace", background: "rgba(255,255,255,0.05)", color: typeColor[job.type] ?? "#60a5fa" }}>
            {job.type}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl p-6" style={{ background: "#1a2419", border: "0.5px solid rgba(255,255,255,0.05)" }}>
              <h2 className="font-semibold text-white mb-3" style={{ fontFamily: "Syne, sans-serif" }}>About this role</h2>
              <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.7" }}>{job.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[["Location", job.location], ["Category", job.category], ["Salary", job.salary], ["Posted", new Date(job.postedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })]].map(([label, value]) => (
                <div key={label} className="rounded-xl p-4" style={{ background: "#1a2419", border: "0.5px solid rgba(255,255,255,0.05)" }}>
                  <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</p>
                  <p className="text-sm font-medium text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div><ApplyForm jobId={job.id} jobTitle={job.title} /></div>
        </div>
      </main>
    </div>
  );
}
