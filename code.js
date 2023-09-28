//Variables para juego
let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3
let mascotaJugador
let mascotaEnemigo

//Secciones html
let seccionSeleccionMastoca
let seccionSeleccionAtaque
let seccionMascotas
let seccionMensajes
let seccionGameScreen
let divResultado

//Botones html
let botonMascota
let botonFuego
let botonAgua
let botonTierra
let botonReiniciar


function startGame() {

    //Gets html element to global variables
    seccionSeleccionMastoca = document.getElementById("seccion-seleccion-mascota")
    seccionSeleccionAtaque = document.getElementById("seccion-seleccion-ataque")
    seccionMascotas = document.getElementById("seccion-mascota")
    seccionMensajes = document.getElementById("mensajes")
    seccionGameScreen = document.getElementById("game-screen")
    divResultado = document.getElementById("resultado")

    botonMascota = document.getElementById("boton-mascota")
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")
    botonReiniciar = document.getElementById("boton-reiniciar")

    //Adds functions to buttons
    botonMascota.addEventListener("click", seleccionarMascota)
    botonFuego.addEventListener("click", seleccionarFuego)
    botonAgua.addEventListener("click", seleccionarAgua)
    botonTierra.addEventListener("click", seleccionarTierra)
    botonReiniciar.addEventListener("click", reiniciarJuego)
}

function seleccionarMascota() {
    let inputHipodoge = document.getElementById("hipodoge")
    let inputCapipepo = document.getElementById("capipepo")
    let inputRatigueya = document.getElementById("ratigueya")

    if (inputHipodoge.checked) {
        mascotaJugador = "hipodoge"
        botonMascota.disabled = true
        seleccionarMascotaEnemigo()
    } else if (inputCapipepo.checked) {
        mascotaJugador = "capipepo"
        botonMascota.disabled = true
        seleccionarMascotaEnemigo()
    } else if (inputRatigueya.checked) {
        mascotaJugador = "ratigueya"
        botonMascota.disabled = true
        seleccionarMascotaEnemigo()
    } else {
        alert("No has seleccionado nada!")
    }
}

function seleccionarMascotaEnemigo() {
    seccionSeleccionMastoca.style.display = "none"
    rng = aleatorio(1, 3)
    mascotaEnemigo = document.getElementById("mascota-enemigo")
    switch (rng) {
        case 1:
            mascotaEnemigo = "hipodoge"
            break
        case 2:
            mascotaEnemigo = "capipepo"
            break
        case 3:
            mascotaEnemigo = "ratigueya"
    }
    seccionGameScreen.style.display = "flex"
    agregarImagenesMascotas()
}

function agregarImagenesMascotas(){
    let miniaturaJugador = document.getElementById("miniatura-jugador")
    let miniaturaEnemigo = document.getElementById("miniatura-enemigo")

    switch(mascotaJugador){
        case "hipodoge":
            miniaturaJugador.src = "./assets/hipodoge.png"
            miniaturaJugador.alt = "Miniatura hipodoge"
            break
        case "capipepo":
            miniaturaJugador.src = "./assets/capipepo.png"
            miniaturaJugador.alt = "Miniatura capipepo"
            break        
        case "ratigueya":
            miniaturaJugador.src = "./assets/ratigueya.png"
            miniaturaJugador.alt = "Miniatura ratigueya"
            break                
    }
    switch(mascotaEnemigo){
        case "hipodoge":
            miniaturaEnemigo.src = "./assets/hipodoge.png"
            miniaturaEnemigo.alt = "Miniatura hipodoge"
            break
        case "capipepo":
            miniaturaEnemigo.src = "./assets/capipepo.png"
            miniaturaEnemigo.alt = "Miniatura capipepo"
            break        
        case "ratigueya":
            miniaturaEnemigo.src = "./assets/ratigueya.png"
            miniaturaEnemigo.alt = "Miniatura ratigueya"
            break                
    }
}

function seleccionarFuego() {
    ataqueJugador = "Fuego"
    seleccionarAtaqueEnemigo()
}
function seleccionarAgua() {
    ataqueJugador = "Agua"
    seleccionarAtaqueEnemigo()
}
function seleccionarTierra() {
    ataqueJugador = "Tierra"
    seleccionarAtaqueEnemigo()
}

function seleccionarAtaqueEnemigo() {
    if (vidasEnemigo > 0 && vidasJugador > 0) {
        rng = aleatorio(1, 3)
        switch (rng) {
            case 1:
                ataqueEnemigo = "Fuego"
                break
            case 2:
                ataqueEnemigo = "Agua"
                break
            case 3:
                ataqueEnemigo = "Tierra"
        }
        crearMensajeCombate()
    } else {
        alert("El juego ha terminado!")
    }
}

function crearMensajeCombate() {
    let parrafo = document.createElement("p")
    resultado = combate()
    parrafo.innerHTML = "Tu mascota atacó con " + ataqueJugador + ". La mascota del enemigo atacó con " + ataqueEnemigo + "."
    seccionMensajes.appendChild(parrafo)
    divResultado.innerHTML = resultado
    revisarVidas()
}

function combate() {
    vidasJugadorSpan = document.getElementById("vidas-jugador")
    vidasEnemigoSpan = document.getElementById("vidas-enemigo")
    let resultado
    if (ataqueJugador == ataqueEnemigo) {
        resultado = "EMPATE"
        divResultado.style.background = "darkgrey"
    } else if (ataqueJugador == "Fuego" && ataqueEnemigo == "Agua") {
        vidasEnemigo--
        vidasEnemigoSpan.innerHTML = vidasEnemigo
        resultado = "¡GANASTE!"
        divResultado.style.background = "lightgreen"
    } else if (ataqueJugador == "Agua" && ataqueEnemigo == "Tierra") {
        vidasEnemigo--
        vidasEnemigoSpan.innerHTML = vidasEnemigo
        resultado = "¡GANASTE!"
        divResultado.style.background = "lightgreen"
    } else if (ataqueJugador == "Tierra" && ataqueEnemigo == "Fuego") {
        vidasEnemigo--
        vidasEnemigoSpan.innerHTML = vidasEnemigo
        resultado = "¡GANASTE!"
        divResultado.style.background = "lightgreen"
    } else {
        vidasJugador--
        vidasJugadorSpan.innerHTML = vidasJugador
        resultado = "PERDISTE"
        divResultado.style.background = "indianred"
    }
    return resultado
}

function revisarVidas(){
    if (vidasJugador == 0){
        crearMensajeFinal("¡PERDISTE EL JUEGO!")
        let botonFuego = document.getElementById("boton-fuego")
        botonFuego.disabled = true
        let botonAgua = document.getElementById("boton-agua")
        botonAgua.disabled = true
        let botonTierra = document.getElementById("boton-tierra")
        botonTierra.disabled = true
    }else if (vidasEnemigo == 0){
        crearMensajeFinal("¡GANASTE EL JUEGO!")
        let botonFuego = document.getElementById("boton-fuego")
        botonFuego.disabled = true
        let botonAgua = document.getElementById("boton-agua")
        botonAgua.disabled = true
        let botonTierra = document.getElementById("boton-tierra")
        botonTierra.disabled = true
    }
}

function crearMensajeFinal(resultado){
    divResultado.innerHTML = resultado
    botonReiniciar.style.display =""
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener("load", startGame)