//game global variables
let jugador
let enemigo
let ataqueJugador
let ataqueEnemigo
let vidasJugador
let vidasEnemigo
let intervalo
//mokepones
let enemigosOnline = []
let mokepones = []
let inputsMokepones = []
let htmlMokepones
let botonesAtaques = []
const listaAtaques = [{nombre: "Fuego 🔥", class: "boton-fuego"}, {nombre: "Agua 💧", class: "boton-agua"},{nombre: "Tierra 🌱", class: "boton-tierra"}]
let mokeponDisperso = false
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
    constructor(nombre, imagen, miniatura, vidas, attackCount){
        this.nombre = nombre
        this.imagen = imagen
        this.miniatura = miniatura
        this.vidas = vidas
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

function crearMokepones(){
    let hipodoge = new Mokepon("Hipodoge", "./assets/mokepones/hipodoge.png", "./assets/thumbnails/hipodoge.png", vidas = 3, [1,3,1])
    let capipepo = new Mokepon("Capipepo", "./assets/mokepones/capipepo.png", "./assets/thumbnails/capipepo.png", vidas = 3, [1,1,3])
    let ratigueya = new Mokepon("Ratigueya", "./assets/mokepones/ratigueya.png", "./assets/thumbnails/ratigueya.png", vidas = 3, [3,1,1])
    mokepones.push(hipodoge,capipepo,ratigueya)
    //Adds atacks to mokepon acording to the attackCount
    mokepones.forEach(mokepon => {
        agregarAtaques(mokepon)
    });
    estructurarMokepones()
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
            let mascota = new Mokepon(mokepones[i].nombre, mokepones[i].imagen, mokepones[i].miniatura, mokepones[i].vidas, mokepones[i].attackCount)
            jugador.asignarMascota(mascota)
            mokeponReady = true
        }else{
            i+=1
        }
    })
    if (mokeponReady){
        agregarAtaques(jugador.mascota)
        enviarMascotaBackend(jugador.mascota)
    }
}

// funciones para mapa

function mostrarMapa(){
    window.addEventListener("keydown", teclaMovimiento)
    window.addEventListener("keyup", detenerMascota)
    sectionMapScreen.style.display = "flex"
    mokeMap.width = 500
    mokeMap.height = 500
    intervalo = setInterval(dibujarMapa, 50)
}

function dibujarMapa(){
    if(mokeponDisperso != true){
        dispersarMokepon(jugador.mascota)
        mokeponDisperso = true
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
    jugador.mascota.dibujarMascota()
    enviarCoordenadasBackend(jugador.mascota.x, jugador.mascota.y)
    enemigosOnline.forEach(enemigo => {
        enemigo.mascota.dibujarMascota()
        toparseEnemigo(enemigo)
    })
}

function toparseEnemigo(enemigoTopado){
    if(enemigoTopado.mascota.x != undefined){
        const arribaEnemigo = enemigoTopado.mascota.y
        const abajoEnemigo = enemigoTopado.mascota.y + enemigoTopado.mascota.height
        const izquierdaEnemigo = enemigoTopado.mascota.x
        const derechaEnemigo = enemigoTopado.mascota.x + enemigoTopado.mascota.width
        const abajoJugador = jugador.mascota.y + jugador.mascota.height
        const arribaJugador = jugador.mascota.y
        const derechaJugador = jugador.mascota.x + jugador.mascota.width
        const izquierdaJugador = jugador.mascota.x
        if(abajoJugador < arribaEnemigo || arribaJugador > abajoEnemigo || derechaJugador < izquierdaEnemigo || izquierdaJugador > derechaEnemigo){
            return
        }
        clearInterval(intervalo)
        enemigo = enemigoTopado
        agregarImagenesMascotas()
    }
}

function botonMovimiento(direction){
    switch (direction) {
        case "up":
            jugador.mascota.y -= 10 
            break;
        case "down":
            jugador.mascota.y += 10
            break;
        case "right":
            jugador.mascota.x += 10
            break;
        case "left":
            jugador.mascota.x -= 10
    }
}

function teclaMovimiento(tecla){

    if(tecla.key == "ArrowUp" || tecla.key == "w"){
        jugador.mascota.ySpeed = -10
    }else if(tecla.key == "ArrowDown" || tecla.key == "s"){
        jugador.mascota.ySpeed = 10
    }else if(tecla.key == "ArrowRight" || tecla.key == "d"){
        jugador.mascota.xSpeed = 10
    }else if(tecla.key == "ArrowLeft" || tecla.key == "a"){
        jugador.mascota.xSpeed = -10
    }
}

function detenerMascota(eje="button"){
    if(eje == "button"){
        jugador.mascota.ySpeed = 0
        jugador.mascota.xSpeed = 0
    }else if(eje.key== "ArrowUp" || eje.key == "ArrowDown" || eje.key== "w" || eje.key == "s"){
        jugador.mascota.ySpeed = 0
    }else{
        jugador.mascota.xSpeed = 0
    }
}

function agregarImagenesMascotas(){
    vidasJugador = jugador.mascota.vidas
    vidasEnemigo = enemigo.mascota.vidas
    vidasEnemigoSpan.innerHTML = vidasJugador
    vidasEnemigoSpan.innerHTML = vidasEnemigo
    let miniaturaJugador = document.getElementById("miniatura-jugador")
    let miniaturaEnemigo = document.getElementById("miniatura-enemigo")
    miniaturaJugador.src = jugador.mascota.miniatura
    miniaturaJugador.alt = jugador.mascota.nombre
    miniaturaEnemigo.src = enemigo.mascota.miniatura
    miniaturaEnemigo.alt = enemigo.mascota.nombre
    sectionMapScreen.style.display = "none"
    sectionGameScreen.style.display = "flex"
    mostrarAtaques()
}

function mostrarAtaques(){
    divAtaques.innerHTML = ""
    ataques = jugador.mascota.ataques
    ataques.forEach(ataque => {
      divAtaques.innerHTML += `
      <button class="boton-ataque ${ataque.class}">${ataque.nombre}</button>
      `  
    })
    botonesAtaques = document.querySelectorAll(".boton-ataque")
    seleccionarAtaques()
}

// funciones para combate

function seleccionarAtaques(){
    let i = 0
    botonesAtaques.forEach(boton => {
        boton.addEventListener("click", (e) => {
            ataqueJugador = e.target.textContent
            boton.style.background = "#112f58"
            boton.disabled = true
            enviarAtaqueBackend()
        })
        i += 1
    })
    if(i == 5){
        intervaloResultado = setInterval(resultadoBatallaBackend, 1000)
    }
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

function revisarVictoria(res){
    clearInterval(intervaloResultado)
    console.log(res)
    vidasJugador = res.jugador.mascota.vidas
    vidasEnemigo = res.enemigo.mascota.vidas
    vidasJugadorSpan.innerHTML = vidasJugador
    vidasEnemigoSpan.innerHTML = vidasEnemigo

    if(vidasJugador <= 0){
        crearMensajeFinal("Perdiste el juego")
        pResultado.style.background = "indianred"
    }else if(vidasJugador > 0 && vidasJugador == vidasEnemigo){
        crearMensajeFinal("Empataste el juego")
        pResultado.style.background = "darkgrey"
    }else{
        crearMensajeFinal("Ganaste el juego")
        pResultado.style.background = "darkgreen"
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
    if(vidasJugador > 0){
        fetch("http://localhost:8080/eliminar", {
            method: "post",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({
                jugador: jugador
            })
        })
            .then((res) => {
                if(res.ok){
                    res.json()
                        .then(function(res){
                            filtrarEnemigos(res.enemigos)
                            sectionGameScreen.style.display = "none"
                            jugador.mascota.vidas = 3
                            agregarAtaques(jugador.mascota)
                            mostrarMapa()
                        })
                }
            })
    }else{
        location.reload()
    }
}

// Backend

function unirseAlJuego(){
    fetch("http://localhost:8080/start")
        .then(function(res){
            if(res.ok){
                res.text()
                .then(function(respuesta){
                    console.log(respuesta)
                    jugador = new Jugador(respuesta)
                })
            }
        })
}

function enviarMascotaBackend(){
    fetch(`http://localhost:8080/mokepon/${jugador.id}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                mokepon: jugador.mascota
            }
        )
    })
        .then(function(){
            sectionPetsScreen.style.display = "none"
            mostrarMapa()
        })
}

function enviarCoordenadasBackend(x,y){
    fetch(`http://localhost:8080/mokepon/${jugador.id}/posicion`, {
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

function resultadoBatallaBackend(){
    console.log("Esperando respuesta")
    fetch(`http://localhost:8080/mokepon/${jugador.id}/versus/${enemigo.id}`)
        .then(function(res){
            if(res.ok){
                res.json()
                    .then(function(res){
                        if(res != []){
                            if(res){
                                console.log(res)
                                revisarVictoria(res)
                            }
                        }
                    })
            }
        })
}

function enviarAtaqueBackend(){
    fetch(`http://localhost:8080/mokepon/${jugador.id}/ataque`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataque: ataqueJugador,
            enemigo: enemigo
        })
    })
}

// Utilidades

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

function comprobarBordes(){
    //Prevents mokepon to go outer the map
    if(jugador.mascota.x < mokeMap.width - jugador.mascota.width){
        jugador.mascota.x+=jugador.mascota.xSpeed
    }else if(jugador.mascota.xSpeed < 0){
        jugador.mascota.x+=jugador.mascota.xSpeed
    }
    if(jugador.mascota.y < mokeMap.height - jugador.mascota.height){
        jugador.mascota.y+=jugador.mascota.ySpeed
    }else if(jugador.mascota.ySpeed < 0){
        jugador.mascota.y+=jugador.mascota.ySpeed
    }
    if(jugador.mascota.x < 0){
        jugador.mascota.x = 0
    }
    if(jugador.mascota.y < 0){
        jugador.mascota.y = 0
    }
}

function dispersarMokepon(mokepon){
    mokepon.x = aleatorio(mokepon.width, mokeMap.width-mokepon.width)
    mokepon.y = aleatorio(mokepon.height, mokeMap.height-mokepon.height)
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
        let enemigoxd = new Jugador (enemigoOnline.id)
        let mascota
        if(enemigoOnline.mascota.nombre == "Ratigueya"){
            mascota = new Mokepon("Ratigueya", "./assets/mokepones/ratigueya.png", "./assets/thumbnails/ratigueya.png", vidas = 3, [3,1,1])
        }else if(enemigoOnline.mascota.nombre == "Capipepo"){
            mascota = new Mokepon("Capipepo", "./assets/mokepones/capipepo.png", "./assets/thumbnails/capipepo.png", vidas = 3, [1,1,3])
        }else if(enemigoOnline.mascota.nombre == "Hipodoge"){
            mascota = new Mokepon("Hipodoge", "./assets/mokepones/hipodoge.png", "./assets/thumbnails/hipodoge.png", vidas = 3, [1,3,1])
        }
        agregarAtaques(mascota)
        enemigoxd.asignarMascota(mascota)
        enemigoxd.mascota.x = enemigoOnline.mascota.x
        enemigoxd.mascota.y = enemigoOnline.mascota.y
        enemigosUnicos.push(enemigoxd)
    });
    enemigosOnline = enemigosUnicos
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener("load", iniciarJuego)