import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface Props {
  text: string;
  className?: string;
  label?: string;
}

export const CopyButton = ({ text, className = "", label }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`${className} ${copied ? "copied" : ""}`}
      title={copied ? "Copied!" : "Copy"}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {label !== undefined && <span>{copied ? "Copied" : label}</span>}
    </button>
  );
};
