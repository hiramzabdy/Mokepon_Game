const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

class Jugador {
    constructor(id, ataque=""){
        this.id = id
        this.ataque = ataque
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
    const indexJugador = jugadores.findIndex((jugador) => jugador.id == jugadorId)
    if(indexJugador >= 0){
        let jugadorxd = jugadores[indexJugador]
        jugadores[indexJugador].ataque = ataque
        console.log(jugadorxd)
    }
    res.end()
})

app.listen(8080, () => {
    console.log("Servidor activo!")
})