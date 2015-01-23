var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var _ = require('underscore');
var participantes = [];

server.listen(3000,function(){
  console.log('+++ Servidor Iniciado +++');
});

app.get('/', function(req, res) {
  res.sendFile( __dirname + '/index.html');
});
 
app.get('/cambiar', function(req, res) {
  res.sendFile( __dirname + '/cambiar.html');
});
 
io.on('connection', function(socket) {
  
  socket.on('envio', function(data) {
    io.emit('envio', {msg:data.msg,id:socket.id});
    console.log('- El usuario con ID: '+socket.id+' envio el color: '+data.msg);
  });

  socket.on('conexion', function(data) {
    participantes.push({id:data.id});
    console.log('- Usuario conectado con ID: '+socket.id);
  });
  
  socket.on('disconnect', function() {
    participantes=_.without(participantes,_.findWhere(participantes,{id:socket.id}));
    console.log('- Desconexion del usuario con ID: '+socket.id);
  });
  
});