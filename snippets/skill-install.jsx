import React, { useState } from "react";

export const SkillInstall = ({ skill, run }) => {
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedRun, setCopiedRun] = useState(false);

  const installCmd = `npx skills add ${skill}`;

  const handleCopyInstall = () => {
    navigator.clipboard.writeText(installCmd);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const handleCopyRun = () => {
    navigator.clipboard.writeText(run);
    setCopiedRun(true);
    setTimeout(() => setCopiedRun(false), 2000);
  };

  const CopyIcon = ({ copied }) => copied ? (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
  );

  const rowStyle = {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: "8px", padding: "6px 0",
  };

  const labelStyle = {
    fontSize: "12px", fontWeight: 600, color: "var(--text-muted, #6b7280)",
    minWidth: "48px", textTransform: "uppercase",
  };

  const codeStyle = {
    fontSize: "13px", fontFamily: "var(--font-mono, monospace)",
    color: "var(--text-primary, inherit)",
  };

  const btnStyle = (copied) => ({
    display: "flex", alignItems: "center", padding: "4px",
    border: "none", background: "transparent",
    color: copied ? "var(--success-text, #059669)" : "var(--text-muted, #9ca3af)",
    cursor: "pointer", transition: "all 0.15s",
  });

  return (
    <div style={{
      border: "1px solid var(--border-color, #e5e7eb)",
      borderRadius: "12px", padding: "8px 16px",
      marginBottom: "8px",
    }}>
      <div style={rowStyle}>
        <span style={labelStyle}>Install</span>
        <code style={codeStyle}>{installCmd}</code>
        <button onClick={handleCopyInstall} style={btnStyle(copiedInstall)}><CopyIcon copied={copiedInstall} /></button>
      </div>
      <div style={{ borderTop: "1px solid var(--border-color, #e5e7eb)", ...rowStyle }}>
        <span style={labelStyle}>Run</span>
        <span style={{ fontSize: "13px" }}>"{run}"</span>
        <button onClick={handleCopyRun} style={btnStyle(copiedRun)}><CopyIcon copied={copiedRun} /></button>
      </div>
    </div>
  );
};
