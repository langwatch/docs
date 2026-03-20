const { useState } = React;

const trackEvent = (name, props) => {
  try { window.posthog?.capture(name, props); } catch {}
};

export const CopyPrompt = ({ title, prompt, boldPrefix, skill }) => {
  const [copied, setCopied] = useState(false);

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
      className="lw-copy-prompt"
      data-track="docs_copy_prompt"
      data-track-skill={skill}
      data-track-title={boldPrefix ? `${boldPrefix} ${title}` : title}
      onClick={handleCopy}
    >
      <span style={{ fontSize: "14px" }}>
        {boldPrefix ? <><strong>{boldPrefix}</strong> {title}</> : title}
      </span>
      <button
        className={copied ? "lw-copy-btn lw-copy-btn-copied" : "lw-copy-btn"}
        onClick={(e) => { e.stopPropagation(); handleCopy(); }}
        style={{
          display: "flex", alignItems: "center", gap: "6px",
          padding: "6px 12px", borderRadius: "8px",
          background: copied ? "#ecfdf5" : "transparent",
          color: copied ? "#059669" : undefined,
          cursor: "pointer", fontSize: "13px", fontWeight: 500,
          whiteSpace: "nowrap",
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
