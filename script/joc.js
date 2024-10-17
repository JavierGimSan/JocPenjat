
//Objectes
const inpuObj = document.getElementById("paraulaIntroduida");
const buttonObj = document.getElementById("comencarPartida");
const imgObj = document.getElementById("imatge");
const paraulaActualObj = document.getElementById("titolComencar");

//Variables
let paraulaIntroduida;
let paraulaSecreta;
let paraulaActual = [];
let jugadaFallada = 0;
let comptador = 0;

deshabilitarBoto();

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

function jugarLletra(obj){
    let lletraJugada = obj.textContent;
    for (i=0; i<paraulaSecreta.length; i++){ //Index per recorrer la paraula a endevinar.
        if(paraulaSecreta[i]==lletraJugada){ //Si la lletra jugada és la mateixa que la de l'index de la paraula a endevinar...
            paraulaActual[i] = lletraJugada; //...es copia a la paraula nova que es mostrarà per pantalla(paraulaActual)
            mostrarParaulaPantalla();
        }
    }
    comptador = comptador +1;
    console.log(comptador);
    console.log(lletraJugada);
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



