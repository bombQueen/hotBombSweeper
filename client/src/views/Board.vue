<template>
  <div>  
        <br><h1 class="text-center">BombSweeper</h1><br><br>
        <MainGrid v-for="(data, idx) in row" :key="idx" :data="data" :idx="idx">
        </MainGrid><br><br><br><br>
  </div>
</template>

<script>

import MainGrid from '../components/MainGrid';
export default {
  name: 'Board',
  components: {
    MainGrid
  },

  data(){
    //
    return {
      row: 10
      // jumlahKebawah: []
    }
  },
  created() {
    
  }
};
</script>
<style>
body {
    background-image: url(../assets/img/cool-background.png);
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}
</style>