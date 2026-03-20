import React, { useState, useEffect } from "react";

const trackEvent = (name, props) => {
  try { window.posthog?.capture(name, props); } catch {}
};

const useIsDark = () => {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const check = () => setDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
};

export const CopyPrompt = ({ title, prompt, boldPrefix }) => {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const dark = useIsDark();

  if (!prompt) {
    return <div style={{ padding: "12px", color: "red" }}>Error: prompt data not loaded</div>;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    trackEvent("docs_copy_prompt", { title: boldPrefix ? `${boldPrefix} ${title}` : title });
    setTimeout(() => setCopied(false), 2000);
  };

  const border = dark
    ? (hovered ? "1px solid #6b7280" : "1px solid #374151")
    : (hovered ? "1px solid #9ca3af" : "1px solid #e5e7eb");

  const hoverText = dark ? "#f9fafb" : "#111827";

  return (
    <div
      style={{
        border,
        borderRadius: "12px",
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        cursor: "pointer",
        transition: "all 0.15s",
        marginBottom: "8px",
        background: !dark && hovered ? "#f9fafb" : "transparent",
      }}
      onClick={handleCopy}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <span style={{
        fontSize: "14px",
        color: hovered ? hoverText : undefined,
        transition: "color 0.15s",
      }}>
        {boldPrefix ? <><strong>{boldPrefix}</strong> {title}</> : title}
      </span>
      <button
        onClick={(e) => { e.stopPropagation(); handleCopy(); }}
        style={{
          display: "flex", alignItems: "center", gap: "6px",
          padding: "6px 12px", borderRadius: "8px",
          border: copied
            ? "1px solid #059669"
            : dark
              ? (hovered ? "1px solid #6b7280" : "1px solid #374151")
              : (hovered ? "1px solid #9ca3af" : "1px solid #e5e7eb"),
          background: copied ? (dark ? "rgba(5, 150, 105, 0.1)" : "#ecfdf5") : "transparent",
          color: copied ? "#059669" : hovered ? hoverText : undefined,
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
