"use client";

import { useState } from "react";
import { submitApplication } from "@/lib/api";

export default function ApplyForm({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg]       = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const result = await submitApplication({ jobId, ...form });
    setStatus(result.success ? "success" : "error");
    setMsg(result.message);
    if (result.success) setForm({ name: "", email: "", message: "" });
  };

  const inputStyle = {
    width: "100%", background: "#0a0f0d", border: "0.5px solid rgba(255,255,255,0.1)",
    borderRadius: "10px", padding: "12px 14px", color: "#fff", fontSize: "14px",
    outline: "none", fontFamily: "DM Sans, sans-serif",
  };

  const labelStyle = {
    display: "block", fontSize: "11px", fontFamily: "JetBrains Mono, monospace",
    color: "rgba(255,255,255,0.4)", textTransform: "uppercase" as const,
    letterSpacing: "0.05em", marginBottom: "6px",
  };

  return (
    <div style={{ background: "#111812", border: "0.5px solid rgba(255,255,255,0.05)", borderRadius: "16px", padding: "24px", position: "sticky", top: "80px" }}>
      <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, color: "#fff", marginBottom: "4px" }}>Apply Now</h2>
      <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "rgba(255,255,255,0.3)", marginBottom: "20px" }}>{jobTitle}</p>

      {status === "success" ? (
        <div style={{ textAlign: "center", padding: "32px 0" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>✅</div>
          <p style={{ color: "#4ade80", fontWeight: 500, fontSize: "14px" }}>{msg}</p>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", marginTop: "8px" }}>The worker service will process your application shortly.</p>
          <button onClick={() => setStatus("idle")} style={{ marginTop: "16px", fontSize: "12px", color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
            Apply for another role
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Full Name</label>
            <input type="text" required placeholder="Ali Hassan" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input type="email" required placeholder="ali@example.com" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Cover Note</label>
            <textarea rows={4} placeholder="Tell us why you're a great fit..."
              value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
              style={{ ...inputStyle, resize: "none" }} />
          </div>
          {status === "error" && (
            <p style={{ color: "#f87171", fontSize: "12px", fontFamily: "JetBrains Mono, monospace" }}>{msg}</p>
          )}
          <button type="submit" disabled={status === "loading"}
            className="banner-bg"
            style={{ width: "100%", padding: "12px", fontWeight: 600, fontSize: "14px", borderRadius: "10px", border: "none", cursor: status === "loading" ? "not-allowed" : "pointer", opacity: status === "loading" ? 0.6 : 1, color: "#0a0f0d", fontFamily: "DM Sans, sans-serif" }}>
            {status === "loading" ? "Submitting..." : "Submit Application →"}
          </button>
        </form>
      )}
    </div>
  );
}
