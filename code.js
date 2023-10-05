//game global variables
let ataqueJugador
let ataquesJugador = []
let ataqueEnemigo
let ataquesEnemigo = []
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
const botonReiniciar = document.getElementById("boton-reiniciar")
botonMascota.addEventListener("click", seleccionarMascota)
botonReiniciar.addEventListener("click", reiniciarJuego)
//botones de ataque
let botonesAtaques = []


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
    }else{
        alert("No seas gey!")
    }

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
    mostrarAtaques()
}

function mostrarAtaques(){
    ataques = mascotaJugador.ataques
    ataques.forEach(ataque => {
      divAtaques.innerHTML += `
      <button class="boton-ataque">${ataque.nombre}</button>
      `  
    })
    botonesAtaques = document.querySelectorAll(".boton-ataque")
    seleccionarAtaques()
}

function seleccionarAtaques(){
    botonesAtaques.forEach(boton => {
        boton.addEventListener("click", (e) => {
            ataquesJugador.push(e.target.textContent)
            ataqueJugador = e.target.textContent
            boton.style.background = "#112f58"
            boton.disabled = true
            seleccionarAtaqueEnemigo()
        })
    });
}

function seleccionarAtaqueEnemigo() {
    rng = aleatorio(0, [mascotaEnemigo.ataques.length -1])
    ataqueEnemigo = mascotaEnemigo.ataques[rng].nombre
    ataquesEnemigo.push(ataqueEnemigo)
    mascotaEnemigo.ataques.splice(rng, 1)
    crearMensajeCombate()
}

function crearMensajeCombate() {
    let parrafoJugador = document.createElement("p")
    let parrafoEnemigo = document.createElement("p")
    let resultado = combate()
    parrafoJugador.innerHTML = "Ataque del jugador: " + ataqueJugador
    parrafoEnemigo.innerHTML = "Ataque del enemigo: " + ataqueEnemigo
    mensajesJugador.appendChild(parrafoJugador)
    mensajesEnemigo.appendChild(parrafoEnemigo)
    pResultado.innerHTML = resultado
    revisarAtaquesRestantes()
}

function combate() {
    let resultado
    if (ataqueJugador == ataqueEnemigo) {
        resultado = "EMPATE"
        pResultado.style.background = "darkgrey"
    } else if (ataqueJugador == "Fuego 🔥" && ataqueEnemigo == "Tierra 🌱") {
        vidasEnemigo--
        vidasEnemigoSpan.innerHTML = vidasEnemigo
        resultado = "¡GANASTE!"
        pResultado.style.background = "lightgreen"
    } else if (ataqueJugador == "Agua 💧" && ataqueEnemigo == "Fuego 🔥") {
        vidasEnemigo--
        vidasEnemigoSpan.innerHTML = vidasEnemigo
        resultado = "¡GANASTE!"
        pResultado.style.background = "lightgreen"
    } else if (ataqueJugador == "Tierra 🌱" && ataqueEnemigo == "Agua 💧") {
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

function revisarAtaquesRestantes(){
    if (vidasJugador != 0 || vidasEnemigo != 0){
        if (mascotaEnemigo.ataques.length == 0){
            if (vidasJugador > vidasEnemigo){
                crearMensajeFinal("Ganaste el juego")
                pResultado.style.background = "lightgreen"
            }else if (vidasJugador < vidasEnemigo){
                crearMensajeFinal("Perdiste el juego")
                pResultado.style.background = "indianred"
            }else if (vidasJugador == vidasEnemigo){
                crearMensajeFinal("Empataste el juego")
                pResultado.style.background = "darkgrey"
            }
        }
    }
    if (vidasJugador == 0){
        crearMensajeFinal("¡PERDISTE EL JUEGO!")
    }else if (vidasEnemigo == 0){
        crearMensajeFinal("¡GANASTE EL JUEGO!")
    }
}

function crearMensajeFinal(resultado){
    botonesAtaques.forEach(boton => {
        boton.style.background = "#112f58"
        boton.disabled = true
    });
    pResultado.innerHTML = resultado
    botonReiniciar.style.display =""
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener("load", startGame)