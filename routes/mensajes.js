var lista = new Array();
function enviar_mensaje(req, res){
   res.render('mensajes/enviar_mensaje', {
      lista: lista
   });
}
exports.get_enviar_mensaje = function(req, res){
   enviar_mensaje(req, res);
}
exports.post_enviar_mensaje = function(req, res){
   var asunto = req.body.asunto;
   var mensaje = req.body.mensaje;
   lista.push({
      asunto: asunto,
      mensaje: mensaje
   })
   enviar_mensaje(req, res);
}
exports.get_mensaje = function(req, res){
   var indice = req.params.indice;
   var mensaje = (lista[indice] != undefined) ? lista[indice] : null;
   res.render('mensajes/mensaje', {
      mensaje: mensaje
   });
}