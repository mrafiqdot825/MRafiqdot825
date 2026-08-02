import { AppleCpu, AppleSend, AppleStar, AppleUser } from "@/components/ui/AppleIcons";
import { type FormEvent, useEffect, useRef, useState } from "react";
import Card from "./Card";
import { CHATBOT_QUICK_PROMPTS } from "@/data/chatbotContext";
import { useGeminiChat } from "@/lib/useGeminiChat";
import { ICON_CLASS } from "@/lib/constants";

const formatInlineMarkdown = (text: string) => {
  if (!text.includes("**")) {
    return text;
  }

  const parts = text.split("**");
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return (
        <strong key={i} className="font-semibold text-text-primary">
          {part}
        </strong>
      );
    }
    return part;
  });
};

const renderMessageText = (text: string) => {
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5">
      {lines.map((rawLine, index) => {
        const line = rawLine.trim();

        if (!line) {
          return <div key={`space-${index}`} className="h-2" />;
        }

        // Match bullet lists
        const bulletMatch = line.match(/^[-*]\s+(.*)$/);
        if (bulletMatch) {
          return (
            <div key={`bullet-${index}`} className="flex items-start gap-2 pl-1.5">
              <span className="text-text-secondary select-none">•</span>
              <p className="text-sm leading-relaxed text-inherit">
                {formatInlineMarkdown(bulletMatch[1])}
              </p>
            </div>
          );
        }

        // Match numbered lists
        const numberedMatch = line.match(/^(\d+)\.\s+(.*)$/);
        if (numberedMatch) {
          return (
            <div key={`numbered-${index}`} className="flex items-start gap-2 pl-1.5">
              <span className="min-w-4 text-sm text-text-secondary select-none">
                {numberedMatch[1]}.
              </span>
              <p className="text-sm leading-relaxed text-inherit">
                {formatInlineMarkdown(numberedMatch[2])}
              </p>
            </div>
          );
        }

        // Match markdown headings (e.g., "### Heading")
        const mdHeadingMatch = line.match(/^(#{1,6})\s+(.*)$/);
        if (mdHeadingMatch) {
          return (
            <p
              key={`heading-md-${index}`}
              className="pt-1.5 text-sm font-bold text-text-primary"
            >
              {formatInlineMarkdown(mdHeadingMatch[2])}
            </p>
          );
        }

        // Match standard bold line headings (e.g., "**Heading**" or "**Heading**:")
        const headingMatch = line.match(/^\*\*(.+)\*\*:?$/);
        if (headingMatch) {
          return (
            <p
              key={`heading-${index}`}
              className="pt-1.5 text-sm font-bold text-text-primary"
            >
              {headingMatch[1]}
            </p>
          );
        }

        return (
          <p
            key={`paragraph-${index}`}
            className="text-sm leading-relaxed text-inherit"
          >
            {formatInlineMarkdown(line)}
          </p>
        );
      })}
    </div>
  );
};

const Chatbot = () => {
  const [chatInput, setChatInput] = useState("");
  const messageListRef = useRef<HTMLDivElement>(null);
  const { chatMessages, isLoading, sendChatMessage } = useGeminiChat();

  useEffect(() => {
    if (!messageListRef.current) {
      return;
    }

    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [chatMessages, isLoading]);

  const handleChatSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendChatMessage(chatInput);
    setChatInput("");
  };

  return (
    <Card className="liquid-glass-card relative overflow-hidden p-0 flex flex-col justify-between shadow-2xl">
      <div className="relative flex h-full min-h-[500px] flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-default bg-cream/40 backdrop-blur-sm px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-accent-100 bg-accent-50 text-accent-700">
              <AppleCpu className={ICON_CLASS.nav} />
            </span>
            <div>
              <p className="text-sm font-bold text-text-primary">
                Rafiq Assistant
              </p>
              <p className="flex items-center gap-2 text-xs text-text-secondary">
                <span className="h-2 w-2 rounded-full bg-(--color-rose-deep)" />
                Online
              </p>
            </div>
          </div>
        </div>

        {/* Message area */}
        <div className="flex-1 px-3 py-4 flex flex-col justify-between">
          <div
            ref={messageListRef}
            className="h-[330px] space-y-4 overflow-y-auto rounded-2xl glass-panel-inset p-3"
          >
            {chatMessages.map((chatMessage) => {
              const isAssistant = chatMessage.role === "assistant";

              return (
                <div
                  key={chatMessage.id}
                  className={`flex items-end gap-2 ${
                    isAssistant ? "justify-start" : "justify-end"
                  }`}
                >
                  {isAssistant && (
                    <span className="mb-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent-100 bg-accent-50 text-accent-700">
                      <AppleStar className={ICON_CLASS.action} />
                    </span>
                  )}

                  <div
                    className={`max-w-[84%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      isAssistant
                        ? "rounded-bl-md glass-chatbot-message-assistant text-text-primary"
                        : "rounded-br-md glass-chatbot-message-user text-accent-700"
                    }`}
                  >
                    {renderMessageText(chatMessage.text)}
                    <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-text-muted">
                      {isAssistant ? "Assistant" : "You"} • {chatMessage.time}
                    </p>
                  </div>

                  {!isAssistant && (
                    <span className="mb-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border-default bg-bg-surface-hover text-text-secondary">
                      <AppleUser className={ICON_CLASS.action} />
                    </span>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-end gap-2">
                <span className="mb-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent-100 bg-accent-50 text-accent-700">
                  <AppleStar className={ICON_CLASS.action} />
                </span>
                <div className="rounded-2xl rounded-bl-md border border-border-default bg-bg-surface px-4 py-3 text-sm text-text-secondary">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-text-muted [animation-delay:-0.2s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-text-muted [animation-delay:-0.1s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-text-muted" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick prompts */}
          <div className="mt-4 flex flex-wrap gap-2">
            {CHATBOT_QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => sendChatMessage(prompt)}
                disabled={isLoading}
                className="rounded-full glass-button-secondary px-3 py-1.5 font-mono text-xs font-medium text-text-secondary disabled:cursor-not-allowed disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input box */}
        <div className="border-t border-border-default bg-cream/40 backdrop-blur-sm p-3">
          <form className="flex items-center gap-2" onSubmit={handleChatSubmit}>
            <div className="relative flex-1">
              <input
                type="text"
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder="Type your message about experience, skills, or bio..."
                disabled={isLoading}
                className="w-full rounded-full glass-input py-3 pl-4 pr-12 text-sm text-text-primary outline-none placeholder:text-text-muted disabled:opacity-50"
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 inline-flex items-center text-text-muted">
                <AppleCpu className={ICON_CLASS.action} />
              </span>
            </div>
            <button
              type="submit"
              disabled={isLoading || !chatInput.trim()}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent-600 text-text-primary transition hover:bg-accent-700 active:bg-accent-800 disabled:cursor-not-allowed disabled:bg-accent-100 disabled:text-text-muted"
              aria-label="Send message"
            >
              <AppleSend className={ICON_CLASS.action} />
            </button>
          </form>
        </div>
      </div>
    </Card>
  );
};

export default Chatbot;
