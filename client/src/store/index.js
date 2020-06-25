import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client';
const socket = io('https://hotbomb.herokuapp.com');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedin: null,
    rooms: [],
    chats: [],
  },
  mutations: {
    SET_ISLOGGEDIN(state, payload) {
      state.isLoggedin = payload;
    },
    SET_ROOMS(state, payload) {
      state.rooms = payload
    },
    SET_CHATS(state, payload) {
      state.chats = payload.chats
    }
  },
  actions: {
    checkLogin({ commit }) {
      if (localStorage.isloggedin) {
        commit("SET_ISLOGGEDIN", localStorage.isloggedin);
      }
    },
    listenRoom({ commit }) {
      socket.on("rooms", function  (payload) {
        // console.log('DATA ROOMS>>', payload)
        commit("SET_ROOMS", payload)
      })
    },
    listenChat({ commit }) {
      socket.on("chats", function  (payload) {
        commit("SET_CHATS",  payload)
      })
    },
    refreshRoom() {
      socket.emit("rooms")
    },
    newRoom(_, data) {
      const playerRole = { 
        name: localStorage.isloggedin, 
        isPlaying: true, 
        isWinner: false, 
        isMaster: true
      }

      let room = {
        id: this.state.rooms.length + 1,
        name: data,
        players: [],
        //HARDCODE BOMBS
        bombs: [
          [1, 2], [3, 4], [4, 3], [2, 1], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6]
        ],
        isFull: false
      }
      room.players.push(playerRole)

      socket.emit("new-room", room);
    },
    joinRoom({ commit }, room) {
      console.log('INI ROOM UTK DI JOIN', room)

      const playerRole = { 
        name: localStorage.isloggedin, 
        isPlaying: true, 
        isWinner: false, 
        isMaster: false 
      }

      // // if players.length > 0 isMaster == true
      // // if players.length == 3 isFull == false
      const roomid = localStorage.roomid

      for (let i = 0; i < room.players.length; i++) {
        if (room.players.length > 0 && room.players.length == 3) {
          playerRole.isMaster = true
          socket.emit("join-room", String(roomid))
          socket.emit("chats", String(roomid))
        } else {
          
        }

      }


    },
    newChat({ commit }, message) {
       const payload = {
        chat: {
          message: message,
          by: localStorage.getItem("isloggedin") || "anonymous"
        },
        room: {
          id: localStorage.getItem("roomId"),
        }
      }
      socket.emit("new-chat", payload)
    }
  },
  modules: {
  }
})
