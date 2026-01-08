"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Surafel's AI assistant. Ask about his skills in dev, design, marketing, or video editing!",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const updatedMessages: Message[] = [
      ...messages,
      userMessage,
      { role: "assistant", content: "" },
    ];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          userContext: "Surafel Bin Alfew - Full Stack Developer & Creative Professional"
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No response body from server.");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last.role !== "assistant") return prev;

          return [
            ...prev.slice(0, -1),
            { ...last, content: last.content + chunk },
          ];
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "assistant",
          content: "I apologize for the technical issue. Here's what I can tell you about Surafel: He's a versatile professional with skills in software development (React, Next.js, TypeScript), digital marketing strategy, graphics design (Adobe Creative Suite), and video editing (Premiere Pro, After Effects). Check his portfolio for detailed work samples!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const [highlightIcon, setHighlightIcon] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isOpen) {
        setHighlightIcon(true);
        setTimeout(() => setHighlightIcon(false), 1500);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Updated suggested questions to be more compact
  const suggestedQuestions = [
    "Marketing skills?",
    "Design work?",
    "Video editing?",
    "All skills",
  ];

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => sendMessage(), 100);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      {/* Tooltip */}
      <AnimatePresence>
        {highlightIcon && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: -10 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 1.5 }}
            className="absolute bottom-16 right-2 bg-gradient-to-r from-purple-800 to-blue-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg border border-purple-600 max-w-xs"
          >
            🎨 Ask about creative & tech skills!
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Trigger */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none rounded-full hover:opacity-90 hover:-translate-y-1 transition"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {!isOpen && (
          <motion.span 
            className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white text-xs font-medium shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Chat
          </motion.span>
        )}
        {/* Animated Avatar */}
        <motion.div
          animate={
            highlightIcon
              ? {
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 0px rgba(168, 85, 247, 0)",
                    "0 0 15px rgba(168, 85, 247, 0.9)",
                    "0 0 0px rgba(168, 85, 247, 0)"
                  ],
                }
              : {}
          }
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="rounded-full border-2 border-purple-500 shadow-lg relative"
        >
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-300 to-purple-500 rounded-full flex items-center justify-center text-xs">
            ✨
          </div>
          <Image
            src="/avatar.png"
            alt="Surafel Binalfew - Creative Technologist"
            width={48}
            height={48}
            className="rounded-full"
            priority
          />
        </motion.div>
      </motion.button>

      {/* Chat Box - Compact */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 w-[85vw] sm:w-[360px] bg-gradient-to-b from-gray-900 to-black text-gray-200 rounded-xl border border-purple-900/50 p-3 shadow-2xl"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-400 rounded-full blur opacity-30"></div>
                  <Image
                    src="/avatar.png"
                    alt="Surafel Bin Alfew"
                    width={40}
                    height={40}
                    className="rounded-full object-cover border-2 border-white relative"
                  />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">Surafel's Assistant</h2>
                  <p className="text-[10px] text-gray-400">Dev × Design × Marketing</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white text-sm hover:bg-gray-800 w-6 h-6 rounded-full flex items-center justify-center"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            {/* Messages - Compact */}
            <div className="mb-3 h-56 overflow-y-auto space-y-3 pr-1 scroll-smooth text-sm">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[90%] rounded-lg px-3 py-2 ${
                      msg.role === "assistant"
                        ? "bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100 rounded-tl-none border-l-2 border-purple-500"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-tr-none"
                    } shadow`}
                  >
                    <p className="text-xs leading-relaxed">{msg.content}</p>
                    {msg.role === "assistant" && msg.content === "" && (
                      <div className="flex space-x-1 pt-1">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
                        <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-150"></div>
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Skills - Compact */}
            <div className="mb-2 bg-gray-900/50 rounded-lg p-2 border border-gray-800">
              <div className="flex flex-wrap gap-1">
                {["React", "Marketing", "Figma", "Premiere", "Next.js", "SEO", "Adobe CC", "After Effects"].map((skill) => (
                  <span key={skill} className="text-[10px] bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Suggested Questions - Compact */}
            {messages.length <= 2 && (
              <div className="mb-2">
                <div className="grid grid-cols-2 gap-1.5">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-xs bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-gray-300 px-2 py-1.5 rounded transition-all duration-200 border border-gray-700 hover:border-purple-500/50 text-center truncate"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="border-t border-gray-800 pt-2">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Ask about skills..."
                  className="w-full text-xs text-white bg-gray-900/70 placeholder-gray-500 border border-gray-700 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className={`absolute right-1 w-7 h-7 rounded-lg flex items-center justify-center ${
                    input.trim() && !isLoading
                      ? "bg-gradient-to-r from-purple-600 to-blue-400 hover:from-purple-700 hover:to-blue-500 text-white"
                      : "bg-gray-800 text-gray-500 cursor-not-allowed"
                  } transition-all duration-200`}
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span className="text-sm">↑</span>
                  )}
                </button>
              </div>
            </div>

            {/* Footer - Compact */}
            <div className="mt-2 pt-2 border-t border-gray-800">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  Creative Technologist
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="https://www.linkedin.com/in/surafelbinalfew/"
                    target="_blank"
                    className="text-[10px] text-blue-400 hover:text-blue-300"
                  >
                    <span className="bg-blue-900/30 px-1.5 py-0.5 rounded">LN</span>
                  </Link>
                  <Link
                    href="https://www.behance.net/surafel"
                    target="_blank"
                    className="text-[10px] text-purple-400 hover:text-purple-300"
                  >
                    <span className="bg-purple-900/30 px-1.5 py-0.5 rounded">BE</span>
                  </Link>
                  <Link
                    href="https://dribbble.com/surafel"
                    target="_blank"
                    className="text-[10px] text-pink-400 hover:text-pink-300"
                  >
                    <span className="bg-pink-900/30 px-1.5 py-0.5 rounded">DR</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chat;