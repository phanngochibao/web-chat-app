const jwt = require('jsonwebtoken');

function setupSocket(io) {
  io.on('connection', socket => {
    socket.on('chatMessage', ({ token, message }) => {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        io.emit('message', `${user.username}: ${message}`);
      } catch (err) {
        socket.emit('message', 'Authentication failed.');
      }
    });
  });
}

module.exports = { setupSocket };