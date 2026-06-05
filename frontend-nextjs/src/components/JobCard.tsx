import { Job } from "@/lib/api";

const typeColor: Record<string, string> = {
  "Remote":    "#4ade80",
  "Full-time": "#60a5fa",
  "Part-time": "#facc15",
  "Contract":  "#c084fc",
};

const categoryIcon: Record<string, string> = {
  "Engineering": "⚙️",
  "DevOps":      "☁️",
  "Data":        "📊",
  "Design":      "🎨",
};

export default function JobCard({ job, index }: { job: Job; index: number }) {
  return (
    <a
      href={`/jobs/${job.id}`}
      className="block rounded-[16px] border-[0.5px] border-white/5 bg-[#111812] p-5 no-underline transition-colors hover:border-[rgba(74,222,128,0.3)] hover:bg-[#1a2419]"
      style={{
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#1a2419", border: "0.5px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
          {categoryIcon[job.category] ?? "💼"}
        </div>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: typeColor[job.type] ?? "#60a5fa", background: "rgba(255,255,255,0.05)", border: `0.5px solid ${typeColor[job.type] ?? "#60a5fa"}30`, borderRadius: "20px", padding: "3px 10px" }}>
          {job.type}
        </span>
      </div>

      {/* Title & company */}
      <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: "15px", fontWeight: 600, color: "#ffffff", marginBottom: "4px" }}>{job.title}</h3>
      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "12px" }}>{job.company}</p>
      <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: "1.6", marginBottom: "16px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {job.description}
      </p>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "14px", borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>
        <span style={{ fontSize: "11px", fontFamily: "JetBrains Mono, monospace", color: "rgba(255,255,255,0.3)" }}>📍 {job.location}</span>
        <span style={{ fontSize: "11px", fontFamily: "JetBrains Mono, monospace", color: "#4ade80", fontWeight: 500 }}>{job.salary}</span>
      </div>
    </a>
  );
}
