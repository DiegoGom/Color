var five = require('johnny-five'),
   board = new five.Board();
board.on('ready', function() {
  // vamos a crear un LED en el pin 13 y a hacerlo parpadear por un segundo, el parametro que recibe son milisegundos
  (new five.Led(13)).strobe('10000');
});