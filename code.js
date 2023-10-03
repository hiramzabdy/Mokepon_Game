//game global variables
let ataqueEnemigo
let ataqueJugador
let vidasJugador = 3
let vidasEnemigo = 3
let mascotaJugador
let mascotaEnemigo
//mokepones
let mokepones = []
let inputsMokepones = []
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
botonMascota.addEventListener("click", seleccionarMascota)
/*botonFuego.addEventListener("click", seleccionarFuego)
botonAgua.addEventListener("click", seleccionarAgua)
botonTierra.addEventListener("click", seleccionarTierra)*/
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
    
    hipodoge.ataques.push(
        {nombre: "Agua 💧", id: "boton-agua"},
        {nombre: "Agua 💧", id: "boton-agua"},
        {nombre: "Agua 💧", id: "boton-agua"},
        {nombre: "Fuego 🔥", id: "boton-fuego"},
        {nombre: "Tierra 🌱", id: "boton-tierra"}
    )
    capipepo.ataques.push(
        {nombre: "Tierra 🌱", id: "boton-tierra"},
        {nombre: "Tierra 🌱", id: "boton-tierra"},
        {nombre: "Tierra 🌱", id: "boton-tierra"},
        {nombre: "Fuego 🔥", id: "boton-fuego"},
        {nombre: "Agua 💧", id: "boton-agua"}
    )
    ratigueya.ataques.push(
        {nombre: "Fuego 🔥", id: "boton-fuego"},
        {nombre: "Fuego 🔥", id: "boton-fuego"},
        {nombre: "Fuego 🔥", id: "boton-fuego"},
        {nombre: "Agua 💧", id: "boton-agua"},
        {nombre: "Tierra 🌱", id: "boton-tierra"}
    )

    mokepones.push(hipodoge, capipepo, ratigueya)
}

function estructurarMokepones(){

    mokepones.forEach((mokepon) => {
        htmlMokepones = `
        <input type="radio" , name="mascota" , id=${mokepon.nombre} />
        <label for=${mokepon.nombre} , class="tarjeta-mokepon">
            <p>${mokepon.nombre}</p>
            <img src="${mokepon.imagen}" alt="Imagen de ${mokepon.nombre}">
        </label>
        `
        divTarjetas.innerHTML += htmlMokepones
    })
    mokepones.forEach((mokepon) => {
        let idMokepon = document.getElementById(mokepon.nombre)
        inputsMokepones.push(idMokepon)
    })
}

function seleccionarMascota() {

    let mokeponReady = false
    i=0
    inputsMokepones.forEach((mokeponInput) => {    
        if (mokeponInput.checked){
            mascotaJugador = mokepones[i]
            mokeponReady = true
        }
        i+=1
    })
    if (mokeponReady){
        seleccionarMascotaEnemigo()
        mostrarAtaques()
    }else{
        alert("No seas gey!")
    }

}

function mostrarAtaques(){
    ataques = mascotaJugador.ataques
    ataques.forEach(ataque => {
      divAtaques.innerHTML += `
      <button id="${ataque.id}" class="boton-ataque">${ataque.nombre}</button>
      `  
    })

}

function seleccionarMascotaEnemigo() {
    sectionPetsScreen.style.display = "none"
    let rng = aleatorio(0, mokepones.length -1)
    mascotaEnemigo = mokepones[rng]
    sectionGameScreen.style.display = "flex"
    agregarImagenesMascotas()
}

function agregarImagenesMascotas(){
    let miniaturaJugador = document.getElementById("miniatura-jugador")
    let miniaturaEnemigo = document.getElementById("miniatura-enemigo")

    miniaturaJugador.src = mascotaJugador.miniatura
    miniaturaJugador.alt = mascotaJugador.nombre

    miniaturaEnemigo.src = mascotaEnemigo.miniatura
    miniaturaEnemigo.alt = mascotaEnemigo.nombre
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