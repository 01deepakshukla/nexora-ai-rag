const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const { generateReply } = require('./aiService');

async function createMessage({ userId, conversationId, content }) {
  let conversation = conversationId ? await Conversation.findOne({ _id: conversationId, user: userId }) : null;

  if (!conversation) {
    conversation = await Conversation.create({
      user: userId,
      title: content.slice(0, 40) || 'New conversation',
    });
  }

  await Message.create({
    conversation: conversation._id,
    role: 'user',
    content,
  });

  const reply = await generateReply(content);
  const assistantMessage = await Message.create({
    conversation: conversation._id,
    role: 'assistant',
    content: reply,
  });

  return {
    conversationId: conversation._id,
    message: assistantMessage,
  };
}

module.exports = { createMessage };

