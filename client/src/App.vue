<template>
  <div id="app" class="container align-center">
    <div class="d-flex justify-content-end my-3">
      <b-button variant="danger" @click="logout">Logout</b-button>
    </div>
    <router-view/>
  </div>
</template>
<script>
  export default {
    methods: {
      logout() {
        localStorage.clear()
        this.$router.push(`/`).catch(() => {})
      }
    },
    created(){
      this.$store.dispatch("checkLogin")
      this.$store.dispatch("refreshRoom")
      console.log('Created APP')
    }
  };
</script>
<style>

</style>