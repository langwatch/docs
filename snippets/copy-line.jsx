const { useState } = React;

const trackEvent = (name, props) => {
  try { window.posthog?.capture(name, props); } catch {}
};

const isDark = () => {
  try { return document.documentElement.classList.contains("dark"); } catch { return false; }
};

export const CopyLine = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const dark = isDark();

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    trackEvent("docs_copy_line", { text });
    setTimeout(() => setCopied(false), 2000);
  };

  const border = dark
    ? (hovered ? "1px solid #6b7280" : "1px solid #374151")
    : (hovered ? "1px solid #9ca3af" : "1px solid #e5e7eb");

  return (
    <div
      style={{
        border,
        borderRadius: "12px",
        padding: "10px 16px",
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
      <span style={{ fontSize: "14px" }}>"{text}"</span>
      <button
        onClick={(e) => { e.stopPropagation(); handleCopy(); }}
        style={{
          display: "flex", alignItems: "center", padding: "4px",
          border: "none", background: "transparent",
          color: copied ? "#059669" : "#9ca3af",
          cursor: "pointer", transition: "all 0.15s",
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
