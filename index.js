var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var _ = require('underscore');
var participantes = [];

server.listen(80,function(){
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
    io.emit('envio', {msg:data.msg,id:socket.id,key:data.key});
    console.log('- El usuario con ID: '+socket.id+' envio el color: '+data.msg);
  });

  socket.on('conexion', function(data) {
    participantes.push({id:data.id,key:data.key});
    console.log('- Usuario conectado con ID: '+data.id);
  });

  socket.on('pair', function(data) {
    padre = _.findWhere(participantes,{key:data.key});
    if(padre!=undefined){
      io.to(padre.id).emit('envio', {msg:data.color,id:padre.id,key:data.key});
      console.log('- Se envio el color: '+data.color+' con la llave: '+data.key);
    }
  });
  
  socket.on('disconnect', function() {
    participantes=_.without(participantes,_.findWhere(participantes,{id:socket.id}));
    console.log('- Desconexion del usuario con ID: '+socket.id);
  });
  
});