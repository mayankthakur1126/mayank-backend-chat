
import Chat from '../models/chat.model.js';
import { Op } from 'sequelize';
import db from '../config/firebase.js';
import { FieldValue } from '../config/firebase.js';

// CREATE OR GET CHAT
const createOrGetChatService = async (
  userAId: number,
  userBId: number
) => {
  let chat = await Chat.findOne({
    where: {
      [Op.or]: [
        { userAId, userBId },
        { userAId: userBId, userBId: userAId }
      ]
    }
  });

  if (!chat) {
    chat = await Chat.create({
      userAId,
      userBId
    });
  }

  return chat;
};

// SEND MESSAGE
const sendMessageService = async (
  chatId: number,
  senderId: number,
  text: string
) => {
  const messagesRef = db
    .collection('chats')
    .doc(String(chatId))
    .collection('messages');

  const docRef = await messagesRef.add({
    senderId,
    text,
    timestamp: FieldValue.serverTimestamp()
  });

  return {
    messageId: docRef.id
  };
};

// GET MESSAGES
const getMessagesService = async (
  chatId: number,
  limit: number
) => {
  const messagesRef = db
    .collection('chats')
    .doc(String(chatId))
    .collection('messages');

  const snapshot = await messagesRef
    .orderBy('timestamp', 'desc')
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
};

// MARK MESSAGE AS READ
const markMessageReadService = async (
  chatId: number,
  messageId: string,
  userId: number
) => {
  const messageRef = db
    .collection('chats')
    .doc(String(chatId))
    .collection('messages')
    .doc(messageId)
    .collection('readReceipts')
    .doc(String(userId));

  await messageRef.set({
    read: true,
    readAt: FieldValue.serverTimestamp()
  }, { merge: true });

  return {
    messageId,
    userId,
    read: true
  };
};

// UPDATE LAST SEEN
const updateLastSeenService = async (
  chatId: number,
  userId: number,
  messageId: string
) => {
  const messageRef = db
    .collection('chats')
    .doc(String(chatId))
    .collection('lastSeen')
    .doc(String(userId));

  await messageRef.set({
    messageId,
    seenAt: FieldValue.serverTimestamp()
  }, { merge: true });

  return {
    userId,
    messageId
  };
};

// GET USER CHATS
const listUserChatsService = async (userId: number) => {
  const chats = await Chat.findAll({
    where: {
      [Op.or]: [
        { userAId: userId },
        { userBId: userId }
      ]
    },
    order: [['createdAt', 'DESC']]
  });

  return chats;
};

export {
  createOrGetChatService,
  sendMessageService,
  getMessagesService,
  markMessageReadService,
  updateLastSeenService,
  listUserChatsService
};
