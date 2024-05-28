async function sendMessage() {
  const inputField = document.getElementById('user-input');
  const message = inputField.value;
  if (message.trim() !== '') {
    displayMessage(message, 'user');
    inputField.value = '';

    try {
      const response = await fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
      });

      const data = await response.json();
      displayMessage(data.reply, 'bot');
    } catch (error) {
      displayMessage('エラーが発生しました。', 'bot');
      console.error('Error:', error);
    }
  }
}

function displayMessage(message, sender) {
  const chatMessages = document.getElementById('chat-messages');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  const messageContent = document.createElement('div');
  messageContent.classList.add('message-content');
  messageContent.innerText = message;
  messageElement.appendChild(messageContent);
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
