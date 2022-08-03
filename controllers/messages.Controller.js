const fs = require('fs');
const path = require('path');
const { normalize, denormalize, schema } = require('normalizr');
const msgFile = path.join(__dirname + '/../db/messages.txt');

const authorSchema = new schema.Entity('authors');
const messagesSchema = new schema.Entity('messages', {
  author: authorSchema
});


const getAllMessages = async () => {
  //Devuelve los menjsaes normalizados para que el front los desnormalize:
  const msgs = await fs.readFileSync(msgFile, 'utf-8');
  const msgsJSON = JSON.parse(msgs);
  return msgsJSON;
}

const newMessages = async (newMsg) => {
  //Primero trae los datos normalizados, y los desnormaliza:
  const msgs = await fs.readFileSync(msgFile, 'utf-8');
  const msgsJSON = JSON.parse(msgs);

  const denormalizedData = denormalize(
    msgsJSON.result,
    [messagesSchema],
    msgsJSON.entities
  )

  //pusheamos el newMsg:
  const idArray = denormalizedData.map(e => e.id);
  newMsg.id = Math.max(...idArray) + 1;
  denormalizedData.push(newMsg);

  //Volvemos a normalizar el array y lo guardamos:
  const normalizedData = normalize(denormalizedData, [messagesSchema]);
  fs.writeFileSync(msgFile, JSON.stringify(normalizedData, null, '\t'));
}




module.exports = {
  getAllMessages,
  newMessages
};