import express from 'express';

import {
  createOrGetChat,
  sendMessage,
  getMessages,
  markMessageRead,
  updateLastSeen,
  listUserChats
} from '../controllers/chat.controller.js';

const router = express.Router();

router.post('/create', createOrGetChat);
router.post('/:chatId/message/send', sendMessage);
router.get('/:chatId/messages', getMessages);
router.post('/:chatId/message/:messageId/read', markMessageRead);
router.post('/:chat/:chatId/lastseen', updateLastSeen);
router.get('/user/:userId/chats', listUserChats);

export default router;