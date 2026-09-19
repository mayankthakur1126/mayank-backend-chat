
import {
  createOrGetChatService,
  sendMessageService,
  getMessagesService,
  markMessageReadService,
  updateLastSeenService,
  listUserChatsService
} from '../services/chat.service.js';


const createOrGetChat = async (req, res) => {
  try {
    const { userAId, userBId } = req.body;

    // Validation
    if (!userAId || !userBId) {
      return res.status(400).json({
        success: false,
        message: 'userAId, userBId are required'
      });
    }

    const chat = await createOrGetChatService({
      userAId,
      userBId,
    });

    res.status(201).json({
      success: true,
      message: 'Create or get successfully',
      data: chat
    });

  } catch (error) {    
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const sendMessage = async (req, res) => {
  try {

    const { chatId } = req.params;
    const message = await sendMessageService(chatId , req.body.senderId,req.body.text);

    res.status(201).json({
      success: true,
      data : message
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getMessages = async (req, res) => {
  try {

    const { chatId } = req.params;
    const limit = req.query.limit || 50;

    const message = await getMessagesService(chatId , limit);

    res.status(200).json({
      success: true,
      messageId : message
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const markMessageRead = async (req, res) => {
  try {

    const { userId } = req.body;
    const markMessage = await markMessageReadService(req.params.chatId, req.params.messageId , userId);

    res.status(200).json({
      success: true,
      markMessage : markMessage
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const updateLastSeen = async (req, res) => {
  try {

    const lastSeen = await updateLastSeenService(req.params.chatId, req.body.userId , req.body.messageId);

    res.status(200).json({
      success: true,
      lastSeen : lastSeen
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const listUserChats = async (req, res) => {
  try {

    const userChat = await listUserChatsService(req.params.userId);

    res.status(200).json({
      success: true,
      chat : userChat
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
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