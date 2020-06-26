<template>
  <div>
    <div class="row mt-5">
      <div class="col-6 border p-4">
        <small class="form-text text-muted">Pick a unique username</small>
        <div class="form-group row">
          <label for="username" class="col-sm-4 col-form-label">Username</label><br>
           <div class="col-sm-8">
            <input type="text" class="form-control" id="username" @keyup.enter="login" v-model="username">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Login',
  data(){
    return {
      username: ""
    }
  },
  methods: {
    login() {
      localStorage.setItem("isLoggedIn", this.username)
      this.$store.commit("SET_ISLOGGEDIN", this.username);
      this.$router.push("room").catch(() => {})
      ;
    }
  }
}
</script>
