import React from "react";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) return null;

  // Split content by newlines to handle block-level elements
  const lines = content.split("\n");

  return (
    <div className="space-y-2 text-slate-700 leading-relaxed text-sm md:text-base">
      {lines.map((line, index) => {
        const key = index;
        const trimmedLine = line.trim();

        if (!trimmedLine) {
          return <div key={key} className="h-2" />;
        }

        // Headings
        if (line.startsWith("### ")) {
          return (
            <h3
              key={key}
              className="text-lg font-bold text-slate-800 mt-4 mb-2"
            >
              {parseInline(line.substring(4))}
            </h3>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h2
              key={key}
              className="text-xl font-bold text-slate-900 mt-6 mb-3"
            >
              {parseInline(line.substring(3))}
            </h2>
          );
        }
        if (line.startsWith("# ")) {
          return (
            <h1
              key={key}
              className="text-2xl font-bold text-slate-900 mt-6 mb-4"
            >
              {parseInline(line.substring(2))}
            </h1>
          );
        }

        // Bullet points (* or -)
        if (trimmedLine.startsWith("* ") || trimmedLine.startsWith("- ")) {
          // Simple indentation check
          const isIndented = line.startsWith("  ") || line.startsWith("\t");
          const marginClass = isIndented ? "ml-8" : "ml-4";

          return (
            <div key={key} className={`flex items-start ${marginClass} mb-1`}>
              <span className="mr-2 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500 opacity-80"></span>
              <span className="flex-1">
                {parseInline(trimmedLine.substring(2))}
              </span>
            </div>
          );
        }

        // Numbered lists (1. or 1))
        const numberedListMatch = trimmedLine.match(/^(\d+[\.)])\s+(.*)/);
        if (numberedListMatch) {
          const isIndented = line.startsWith("  ") || line.startsWith("\t");
          const marginClass = isIndented ? "ml-8" : "ml-4";
          return (
            <div key={key} className={`flex items-start ${marginClass} mb-1`}>
              <span className="mr-2 font-semibold text-slate-900 min-w-[1.5rem]">
                {numberedListMatch[1]}
              </span>
              <span className="flex-1">
                {parseInline(numberedListMatch[2])}
              </span>
            </div>
          );
        }

        // Regular paragraph text
        return (
          <div key={key} className="mb-1">
            {parseInline(line)}
          </div>
        );
      })}
    </div>
  );
};

const parseInline = (text: string): React.ReactNode[] => {
  // Split by bold syntax **text**
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

export default MarkdownRenderer;
