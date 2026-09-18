import { useState } from 'react';
import { chatApi } from '../services/api';

const initialMessages = [
  { id: 1, role: 'assistant', content: 'Good morning, Maya. What are we making clearer today?' },
];

export default function useChat() {
  const [messages, setMessages] = useState(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState(null);

  async function sendMessage(content) {
    const trimmed = content.trim();
    if (!trimmed || isTyping) return;

    setMessages((current) => [...current, { id: Date.now(), role: 'user', content: trimmed }]);
    setIsTyping(true);

    /* Keep the conversation ID so later messages stay in the same thread. */
    try {
      const response = await chatApi.sendMessage({ conversationId, content: trimmed });
      setConversationId(response.conversationId);
      setMessages((current) => [...current, {
        id: response.message._id,
        role: response.message.role,
        content: response.message.content,
      }]);
    } catch (error) {
      setMessages((current) => [...current, {
        id: Date.now() + 1,
        role: 'assistant',
        content: `I could not complete that request.\n\nWhy: ${error.message}`,
      }]);
    } finally {
      setIsTyping(false);
    }
  }

  function newConversation() {
    setMessages(initialMessages);
    setConversationId(null);
  }

  return { messages, isTyping, sendMessage, newConversation };
}
