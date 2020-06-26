const express = require('express')
const app = express()
const cors = require('cors')
const randomBomb = require('./helpers/boardGame.js')

app.use(express.json())
app.use(cors())

const http = require('http').createServer(app)
const io = require('socket.io')(http)

const rooms = [
  {
    id: 1,
    name: "Demo Room",
    players: [
      { name: 'Admin', isPlaying: true, isWinner: false, isMaster: true }
    ],
    bombs: randomBomb(10),
    isFull: false,
    turn: 0
  }
]

io.on('connection', (socket) => {
  console.log('A new user connected');
  for(var i = 0; i < rooms.length - 1; i++) {
    if(rooms[i].players.length > 3) {
      rooms[i].isFull = true      
    }
  }
  io.emit("rooms", rooms)

  io.on("rooms", function  () {
    console.log("emitRoom")
    io.emit("rooms", rooms)
  })
  
  socket.on("newRoom", function (room) {
    const bombs = randomBomb(10)
    console.log('New BOMBS', bombs)
    room.bombs = bombs
    rooms.push(room)
    console.log('ALLROOM >>>', rooms)
    io.emit("rooms", rooms)
  })

  socket.on("joinRoom", function(room) {
    socket.join(room.name)
    rooms[room.id - 1] = room
    io.to((room.name)).emit("click", room.id)
    io.emit("rooms", rooms)
  })

  socket.on("playerTurn", function(payload) {
    console.log('playerturn>>', payload)
    if(payload.roomId){
      rooms[payload.roomId - 1].bombs = payload.bombs
    }
    io.emit("rooms", rooms)
  })

  socket.on("clicked", function(coordinate) {
    console.log('clicked')
    io.emit("clicked", coordinate)
  })
});

const port = process.env.PORT || 3000

http.listen(port, _=> console.log('Server jalan-jalan di gang', port))
