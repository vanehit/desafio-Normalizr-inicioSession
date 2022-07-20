const fs = require('fs');
const path = require('path');
const { normalize, denormalize, schema } = require('normalizr');
const msgFile = path.join(__dirname + '/');//falta

const authorSchema = new schema.Entity('authors');
const messagesSchema = new schema.Entity('messages', {
  author: authorSchema
});

class Mensajes {

  async getAll() {
    
    const msgs = await fs.readFileSync(msgFile, 'utf-8');
    const msgsJSON = JSON.parse(msgs);
    return msgsJSON;
  }

  async newMessage(newMsg) {
    
    const msgs = await fs.readFileSync(msgFile, 'utf-8');
    const msgsJSON = JSON.parse(msgs);

    const denormalizedData = denormalize(
      msgsJSON.result,
      [messagesSchema],
      msgsJSON.entities
    )

    
    const idArray = denormalizedData.map(e => e.id);
    newMsg.id = Math.max(...idArray) + 1;
    denormalizedData.push(newMsg);

    
    const normalizedData = normalize(denormalizedData, [messagesSchema]);
    fs.writeFileSync(msgFile, JSON.stringify(normalizedData, null, '\t'));
  }
}





module.exports = new Mensajes();