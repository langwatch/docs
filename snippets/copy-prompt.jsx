import React, { useState } from "react";

const trackEvent = (name, props) => {
  try { window.posthog?.capture(name, props); } catch {}
};

export const CopyPrompt = ({ title, prompt, boldPrefix }) => {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  if (!prompt) {
    return <div style={{ padding: "12px", color: "red" }}>Error: prompt data not loaded</div>;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    trackEvent("docs_copy_prompt", { title: boldPrefix ? `${boldPrefix} ${title}` : title });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        border: hovered ? "1px solid #6b7280" : "1px solid #374151",
        borderRadius: "12px",
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        cursor: "pointer",
        transition: "all 0.15s",
        marginBottom: "8px",
      }}
      onClick={handleCopy}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <span style={{
        fontSize: "14px",
        color: hovered ? "#f9fafb" : undefined,
        transition: "color 0.15s",
      }}>
        {boldPrefix ? <><strong>{boldPrefix}</strong> {title}</> : title}
      </span>
      <button
        onClick={(e) => { e.stopPropagation(); handleCopy(); }}
        style={{
          display: "flex", alignItems: "center", gap: "6px",
          padding: "6px 12px", borderRadius: "8px",
          border: copied ? "1px solid #059669" : hovered ? "1px solid #6b7280" : "1px solid #374151",
          background: copied ? "rgba(5, 150, 105, 0.1)" : "transparent",
          color: copied ? "#059669" : hovered ? "#f9fafb" : undefined,
          cursor: "pointer", fontSize: "13px", fontWeight: 500,
          transition: "all 0.15s", whiteSpace: "nowrap",
        }}
      >
        {copied ? (
          <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>Copied!</>
        ) : (
          <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>Copy Full Prompt</>
        )}
      </button>
    </div>
  );
};
