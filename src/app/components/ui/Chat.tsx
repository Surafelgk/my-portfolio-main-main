"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Message = { role: "user" | "assistant"; content: string };

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Surafel's AI assistant. Ask about skills in dev, design, marketing, or video editing!" },
  ]);
  const [loading, setLoading] = useState(false);
  const [pulse, setPulse] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll & pulse animation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    const interval = setInterval(() => {
      if (!open) {
        setPulse(true);
        setTimeout(() => setPulse(false), 1500);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [messages, open]);

  // Focus input when opened
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMsg, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          userContext: "Surafel Bin Alfew - Full Stack Developer & Creative"
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (!res.body) throw new Error("No response");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last.role !== "assistant") return prev;
          return [...prev.slice(0, -1), { ...last, content: last.content + decoder.decode(value) }];
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev.slice(0, -1), {
        role: "assistant",
        content: "Sorry, I'm having trouble. Surafel is skilled in React, Next.js, TypeScript, design (Adobe CC), video editing (Premiere, AE), and digital marketing. Check his portfolio!"
      }]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = ["Dev skills?", "Design work?", "Video editing?", "Experience?"];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Tooltip */}
      <AnimatePresence>
        {pulse && !open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: -10 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-14 right-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg border border-purple-500"
          >
            💬 Ask me anything!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 focus:outline-none"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {!open && (
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-medium shadow"
          >
            Chat
          </motion.span>
        )}
        <motion.div
          animate={pulse ? { scale: [1, 1.1, 1], boxShadow: ["0 0 0px #a855f7", "0 0 15px #a855f7", "0 0 0px #a855f7"] } : {}}
          className="relative rounded-full border-2 border-purple-500 shadow"
        >
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-[10px]">
            AI
          </div>
          <Image
            src="/avatar.png"
            alt="Surafel"
            width={44}
            height={44}
            className="rounded-full"
            priority
          />
        </motion.div>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute bottom-14 right-0 w-[340px] bg-gray-900 text-gray-200 rounded-xl border border-gray-700 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-gray-800 bg-gray-950">
              <div className="flex items-center gap-2">
                <Image src="/avatar.png" alt="" width={32} height={32} className="rounded-full border" />
                <div>
                  <h3 className="text-sm font-bold">Surafel's Assistant</h3>
                  <p className="text-[10px] text-gray-400">AI-Powered Portfolio Chat</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white text-lg">×</button>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-3 space-y-2 text-sm">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-lg px-3 py-2 ${msg.role === "assistant" ? "bg-gray-800 border-l-2 border-purple-500" : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"}`}>
                    <p className="text-xs leading-relaxed">{msg.content}</p>
                    {msg.role === "assistant" && msg.content === "" && (
                      <div className="flex gap-1 mt-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-150"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-300"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 2 && (
              <div className="px-3 pb-2">
                <div className="flex flex-wrap gap-1.5">
                  {quickQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => { setInput(q); setTimeout(sendMessage, 100); }}
                      className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-2.5 py-1.5 rounded transition border border-gray-700"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-gray-800 bg-gray-950">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder="Type your question..."
                  className="flex-1 text-sm bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                  disabled={loading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className={`px-4 rounded-lg ${input.trim() && !loading ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90" : "bg-gray-800 cursor-not-allowed"}`}
                >
                  {loading ? "..." : "Send"}
                </button>
              </div>
              <p className="text-[10px] text-gray-500 text-center mt-2">Ask about development, design, marketing, or video editing</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chat;