import React, { useState } from "react";
import { X, Copy, Check, Printer, FileText, Code } from "lucide-react";

export default function ExportModal({ todos, onClose }) {
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState("markdown");

  const generateMarkdown = () => {
    let md = `# AuraTask Daily Rhythm Checklist\nGenerated: ${new Date().toLocaleDateString()}\n\n`;
    todos.forEach((t, i) => {
      const mark = t.completed ? "x" : " ";
      md += `- [${mark}] ${i + 1}) **${t.title}** [${t.category} | ${t.priority.toUpperCase()}] ${t.dueTime ? `(${t.dueTime})` : ""}\n`;
      if (t.description) {
        md += `  > ${t.description}\n`;
      }
    });
    return md;
  };

  const generateJSON = () => {
    return JSON.stringify(todos, null, 2);
  };

  const textToCopy = tab === "markdown" ? generateMarkdown() : generateJSON();

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="export-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Export">
          <X size={18} />
        </button>

        <div className="modal-header">
          <h3 className="modal-title">Export & Printable Checklist</h3>
          <p className="modal-sub">
            Export your daily checklist to Markdown, JSON, or generate a formatted PDF printout.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="export-tabs-row">
          <button
            className={`export-tab-btn ${tab === "markdown" ? "active" : ""}`}
            onClick={() => setTab("markdown")}
          >
            <FileText size={15} />
            <span>Markdown Checklist</span>
          </button>

          <button
            className={`export-tab-btn ${tab === "json" ? "active" : ""}`}
            onClick={() => setTab("json")}
          >
            <Code size={15} />
            <span>JSON Object</span>
          </button>
        </div>

        <div className="export-preview-box">
          <pre className="export-pre">{textToCopy}</pre>
        </div>

        <div className="export-actions-row">
          <button className="btn-action-outline" onClick={handleCopy}>
            {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            <span>{copied ? "Copied to Clipboard!" : "Copy to Clipboard"}</span>
          </button>

          <button className="btn-action-primary" onClick={handlePrint}>
            <Printer size={16} />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
