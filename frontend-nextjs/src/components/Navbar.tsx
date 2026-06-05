export default function Navbar() {
  return (
    <nav style={{ borderBottom: "0.5px solid rgba(255,255,255,0.05)", background: "rgba(10,15,13,0.8)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50 }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg banner-bg flex items-center justify-center">
            <span style={{ color: "#0a0f0d", fontWeight: 700, fontSize: "12px" }}>H</span>
          </div>
          <span className="text-white font-bold text-lg" style={{ fontFamily: "Syne, sans-serif" }}>HireFlow</span>
        </a>
        <div className="flex items-center gap-4">
          <a href="/" style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", textDecoration: "none" }}>Jobs</a>
          {/* DEMO: change the version below during the live demo */}
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "#4ade80", background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.1)", padding: "4px 10px", borderRadius: "6px" }}>
            v1.0.0
          </span>
        </div>
      </div>
    </nav>
  );
}
