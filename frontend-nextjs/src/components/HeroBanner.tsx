export default function HeroBanner() {
  return (
    /*
     * DEMO CHANGE TARGET — for the live demo, change "banner-bg" class color in globals.css
     * e.g. change --banner-bg: #22c55e  →  --banner-bg: #3b82f6  (blue)
     * Push → CI runs → Jenkins deploys → live URL changes color automatically
     */
    <div className="banner-bg py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <p style={{ color: "rgba(10,15,13,0.6)", fontSize: "13px", fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>
          DevOop_SP · ADCS-IV Air University
        </p>
        {/* DEMO: change this headline text for the live demo */}
        <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#0a0f0d", lineHeight: 1.1, marginBottom: "16px" }}>
          Find Your Next<br /><span style={{ opacity: 0.6 }}>Opportunity.</span>
        </h1>
        <p style={{ color: "rgba(10,15,13,0.7)", fontSize: "18px", maxWidth: "480px" }}>
          Browse hand-picked roles from the best companies. Apply directly — no recruiters, no noise.
        </p>
      </div>
    </div>
  );
}
