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

export const SkillInstall = ({ title, skill, slashCommand, highlighted }) => {
  const [copied, setCopied] = useState(false);
  const dark = useIsDark();

  const installCmd = `npx skills add ${skill}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    trackEvent("docs_copy_skill_install", { title, skill });
    setTimeout(() => setCopied(false), 2000);
  };

  const CopyIcon = ({ copied }) => copied ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
  );

  const borderColor = highlighted
    ? "rgba(225, 113, 0, 0.4)"
    : dark ? "#374151" : "#e5e7eb";

  return (
    <div style={{
      border: `1px solid ${borderColor}`,
      borderRadius: "12px",
      padding: "20px 24px",
      marginBottom: "16px",
      background: highlighted ? "rgba(225, 113, 0, 0.06)" : "transparent",
    }}>
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: "12px",
      }}>
        <span style={{
          fontSize: "16px",
          fontWeight: 700,
        }}>{title}</span>
        <button
          onClick={handleCopy}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "4px",
            border: "none",
            background: "transparent",
            color: copied ? "#059669" : "#9ca3af",
            cursor: "pointer",
            transition: "all 0.15s",
            flexShrink: 0,
          }}
          title="Copy install command"
        >
          <CopyIcon copied={copied} />
        </button>
      </div>

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "12px",
      }}>
        <span style={{
          fontSize: "13px",
          color: "#6b7280",
          fontFamily: "var(--font-mono, monospace)",
        }}>&gt;_</span>
        <code style={{
          fontSize: "13px",
          fontFamily: "var(--font-mono, monospace)",
        }}>{installCmd}</code>
      </div>

      <div style={{
        background: highlighted
          ? "rgba(225, 113, 0, 0.08)"
          : dark ? "rgba(55, 65, 81, 0.3)" : "rgba(0, 0, 0, 0.03)",
        borderRadius: "8px",
        padding: "10px 14px",
        fontSize: "13px",
        color: "#6b7280",
      }}>
        Then use <span style={{
          color: "#fe9a00",
          fontWeight: 600,
        }}>{slashCommand}</span> in your coding agent
      </div>
    </div>
  );
};
