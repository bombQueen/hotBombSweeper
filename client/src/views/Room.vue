<template>
  <div class="mt-5 row">
    <div class="col-6 card">
    <div class="card-body">
      <h1 class="card-title">Play || {{roomName}}</h1>
      <h5 class="card-body">Bombs || {{bombs}}</h5>
       <p class="lead text-muted ml-1">Click the mine when it's your turn</p>
       <ul>
         <li v-for="(player, i) in players" :key="i">{{ player }}</li>
       </ul>
      <hr>
    </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: "BombLand",
  data() {
    return {
      message: "",
    }
  },
  computed: {
    roomName() {
      return localStorage.roomName
    },
    bombs() {
      if (this.$store.state.rooms[localStorage.roomId - 1].bombs) {
        return this.$store.state.rooms[localStorage.roomId - 1].bombs
      }
    },
    players() {
      if (this.$store.state.rooms[localStorage.roomId - 1].players) {
        return this.$store.state.rooms[localStorage.roomId - 1].players
      }
    },
    roomId(){
      return this.$route.params.id
    }
  },
  methods :{
  },
  mounted() {
    // this.$store.dispatch("joinRoom")
  }
};
</script>