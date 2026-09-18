const express = require('express');
const { listConversations, sendMessage } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.get('/conversations', listConversations);
router.post('/message', sendMessage);

module.exports = router;

