import Chat from '../models/chat.model.js';

const createOrGetChatService = async (userAId, userBId) => {
let chat = await Chat.findOne({
  where: {
    [Op.or]: [
      { userAId, userBId },
      { userAId: userBId, userBId: userAId}
    ]
  }
});

if(!chat)
{
    chat = Chat.create({userAId,userBId})
}

  return chat;
};


const sendMessageService = async (chatId , senderId, text) => {
    const messageRef =  await db.collection('chats').doc(chatId).collection('messages');

    // Add a new document with an auto-generated ID
    const docRef = await messageRef.add({
      senderId,
      text,
      timestamp: admin.firestore.FieldValue.serverTimestamp() // Recommended for sorting
    });

    return docRef;
};

const getMessagesService = async (chatId , limit) => {
    const messageRef =  await db.collection('chats').doc(chatId).collection('messages');
    const snapshot = await messagesRef.orderBy('createdAt', 'desc').limit(limit).get();

    if (snapshot.empty) {
      console.log('No matching messages found.');
      return [];
    }

    const messages = [];
    snapshot.forEach(doc => {
      messages.push({
        id: doc.id,         
        ...doc.data()       
      });
    });

    return messages;
};

const markMessageReadService = async (chatId , messageId, userId) => {
  const messageRef = db.collection('chats').doc(chatId).collection('messages').doc(messageId).collection('readReceipts').doc(userId);
  
  await messageRef.update({
    read: true,
    readAt: admin.firestore.FieldValue.serverTimestamp()
  });
  
    return messageRef;
};

const updateLastSeenService = async (chatId , userId, messageId) => {
  const messageRef = db.collection('chats').doc(chatId).collection('lastSeen').doc(userId);
  
  await messageRef.update({
    messageId,
    seenAt: admin.firestore.FieldValue.serverTimestamp()
  });
  
    return messageRef;
};

const listUserChatsService = async (userId) => {
  const chat = await Chat.findAll({
  where: {
    [Op.or]: [
      { userAId: userId },
      { userBId: userId}
    ]
  }
});
    return chat;
};

export {
  createOrGetChatService,
  sendMessageService,
  getMessagesService,
  markMessageReadService,
  updateLastSeenService,
  listUserChatsService 
};