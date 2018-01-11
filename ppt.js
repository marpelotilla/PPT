var partida={};
partida.jugador={};
partida.jugador.pc_puntuacion=0;
partida.jugador.user_puntuacion=0;
partida.result;

	$('.seleccion img').click(function(){
    const jugada=$(this).attr('alt');
    var res_pc;
    pc();
		partida.result = comparar(jugada,res_pc);
    comprobar();
		mostrar();
    function pc(){

      var aleatorio=Math.floor(Math.random()*4);
        if(aleatorio==0){
          res_pc= "piedra";
        }else if(aleatorio==1){
          res_pc= "papel";
        }else{
          res_pc= "tijeras";
        }
        $('.PC_RES').text('Tu oponente ha elegido'+' '+res_pc);
        return res_pc;
    }
    function comparar(jugada, res_pc){
        if(jugada===res_pc){
            return "EMPATE";
        }else if(jugada==="piedra" ){
            if(res_pc==="papel"){
              partida.jugador.pc_puntuacion++;
              return "PIERDES";
            }else if (res_pc==="tijeras") {
              partida.jugador.user_puntuacion++;
              return "GANAS";
            }
        }else if(jugada==="papel" ){
              if(res_pc==="tijeras"){
                partida.jugador.pc_puntuacion++;
                return "PIERDES";
              }else if (res_pc==="piedra") {
                partida.jugador.user_puntuacion++;
                return "GANAS";
              }
        }else if(jugada==="tijeras" ){
              if(res_pc==="piedra"){
                partida.jugador.pc_puntuacion++;
                return "PIERDES";
              }else if (res_pc==="papel") {
                partida.jugador.user_puntuacion++;
                return "GANAS";
              }
        }
    }
    function comprobar(){
      if(partida.jugador.pc_puntuacion >=3){
          $('.FINAL').text('HAS PERDIDO');
          $('.jumbotron').css('visibility', 'visible');

      }else if(partida.jugador.pc_puntuacion >=3){
          $('.FINAL').text('¡HAS GANADO!');
          $('.jumbotron').css('visibility', 'visible');

      }
    }

	});
  function reset(){
        partida.jugador.pc_puntuacion=0;
        partida.jugador.user_puntuacion=0;

  }
  $('.jumbotron p a').click(function(){

      $('.jumbotron').css('visibility', 'hidden');
      reset();
      mostrar();


  });

 function mostrar(){
   $('.mensaje').text(partida.result);
   $('.punt_usuario').text(partida.jugador.user_puntuacion);
   $('.punt_pc').text(partida.jugador.pc_puntuacion);
 }
