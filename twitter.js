// enter your twitter api credentials here

var config = require('./config');
var express = require('express');
var connect = require('connect');
var auth= require('connect-auth');
var app = express.createServer();

app.configure(function(){
  app.use(connect.cookieParser());
  app.use(connect.session({ secret: 'foobar' }));
  app.use(auth( [
   auth.Twitter({consumerKey: config.key, consumerSecret: config.secret})
  ]) );
});

app.get('/', function(req, res){
  req.authenticate(['twitter'], function(error, authenticated) { 
    res.send('Hello World: ' + JSON.stringify( req.session.auth.user ) );
  });
});
app.listen(8090);

