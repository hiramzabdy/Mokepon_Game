//game global variables
let ataqueEnemigo
let ataqueJugador
let vidasJugador = 3
let vidasEnemigo = 3
let mascotaJugador
let mascotaEnemigo
//mokepones
let mokepones = []
let htmlMokepones
//html sections
const sectionPetsScreen = document.getElementById("pets-screen")
const sectionGameScreen = document.getElementById("game-screen")
//html divs
const divTarjetas = document.getElementById("div-tarjetas")
const divAtaques = document.getElementById("div-ataques")
const mensajesJugador = document.getElementById("mensajes-jugador")
const mensajesEnemigo = document.getElementById("mensajes-enemigo")
//html ps
const pResultado = document.getElementById("resultado")
//html spans
const vidasJugadorSpan = document.getElementById("vidas-jugador")
const vidasEnemigoSpan = document.getElementById("vidas-enemigo")
//html buttons
const botonMascota = document.getElementById("boton-mascota")
const botonFuego = document.getElementById("boton-fuego")
const botonAgua = document.getElementById("boton-agua")
const botonTierra = document.getElementById("boton-tierra")
const botonReiniciar = document.getElementById("boton-reiniciar")
//Adds functions to buttons
botonMascota.addEventListener("click", seleccionarMascota)
botonFuego.addEventListener("click", seleccionarFuego)
botonAgua.addEventListener("click", seleccionarAgua)
botonTierra.addEventListener("click", seleccionarTierra)
botonReiniciar.addEventListener("click", reiniciarJuego)

class Mokepon {
    constructor(nombre, imagen, miniatura, vida){
        this.nombre = nombre
        this.imagen = imagen
        this.miniatura = miniatura
        this.vida = vida
        this.ataques = []
    }
}

function startGame(){

    crearMokepones()
    estructurarMokepones()

}

function crearMokepones(){
    let hipodoge = new Mokepon("Hipodoge", "./assets/mokepones/hipodoge.png", "./assets/thumbnails/hipodoge.png", vida = 5)
    let capipepo = new Mokepon("Capipepo", "./assets/mokepones/capipepo.png", "./assets/thumbnails/capipepo.png", vida = 5)
    let ratigueya = new Mokepon("Ratigueya", "./assets/mokepones/ratigueya.png", "./assets/thumbnails/ratigueya.png", vida = 5)
    
    /*hipodoge.ataques.push(
        {nombre: "💧", id: "boton-agua"},
        {nombre: "💧", id: "boton-agua"},
        {nombre: "💧", id: "boton-agua"},
        {nombre: "🔥", id: "boton-fuego"},
        {nombre: "🌱", id: "boton-tierra"}
    )
    capipepo.ataques.push(
        {nombre: "🌱", id: "boton-tierra"},
        {nombre: "🌱", id: "boton-tierra"},
        {nombre: "🌱", id: "boton-tierra"},
        {nombre: "🔥", id: "boton-fuego"},
        {nombre: "💧", id: "boton-agua"}
    )
    ratigueya.ataques.push(
        {nombre: "🔥", id: "boton-fuego"},
        {nombre: "🔥", id: "boton-fuego"},
        {nombre: "🔥", id: "boton-fuego"},
        {nombre: "💧", id: "boton-agua"},
        {nombre: "🌱", id: "boton-tierra"}
    )*/

    mokepones.push(hipodoge, capipepo, ratigueya)
}

function estructurarMokepones(){

    mokepones.forEach((mokepon) => {
        htmlMokepones = `
        <input type="radio" , name="mascota" , id=${mokepon.nombre}/>
        <label for=${mokepon.nombre} , class="tarjeta-mokepon">
            <p>${mokepon.nombre}</p>
            <img src="${mokepon.imagen}" alt="Imagen de ${mokepon.nombre}">
        </label>
        `
        divTarjetas.innerHTML += htmlMokepones
    })
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
    sectionPetsScreen.style.display = "none"
    let rng = aleatorio(1, 3)
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
    sectionGameScreen.style.display = "flex"
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
        let rng = aleatorio(1, 3)
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
    let parrafoJugador = document.createElement("p")
    let parrafoEnemigo = document.createElement("p")
    let resultado = combate()
    parrafoJugador.innerHTML = "Ataque del jugador: " + ataqueJugador + "."
    parrafoEnemigo.innerHTML = "Ataque del enemigo: " + ataqueEnemigo + "."
    mensajesJugador.appendChild(parrafoJugador)
    mensajesEnemigo.appendChild(parrafoEnemigo)
    pResultado.innerHTML = resultado
    revisarVidas()
}

function combate() {
    let resultado
    if (ataqueJugador == ataqueEnemigo) {
        resultado = "EMPATE"
        pResultado.style.background = "darkgrey"
    } else if (ataqueJugador == "Fuego" && ataqueEnemigo == "Agua") {
        vidasEnemigo--
        vidasEnemigoSpan.innerHTML = vidasEnemigo
        resultado = "¡GANASTE!"
        pResultado.style.background = "lightgreen"
    } else if (ataqueJugador == "Agua" && ataqueEnemigo == "Tierra") {
        vidasEnemigo--
        vidasEnemigoSpan.innerHTML = vidasEnemigo
        resultado = "¡GANASTE!"
        pResultado.style.background = "lightgreen"
    } else if (ataqueJugador == "Tierra" && ataqueEnemigo == "Fuego") {
        vidasEnemigo--
        vidasEnemigoSpan.innerHTML = vidasEnemigo
        resultado = "¡GANASTE!"
        pResultado.style.background = "lightgreen"
    } else {
        vidasJugador--
        vidasJugadorSpan.innerHTML = vidasJugador
        resultado = "PERDISTE"
        pResultado.style.background = "indianred"
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
    pResultado.innerHTML = resultado
    botonReiniciar.style.display =""
    divAtaques.style.display="none"
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener("load", startGame)