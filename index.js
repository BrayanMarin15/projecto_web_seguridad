const express = require('express');
const session = require('express-session');
const passport = require('passport');

require('./auth'); 

const app = express();
app.use(session({secret: 'cats'}));
app.use(passport.initialize());
app.use(passport.session());


function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session()); 

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  })
);

//isLoggedIn 

app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hola Bienvenido ${req.user.displayName}`);
});

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ADIOS!');
});

app.get('/auth/google/failure', (req, res) => {
  res.send('No se pudo autenticar..');
}); 

app.listen(5000, () => console.log('Servidor Iniciado!! en el Puerto 5000'));
