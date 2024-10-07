
//Objectes
const inpuObj = document.getElementById("paraulaSecreta");
const buttonObj = document.getElementById("comencarPartida");

//Variables

let paraulaSecreta;



function comencarPartida(){

    paraulaSecreta = inpuObj.value;

    if(paraulaSecreta){
        if(isNaN(paraulaSecreta)){
            if(paraulaSecreta.length > 3){
                console.log(paraulaSecreta);
                console.log(paraulaSecreta.split("")); //Separa l'string pel criteri que volguem. En aquest cas, separa TOTS els caracters.
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

function mostrarParaula(){
    if(inpuObj.type==="password"){
        inpuObj.type="text";
    }else{
        inpuObj.type="password";
    }    
}
