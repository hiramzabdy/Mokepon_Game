const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

class Jugador {
    constructor(id, vidas = 3){
        this.id = id
        this.ataques = []
        this.vidas = vidas
        this.fought = false
    }

    asignarMascota(mokepon){
        this.mascota = mokepon
    }

    actualizarPosicion(x,y){
        this.x = x
        this.y = y
    }

}

class Mokepon {
    constructor(nombre){
        this.nombre = nombre
    }
}

function batalla(jugador1, jugador2){
    const jugadorUno = jugador1
    const jugadorDos = jugador2
    for (let index = 0; index < jugador1.ataques.length; index++) {
        const ataque1 = jugadorUno.ataques[index]
        const ataque2 = jugadorDos.ataques[index]
        if (ataque1 == "Fuego 🔥" && ataque2 == "Tierra 🌱") {
            jugador2.vidas--
        } else if (ataque1 == "Agua 💧" && ataque2 == "Fuego 🔥") {
            jugador2.vidas--
        } else if (ataque1 == "Tierra 🌱" && ataque2 == "Agua 💧") {
            jugador2.vidas--
        } else {
            jugador1.vidas--
        }
    }
    jugadorUno.fought = true
    jugadorDos.fought = true
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
    const jugadorId = req.params.jugadorId || "noHayNoExiste"
    const mascota = req.body.mokepon || "tampocoHayTampocoExiste"
    const mokepon = new Mokepon(mascota.nombre)
    const indexJugador = jugadores.findIndex((jugador) => jugador.id == jugadorId)

    if(indexJugador >= 0){
        jugadores[indexJugador].asignarMascota(mokepon)
    }
    
    res.end()
})


app.post("/mokepon/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || "noHayNoExiste"
    const x = req.body.x || 0
    const y = req.body.y || 0
    const indexJugador = jugadores.findIndex((jugador) => jugador.id == jugadorId)
    if(indexJugador >= 0){
        jugadores[indexJugador].actualizarPosicion(x,y)
    }
    const enemigos = jugadores.filter((jugador) => jugadorId != jugador.id)
    res.send(
        {
            enemigos
        }
    )
})

app.post("/mokepon/:jugadorId/ataque", (req, res) => {
    const jugadorId = req.params.jugadorId
    const ataque = req.body.ataque
    const enemigoId = req.body.enemigo.id
    const jugador = jugadores.find((jugador) => jugador.id == jugadorId)
    const enemigo = jugadores.find((jugador) => jugador.id == enemigoId)
    jugador.ataques.push(ataque)
    if(jugador.ataques.length == 5 && enemigo.ataques.length == 5){
        batalla(jugador, enemigo)
    }
    res.end()
})

app.get("/mokepon/:jugadorId/versus/:enemigoId", (req, res) => {
    const jugadorId = req.params.jugadorId
    const enemigoId = req.params.enemigoId
    const jugador = jugadores.find((jugador) => jugador.id == jugadorId)
    const enemigo = jugadores.find((jugador) => jugador.id == enemigoId)
    if(jugador.fought && enemigo.fought){
        res.send({
            jugador: jugador,
            enemigo: enemigo
        })
    }else{
        res.send(false)
    }
})

app.listen(8080, () => {
    console.log("Servidor activo!")
})