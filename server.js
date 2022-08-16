const httpServer = require( './app' );
const mongoose = require( 'mongoose' );
const yargs = require('yargs')(process.argv.slice(2));


const argv = yargs
  .default({
    port: 8080
  }).alias({
    p: 'port'
  }).argv;


//Server listening
async function main(){
  mongoose.connect(process.env.MONGO_URI)
    .then( () => console.log( 'MongoDB connected!' ) )
  const server = httpServer.listen(argv.port, () => {
    console.log(`Server on PORT: ${argv.port}`);
  });
  server.on('error', err => console.log('Error en el server: ' + err));
}

main();