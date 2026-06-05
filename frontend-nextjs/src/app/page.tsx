import { getJobs, getStatus } from "@/lib/api";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import JobCard from "@/components/JobCard";
import StatusBar from "@/components/StatusBar";

export default async function Home() {
  const [jobs, status] = await Promise.all([getJobs(), getStatus()]);
  return (
    <div className="min-h-screen" style={{ background: "#0a0f0d" }}>
      <Navbar />
      <HeroBanner />
      <div className="max-w-6xl mx-auto px-6 mt-6">
        <StatusBar status={status} />
      </div>
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "Syne, sans-serif" }}>Open Positions</h2>
          <p className="text-green-400/60 text-sm mt-1" style={{ fontFamily: "JetBrains Mono, monospace" }}>{jobs.length} roles available</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobs.map((job, i) => <JobCard key={job.id} job={job} index={i} />)}
        </div>
      </main>
      <footer className="border-t mt-16 py-8 text-center text-sm" style={{ borderColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.2)", fontFamily: "JetBrains Mono, monospace" }}>
        HireFlow · DevOop_SP · ADCS-IV Air University
      </footer>
    </div>
  );
}
