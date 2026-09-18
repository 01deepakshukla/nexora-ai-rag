import { Sparkles } from 'lucide-react';

export default function Message({ role, content }) {
  const isAssistant = role === 'assistant';

  return (
    <article className={`message ${isAssistant ? 'message-assistant' : 'message-user'}`}>
      {isAssistant && (
        <div className="message-mark">
          <Sparkles size={15} />
        </div>
      )}

      <div>
        <div className="message-label">{isAssistant ? 'Nexora' : 'You'}</div>
        <p>{content}</p>
      </div>
    </article>
  );
}

