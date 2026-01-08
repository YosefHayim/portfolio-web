import { AnimatePresence, motion } from "framer-motion";
import {
  AudioVisualizer,
  SpeakingIndicator,
} from "@/Components/ui/ai-voice-input";
import {
  FiAlertCircle,
  FiBriefcase,
  FiCode,
  FiDownload,
  FiMic,
  FiSend,
  FiSquare,
  FiVolume2,
  FiX,
} from "react-icons/fi";
import { QUICK_ACTIONS, SAMPLE_RESPONSES } from "@/data/chatContext";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { ColorOrb } from "@/Components/ui/ai-input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/Components/ui/tooltip";
import { cn } from "@/lib/utils";
import { cx } from "class-variance-authority";
import { formatDistanceToNow } from "date-fns";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isVoice?: boolean;
};

type IconKey = "skills" | "projects" | "experience" | "contact" | "resume";

const ICON_MAP: Record<IconKey, React.ComponentType<{ size?: number }>> = {
  skills: FiCode,
  projects: FiCode,
  experience: FiBriefcase,
  contact: FiCode,
  resume: FiDownload,
};

const ID_START = 2;
const ID_END = 9;
const RADIX = 36;
const TYPING_DELAY = 800;
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const SPEED_FACTOR = 1;
const PANEL_WIDTH = 380;
const PANEL_HEIGHT_COLLAPSED = 52;
const PANEL_HEIGHT_EXPANDED = 520;
const PANEL_HEIGHT_EXPANDED_MOBILE = 450;

const generateId = () =>
  Math.random().toString(RADIX).substring(ID_START, ID_END);

function formatTimeAgo(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true });
}

// Simple markdown renderer for assistant messages
function renderMarkdown(text: string): string {
  return text
    // Bold: **text** or __text__
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-[var(--text-primary)]">$1</strong>')
    .replace(/__(.*?)__/g, '<strong class="font-semibold text-[var(--text-primary)]">$1</strong>')
    // Inline code: `code`
    .replace(/`([^`]+)`/g, '<code class="bg-[var(--bg-elevated)] px-1 py-0.5 rounded text-[#00d9ff] font-mono text-xs">$1</code>')
    // Links: [text](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#05df72] hover:underline">$1</a>');
}

const getOfflineResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();

  if (
    lowerMessage.includes("skill") ||
    lowerMessage.includes("tech") ||
    lowerMessage.includes("proficien")
  ) {
    return SAMPLE_RESPONSES.skills;
  }

  if (
    lowerMessage.includes("project") ||
    lowerMessage.includes("built") ||
    lowerMessage.includes("portfolio")
  ) {
    return SAMPLE_RESPONSES.projects;
  }

  if (
    lowerMessage.includes("experience") ||
    lowerMessage.includes("work") ||
    lowerMessage.includes("job") ||
    lowerMessage.includes("career")
  ) {
    return SAMPLE_RESPONSES.experience;
  }

  if (
    lowerMessage.includes("hire") ||
    lowerMessage.includes("why") ||
    lowerMessage.includes("candidate") ||
    lowerMessage.includes("good fit")
  ) {
    return SAMPLE_RESPONSES.hire;
  }

  if (
    lowerMessage.includes("contact") ||
    lowerMessage.includes("reach") ||
    lowerMessage.includes("email")
  ) {
    return `You can reach Joseph through:

- **GitHub**: github.com/YosefHayim
- **WhatsApp**: Available on the website
- **LinkedIn**: Link available in the sidebar

Feel free to download his resume for more details!`;
  }

  if (
    lowerMessage.includes("education") ||
    lowerMessage.includes("degree") ||
    lowerMessage.includes("bootcamp")
  ) {
    return `**Education**

- **Open University of Israel** - B.Sc Computer Science (Oct 2025 - Present)
- **IITC College** - Full Stack Development (Jul 2024 - Mar 2025)
  - 795-hour intensive program
  - Graduated with Excellence
  - Covered JavaScript, React, Node.js, Python, and more`;
  }

  if (lowerMessage.includes("military") || lowerMessage.includes("idf")) {
    return `**Military Service**

Joseph served as an Infantry Commander in the IDF (Nov 2018 - Jul 2021):

- **Unit**: Gdud 931
- **Role**: Infantry Commander
- **Achievements**: 2x Excellence Awards

This experience shaped his discipline, leadership skills, and ability to perform under pressure - qualities he brings to software development.`;
  }

  return `I can help you learn about Joseph! Here are some things I can tell you about:

- **Technical skills** and proficiencies
- **Projects** he's built
- **Work experience** and career journey
- **Education** and certifications
- **Military background**
- **Why he'd be a great hire**

What would you like to know?`;
};

export const AIChatSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hi! I'm Joseph's AI assistant. Ask me about his skills, projects, or experience. You can also use voice!`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useAI, setUseAI] = useState(true);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const lastAssistantMessageRef = useRef<string>("");

  const voiceRecorder = useVoiceRecorder({
    onError: (err) => setError(err.message),
  });

  const speechSynthesis = useSpeechSynthesis({
    onError: (err) => setError(err.message),
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current && !voiceRecorder.isRecording) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, voiceRecorder.isRecording]);

  useEffect(() => {
    function clickOutsideHandler(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", clickOutsideHandler);
    return () => document.removeEventListener("mousedown", clickOutsideHandler);
  }, [isOpen]);

  const transcribeAudio = useCallback(
    async (audioBlob: Blob): Promise<string> => {
      const response = await fetch(`${API_URL}/api/chat/stt`, {
        method: "POST",
        headers: { "Content-Type": audioBlob.type },
        body: audioBlob,
      });

      if (!response.ok) {
        throw new Error("Failed to transcribe audio");
      }

      const data = await response.json();
      return data.text;
    },
    [],
  );

  const fetchStreamingResponse = useCallback(
    async (
      userMessages: Message[],
      onChunk: (chunk: string) => void,
    ): Promise<string> => {
      abortControllerRef.current = new AbortController();
      let fullResponse = "";

      const response = await fetch(`${API_URL}/api/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: userMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No response body");
      }

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") {
              return fullResponse;
            }
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                fullResponse += parsed.content;
                onChunk(parsed.content);
              }
            } catch {
              /* empty */
            }
          }
        }
      }

      return fullResponse;
    },
    [],
  );

  const handleSendMessage = useCallback(
    async (content: string, isVoiceMessage = false) => {
      if (!content.trim()) {
        return;
      }

      if (content === "__ACTION_DOWNLOAD_RESUME__") {
        const link = document.createElement("a");
        link.href = "/resume/yosef-hayim-full-stack-resume.pdf";
        link.download = "yosef-hayim-full-stack-resume.pdf";
        link.click();
        return;
      }

      const userMessage: Message = {
        id: generateId(),
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
        isVoice: isVoiceMessage,
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setError(null);

      if (!useAI) {
        setIsTyping(true);
        setTimeout(() => {
          const response = getOfflineResponse(content);
          const assistantMessage: Message = {
            id: generateId(),
            role: "assistant",
            content: response,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
          setIsTyping(false);

          if (autoSpeak && isVoiceMessage) {
            speechSynthesis.speakWithBrowserTTS(response);
          }
        }, TYPING_DELAY);
        return;
      }

      setIsStreaming(true);
      const assistantMessageId = generateId();
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: "assistant",
          content: "",
          timestamp: new Date(),
        },
      ]);

      try {
        const allMessages = [...messages, userMessage].filter(
          (m) => m.id !== "welcome",
        );

        const fullResponse = await fetchStreamingResponse(
          allMessages,
          (chunk) => {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMessageId
                  ? { ...m, content: m.content + chunk }
                  : m,
              ),
            );
          },
        );

        lastAssistantMessageRef.current = fullResponse;

        if (autoSpeak && isVoiceMessage && fullResponse) {
          speechSynthesis.speak(fullResponse);
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setMessages((prev) => prev.filter((m) => m.id !== assistantMessageId));

        const fallbackResponse = getOfflineResponse(content);
        setMessages((prev) => [
          ...prev,
          {
            id: generateId(),
            role: "assistant",
            content: fallbackResponse,
            timestamp: new Date(),
          },
        ]);
        setError("AI unavailable. Using offline responses.");
        setUseAI(false);

        if (autoSpeak && isVoiceMessage) {
          speechSynthesis.speakWithBrowserTTS(fallbackResponse);
        }
      } finally {
        setIsStreaming(false);
      }
    },
    [messages, useAI, fetchStreamingResponse, autoSpeak, speechSynthesis],
  );

  const handleVoiceRecord = useCallback(async () => {
    if (voiceRecorder.isRecording) {
      setIsTranscribing(true);
      try {
        const audioBlob = await voiceRecorder.stopRecording();
        if (audioBlob) {
          const transcribedText = await transcribeAudio(audioBlob);
          if (transcribedText.trim()) {
            await handleSendMessage(transcribedText, true);
          }
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to process voice",
        );
      } finally {
        setIsTranscribing(false);
      }
    } else {
      speechSynthesis.stop();
      await voiceRecorder.startRecording();
    }
  }, [voiceRecorder, transcribeAudio, handleSendMessage, speechSynthesis]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const speakLastMessage = useCallback(() => {
    const lastAssistantMessage = [...messages]
      .reverse()
      .find((m) => m.role === "assistant" && m.content);

    if (lastAssistantMessage) {
      speechSynthesis.speak(lastAssistantMessage.content);
    }
  }, [messages, speechSynthesis]);

  const isInputDisabled =
    isStreaming || isTyping || isTranscribing || voiceRecorder.isRecording;

  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className={cn(
        "fixed z-50 flex items-end justify-end",
        isMobile
          ? "bottom-4 left-4 right-4"
          : "right-4 bottom-6",
      )}
      style={{ width: isMobile ? "auto" : PANEL_WIDTH }}
    >
      <motion.div
        ref={wrapperRef}
        data-panel
        className={cx(
          "relative flex flex-col overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-2xl",
          isMobile && isOpen && "w-full",
        )}
        initial={false}
        animate={{
          width: isOpen ? (isMobile ? "100%" : PANEL_WIDTH) : "auto",
          height: isOpen ? (isMobile ? PANEL_HEIGHT_EXPANDED_MOBILE : PANEL_HEIGHT_EXPANDED) : PANEL_HEIGHT_COLLAPSED,
          borderRadius: isOpen ? (isMobile ? 12 : 16) : 26,
        }}
        transition={{
          type: "spring",
          stiffness: 550 / SPEED_FACTOR,
          damping: 45,
          mass: 0.7,
          delay: isOpen ? 0 : 0.08,
        }}
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.footer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-[52px] items-center justify-center whitespace-nowrap select-none"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="flex cursor-pointer items-center justify-center gap-3 px-4"
                    onClick={() => setIsOpen(true)}
                  >
                    <ColorOrb
                      dimension="28px"
                      tones={{
                        base: "oklch(10% 0.02 145)",
                        accent1: "oklch(80% 0.25 145)",
                        accent2: "oklch(70% 0.2 195)",
                        accent3: "oklch(75% 0.18 280)",
                      }}
                    />
                    <button
                      type="button"
                      className="flex items-center gap-2 rounded-full px-3 py-1.5 text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-surface)] hover:text-[#05df72]"
                    >
                      <span className="text-sm font-medium">Ask AI</span>
                    </button>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={8}>
                  Chat with Joseph's AI assistant
                </TooltipContent>
              </Tooltip>
            </motion.footer>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex h-full flex-col"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-3 py-2 sm:px-4 sm:py-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <ColorOrb
                    dimension={isMobile ? "24px" : "28px"}
                    tones={{
                      base: "oklch(10% 0.02 145)",
                      accent1: "oklch(80% 0.25 145)",
                      accent2: "oklch(70% 0.2 195)",
                      accent3: "oklch(75% 0.18 280)",
                    }}
                  />
                  <div>
                    <h3 className="text-xs font-medium text-[var(--text-primary)] sm:text-sm">
                      Ask about Joseph
                    </h3>
                    <p className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] sm:gap-1.5 sm:text-xs">
                      {useAI ? (
                        <>
                          <span className="h-1.5 w-1.5 rounded-full bg-[#05df72]" />
                          AI-powered
                        </>
                      ) : (
                        <>
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-muted)]" />
                          Offline
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() => setAutoSpeak(!autoSpeak)}
                        className={cn(
                          "rounded-lg p-1 transition-colors sm:p-1.5",
                          autoSpeak
                            ? "bg-[#05df72]/20 text-[#05df72]"
                            : "text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]",
                        )}
                      >
                        <FiVolume2 size={isMobile ? 14 : 16} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" sideOffset={8}>
                      {autoSpeak ? "Disable auto-speak" : "Enable auto-speak for voice replies"}
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className="rounded-lg p-1 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] sm:p-1.5"
                        onClick={() => setIsOpen(false)}
                        type="button"
                      >
                        <FiX size={isMobile ? 16 : 18} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" sideOffset={8}>
                      Close chat
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] bg-[#fdc700]/10 px-3 py-1.5 text-xs text-[#fdc700]">
                  <FiAlertCircle size={12} />
                  {error}
                </div>
              )}

              <div className="flex-1 overflow-y-auto p-2 sm:p-3">
                <div className="space-y-3">
                  {messages.map((message) => (
                    <motion.div
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex flex-col",
                        message.role === "user" ? "items-end" : "items-start",
                      )}
                      initial={{ opacity: 0, y: 8 }}
                      key={message.id}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-xl px-3 py-2 text-[13px] leading-relaxed",
                          message.role === "user"
                            ? "bg-[#05df72] text-black"
                            : "bg-[var(--bg-surface)] text-[var(--text-secondary)]",
                        )}
                      >
                        <div className="whitespace-pre-wrap">
                          {message.isVoice && message.role === "user" && (
                            <span className="mr-1 text-black/60">🎤</span>
                          )}
                          {message.role === "assistant" ? (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: renderMarkdown(message.content),
                              }}
                            />
                          ) : (
                            message.content
                          )}
                          {isStreaming &&
                            message.role === "assistant" &&
                            message.id ===
                              messages[messages.length - 1]?.id && (
                              <span className="ml-0.5 inline-block h-3 w-0.5 animate-pulse bg-[var(--text-muted)]" />
                            )}
                        </div>
                      </div>
                      <span
                        className={cn(
                          "mt-1 text-[10px]",
                          message.role === "user"
                            ? "text-[var(--text-muted)]"
                            : "text-[var(--text-dim)]",
                        )}
                      >
                        {formatTimeAgo(message.timestamp)}
                      </span>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-start"
                      initial={{ opacity: 0 }}
                    >
                      <div className="flex items-center gap-2 rounded-xl bg-[var(--bg-surface)] px-3 py-2">
                        <div className="flex gap-1">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-[#05df72] [animation-delay:-0.3s]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-[#05df72] [animation-delay:-0.15s]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-[#05df72]" />
                        </div>
                        <span className="text-xs text-[var(--text-muted)]">AI is thinking...</span>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="border-t border-[var(--border-subtle)] p-2 sm:p-3">
                <AnimatePresence>
                  {(speechSynthesis.isPlaying ||
                    speechSynthesis.state === "paused") && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-2"
                    >
                      <SpeakingIndicator
                        isPlaying={speechSynthesis.isPlaying}
                        isPaused={speechSynthesis.state === "paused"}
                        onPause={speechSynthesis.pause}
                        onResume={speechSynthesis.resume}
                        onStop={speechSynthesis.stop}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {voiceRecorder.isRecording && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-3 flex flex-col items-center gap-2 rounded-xl bg-[var(--bg-surface)] p-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-[#ff6467]" />
                        <span className="font-mono text-sm text-[#ff6467]">
                          {Math.floor(voiceRecorder.duration / 60)
                            .toString()
                            .padStart(2, "0")}
                          :
                          {(voiceRecorder.duration % 60)
                            .toString()
                            .padStart(2, "0")}
                        </span>
                      </div>
                      <AudioVisualizer
                        levels={voiceRecorder.audioLevels}
                        isActive={voiceRecorder.isRecording}
                        barCount={32}
                        color="#ff6467"
                      />
                      <span className="text-xs text-[var(--text-muted)]">
                        Recording... Tap mic to stop
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!voiceRecorder.isRecording && (
                  <div className="mb-2 flex flex-wrap gap-1.5 sm:mb-3 sm:gap-2">
                    {QUICK_ACTIONS.slice(0, isMobile ? 2 : 3).map((action) => {
                      const Icon = ICON_MAP[action.icon as IconKey];
                      return (
                        <Tooltip key={action.label}>
                          <TooltipTrigger asChild>
                            <button
                              className="flex shrink-0 items-center gap-1 rounded-full border border-[var(--border-subtle)] bg-transparent px-2 py-1 text-[11px] whitespace-nowrap text-[var(--text-muted)] transition-colors hover:border-[#05df72]/50 hover:text-[#05df72] disabled:opacity-50 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
                              disabled={isInputDisabled}
                              onClick={() => handleSendMessage(action.prompt)}
                              type="button"
                            >
                              <Icon size={isMobile ? 10 : 12} />
                              {action.label}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent side="top" sideOffset={8}>
                            {action.prompt}
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                )}

                <form
                  className="flex items-center gap-1.5 py-1 sm:gap-2 sm:py-2"
                  onSubmit={handleSubmit}
                >
                  <div className="relative flex-1">
                    <input
                      type="text"
                      className={cn(
                        "h-10 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] pr-4 pl-3 text-sm text-[var(--text-primary)] transition-colors placeholder:text-[var(--text-muted)] sm:h-11 sm:pl-4",
                        "focus:border-[#05df72] focus:ring-1 focus:ring-[#05df72]/30 focus:outline-none",
                        voiceRecorder.isRecording && "opacity-50",
                      )}
                      disabled={isInputDisabled}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={
                        isTranscribing
                          ? "Transcribing..."
                          : voiceRecorder.isRecording
                            ? "Recording..."
                            : "Ask anything..."
                      }
                      ref={inputRef}
                      value={inputValue}
                    />
                  </div>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.button
                        type="button"
                        onClick={handleVoiceRecord}
                        disabled={isStreaming || isTyping}
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors sm:h-11 sm:w-11",
                          voiceRecorder.isRecording
                            ? "bg-[#ff6467] text-white"
                            : "bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)]",
                          (isStreaming || isTyping) &&
                            "cursor-not-allowed opacity-50",
                        )}
                        whileHover={{ scale: isStreaming || isTyping ? 1 : 1.02 }}
                        whileTap={{ scale: isStreaming || isTyping ? 1 : 0.98 }}
                      >
                        {isTranscribing ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                            className="h-4 w-4 rounded-full border-2 border-current border-t-transparent"
                          />
                        ) : voiceRecorder.isRecording ? (
                          <FiSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                        ) : (
                          <FiMic className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                      </motion.button>
                    </TooltipTrigger>
                    <TooltipContent side="top" sideOffset={8}>
                      {isTranscribing
                        ? "Processing voice..."
                        : voiceRecorder.isRecording
                          ? "Stop recording"
                          : "Record voice message"}
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.button
                        type="submit"
                        disabled={!inputValue.trim() || isInputDisabled}
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#05df72] text-black transition-colors sm:h-11 sm:w-11",
                          "hover:bg-[#04c566]",
                          (!inputValue.trim() || isInputDisabled) &&
                            "cursor-not-allowed opacity-50",
                        )}
                        whileHover={{
                          scale: !inputValue.trim() || isInputDisabled ? 1 : 1.02,
                        }}
                        whileTap={{
                          scale: !inputValue.trim() || isInputDisabled ? 1 : 0.98,
                        }}
                      >
                        <FiSend size={isMobile ? 16 : 18} />
                      </motion.button>
                    </TooltipTrigger>
                    <TooltipContent side="top" sideOffset={8}>
                      Send message
                    </TooltipContent>
                  </Tooltip>
                </form>

                {messages.length > 1 &&
                  !voiceRecorder.isRecording &&
                  !speechSynthesis.isPlaying && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={speakLastMessage}
                          className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-lg py-1 text-[11px] text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-surface)] hover:text-[#05df72] sm:mt-2 sm:py-1.5 sm:text-xs"
                        >
                          <FiVolume2 size={12} />
                          Play last response
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" sideOffset={8}>
                        Listen to the AI's last reply
                      </TooltipContent>
                    </Tooltip>
                  )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AIChatSidebar;
