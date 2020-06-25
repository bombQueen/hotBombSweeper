const express = require('express')
const app = express()

app.use(express.json())
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
    id: 1,
    name: "contoh room",
    players: [
      { name: 'Admin Hardcode', isPlaying: true, isWinner: false, isMaster: true }
    ],
    bombs: [
      [1, 2], [3, 4], [4, 3], [2, 1], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6]
    ],
    isFull: false
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
    console.log("emitroom")
    io.emit("rooms", rooms)
  })
  // listen from client to create new room
  socket.on("new-room", function (room) {
    // const lastRoom = rooms.length + 1
    //localStorage.isLoggedin di push ke members
    // const room = {
    //   id: lastRoom,
    //   name: name,
    //   players: [
    //     {name: blue, isPlaying: true, isWinner: false, isMaster: true },
    //     {name: red, isPlaying: true, isWinner: false, isMaster: false },
    //   ]
    // }
    // if (room.members[0] == host)

    rooms.push(room)
    console.log('HASIL >>>', rooms)

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

http.listen(3000, _=> console.log('Server jalan'))
