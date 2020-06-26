<template>
  <div class="mt-5 row">
    <div class="col-6 card">
      <div class="card-body">
        <h1 class="card-title">Play || {{roomName}}</h1>
        <p class="lead text-muted ml-1">Click the mine when it's your turn</p>
        <ul>
          <li v-for="(player, i) in players" :key="i">{{ player }}</li>
        </ul>
        <div v-if="modalShow">
          <b-modal v-model="modalShow" hide-header hide-footer>
            <lottie-player
              src="https://assets6.lottiefiles.com/private_files/lf30_vKCBXa.json"
              background="transparent"
              speed="1"
              style="width: 300px; height: 300px;"
              loop
              controls
              autoplay
            ></lottie-player>
          </b-modal>
        </div>
        <hr />
      </div>
      <Board :bombs="bombs"></Board>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Board from "./Board.vue";

export default {
  name: "BombLand",
  components: {
    Board
  },
  data() {
    return {
      message: "",
      row: 10,
      modalShow: false,
    };
  },
  watch: {
    lastName: function(val) {
      this.fullName = this.firstName + " " + val;
    },
    score(val) {
      let temp = this
      if (val >= 5) {
        temp.modalShow = true
      }
    }
  },
  computed: {
    roomName() {
      return localStorage.roomName;
    },
    bombs() {
      if (this.$store.state.rooms[this.$route.params.id - 1].bombs) {
        return this.$store.state.rooms[this.$route.params.id - 1].bombs;
      }
    },
    score() {
      return this.$store.state.score
    },
    players() {
      if (this.$store.state.rooms[this.$route.params.id - 1].players) {
        return this.$store.state.rooms[this.$route.params.id - 1].players;
      }
    },
    roomId() {
      return this.$route.params.id;
    }
  },
  methods: {
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs["my-modal"].toggle("#toggle-btn");
    }
  },
  mounted() {
    // this.$store.dispatch("joinRoom")
  }
};
</script>