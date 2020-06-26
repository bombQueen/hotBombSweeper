<template>
<div>
  <div class="flex-center">
    <div v-bind:class="{'square-card': trueOrFalse[0] == '0', 'square-card-bomb': trueOrFalse[0] == '2' ,'square-card-noBomb': trueOrFalse[0] == '1'}" v-on:click="getId(data+',1')"></div>
    <div v-bind:class="{'square-card': trueOrFalse[1] == '0', 'square-card-bomb': trueOrFalse[1] == '2' ,'square-card-noBomb': trueOrFalse[1] == '1'}" v-on:click="getId(data+',2')"></div>
    <div v-bind:class="{'square-card': trueOrFalse[2] == '0', 'square-card-bomb': trueOrFalse[2] == '2' ,'square-card-noBomb': trueOrFalse[2] == '1'}" v-on:click="getId(data+',3')"></div>
    <div v-bind:class="{'square-card': trueOrFalse[3] == '0', 'square-card-bomb': trueOrFalse[3] == '2' ,'square-card-noBomb': trueOrFalse[3] == '1'}" v-on:click="getId(data+',4')"></div>
    <div v-bind:class="{'square-card': trueOrFalse[4] == '0', 'square-card-bomb': trueOrFalse[4] == '2' ,'square-card-noBomb': trueOrFalse[4] == '1'}" v-on:click="getId(data+',5')"></div>
    <div v-bind:class="{'square-card': trueOrFalse[5] == '0', 'square-card-bomb': trueOrFalse[5] == '2' ,'square-card-noBomb': trueOrFalse[5] == '1'}" v-on:click="getId(data+',6')"></div>
    <div v-bind:class="{'square-card': trueOrFalse[6] == '0', 'square-card-bomb': trueOrFalse[6] == '2' ,'square-card-noBomb': trueOrFalse[6] == '1'}" v-on:click="getId(data+',7')"></div>
    <div v-bind:class="{'square-card': trueOrFalse[7] == '0', 'square-card-bomb': trueOrFalse[7] == '2' ,'square-card-noBomb': trueOrFalse[7] == '1'}" v-on:click="getId(data+',8')"></div>
    <div v-bind:class="{'square-card': trueOrFalse[8] == '0', 'square-card-bomb': trueOrFalse[8] == '2' ,'square-card-noBomb': trueOrFalse[8] == '1'}" v-on:click="getId(data+',9')"></div>
    <div v-bind:class="{'square-card': trueOrFalse[9] == '0', 'square-card-bomb': trueOrFalse[9] == '2' ,'square-card-noBomb': trueOrFalse[9] == '1'}" v-on:click="getId(data+',10')"></div>
  </div>
</div>
</template>

<script>
import io from 'socket.io-client';
const socket = io('http://localhost:3000'); // https://hotbomb.herokuapp.comhttp://localhost:3000

export default {
  props: [ 'data', 'idx' ],
  data() {
    return{
      trueOrFalse: ['0','0','0','0','0','0','0','0','0','0'],
      row: 10
    }
  },
  computed: {
    bombs() {
      if (this.$store.state.rooms[this.$route.params.id - 1].bombs) {
        return this.$store.state.rooms[this.$route.params.id - 1].bombs
      }
    },
  },
  methods: {
    getId(params){
      socket.emit('clicked', params)
      console.log(this.bombs)
      //define coordinate
      let xBefore = params.split(",")
      // console.log(xBefore)
      let xAfter = params.split(",").join()
      let coordinate = []
      coordinate.push(xAfter)

      //check bomb
      let flag = true
      for(let i=0; i<this.bombs.length; i++){
        if(this.bombs[i].koor == xAfter){
          this.bombs[i].status= true
          let obj = { 
            bombs: this.bombs, 
            roomId: this.$route.params.id
          }
          this.$store.dispatch('playerTurn', obj)
          
          flag = false
          console.log(`BOMB!!!!!!!!!!!!!!!!!! Coordinate ${xAfter} is Boom Spot`)
          // this.trueOrFalse[0] = '2'
          this.trueOrFalse.splice(xBefore[1]-1, 1, '2')
          this.failSound()          
        }
      }
      if(flag){
        console.log(`No Bomb, Lets Go, Coordinate ${xAfter} is Safe`)
        this.trueOrFalse.splice(xBefore[1]-1, 1, '1')
        this.$store.commit('SET_SCORE')
        this.successSound()
        // this.trueOrFalse[xBefore[1]-1] = 1
        // console.log(this.trueOrFalse[xBefore[1]])
      }
    },

    successSound(){
      let audio = new Audio(require('../assets/sound/success.mp3'))
        audio.play();
        setTimeout(function(){
          let audio2 = new Audio(require('../assets/sound/wow.mp3'))
          audio2.play();
        }, 700);
    },

    failSound() {
      let audio = new Audio(require('../assets/sound/omg.mp3'))
        audio.play();
        setTimeout(function(){
          let audio2 = new Audio(require('../assets/sound/fail_retro.mp3'))
          audio2.play();
        }, 1000);
    }
  },
  created() {
    console.log(this.data - 1, this.idx)
      socket.on("clicked", (params) => {
        console.log(params)
        if (params[0] - 1 == this.idx) {
          let xBefore = params.split(",")
          // console.log(xBefore)
          let xAfter = params.split(",").join()
          let coordinate = []
          coordinate.push(xAfter)

          //check bomb
          let flag = true
            for(let i=0; i<this.bombs.length; i++){
              if(this.bombs[i].koor == xAfter){
                this.bombs[i].status= true
                let obj = { 
                  bombs: this.bombs, 
                  roomId: this.$route.params.id
                }
                this.$store.dispatch('playerTurn', obj)
                flag = false
                console.log(`BOMB!!!!!!!!!!!!!!!!!! Coordinate ${xAfter} is Boom Spot`)
                console.log(this.trueOrFalse)
                this.trueOrFalse.splice(xBefore[1]-1, 1, '2')
                this.failSound()
              }
            }
          }
      })
  },
};
</script>

<style>
.square-card {
  height: 2rem;
  width: 2rem;
  background: grey;
  border: solid 1px black;
}
.square-card-noBomb {
  height: 2rem;
  width: 2rem;
  background: rgb(131, 197, 24);
  border: solid 1px black;
}
.square-card-bomb {
  height: 2rem;
  width: 2rem;
  background: rgb(211, 44, 80);
  border: solid 1px black;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* .col {
  flex-grow: 0;
} */
.square-card:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.01) !important;
}
</style>