
//Objectes
const inpuObj = document.getElementById("paraulaIntroduida");
const buttonObj = document.getElementById("comencarPartida");
const imgObj = document.getElementById("imatge");
const paraulaActualObj = document.getElementById("titolComencar");
const puntsPartidaActualObj = document.getElementById("puntsPartidaActual");
const totalPartidesObj = document.getElementById("totalPartides");
const partidesGuanyadesObj = document.getElementById("partidesGuanyades");
const imatgeObj = document.getElementById("imatge");
const lletresContenidor = document.getElementById("contenidor-lletres");
const lletres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");


//Variables
let puntsPartidaActualInt = parseInt(puntsPartidaActualObj.textContent);
let totalPartidesInt = parseInt(totalPartidesObj.textContent);
let partidesGuanyadesInt = parseInt(partidesGuanyadesObj.textContent);
let paraulaIntroduida;
let paraulaSecreta;
let paraulaActual = [];
let jugadaFallada = 0;
let comptador = 0;
let comptadorLletraCorrecta = 0;
let comptadorErrades = 0;
let racha = 1;

//Constants
const NUM_PARTIDA = 10;

deshabilitarBoto();

console.log(paraulaActualObj);

puntsPartidaActualInt = 0; //Inicialitzo els punts de la partida actual.
puntsPartidaActualObj.textContent = puntsPartidaActualInt;

function comencarPartida(){
    paraulaIntroduida = inpuObj.value.toUpperCase();    
    if(paraulaIntroduida){
        if(isNaN(paraulaIntroduida)){
            if(paraulaIntroduida.length > 3){
                habilitarBoto();
                paraulaSecreta = paraulaIntroduida.split("");//Separa l'string pel criteri que volguem. En aquest cas, separa TOTS els caracters.
                paraulaActualInicial();
                mostrarParaulaPantalla();
                console.log(paraulaIntroduida);
                console.log(paraulaSecreta); 
                inpuObj.disabled=true; //Desactiva que poguem introduir res.
                buttonObj.disabled=true; //Desactiva el botó.
    
            }else{
                alert("Has d'introduir una paraula de més de 3 caracters");
            }
        }else{
            alert("No pots introduïr números!")
        }       
    }else{
        alert("No has introduït una paraula");
    }    
}

function paraulaActualInicial(){
    for(let i = 0; i < paraulaSecreta.length; i++){
        // paraulaActual[i] = "_"; Queda molt retro. Millor fer aixó:
        paraulaActual.push("_");
    }
}

function mostrarParaulaPantalla(){
    paraulaActualObj.textContent = paraulaActual.toString().replaceAll(",", " ");
}

function mostrarParaula(){
    if(inpuObj.type==="password"){
        inpuObj.type="text";
    }else{
        inpuObj.type="password";
    }    
}

function partidaPerduda(){
    paraulaActualObj.style.backgroundColor = 'rgb(242, 0, 0)';
}

function partidaGuanyada(){
    paraulaActualObj.style.backgroundColor = 'rgb(0, 242, 0)';
}


function jugarLletra(obj){
    let lletraJugada = obj.textContent;
    comptadorLletraCorrecta = 0;
    lletraTrobada = false;
    for(i=0; i<paraulaSecreta.length; i++){ //Index per recorrer la paraula a endevinar.
        if(paraulaSecreta[i]==lletraJugada){ //Si la lletra jugada és la mateixa que la de l'index de la paraula a endevinar...
            paraulaActual[i] = lletraJugada; //...es copia a la paraula nova que es mostrarà per pantalla(paraulaActual)
            lletraTrobada = true;
            puntsPartidaActualInt += racha;
            puntsPartidaActualObj.textContent = puntsPartidaActualInt;
            mostrarParaulaPantalla();
        }    
        
    }
    if(lletraTrobada==false){
        comptador++;
        imatgeObj.src = 'images/penjat_' + comptador + '.jpg';
        racha = 0;
        if(puntsPartidaActualInt > 0){
            puntsPartidaActualInt -= 1;
            puntsPartidaActualObj.textContent = puntsPartidaActualInt;
        }
    }
    
    for(j=0; j<=paraulaActual.length - 1; j++){ //Index per recorrer la paraula nova.
        if((comptador == NUM_PARTIDA) && (paraulaActual[j] == '_')){ //Si el comptador ha arrivat al màxim nombre d'errors(10) i encara falta alguna lletra per endevinar...
            partidaPerduda(); //S'activa la funció 'partida_perduda'.
            deshabilitarBoto(); //Com s'ha acabat la partida, es desactiven els botons de les lletres
            totalPartidesInt += 1;
            totalPartidesObj.textContent = totalPartidesInt;
        }else if((comptador < NUM_PARTIDA) && (paraulaActual[j] == paraulaSecreta[j])){ //Si encara no s'ha arrivat al nombre màxim d'errors i la lletra de la paraula a endevinar és igual que la de la paraula introduïda... 
            comptadorLletraCorrecta++; //...augmenta un comptador
            if(comptadorLletraCorrecta == paraulaSecreta.length){ //Si el comptador anterior arriva a la longitud de la paraula a endevinar...
                partidaGuanyada(); //...s'activa la funció 'partida_guanyada'.
                deshabilitarBoto();

                partidesGuanyadesInt += 1; //Cada vegada que es guanya una partida augmenta 1.
                partidesGuanyadesObj.textContent = partidesGuanyadesInt;
                totalPartidesInt += 1; //Cada vegada que es JUGA una partida (tot i que el jugador perdi) augmenta 1.
                totalPartidesObj.textContent = totalPartidesInt;
            }
        }
    }
    racha++;
    console.log(comptador);
    console.log(lletraJugada);
    console.log('Racha' + racha)
}

jugarLletra();

function deshabilitarBoto(){
    for(let i = 1; i < 27; i++){
        let literal = "boto_" + i;
        const boto = document.getElementById(literal);
        boto.disabled = true;
    }
}

function habilitarBoto(){
    for(let i = 1; i < 27; i++){
        let literal = "boto_" + i;
        const boto = document.getElementById(literal);
        boto.disabled = false;
    }
}

// function crearBotons(){
//     for(let i = 1; i < lletres.length; i++){
//     const boto = document.createElement("button");
//     boto.id = "boto_" + i;
//     boto.textContent = lletres[i-1];

//     lletresContenidor.appendChild(boto);
//     }    
// }
// crearBotons();


