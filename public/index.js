const socket = io.connect();
const compresion = document.querySelector('#compresion')


socket.on('messages', (normalizedData) => {
  //Normalizr:
  const authorSchema = new normalizr.schema.Entity('authors');
  const messagesSchema = new normalizr.schema.Entity('messages', {
    author: authorSchema
  });

  const denormalizedData = normalizr.denormalize(
    normalizedData.result,
    [messagesSchema],
    normalizedData.entities
  )

  compresion.innerHTML = Math.floor((JSON.stringify(normalizedData).length * 100) / JSON.stringify(denormalizedData).length)
  renderMessage(denormalizedData)
});

function renderMessage(data) {
  const html = data.map(msg => {
    return (`
      <div style="border-top: 1px solid grey;">
        <img src="${msg.author.avatar}" style="margin: 5px; max-width: 50px; max-heigth: 50px;" alt="img"></img>
        <strong style="color: blue">${msg.author.alias}</strong>
        <p style="color: brown; font-size: 14px; display: inline-block">[ ${msg.date} ] :</p>
        <em style="color: green">${msg.text}</em>
      </div>
    `)
  }).join("");
  const chat = document.getElementById("chat");
  if (chat) {
    chat.innerHTML = html;
  }
}

const formChat = document.getElementById("form-chat");
if (formChat) {
  formChat.addEventListener('submit', (e) => {
    const date = new Date();
    e.preventDefault();
    const newMessage = {
      author: {
        id: document.getElementById('email').value,
        name: document.getElementById('name').value,
        lastName: document.getElementById('lastName').value,
        age: document.getElementById('age').value,
        alias: document.getElementById('alias').value,
        avatar: document.getElementById('avatar').value,
      },
      text: document.getElementById('text').value,
      date: date.toISOString().split('T')[0] + ' ' + date.toLocaleTimeString()
    }
    socket.emit('newMessage', newMessage);
    return false;
  });
}