import React, { useState } from "react";

export const SkillInstall = ({ title, skill, slashCommand, highlighted }) => {
  const [copied, setCopied] = useState(false);

  const installCmd = `npx skills add ${skill}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const CopyIcon = ({ copied }) => copied ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
  );

  return (
    <div style={{
      border: highlighted ? "1px solid rgba(225, 113, 0, 0.4)" : "1px solid var(--border-color, #e5e7eb)",
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
            color: copied ? "var(--success-text, #059669)" : "var(--text-muted, #9ca3af)",
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
          color: "var(--text-muted, #6b7280)",
          fontFamily: "var(--font-mono, monospace)",
        }}>&gt;_</span>
        <code style={{
          fontSize: "13px",
          fontFamily: "var(--font-mono, monospace)",
        }}>{installCmd}</code>
      </div>

      <div style={{
        background: highlighted ? "rgba(225, 113, 0, 0.08)" : "var(--border-color, rgba(0, 0, 0, 0.05))",
        borderRadius: "8px",
        padding: "10px 14px",
        fontSize: "13px",
        color: "var(--text-muted, #6b7280)",
      }}>
        Then use <span style={{
          color: "var(--colors-light, #fe9a00)",
          fontWeight: 600,
        }}>{slashCommand}</span> in your coding agent
      </div>
    </div>
  );
};
