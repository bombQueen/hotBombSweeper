import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client';
const socket = io('https://hotbomb.herokuapp.com');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedin: null,
    rooms: [],
    chats: []
  },
  mutations: {
    SET_ISLOGGEDIN(state, payload) {
      state.isLogin = payload;
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
    newRoom(_, room) {
      socket.emit("new-room", room);
    },
    joinRoom({ commit }, room) {
      const roomId = localStorage.roomId
      socket.emit("join-room", String(roomId))
      socket.emit("chats", String(roomId))
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
