const Conversation = require('../models/Conversation');
const { createMessage } = require('../services/chatService');

async function sendMessage(req, res, next) {
  try {
    if (!req.body.content?.trim()) return res.status(400).json({ message: 'Message content is required.' });
    res.status(201).json(await createMessage({ userId: req.user.id, conversationId: req.body.conversationId, content: req.body.content.trim() }));
  } catch (error) { next(error); }
}

async function listConversations(req, res, next) {
  try { res.json(await Conversation.find({ user: req.user.id }).sort({ updatedAt: -1 })); } catch (error) { next(error); }
}

module.exports = { sendMessage, listConversations };
