const express = require("express")
const cors = require("cors")
const e = require("express")

const app = express()
app.use(cors())
app.use(express.json())

class Jugador {
    constructor(id, nombreMascota=""){
        this.id = id
        this.nombreMascota = nombreMascota
    }

    asignarMascota(mokepon){
        this.mascota = mokepon
    }
}

class Mokepon {
    constructor(nombre, vidas){
        this.nombre = nombre
        this.vidas = vidas
        this.ataque = ""
        this.ataques = []
        this.fought = false
    }
    
    actualizarPosicion(x,y){
        this.x = x
        this.y = y
    }
}

function asignarMascota(jugador, nombre){
    let mascota
    if(nombre == "Ratigueya"){
        mascota = new Mokepon("Ratigueya", vidas = 3)
    }else if(nombre == "Capipepo"){
        mascota = new Mokepon("Capipepo", vidas = 3)
    }else if(nombre == "Hipodoge"){
        mascota = new Mokepon("Hipodoge", vidas = 3)
    }
    jugador.asignarMascota(mascota)
}

function batallaSecuencial(jugador1, jugador2){
    for (let index = 0; index < jugador1.mascota.ataques.length; index++) {
        if(jugador1.mascota.vidas > 0 && jugador2.mascota.vidas > 0){
            const ataque1 = jugador1.mascota.ataques[index]
            const ataque2 = jugador2.mascota.ataques[index]
            if (ataque1 == "Fuego 🔥" && ataque2 == "Tierra 🌱") {
                jugador2.mascota.vidas-=1
            } else if (ataque1 == "Agua 💧" && ataque2 == "Fuego 🔥") {
                jugador2.mascota.vidas-=1
            } else if (ataque1 == "Tierra 🌱" && ataque2 == "Agua 💧") {
                jugador2.mascota.vidas-=1
            } else if(ataque1 != ataque2){
                jugador1.mascota.vidas-=1
            }
        }
    }
    jugador1.fought = true
    jugador2.fought = true
}

function eliminarJugador(){
    console.log(jugadores)
    for (let index = 0; index < jugadores.length; index++) {
        const element = jugadores[index]
        if(element.mascota != undefined){
            if(element.mascota.vidas == 0){
                jugadores.splice(index, 1)
            }   
        }
    }
}

const jugadores = []

app.get("/start", (req,res) => {
    const id = `${Math.random()}`
    const jugador = new Jugador(id)
    jugadores.push(jugador)
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(id)
})

app.post("/mokepon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId
    const jugador = jugadores.find((element) => element.id == jugadorId)
    const mokepon = req.body.mokepon.nombre
    jugador.nombreMascota = mokepon
    asignarMascota(jugador, jugador.nombreMascota)
    res.end()
})

app.post("/mokepon/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId
    const jugador = jugadores.find((element) => element.id == jugadorId)
    const x = req.body.x || 0
    const y = req.body.y || 0
    jugador.mascota.actualizarPosicion(x, y)
    const enemigos = jugadores.filter((element) => jugador.id != element.id)
    res.send(
        {
            enemigos
        }
    )
})

app.post("/mokepon/:jugadorId/ataque", (req, res) => {
    const jugador = jugadores.find((element) => element.id == req.params.jugadorId)
    const ataque = req.body.ataque
    const enemigo = jugadores.find((element) => element.id == req.body.enemigo.id)
    jugador.mascota.ataques.push(ataque)
    if(jugador.mascota.ataques.length == 5 && enemigo.mascota.ataques.length == 5){
        batallaSecuencial(jugador, enemigo)
    }
    res.end()
})

app.get("/mokepon/:jugadorId/versus/:enemigoId", (req, res) => {
    const jugador = jugadores.find((element) => element.id == req.params.jugadorId)
    const enemigo = jugadores.find((element) => element.id == req.params.enemigoId)
    if(jugador.fought && enemigo.fought){
        res.send({
            jugador: jugador,
            enemigo: enemigo
        })
    }else{
        res.send(false)
    }
})

app.post("/eliminar", (req, res) => {
    eliminarJugador()
    jugador = jugadores.find((element) => element.id == req.body.jugador.id)
    asignarMascota(jugador, jugador.mascota.nombre)
    const enemigos = jugadores.filter((element) => element.id != req.body.jugador.id)
    res.send(
        {
            enemigos
        }
    )
})

app.listen(8080, () => {
    console.log("Servidor activo!")
})