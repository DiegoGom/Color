/**
 * Server.js
 * @author : DiganmeGiovanni | https://twitter.com/DiganmeGiovanni
 * @Created on: 25 Oct, 2014
 */
 
/* Librerias necesarias para la aplicación */
var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);
var _ = require('underscore');
 
 var participantes=[];
 
/** *** *** ***
 *  Configuramos el sistema de ruteo para las peticiones web
 *  de manera que sin importar la ruta que el usuario solicite
 *  siempre lo direccionaremos al html del sistema de chat.
 */
app.get('/', function(req, res) {
  res.sendFile( __dirname + '/index.html');
});
 
app.get('/cambiar', function(req, res) {
  res.sendFile( __dirname + '/cambiar.html');
});
 
/** *** *** ***
 *  Configuramos Socket.IO para estar a la escucha de
 *  nuevas conexiones.
 */
io.on('connection', function(socket) {

  console.log('Envio de peticion');
  
  
  socket.on('chat message', function(data) {
    io.emit('chat message', {msg:data.msg,id:socket.id});
  });

  socket.on('newUser', function(data) {
    participantes.push({id:data.id});
    
  });
  
  /**
   * Mostramos en consola cada vez que un usuario
   * se desconecte del sistema.
   */
  socket.on('disconnect', function() {
    participantes=_.without(participantes,_.findWhere(participantes,{id:socket.id}));
    console.log('Usuario desconectado');
  });
  
});
 
 
/**
 * Iniciamos la aplicación en el puerto 3000
 */
http.listen(3000, function() {
  console.log('listening on *:3000');
});