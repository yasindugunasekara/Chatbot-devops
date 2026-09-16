"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { 
  Paperclip, 
  Globe, 
  Terminal, 
  ArrowUp,
  Command,
  Loader2,
  Sun,
  Moon,
  Copy,
  Check
} from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function CopyButton({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-2 py-1 mt-2 text-[10px] text-gray-500 hover:text-foreground hover:bg-accent rounded transition-colors self-start border border-transparent hover:border-border"
      title="Copy response"
    >
      {isCopied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
      <span>{isCopied ? "Copied!" : "Copy"}</span>
    </button>
  );
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async () => {
    if (!prompt.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: prompt };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setPrompt("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      
      if (response.ok && data.message) {
        setMessages((prev) => [...prev, data.message]);
      } else {
        console.error("API Error:", data.error);
        setMessages((prev) => [
          ...prev, 
          { role: "assistant", content: `Error: ${data.error || "Failed to fetch response."}` }
        ]);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setMessages((prev) => [
        ...prev, 
        { role: "assistant", content: "Network error occurred." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-background selection:bg-accent-hover selection:text-foreground">
      {/* Fullscreen MacOS Title Bar / Nav Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-accent border-b border-border shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <Terminal className="h-4 w-4" />
          <span>devchat ~ /workspace</span>
        </div>
        <div className="flex items-center">
           {mounted && (
             <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-1.5 rounded-md hover:bg-accent-hover text-gray-500 hover:text-foreground transition-colors"
                title="Toggle Theme"
             >
               {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
             </button>
           )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden relative bg-chat-bg">
        {/* Scrollable Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scrollbar-hide">
          {messages.length === 0 ? (
            // Initial Greeting
            <div className="w-full flex flex-col items-center justify-center h-full min-h-[300px] gap-2 animate-fade-in-up">
              <div className="flex items-center text-gray-500 text-sm mb-2">
                <span className="text-green-500 mr-2">user@dev</span>
                <span className="text-blue-500 mr-2">~/project</span>
                <span className="text-gray-400">$</span>
                <span className="ml-2 text-foreground opacity-70">./ask-ai.sh</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight flex items-center">
                <span className="text-purple-500 mr-3">{">"}</span> 
                What can I help with?
                <span className="inline-block w-3 h-7 bg-foreground/50 ml-2 animate-pulse"></span>
              </h1>
            </div>
          ) : (
            // Chat History
            <div className="w-full max-w-4xl mx-auto space-y-6 pb-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center text-gray-500 text-xs mb-1">
                    {msg.role === 'user' ? (
                       <><span className="text-green-500 mr-2">user@dev</span> $</>
                    ) : (
                       <><span className="text-purple-500 mr-2">ai@devchat</span> {">"}</>
                    )}
                  </div>
                  <div className={`px-4 py-3 rounded-xl max-w-[85%] text-sm border shadow-sm flex flex-col ${
                    msg.role === 'user' 
                      ? 'bg-msg-user border-border text-foreground' 
                      : 'bg-msg-bot border-border text-foreground'
                  }`}>
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                    {msg.role === 'assistant' && (
                      <CopyButton text={msg.content} />
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex flex-col items-start animate-pulse">
                  <div className="flex items-center text-gray-500 text-xs mb-1">
                     <span className="text-purple-500 mr-2">ai@devchat</span> {">"}
                  </div>
                  <div className="px-4 py-3 rounded-xl bg-msg-bot border border-border text-gray-500 text-sm flex items-center gap-2 shadow-sm">
                    <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Box Container - Pinned at bottom */}
        <div className="p-4 border-t border-border bg-background w-full flex justify-center shrink-0">
          <div className="w-full max-w-4xl bg-input border border-border rounded-xl p-3 shadow-sm flex flex-col transition-all duration-300 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/20">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your command..."
              className="w-full bg-transparent text-foreground placeholder:text-gray-500 text-sm md:text-base resize-none outline-none px-2 pt-1 min-h-[50px] overflow-hidden scrollbar-hide"
              rows={2}
              autoFocus
              disabled={isLoading}
            />

            <div className="flex items-center justify-end mt-2 px-1 border-t border-border/50 pt-2">
              <button 
                onClick={handleSubmit}
                className={`flex items-center justify-center h-8 w-12 rounded transition-all duration-300 ${
                  prompt.trim().length > 0 && !isLoading
                    ? "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.3)] border-transparent" 
                    : "bg-accent text-gray-400 cursor-not-allowed border border-border"
                }`}
                disabled={prompt.trim().length === 0 || isLoading}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUp className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Footer Info */}
        <div className="w-full p-2 bg-background flex flex-col items-center justify-center text-center shrink-0 border-t border-border/50">
          <p className="text-[10px] text-gray-500">
            // AI can make mistakes. Please double-check responses.
          </p>
        </div>
      </div>
    </div>
  );
}
