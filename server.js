const httpServer = require( './app' );
const PORT = process.env.PORT || 8080;

//Server listening

async function main(){
  const server = httpServer.listen(PORT, () => {
    console.log(`Server on PORT: ${PORT}`);
  });
  server.on('error', err => console.log('Error en el server: ' + err));
}

main();