import React, { useState, useEffect } from "react";
import axios from "axios";
import debounce from "lodash/debounce";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { EditorView } from "@codemirror/view";
import {
  FileText,
  Copy,
  Download,
  Type,
  Eye,
  Moon,
  Sun,
  MessageSquare,
  LucideIcon,
  Sparkles,
  Coffee,
  Heart,
  PenTool,
  Save,
} from "lucide-react";

const API_URL = "http://localhost:3001";

const INITIAL_MARKDOWN = `
# ✨ Welcome to Markdown Magic!  

## 🌟 Features You'll Love  

- **Bold**, *Italic*, and ***Combined*** styles  
- Stylish blockquotes:  
  > "Creativity knows no bounds."  

- Effortless code snippets:  

  const magic = () => "✨ It works like magic!";
`;

interface EditorButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  primary?: boolean;
  className?: string;
}

const EditorButton = ({
  icon: Icon,
  label,
  onClick,
  primary = false,
  className = "",
}: EditorButtonProps): JSX.Element => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300
      ${
        primary
          ? "bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white hover:shadow-xl hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 hover:scale-105"
          : "bg-white/90 hover:bg-white text-gray-700 border border-gray-200/50 backdrop-blur-sm hover:shadow-lg hover:scale-105"
      }
      shadow-sm transform active:scale-95
      focus:outline-none focus:ring-2 focus:ring-blue-500/20
      ${className}
    `}
  >
    <Icon size={20} className={primary ? "animate-pulse" : ""} />
    <span className="text-sm font-semibold">{label}</span>
  </button>
);

const FloatingBubble = ({ children, className = "" }: any) => (
  <div className={`absolute ${className} animate-pulse opacity-70`}>
    <div className="bg-blue-500/10 backdrop-blur-lg rounded-full p-4">
      {children}
    </div>
  </div>
);

const MarkdownEditor = () => {
  const [markdownContent, setMarkdownContent] = useState(INITIAL_MARKDOWN);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [viewMode, setViewMode] = useState("split");
  const [isSaved, setIsSaved] = useState(false);

  const debouncedConvert = debounce(async (text) => {
    if (!text.trim()) {
      setPreview("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await axios.post(`${API_URL}/api/convert`, {
        markdown: text,
      });
      setPreview(response.data.html);
    } catch (err) {
      setError("Failed to convert markdown. Please try again.");
      console.error("Conversion error:", err);
    } finally {
      setLoading(false);
    }
  }, 300);

  useEffect(() => {
    debouncedConvert(markdownContent);
    return () => debouncedConvert.cancel();
  }, [markdownContent]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdownContent);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const editorTheme = EditorView.theme({
    "&": {
      height: "100%",
      fontSize: "16px",
    },
    ".cm-content": {
      fontFamily: "ui-monospace, monospace",
      padding: "2.5rem",
    },
    ".cm-line": {
      padding: "0 4px",
      lineHeight: "1.9",
    },
    "&.cm-focused": {
      outline: "none",
    },
    ".cm-header": {
      color: "#2563eb",
      fontWeight: "bold",
    },
    ".cm-link": {
      color: "#2563eb",
      textDecoration: "underline",
    },
    ".cm-strong": {
      color: "#1e40af",
      fontWeight: "bold",
    },
    ".cm-em": {
      color: "#4f46e5",
      fontStyle: "italic",
    },
  });

  return (
    <div
      className={`min-h-screen w-full transition-all duration-500 relative
      ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900"
          : "bg-gradient-to-br from-blue-50 via-white to-indigo-100"
      }`}
    >
      {/* Main Container */}
      <div className="max-w-[2000px] mx-auto p-1 sm:p-4 md:p-6 lg:p-8">
        <div
          className={`rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl 
          shadow-lg sm:shadow-xl md:shadow-2xl overflow-hidden transition-all duration-300
          ${
            isDarkMode
              ? "bg-gray-800/90 border border-gray-700/50"
              : "bg-white/90 border border-gray-200/50"
          }`}
        >
          {/* Header Section - Reduced padding on mobile */}
          <header
            className={`p-2 sm:p-4 md:p-6 lg:p-8 border-b
            ${
              isDarkMode
                ? "border-gray-700/50 bg-gray-800/50"
                : "border-gray-200/50 bg-white/50"
            }`}
          >
            <div className="flex flex-col gap-2 md:gap-6">
              {/* Title and Action Buttons - Optimized for mobile */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="relative group">
                    <FileText className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 text-blue-500 transform group-hover:scale-110 transition-transform" />
                  </div>
                  <h1
                    className={`text-lg sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r
                    ${
                      isDarkMode
                        ? "from-white via-blue-200 to-blue-400"
                        : "from-blue-600 via-blue-800 to-indigo-800"
                    }`}
                  >
                    Markdown Editor
                  </h1>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto justify-end mt-2 sm:mt-0">
                  <EditorButton
                    icon={Save}
                    label={isSaved ? "Copied!" : "Copy"}
                    onClick={handleCopy}
                    className={`text-xs sm:text-sm ${
                      isSaved ? "bg-green-500 text-white" : ""
                    }`}
                  />
                  <EditorButton
                    icon={Download}
                    label="Export"
                    onClick={handleDownload}
                    primary
                    className="text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Mode Selection and Theme Toggle - Improved mobile layout */}
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                <div className="flex-grow bg-gray-100/80 p-1 sm:p-2 rounded-lg sm:rounded-xl">
                  <div className="grid grid-cols-3 gap-1 sm:gap-2">
                    {[
                      { icon: Type, label: "Edit", mode: "edit" },
                      { icon: MessageSquare, label: "Split", mode: "split" },
                      { icon: Eye, label: "Preview", mode: "preview" },
                    ].map(({ icon: Icon, label, mode }) => (
                      <button
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        className={`
                        flex items-center justify-center gap-1 sm:gap-2 
                        px-1 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 
                        rounded-lg sm:rounded-xl transition-all duration-300
                        ${
                          viewMode === mode
                            ? "bg-white shadow-md text-blue-600 scale-[1.02]"
                            : "text-gray-600 hover:bg-white/50"
                        }
                      `}
                      >
                        <Icon size={14} className="shrink-0" />
                        <span className="text-xs sm:text-sm font-medium">
                          {label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-1.5 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 mt-1 sm:mt-0
                  ${
                    isDarkMode
                      ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700/50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-100/50"
                  }`}
                >
                  {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
            </div>
          </header>

          {/* Editor Body - Adjusted height calculation for mobile */}
          <div className="h-[calc(100vh-11rem)] sm:h-[calc(100vh-14rem)] md:h-[calc(100vh-16rem)]">
            <div
              className={`grid h-full
              ${
                viewMode === "split"
                  ? "grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x"
                  : "grid-cols-1"
              }
              ${isDarkMode ? "divide-gray-700/50" : "divide-gray-200/50"}
            `}
            >
              {/* Editor Pane - Optimized padding for mobile */}
              {(viewMode === "edit" || viewMode === "split") && (
                <div className="h-full overflow-auto">
                  <div className="h-full p-1 sm:p-4 md:p-6">
                    <div
                      className={`h-full rounded-lg sm:rounded-xl border transition-all duration-300
                    ${isDarkMode ? "border-gray-700/50" : "border-gray-200/50"}
                    focus-within:ring-2 focus-within:ring-blue-500/20
                  `}
                    >
                      <CodeMirror
                        value={markdownContent}
                        onChange={setMarkdownContent}
                        extensions={[markdown()]}
                        theme={isDarkMode ? "dark" : "light"}
                        basicSetup={{
                          lineNumbers: false,
                          foldGutter: false,
                          dropCursor: false,
                          allowMultipleSelections: false,
                          indentOnInput: true,
                        }}
                        className="h-full text-base sm:text-lg"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Preview Pane - Adjusted padding for mobile */}
              {(viewMode === "preview" || viewMode === "split") && (
                <div className="h-full overflow-auto">
                  <div className="h-full p-1 sm:p-4 md:p-6">
                    {loading && (
                      <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-3 border-blue-500 border-t-transparent" />
                      </div>
                    )}

                    {error && (
                      <div className="text-red-500 p-2 sm:p-4 border border-red-200 rounded-lg bg-red-50/80 text-sm sm:text-base">
                        {error}
                      </div>
                    )}

                    {!loading && !error && (
                      <div
                        className={`h-full rounded-lg sm:rounded-xl border p-2 sm:p-6 md:p-8
                        prose max-w-none
                        ${
                          isDarkMode
                            ? "bg-gray-800/50 text-white border-gray-700/50 prose-invert"
                            : "bg-white/50 text-gray-800 border-gray-200/50"
                        }
                        prose-headings:font-bold
                        prose-h1:text-xl sm:prose-h1:text-3xl md:prose-h1:text-4xl
                        prose-h2:text-lg sm:prose-h2:text-2xl md:prose-h2:text-3xl
                        prose-h3:text-base sm:prose-h3:text-xl md:prose-h3:text-2xl
                        prose-p:text-sm sm:prose-p:text-lg prose-p:leading-relaxed
                        prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-blue-600 prose-em:text-indigo-500
                        prose-code:text-pink-500
                      `}
                        dangerouslySetInnerHTML={{ __html: preview }}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer - Adjusted for mobile */}
        <footer
          className={`mt-1 sm:mt-4 md:mt-6 px-1 sm:px-4
          ${isDarkMode ? "text-gray-400" : "text-gray-500"}
        `}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base">
              <span>{markdownContent.length.toLocaleString()} characters</span>
              <span>•</span>
              <span>
                {markdownContent.split(/\s+/).length.toLocaleString()} words
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-pink-500" />
              <span>Made for creative writers</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MarkdownEditor;
