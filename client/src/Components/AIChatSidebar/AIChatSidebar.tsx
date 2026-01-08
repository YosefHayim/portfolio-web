import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  Briefcase,
  Code2,
  FileDown,
  MessageCircle,
  Send,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { QUICK_ACTIONS, SAMPLE_RESPONSES } from '@/data/chatContext';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

const ICON_MAP = {
  skills: Code2,
  projects: Sparkles,
  experience: Briefcase,
  contact: User,
  resume: FileDown,
};

const ID_START = 2;
const ID_END = 9;
const RADIX = 36;
const TYPING_DELAY = 800;
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const generateId = () =>
  Math.random().toString(RADIX).substring(ID_START, ID_END);

const getOfflineResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();

  if (
    lowerMessage.includes('skill') ||
    lowerMessage.includes('tech') ||
    lowerMessage.includes('proficien')
  ) {
    return SAMPLE_RESPONSES.skills;
  }

  if (
    lowerMessage.includes('project') ||
    lowerMessage.includes('built') ||
    lowerMessage.includes('portfolio')
  ) {
    return SAMPLE_RESPONSES.projects;
  }

  if (
    lowerMessage.includes('experience') ||
    lowerMessage.includes('work') ||
    lowerMessage.includes('job') ||
    lowerMessage.includes('career')
  ) {
    return SAMPLE_RESPONSES.experience;
  }

  if (
    lowerMessage.includes('hire') ||
    lowerMessage.includes('why') ||
    lowerMessage.includes('candidate') ||
    lowerMessage.includes('good fit')
  ) {
    return SAMPLE_RESPONSES.hire;
  }

  if (
    lowerMessage.includes('contact') ||
    lowerMessage.includes('reach') ||
    lowerMessage.includes('email')
  ) {
    return `You can reach Joseph through:

- **GitHub**: github.com/YosefHayim
- **WhatsApp**: Available on the website
- **LinkedIn**: Link available in the sidebar

Feel free to download his resume for more details!`;
  }

  if (
    lowerMessage.includes('education') ||
    lowerMessage.includes('degree') ||
    lowerMessage.includes('bootcamp')
  ) {
    return `**Education**

- **Open University of Israel** - B.Sc Computer Science (Oct 2025 - Present)
- **IITC College** - Full Stack Development (Jul 2024 - Mar 2025)
  - 795-hour intensive program
  - Graduated with Excellence
  - Covered JavaScript, React, Node.js, Python, and more`;
  }

  if (lowerMessage.includes('military') || lowerMessage.includes('idf')) {
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
      id: 'welcome',
      role: 'assistant',
      content: `Hi! I'm Joseph's AI assistant. I can help you learn about his skills, projects, and experience.

What would you like to know?`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useAI, setUseAI] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const fetchStreamingResponse = useCallback(
    async (
      userMessages: Message[],
      onChunk: (chunk: string) => void
    ): Promise<void> => {
      abortControllerRef.current = new AbortController();

      const response = await fetch(`${API_URL}/api/chat/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: userMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              return;
            }
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                onChunk(parsed.content);
              }
            } catch {
              /* empty */
            }
          }
        }
      }
    },
    []
  );

  const handleSendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) {
        return;
      }

      if (content === '__ACTION_DOWNLOAD_RESUME__') {
        const link = document.createElement('a');
        link.href = '/resume/yosef-hayim-full-stack-resume.pdf';
        link.download = 'yosef-hayim-full-stack-resume.pdf';
        link.click();
        return;
      }

      const userMessage: Message = {
        id: generateId(),
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue('');
      setError(null);

      if (!useAI) {
        setIsTyping(true);
        setTimeout(() => {
          const response = getOfflineResponse(content);
          const assistantMessage: Message = {
            id: generateId(),
            role: 'assistant',
            content: response,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
          setIsTyping(false);
        }, TYPING_DELAY);
        return;
      }

      setIsStreaming(true);
      const assistantMessageId = generateId();
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: 'assistant',
          content: '',
          timestamp: new Date(),
        },
      ]);

      try {
        const allMessages = [...messages, userMessage].filter(
          (m) => m.id !== 'welcome'
        );

        await fetchStreamingResponse(allMessages, (chunk) => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessageId
                ? { ...m, content: m.content + chunk }
                : m
            )
          );
        });
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }

        setMessages((prev) => prev.filter((m) => m.id !== assistantMessageId));

        const fallbackResponse = getOfflineResponse(content);
        setMessages((prev) => [
          ...prev,
          {
            id: generateId(),
            role: 'assistant',
            content: fallbackResponse,
            timestamp: new Date(),
          },
        ]);
        setError('AI unavailable. Using offline responses.');
        setUseAI(false);
      } finally {
        setIsStreaming(false);
      }
    },
    [messages, useAI, fetchStreamingResponse]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            animate={{ scale: 1, opacity: 1 }}
            className="fixed right-4 bottom-20 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#05df72] text-black shadow-lg shadow-[#05df72]/30 transition-all hover:shadow-xl hover:shadow-[#05df72]/40 md:bottom-6"
            exit={{ scale: 0, opacity: 0 }}
            initial={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="fixed right-4 bottom-20 z-50 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-2xl md:bottom-6 md:h-[600px] md:w-[400px]"
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#05df72]/20">
                  <Sparkles className="text-[#05df72]" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">
                    Ask about Joseph
                  </h3>
                  <p className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                    {useAI ? (
                      <>
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#05df72]" />
                        AI-powered
                      </>
                    ) : (
                      <>
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-muted)]" />
                        Offline mode
                      </>
                    )}
                  </p>
                </div>
              </div>
              <button
                className="rounded-full p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                <X size={20} />
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] bg-[#fdc700]/10 px-4 py-2 text-xs text-[#fdc700]">
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      'flex',
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                    initial={{ opacity: 0, y: 10 }}
                    key={message.id}
                  >
                    <div
                      className={cn(
                        'max-w-[85%] rounded-2xl px-4 py-3 text-sm',
                        message.role === 'user'
                          ? 'bg-[#05df72] text-black'
                          : 'bg-[var(--bg-surface)] text-[var(--text-secondary)]'
                      )}
                    >
                      <div className="whitespace-pre-wrap">
                        {message.content}
                        {isStreaming &&
                          message.role === 'assistant' &&
                          message.id === messages[messages.length - 1]?.id && (
                            <span className="ml-1 inline-block h-4 w-1 animate-pulse bg-[var(--text-muted)]" />
                          )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                    initial={{ opacity: 0 }}
                  >
                    <div className="flex gap-1 rounded-2xl bg-[var(--bg-surface)] px-4 py-3">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--text-muted)] [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--text-muted)] [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--text-muted)]" />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-card)] p-3">
              <div className="mb-3 flex flex-wrap gap-2">
                {QUICK_ACTIONS.map((action) => {
                  const Icon = ICON_MAP[action.icon];
                  return (
                    <button
                      className="flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition-all hover:border-[#05df72]/50 hover:text-[#05df72]"
                      disabled={isStreaming || isTyping}
                      key={action.label}
                      onClick={() => handleSendMessage(action.prompt)}
                      type="button"
                    >
                      <Icon size={14} />
                      {action.label}
                    </button>
                  );
                })}
              </div>

              <form className="flex gap-2" onSubmit={handleSubmit}>
                <input
                  className="flex-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#05df72]/50 focus:outline-none"
                  disabled={isStreaming || isTyping}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                />
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#05df72] text-black transition-all hover:bg-[#04c566] disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!inputValue.trim() || isStreaming || isTyping}
                  type="submit"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatSidebar;
