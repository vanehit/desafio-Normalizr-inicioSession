//Imports
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const httpServer = http.createServer(app);
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcryptjs = require( 'bcryptjs' );

//User model
const User = require( './model/User.models' );

//Routes
const productsRoutes = require('./routes/productsRouter');
const authRoutes = require('./routes/authRoutes');

//sockets.
const io = new Server(httpServer);
const socketsMsg = require( './websocket/messajesWebsockets' );
io.on('connection', socketsMsg);

//Settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(session({
  secret: 'turing',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 60000*10,
    secure: false,
    httpOnly: true
  }
}))

//view engine:
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//passport
passport.use( 'login', new LocalStrategy(
  async ( username, password, done ) => {
    const user = await User.findOne({ username });
    if( !user ) {
      return done( null, false );
    }
    const validPasswd = bcryptjs.compareSync( password, user.password );
    if( !validPasswd ){
      return done( null, false );
    }

    return done( null, user );
  }
) )

passport.use( 'singup', new LocalStrategy(
  { passReqToCallback: true },
  async ( req, username, password, done ) => {
    const user = await User.findOne({ username })
    if( user ) {
      return done( null, false )
    };

    const newUser = { username, password }
    //Encriptar la PW:
    const salt = bcryptjs.genSaltSync();
    newUser.password = bcryptjs.hashSync( newUser.password, salt );

    await User.create( newUser);
    return done( null, newUser );
  }
) );

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use( passport.initialize() );
app.use( passport.session() );

//Routes
app.use('/', productsRoutes);
app.use('/auth', authRoutes);
app.get('/*', (req, res) => {
  res.json({
    error: -2,
    msg: "Ruta no implementada."
  })
});

module.exports = httpServer;