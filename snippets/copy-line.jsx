const { useState } = React;

const trackEvent = (name, props) => {
  try { window.posthog?.capture(name, props); } catch {}
};

export const CopyLine = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    trackEvent("docs_copy_line", { text });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="lw-copy-prompt"
      data-track="docs_copy_line"
      data-track-text={text}
      onClick={handleCopy}
    >
      <span style={{ fontSize: "14px" }}>"{text}"</span>
      <button
        onClick={(e) => { e.stopPropagation(); handleCopy(); }}
        style={{
          display: "flex", alignItems: "center", padding: "4px",
          border: "none", background: "transparent",
          color: copied ? "#059669" : "#9ca3af",
          cursor: "pointer",
        }}
      >
        {copied ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
        )}
      </button>
    </div>
  );
};
