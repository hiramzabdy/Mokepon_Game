let ataqueJugador
let ataqueEnemigo

function startGame(){
    let botonMascota = document.getElementById("boton-mascota")
    botonMascota.addEventListener("click", seleccionarMascota)
    let botonFuego = document.getElementById("boton-fuego")
    botonFuego.addEventListener("click", ataqueFuego)
    let botonAgua = document.getElementById("boton-agua")
    botonAgua.addEventListener("click", ataqueAgua)
    let botonTierra = document.getElementById("boton-tierra")
    botonTierra.addEventListener("click", ataqueTierra)
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function seleccionarMascota(){
    let inputHipodoge = document.getElementById("hipodoge")
    let inputCapipepo = document.getElementById("capipepo")
    let inputRatigueya = document.getElementById("ratigueya")
    let mascotaJugador = document.getElementById("mascota-jugador")

    if (inputHipodoge.checked){
        mascotaJugador.innerHTML = "Hipodoge"
        seleccionarMascotaEnemigo()
    } else if (inputCapipepo.checked){
        mascotaJugador.innerHTML = "Capipepo"
        seleccionarMascotaEnemigo()
    } else if (inputRatigueya.checked){
        mascotaJugador.innerHTML = "Ratigueya"
        seleccionarMascotaEnemigo()
    } else {
        alert("No has seleccionado nada!")
    }
}

function seleccionarMascotaEnemigo(){
    numeroAleatorio = aleatorio(1,3)
    mascotaEnemigo = document.getElementById("mascota-enemigo")
    switch (numeroAleatorio){
        case 1:
            mascotaEnemigo.innerHTML = "Hipodoge"
            break
        case 2:
            mascotaEnemigo.innerHTML = "Capipepo"
            break
        case 3:
            mascotaEnemigo.innerHTML = "Ratigueya"
    }
}

function ataqueFuego(){
    ataqueJugador = "fuego"
}
function ataqueAgua(){
    ataqueJugador = "agua"
}
function ataqueTierra(){
    ataqueJugador = "tierra"
}


window.addEventListener("load", startGame)