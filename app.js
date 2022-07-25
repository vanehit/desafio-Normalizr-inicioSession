//Imports
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const httpServer = http.createServer(app);

//sessions
const session = require('express-session');
const MongoStore = require('connect-mongo');

//import router
const productsRouter = require('./routes/productsRouter');
const productsRouterTest = require('./routes/productsTestRouter');


//sockets. Contenedor de msg
const io = new Server(httpServer);
const mensajes = require('./controllers/messagesContainer');

//Settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'))
app.use(session({
  store: new MongoStore({
    mongoUrl: 'mongodb://localhost/sessions'
  }),
  secret: 'turing',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: (60000 * 10) }
}))


//view engine:
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//websockets:

io.on('connection', (socket) => {
  console.log('Usuario conectado, ID: ' + socket.id);

  mensajes.getAll().then(messages => {
    socket.emit('messages', messages);
  });

  socket.on('newMessage', (newMessage) => {
    mensajes.newMessage(newMessage)
      .then( () => mensajes.getAll()
        .then(messages => io.sockets.emit('messages', messages)));
  });
});

//Routes
app.use('/', productsRouter );
app.use('/api/productos-test', productsRouterTest);


module.exports = httpServer;
