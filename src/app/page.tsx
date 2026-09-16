"use client";

import { useState } from "react";
import { 
  Paperclip, 
  Globe, 
  Terminal, 
  ArrowUp,
  User,
  Command
} from "lucide-react";

export default function Home() {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="flex flex-col h-screen w-full bg-[#0a0a0a] selection:bg-[#444] selection:text-white">
      {/* Top Navigation */}
      {/* <header className="flex justify-end items-center p-6 w-full">
        <button className="flex items-center justify-center h-10 w-10 rounded-full bg-[#1a1a1a] border border-[#333] text-gray-400 hover:text-white transition-colors mr-4 overflow-hidden">
          <User className="h-5 w-5" />
        </button>
        <button className="h-10 px-4 rounded-full bg-[#1a1a1a] border border-[#333] text-sm hover:bg-[#333] transition-colors text-gray-300">
          Get Pro
        </button>
      </header> */}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-0 mb-[10vh]">
        {/* MacOS Window Container */}
        <div className="w-full max-w-4xl flex flex-col animate-fade-in-up bg-[#121212] rounded-xl border border-[#333] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative">
          
          {/* MacOS Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#1e1e1e] border-b border-[#333]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Terminal className="h-3.5 w-3.5" />
              <span>devchat ~ /workspace</span>
            </div>
            <div className="w-[52px]"></div> {/* Spacer for centering title */}
          </div>

          {/* Window Content */}
          <div className="p-8 flex flex-col items-center min-h-[400px] justify-center relative">
            
            {/* Greeting */}
            <div className="w-full max-w-3xl mb-8 flex flex-col gap-2">
              <div className="flex items-center text-gray-500 text-sm mb-2">
                <span className="text-green-400 mr-2">user@dev</span>
                <span className="text-blue-400 mr-2">~/project</span>
                <span className="text-gray-400">$</span>
                <span className="ml-2 text-gray-300">./ask-ai.sh</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-200 tracking-tight flex items-center">
                <span className="text-purple-400 mr-3">{">"}</span> 
                What can I help with?
                <span className="inline-block w-3 h-7 bg-gray-400 ml-2 animate-pulse"></span>
              </h1>
            </div>

            {/* Input Box Container */}
            <div className="w-full max-w-3xl bg-[#050505] border border-[#333] rounded-xl p-3 shadow-inner flex flex-col transition-all duration-300 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/20">
              {/* Text Area */}
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your command..."
                className="w-full bg-transparent text-gray-300 placeholder:text-gray-600 text-base md:text-lg resize-none outline-none px-2 pt-2 min-h-[80px] overflow-hidden"
                rows={3}
                autoFocus
              />

              {/* Bottom Controls */}
              <div className="flex items-center justify-between mt-4 px-1 border-t border-[#222] pt-3">
                {/* Left Action Buttons */}
                <div className="flex items-center gap-2">
                  <button 
                    className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#1a1a1a] hover:bg-[#2a2a2a] text-gray-400 hover:text-gray-200 transition-colors text-xs border border-[#333]"
                  >
                    <Paperclip className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">--attach</span>
                  </button>
                  <button 
                    className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#1a1a1a] hover:bg-[#2a2a2a] text-gray-400 hover:text-gray-200 transition-colors text-xs border border-[#333]"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    --deep-search
                  </button>
                  <button 
                    className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#1a1a1a] hover:bg-[#2a2a2a] text-gray-400 hover:text-gray-200 transition-colors text-xs border border-[#333]"
                  >
                    <Command className="h-3.5 w-3.5" />
                    --reason
                  </button>
                </div>

                {/* Submit Button */}
                <button 
                  className={`flex items-center justify-center h-8 w-12 rounded transition-all duration-300 ${
                    prompt.trim().length > 0 
                      ? "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.3)] border-transparent" 
                      : "bg-[#111] text-gray-500 cursor-not-allowed border border-[#333]"
                  }`}
                  disabled={prompt.trim().length === 0}
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="w-full p-4 flex flex-col items-center justify-center text-center pb-6">
        <p className="text-[11px] text-gray-600">
          // AI can make mistakes. Please double-check responses.
        </p>
      </footer>
    </div>
  );
}
