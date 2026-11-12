
import { Router } from "express";

import {
  createOrGetChat,
  sendMessage,
  getMessages,
  markMessageRead,
  updateLastSeen,
  listUserChats
} from "../controllers/chat.controller";

const router = Router();

router.post("/create", createOrGetChat);
router.post("/:chatId/message/send", sendMessage);
router.get("/:chatId/messages", getMessages);
router.post("/:chatId/message/:messageId/read", markMessageRead);
router.post("/:chatId/lastseen", updateLastSeen);
router.get("/user/:userId/chats", listUserChats);

export default router;
