const {
    getAllMessages,
    newMessages
  } = require('../controllers/messages.Controller');
  
  const socketsMsg = async (socket) => {
    console.log('Usuario conectado, ID: ' + socket.id);
  
    const messages = await getAllMessages();
    socket.emit('messages', messages);
  
    socket.on('newMessage', async (newMessage) => {
      await newMessages(newMessage)
      const messages = await getAllMessages();
      socket.emit('messages', messages);
    });
  }
  
  module.exports = socketsMsg;