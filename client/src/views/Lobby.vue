<template>
  <div class="mt-4">
    <h1>List room</h1>
    <button class="btn btn-sm btn-info mb-3" v-if="roomLength" @click="addRoom">Add room</button>
    <p class="lead text-muted">Please refresh the website if no rooms are present</p>
    <div class="row">
      <div v-for="(room, i) in rooms" :key="i" class="col-3 card m-2">
        <div class="card-body">
          <h5 class="card-title">{{ room.name }}</h5>
          <button 
            class="btn btn-primary btn-sm btn-block mt-2"
            @click="joinRoom(room)"
          >
            Join
          </button>
        </div>
      </div>
    </div>
    <button 
            class="btn btn-success mt-2"
            @click="toBoard()"
          >
            Board
    </button>
  </div>
</template>

<script>
export default {
  name: "Room",
  computed: {
    rooms() {
      return this.$store.state.rooms
    },
    roomLength() {
      return this.rooms.length
    },
  },
  methods: {
    joinRoom(room) {
      if(room.players[0].name == localStorage.isLoggedIn) {
        this.$router.push(`room/${room.id}`).catch(() => {})
      } else if(room.players.length < 4) {
        console.log('Bisa JOIN', room)
        localStorage.setItem("roomId", room.id)
        localStorage.setItem("roomName", room.name)
        this.$store.dispatch('joinRoom', room)
        this.$router.push(`room/${room.id}`).catch(() => {})
      } else {
        prompt('Room is full. Find other room!')
      }
    },
    addRoom() {
      let room = prompt("Please enter name room:", " ");
      if(!!room) {
        this.$store.dispatch("newRoom", room)
      }
    },
    toBoard() {
      console.log('Mau lihat board')
      this.$router.push(`board/1`).catch(() => {})
    },
  },
  mounted() {
    this.$store.dispatch("refreshRoom")
  }
};
</script>
