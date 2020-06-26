import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client';
const socket = io('http://localhost:3000'); // https://hotbomb.herokuapp.comhttp://localhost:3000

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: null,
    rooms: [],
    score: 0
  },
  mutations: {
    SET_ISLOGGEDIN(state, payload) {
      state.isLoggedIn = payload;
    },
    SET_ROOMS(state, payload) {
      state.rooms = payload
    },
    SET_SCORE(state, payload) {
      state.score++
      console.log('score nambah === ', state.score)
    }
  },
  actions: {
    checkLogin({ commit }) {
      if (localStorage.isLoggedIn) {
        commit("SET_ISLOGGEDIN", localStorage.isLoggedIn);
      }
    },
    listenRoom({ commit }) {
      socket.on("rooms", function  (payload) {
        commit("SET_ROOMS", payload)
      })
    },
    refreshRoom({ dispatch }) {
      socket.emit("rooms")
      dispatch('listenRoom')
    },
    newRoom(_, data) {
      const gameMaster = { 
        name: localStorage.isLoggedIn, 
        isPlaying: true,
        isWinner: false,
        isMaster: true
      }

      let room = {
        id: this.state.rooms.length + 1,
        name: data,
        players: [],
        bombs: [],
        isFull: false,

      }
      localStorage.setItem('roomId', room.id)
      room.players.push(gameMaster)
      socket.emit("newRoom", room)
    },
    joinRoom({ dispatch }, room) {
      console.log('INI ROOM UTK DI JOIN', room)

      const gamePlayer = { 
        name: localStorage.isLoggedIn,
        isPlaying: true,
        isWinner: false,
        isMaster: false,
      }

      if (room.players.length < 4) {
        room.players.push(gamePlayer)
        socket.emit("joinRoom", room)
        dispatch('listenRoom')
      } else if (room.players.length == 4) {
        room.isFull = true
        socket.emit("joinRoom", room)
        dispatch('listenRoom')
      } else {
        dispatch('listenRoom')
      }
    },
    playerTurn( { dispatch }, payload){
      socket.emit('playerTurn', payload)
      dispatch('refreshRoom')
    }
  },
  modules: {
  }
})
