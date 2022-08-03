const httpServer = require( './app' );
const PORT = process.env.PORT || 8080;
const mongoose = require( 'mongoose' );

//Server listening

async function main(){
  mongoose.connect('mongodb://localhost:27017/usuarios')
    .then( () => console.log( 'MongoDB connected!' ) )
  const server = httpServer.listen(PORT, () => {
    console.log(`Server on PORT: ${PORT}`);
  });
  server.on('error', err => console.log('Error en el server: ' + err));
}

main();