
import { Request, Response } from "express";

import {
  createOrGetChatService,
  sendMessageService,
  getMessagesService,
  markMessageReadService,
  updateLastSeenService,
  listUserChatsService
} from "../services/chat.service";

// Common error handler
const getErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : "Something went wrong";
};

// 1. Create or Get Chat
const createOrGetChat = async (req: Request, res: Response) => {
  try {
    const { userAId, userBId } = req.body;

    if (!userAId || !userBId) {
      return res.status(400).json({
        success: false,
        message: "userAId and userBId are required"
      });
    }

    const chat = await createOrGetChatService(
      Number(userAId),
      Number(userBId)
    );

    return res.status(200).json({
      success: true,
      message: "Chat created or fetched successfully",
      data: chat
    });

  } catch (error: unknown) {
    return res.status(500).json({
      success: false,
      message: getErrorMessage(error)
    });
  }
};

// 2. Send Message
const sendMessage = async (req: Request, res: Response) => {
  try {
    const chatId = Number(req.params.chatId);
    const { senderId, text } = req.body;

    if (!senderId || !text) {
      return res.status(400).json({
        success: false,
        message: "senderId and text are required"
      });
    }

    const message = await sendMessageService(
      chatId,
      Number(senderId),
      String(text)
    );

    return res.status(201).json({
      success: true,
      data: message
    });

  } catch (error: unknown) {
    return res.status(500).json({
      success: false,
      message: getErrorMessage(error)
    });
  }
};

// 3. Get Messages
const getMessages = async (req: Request, res: Response) => {
  try {
    const chatId = Number(req.params.chatId);
    const limit = Number(req.query.limit || 50);

    const messages = await getMessagesService(chatId, limit);

    return res.status(200).json({
      success: true,
      messages
    });

  } catch (error: unknown) {
    return res.status(500).json({
      success: false,
      message: getErrorMessage(error)
    });
  }
};

// 4. Mark Message Read
const markMessageRead = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required"
      });
    }

   const { chatId, messageId } = req.params;

    if (typeof chatId !== "string" || typeof messageId !== "string") {
      return res.status(400).json({ error: "Invalid chatId or messageId" });
    }

    const result = await markMessageReadService(
      Number(chatId),
      messageId,
      Number(userId)
    );

    return res.status(200).json({
      success: true,
      data: result
    });

  } catch (error: unknown) {
    return res.status(500).json({
      success: false,
      message: getErrorMessage(error)
    });
  }
};

// 5. Update Last Seen
const updateLastSeen = async (req: Request, res: Response) => {
  try {
    const { userId, messageId } = req.body;

    if (!userId || !messageId) {
      return res.status(400).json({
        success: false,
        message: "userId and messageId are required"
      });
    }

    const result = await updateLastSeenService(
      Number(req.params.chatId),
      Number(userId),
      String(messageId)
    );

    return res.status(200).json({
      success: true,
      data: result
    });

  } catch (error: unknown) {
    return res.status(500).json({
      success: false,
      message: getErrorMessage(error)
    });
  }
};

// 6. List User Chats
const listUserChats = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const chats = await listUserChatsService(userId);

    return res.status(200).json({
      success: true,
      chats
    });

  } catch (error: unknown) {
    return res.status(500).json({
      success: false,
      message: getErrorMessage(error)
    });
  }
};

export {
  createOrGetChat,
  sendMessage,
  getMessages,
  markMessageRead,
  updateLastSeen,
  listUserChats
};
