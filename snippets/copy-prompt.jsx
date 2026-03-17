import React, { useState } from "react";

export const CopyPrompt = ({ title, prompt, boldPrefix }) => {
  const [copied, setCopied] = useState(false);

  if (!prompt) {
    return <div style={{ padding: "12px", color: "red" }}>Error: prompt data not loaded</div>;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        border: "1px solid var(--border-color, #e5e7eb)",
        borderRadius: "12px",
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        cursor: "pointer",
        transition: "background 0.15s",
        marginBottom: "8px",
      }}
      onClick={handleCopy}
      onMouseOver={(e) => { e.currentTarget.style.background = "var(--bg-hover, #f9fafb)"; }}
      onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; }}
    >
      <span style={{ fontSize: "14px" }}>
        {boldPrefix ? <><strong>{boldPrefix}</strong> {title}</> : title}
      </span>
      <button
        onClick={(e) => { e.stopPropagation(); handleCopy(); }}
        style={{
          display: "flex", alignItems: "center", gap: "6px",
          padding: "6px 12px", borderRadius: "8px",
          border: "1px solid var(--border-color, #e5e7eb)",
          background: copied ? "var(--success-bg, #ecfdf5)" : "transparent",
          color: copied ? "var(--success-text, #059669)" : "inherit",
          cursor: "pointer", fontSize: "13px", fontWeight: 500,
          transition: "all 0.15s", whiteSpace: "nowrap",
        }}
      >
        {copied ? (
          <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>Copied!</>
        ) : (
          <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>Copy Prompt</>
        )}
      </button>
    </div>
  );
};
