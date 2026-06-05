import { ApiStatus } from "@/lib/api";

export default function StatusBar({ status }: { status: ApiStatus | null }) {
  const online = !!status;
  return (
    <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: "#111812", border: "0.5px solid rgba(255,255,255,0.05)" }}>
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75`} style={{ background: online ? "#4ade80" : "#f87171" }} />
        <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: online ? "#22c55e" : "#ef4444" }} />
      </span>
      <span style={{ fontSize: "12px", fontFamily: "JetBrains Mono, monospace", color: "rgba(255,255,255,0.4)" }}>
        Backend API: <span style={{ color: online ? "#4ade80" : "#f87171" }}>{online ? "online" : "offline"}</span>
      </span>
      {status && (
        <>
          <span style={{ color: "rgba(255,255,255,0.1)" }}>·</span>
          <span style={{ fontSize: "12px", fontFamily: "JetBrains Mono, monospace", color: "rgba(255,255,255,0.3)" }}>
            {status.service} {status.version}
          </span>
          <span style={{ color: "rgba(255,255,255,0.1)" }}>·</span>
          <span style={{ fontSize: "12px", fontFamily: "JetBrains Mono, monospace", color: "rgba(255,255,255,0.2)" }}>
            Redis: {status.redis}
          </span>
        </>
      )}
    </div>
  );
}
