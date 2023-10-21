//game global variables
let jugador
let jugadorId = null
let ataqueJugador
let ataqueEnemigo
let mascotaJugador
let mascotaEnemigo
let vidasJugador = 3
let vidasEnemigo = 3
let intervalo
//mokepones
let enemigosOnline = []
let mokepones = []
let inputsMokepones = []
let htmlMokepones
let botonesAtaques = []
const listaAtaques = [{nombre: "Fuego 🔥", class: "boton-fuego"}, {nombre: "Agua 💧", class: "boton-agua"},{nombre: "Tierra 🌱", class: "boton-tierra"}]
let mokeponesDispersos = false
//html sections
const sectionPetsScreen = document.getElementById("pets-screen")
const sectionMapScreen = document.getElementById("map-screen")
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
//events listeners
botonMascota.addEventListener("click", seleccionarMascota)
botonReiniciar.addEventListener("click", reiniciarJuego)
//canvas drawing
const mokeMap = document.getElementById("mapa")
const lienzo = mokeMap.getContext("2d")
const mapBackground = new Image()
mapBackground.src = "./assets/mokemap.png"
let originalMapSize

class Jugador {
    constructor(id){
        this.id = id
    }
    asignarMascota(mascota){
        this.mascota = mascota
    }
}

class Mokepon {
    constructor(nombre, imagen, miniatura, vida, attackCount){
        this.nombre = nombre
        this.imagen = imagen
        this.miniatura = miniatura
        this.vida = vida
        this.attackCount = attackCount
        this.ataques = []
        //for canvas
        this.height = 50
        this.width = 50
        this.x = 0
        this.y = 0
        this.xSpeed = 0
        this.ySpeed = 0
        this.mapIcon = new Image()
        this.mapIcon.src = miniatura
        this.mapIcon.alt = nombre
    }

    dibujarMascota(){
        lienzo.drawImage(
            this.mapIcon,
            this.x,
            this.y,
            this.height,
            this.width
        )
    }
}

function iniciarJuego(){
    crearMokepones()
    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://localhost:8080/start")
        .then(function(res){
            if(res.ok){
                res.text()
                .then(function(respuesta){
                    console.log(respuesta)
                    jugadorId = respuesta
                    jugador = new Jugador(respuesta)
                })
            }
        })
}

function crearMokepones(){
    let hipodoge = new Mokepon("Hipodoge", "./assets/mokepones/hipodoge.png", "./assets/thumbnails/hipodoge.png", vida = 5, [1,3,1])
    let capipepo = new Mokepon("Capipepo", "./assets/mokepones/capipepo.png", "./assets/thumbnails/capipepo.png", vida = 5, [1,1,3])
    let ratigueya = new Mokepon("Ratigueya", "./assets/mokepones/ratigueya.png", "./assets/thumbnails/ratigueya.png", vida = 5, [3,1,1])
    mokepones.push(hipodoge,capipepo,ratigueya)

    //Adds atacks to mokepon acording to the attackCount
    mokepones.forEach(mokepon => {
        agregarAtaques(mokepon)
    });
    estructurarMokepones()
}

function agregarAtaques(aQuien){
    let ataquesMokepon = []
    for (let index = 0; index < aQuien.attackCount.length; index++) {
        const noAtaques = aQuien.attackCount[index];
        for (let i = 0; i < noAtaques; i++) {
            ataque = listaAtaques[index]
            ataquesMokepon.push(ataque)
        }
    }
    aQuien.ataques = ataquesMokepon
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

    mokepones.forEach((inputMokepon) => {
        let mokepon = document.getElementById(inputMokepon.nombre)
        inputsMokepones.push(mokepon)
    })
}

function seleccionarMascota() {
    let mokeponReady = false
    i=0
    inputsMokepones.forEach((mokepon) => {    
        if (mokepon.checked){
            mascotaJugador = new Mokepon(mokepones[i].nombre, mokepones[i].imagen, mokepones[i].miniatura, mokepones[i].vida, mokepones[i].attackCount)
            jugador.asignarMascota(mascotaJugador)
            mokeponReady = true
        }else{
            i+=1
        }
    })
    if (mokeponReady){
        agregarAtaques(mascotaJugador)
        enviarMascotaBackend(mascotaJugador)
        sectionPetsScreen.style.display = "none"
        mostrarMapa()
    }
}

function enviarMascotaBackend(mascotaJugador){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                mokepon: mascotaJugador
            }
        )
    })
}

// funciones para mapa

function mostrarMapa(){
    sectionMapScreen.style.display = "flex"
    window.addEventListener("keydown", teclaMovimiento)
    window.addEventListener("keyup", detenerMascota)
    mokeMap.width = 500
    mokeMap.height = 500
    intervalo = setInterval(dibujarMapa, 50)
}

function comprobarBordes(){
    //Prevents mokepon to go outer the map
    if(mascotaJugador.x < mokeMap.width - mascotaJugador.width){
        mascotaJugador.x+=mascotaJugador.xSpeed
    }else if(mascotaJugador.xSpeed < 0){
        mascotaJugador.x+=mascotaJugador.xSpeed
    }
    if(mascotaJugador.y < mokeMap.height - mascotaJugador.height){
        mascotaJugador.y+=mascotaJugador.ySpeed
    }else if(mascotaJugador.ySpeed < 0){
        mascotaJugador.y+=mascotaJugador.ySpeed
    }
    if(mascotaJugador.x < 0){
        mascotaJugador.x = 0
    }
    if(mascotaJugador.y < 0){
        mascotaJugador.y = 0
    }
}

function dibujarMapa(){
    if(mokeponesDispersos != true){
        dispersarEnemigos(mascotaJugador)
        mokeponesDispersos = true
    }
    lienzo.clearRect(0,0, mokeMap.width, mokeMap.height)
    lienzo.drawImage(
        mapBackground,
        0,
        0,
        mokeMap.width,
        mokeMap.height
    )

    comprobarBordes()
    mascotaJugador.dibujarMascota()
    enviarCoordenadasBackend(mascotaJugador.x, mascotaJugador.y)
    enemigosOnline.forEach(enemigo => {
        enemigo.mascota.dibujarMascota()
        toparseEnemigo(enemigo.mascota)
    });
}

function enviarCoordenadasBackend(x,y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
        .then(function(res) {
            if(res.ok){
                res.json()
                    .then(function(res){
                        filtrarEnemigos(res.enemigos)
                    })
            }
        })

}

function filtrarEnemigos(enemigos){
    enemigosFiltrados = []
    enemigos.forEach(enemigo => {
        if(enemigo.mascota != undefined){
            enemigosFiltrados.push(enemigo)
        }
    });
    crearMokeponOnline(enemigosFiltrados)
}

function crearMokeponOnline(listaEnemigosOnline){
    let enemigosUnicos = []
    listaEnemigosOnline.forEach(enemigoOnline => {
        let enemigo = new Jugador (enemigoOnline.id)
        let mascota
        if(enemigoOnline.mascota.nombre == "Ratigueya"){
            mascota = new Mokepon("Ratigueya", "./assets/mokepones/ratigueya.png", "./assets/thumbnails/ratigueya.png", vida = 5, [3,1,1])
        }else if(enemigoOnline.mascota.nombre == "Capipepo"){
            mascota = new Mokepon("Capipepo", "./assets/mokepones/capipepo.png", "./assets/thumbnails/capipepo.png", vida = 5, [1,1,3])
        }else if(enemigoOnline.mascota.nombre == "Hipodoge"){
            mascota = new Mokepon("Hipodoge", "./assets/mokepones/hipodoge.png", "./assets/thumbnails/hipodoge.png", vida = 5, [1,3,1])
        }
        agregarAtaques(mascota)
        enemigo.asignarMascota(mascota)
        enemigo.mascota.x = enemigoOnline.x
        enemigo.mascota.y = enemigoOnline.y
        enemigosUnicos.push(enemigo)
    });
    enemigosOnline = enemigosUnicos
}

function dispersarEnemigos(enemigo){
    enemigo.x = aleatorio(enemigo.width, mokeMap.width-enemigo.width)
    enemigo.y = aleatorio(enemigo.height, mokeMap.height-enemigo.height)
}

function toparseEnemigo(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.height
    const izquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.width
    const abajoJugador = mascotaJugador.y + mascotaJugador.height
    const arribaJugador = mascotaJugador.y
    const derechaJugador = mascotaJugador.x + mascotaJugador.width
    const izquierdaJugador = mascotaJugador.x
    if(abajoJugador < arribaEnemigo || arribaJugador > abajoEnemigo || derechaJugador < izquierdaEnemigo || izquierdaJugador > derechaEnemigo){
        return
    }
    clearInterval(intervalo)
    //alert("Es hora de pelear!")
    mascotaEnemigo = enemigo
    agregarImagenesMascotas()
}

function botonMovimiento(direction){
    switch (direction) {
        case "up":
            mascotaJugador.y -= 10 
            break;
        case "down":
            mascotaJugador.y += 10
            break;
        case "right":
            mascotaJugador.x += 10
            break;
        case "left":
            mascotaJugador.x -= 10
    }
}

function teclaMovimiento(tecla){

    if(tecla.key == "ArrowUp" || tecla.key == "w"){
        mascotaJugador.ySpeed = -10
    }else if(tecla.key == "ArrowDown" || tecla.key == "s"){
        mascotaJugador.ySpeed = 10
    }else if(tecla.key == "ArrowRight" || tecla.key == "d"){
        mascotaJugador.xSpeed = 10
    }else if(tecla.key == "ArrowLeft" || tecla.key == "a"){
        mascotaJugador.xSpeed = -10
    }
}

function detenerMascota(eje="button"){
    if(eje == "button"){
        mascotaJugador.ySpeed = 0
        mascotaJugador.xSpeed = 0
    }else if(eje.key== "ArrowUp" || eje.key == "ArrowDown" || eje.key== "w" || eje.key == "s"){
        mascotaJugador.ySpeed = 0
    }else{
        mascotaJugador.xSpeed = 0
    }
}

// funciones para combate

function agregarImagenesMascotas(){
    let miniaturaJugador = document.getElementById("miniatura-jugador")
    let miniaturaEnemigo = document.getElementById("miniatura-enemigo")
    miniaturaJugador.src = mascotaJugador.miniatura
    miniaturaJugador.alt = mascotaJugador.nombre
    miniaturaEnemigo.src = mascotaEnemigo.miniatura
    miniaturaEnemigo.alt = mascotaEnemigo.nombre
    sectionMapScreen.style.display = "none"
    sectionGameScreen.style.display = "flex"
    mostrarAtaques()
}

function mostrarAtaques(){
    ataques = mascotaJugador.ataques
    ataques.forEach(ataque => {
      divAtaques.innerHTML += `
      <button class="boton-ataque ${ataque.class}">${ataque.nombre}</button>
      `  
    })
    botonesAtaques = document.querySelectorAll(".boton-ataque")
    seleccionarAtaques()
}

function seleccionarAtaques(){
    botonesAtaques.forEach(boton => {
        boton.addEventListener("click", (e) => {
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
    revisarVictoria()
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

function revisarVictoria(){
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

window.addEventListener("load", iniciarJuego)