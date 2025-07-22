const socket = io();
let token = '';

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }).then(res => res.json()).then(data => {
    if (data.token) {
      token = data.token;
      document.getElementById('login').style.display = 'none';
      document.getElementById('chat').style.display = 'block';
    }
  });
}

function register() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }).then(res => res.json()).then(data => {
    alert(data.message);
  });
}

function sendMessage() {
  const message = document.getElementById('messageInput').value;
  socket.emit('chatMessage', { token, message });
  document.getElementById('messageInput').value = '';
}

function logout() {
  token = '';
  document.getElementById('chat').style.display = 'none';
  document.getElementById('login').style.display = 'block';
}

socket.on('message', data => {
  const messages = document.getElementById('messages');
  const msg = document.createElement('div');
  msg.textContent = data;
  messages.appendChild(msg);
});