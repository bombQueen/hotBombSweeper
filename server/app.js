const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

const http = require('http').createServer(app)
const io = require('socket.io')(http)

// const rooms = [
//   room = {
//     isOpen: true,
//     players: [
//       {name: 'red', isPlaying: true, isWinner: true, master: true},
//       {name: 'blue', isPlaying: true, isWinner: true, master: false},
//     ]
//   },
// ]

const rooms = [
  {
    id: "1",
    name: "contoh room",
    members: ["127.0.0.1"],
    chats: []
  }
]


// app.get('/', (req, res) => {
//   res.json({ message: 'Server is running'})
// })

// app.get('/random', (req, res) => {
//   const randomizer = () => {
//     return Math.random()
//   }
//   let num = randomizer()
//   res.json({ random: num })
// })

// app.get('/room/:id', (req, res) => {
//   let room = rooms[+req.params.id]
//   res.json({ room })
// })

io.on('connection', (socket) => {
  console.log('a user connected');

  io.emit("rooms", rooms)
  io.on("rooms", function  () {
    console.log("emitroom ")
    io.emit("rooms", rooms)
  })
  // listen from client to create new room
  socket.on("new-room", function (name) {

    const lastRoom = rooms.length + 1
    const room = {
      id: lastRoom,
      name: name,
      members: [],
      chats: []
    }
    rooms.push(room)
    // io emit to client for refresh rooms
    io.emit("rooms", rooms)
  })

  socket.on("join-room", function  (room) {
    // join room
    socket.join(room)

    const indexRoom = rooms.findIndex(function (r) {
      return String(r.id) === String(room)
    })
    // emit to client by specifik room
    io.to(String(room)).emit("chats", rooms[indexRoom])
  })

  socket.on("new-chat", function (payload) {
     // const payload = {
     //    chat: {
     //      message: message,
     //      by: "dzakki"
     //    },
     //    room: {
     //      id: localStorage.getItem("id_room"),
     //    }
     //  }

    console.log(payload)
    const idRoom = payload.room.id
    const indexRoom = rooms.findIndex(function (r) {
      return String(r.id) === String(idRoom)
    })
    rooms[indexRoom].chats.push({
      message: payload.chat.message,
      by: payload.chat.by
    })
    // console.log(rooms[indexRoom])
    // console.log("masuk sini")
    io.to(String(idRoom)).emit("chats", rooms[indexRoom])
  })

});

const port = process.env.PORT || 3000

http.listen(port, _=> console.log('Server jalan'))
