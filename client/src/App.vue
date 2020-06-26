<template>
  <div id="app" class="container">
    <b-button variant="danger" @click="logout">Logout</b-button>
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