const Conversation = require('../models/Conversation');
const { createMessage } = require('../services/chatService');

async function sendMessage(req, res, next) {
  try {
    if (!req.body.content?.trim()) {
      return res.status(400).json({ message: 'Message content is required.' });
    }

    const result = await createMessage({
      userId: req.user.id,
      conversationId: req.body.conversationId,
      content: req.body.content.trim(),
    });

    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

async function listConversations(req, res, next) {
  try {
    const conversations = await Conversation.find({ user: req.user.id }).sort({ updatedAt: -1 });
    return res.json(conversations);
  } catch (error) {
    return next(error);
  }
}

module.exports = { sendMessage, listConversations };

