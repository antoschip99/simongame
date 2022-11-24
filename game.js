var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
//11variabile che useremo per cambiare il livello dell h1, parte da 0.
var level = 0;

//10useremo jQ per far si che quando si preme un tasto sulla tastiera venga chiamato nextSequence(), ma solo la prima volta, e per far questo usermo la var=started che è impostata su false, e al tocco della tastiera diventera true, cosi non si attivera più grazie all if.
$(document).on("keypress", function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//5usando jquery possiamo selezionare la classe .btn e perceoire quando uno dei bottoni con la stessa classe .btn viene premuto
$(".btn").on("click", function() {
  //6userChosenColour è una var che useremo per contenere l ID del bottone che verrà cliccato.
  var userChosenColour = (this.id);
  //7spingeremo  quindi userChosenColour(l ID del bottone cliccato) dentro l array vuota userClickedPattern.
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  //13 userChosenColour(ID del bottone premuto) viene inserito come parametro della funzione checkAnswer e verrà chiamata quando verra scelto un pulsante e, passerà nell'indice dell'ultimo elemento(-1) dell'array userClickedPattern
  checkAnswer(userClickedPattern.length - 1);
});

//12funzione che mette a paragone il gamePattern(ovvero l'elenco di pulsanti randomici datecci dal pc) all array userClickedPattern(l elenco di pulsanti premuti dal giocatore).
function checkAnswer(currentLevel) {
  //controlla se la più recente risposta del giocatore(userClickedPattern) è la stessa del gamePattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    //if Se il precedente if e vero, avremo un if che controlla se la lunghezza del gamePattern e dell userClickedPattern sono uguali(cioè se l user avrà completato la serie del livello).
    if (gamePattern.length === userClickedPattern.length) {
      //la nextSequence sarà chiamata dopo 1sec.
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {
    console.log("wrong");
    //nome della musichetta che verra chiamata quando il sbaglieremo.
    playSound("wrong");

    //aggiungeremo una classe chiamata .game-over qunado premero un pulsante sbagliato, e la rimuoveremo dopo 200 millsiecondi.
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    //all errore cambieremo anche il testo dell h1 per far ricaricare la pagina o premere un altro bottone.
    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function nextSequence() {
  //quando nextSequence() viene chiamata, resetta l'array userClickedPattern in un array vuoto pronto per il nuovo livello.
  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  //1generatore di numeri casuali tra 0 e 3.
  var randomNumber = Math.floor(Math.random() * 4);
  //2 variabile in grado di collegare i numeri randomici compresi tra 0 e 3 ai colori presenti nell array buttonColours.
  var randomChosenColour = buttonColours[randomNumber];
  // 3spingeremo quindi nell array vuoto gamePattern il colore casuale.
  gamePattern.push(randomChosenColour);

  //4con jQ ho selezionato gli id grazie a "#", poi con + randomChosenColour avremo lo stesso id del bottone corrispondente al colore,e , successivamente abbiamo aggiunto il flash del botone selezionato.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}


//8 creeremo una funzione per il suono e la refratteremo per entrambe le funzoni nextSequence (randomChosenColour) e quella nascosta che si attiva qunado il bottone viene premuto(6userChosenColour).
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//9 creiamo una funzione in grado di aggiungere e rimuovere la classe .pressed al bottone premuto e quindi la rifratteremo all interno della funzione nascosta del ricettore di bottoni.
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
