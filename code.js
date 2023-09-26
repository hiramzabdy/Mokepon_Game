let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

let seccionMastoca
let botonMascota
let botonFuego
let botonAgua
let botonTierra
let botonReiniciar
let seccionAtaque

function startGame() {
    botonMascota = document.getElementById("boton-mascota")
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")
    botonReiniciar = document.getElementById("boton-reiniciar")
    seccionAtaque = document.getElementById("seleccion-ataque")
    seccionMastoca = document.getElementById("seleccion-mascota")

    botonMascota.addEventListener("click", seleccionarMascota)
    botonFuego.addEventListener("click", seleccionarFuego)
    botonAgua.addEventListener("click", seleccionarAgua)
    botonTierra.addEventListener("click", seleccionarTierra)
    botonReiniciar.addEventListener("click", reiniciarJuego)
    seccionAtaque.style.display = "none"
    botonReiniciar.style.display = "none"
}

function seleccionarMascota() {
    let inputHipodoge = document.getElementById("hipodoge")
    let inputCapipepo = document.getElementById("capipepo")
    let inputRatigueya = document.getElementById("ratigueya")
    let mascotaJugador = document.getElementById("mascota-jugador")

    if (inputHipodoge.checked) {
        mascotaJugador.innerHTML = "Hipodoge"
        botonMascota.disabled = true
        seleccionarMascotaEnemigo()
    } else if (inputCapipepo.checked) {
        mascotaJugador.innerHTML = "Capipepo"
        botonMascota.disabled = true
        seleccionarMascotaEnemigo()
    } else if (inputRatigueya.checked) {
        mascotaJugador.innerHTML = "Ratigueya"
        botonMascota.disabled = true
        seleccionarMascotaEnemigo()
    } else {
        alert("No has seleccionado nada!")
    }
}

function seleccionarMascotaEnemigo() {
    seccionMastoca.style.display = "none"
    rng = aleatorio(1, 3)
    mascotaEnemigo = document.getElementById("mascota-enemigo")
    switch (rng) {
        case 1:
            mascotaEnemigo.innerHTML = "Hipodoge"
            break
        case 2:
            mascotaEnemigo.innerHTML = "Capipepo"
            break
        case 3:
            mascotaEnemigo.innerHTML = "Ratigueya"
    }
    seccionAtaque.style.display = "flex"
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
    let seccionMensajes = document.getElementById("mensajes")
    let parrafo = document.createElement("p")
    resultado = combate()
    parrafo.innerHTML = "Tu mascota atacó con " + ataqueJugador + ". La mascota del enemigo atacó con " + ataqueEnemigo + ". - " + resultado
    seccionMensajes.appendChild(parrafo)
    revisarVidas()
}

function combate() {
    vidasJugadorSpan = document.getElementById("vidas-jugador")
    vidasEnemigoSpan = document.getElementById("vidas-enemigo")
    let resultado
    if (ataqueJugador == ataqueEnemigo) {
        resultado = "EMPATE."
    } else if (ataqueJugador == "Fuego" && ataqueEnemigo == "Agua") {
        vidasEnemigo--
        vidasEnemigoSpan.innerHTML = vidasEnemigo
        resultado = "¡GANASTE!"
    } else if (ataqueJugador == "Agua" && ataqueEnemigo == "Tierra") {
        vidasEnemigo--
        vidasEnemigoSpan.innerHTML = vidasEnemigo
        resultado = "¡GANASTE!"
    } else if (ataqueJugador == "Tierra" && ataqueEnemigo == "Fuego") {
        vidasEnemigo--
        vidasEnemigoSpan.innerHTML = vidasEnemigo
        resultado = "¡GANASTE!"
    } else {
        vidasJugador--
        vidasJugadorSpan.innerHTML = vidasJugador
        resultado = "PERDISTE."
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
    let seccionMensajes = document.getElementById("mensajes")
    let parrafo = document.createElement("p")
    parrafo.innerHTML = resultado
    seccionMensajes.appendChild(parrafo)
    botonReiniciar.style.display =""
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener("load", startGame)