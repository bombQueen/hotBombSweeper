<template>
  <div>  
        <br><h1 class="text-center">BombSweeper</h1><br><br>
        <MainGrid v-for="(data,idx) in row" :key="idx" :data="data">
        </MainGrid>
  </div>
</template>

<script>
import MainGrid from '../components/MainGrid';
export default {
  name: 'App',
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