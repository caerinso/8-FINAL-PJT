<template>
  <div>
    <h1>Signup</h1>
    <form @submit.prevent="signUp">
      <label for="username">username : </label>
      <input type="text" id="username" v-model="username"> 
      <br>

      <label for="password1">password1 </label>
      <input type="password" id="password1" v-model="password1" @input='pwLength'>
      <span>{{ this.warning1 }}</span>
      <br>

      <label for="password2">password2 </label>
      <input type="password" id="password2" v-model="password2" @input="samePassword"> 
      <span>{{ this.warning2 }}</span>
      <br>

      <input type="submit" value="SignUp">
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignUpView',
  data() {
    return {
      username: null,
      password1: null,
      password2: null,
      warning1: '비밀번호는 8자 이상이어야 합니다.',
      warning2: '비밀번호가 다릅니다.',
    }
  },
  methods: {
    signUp() {
      const username = this.username
      const password1 = this.password1
      const password2 = this.password2
      const payload = {
        username: username,
        password1: password1,
        password2: password2,
      }
      this.$store.dispatch('signUp', payload)
    },
    pwLength() {
      if (this.password1.length < 8) {
        this.warning1 = '비밀번호는 8자 이상이어야 합니다.'
      } else {
        this.warning1 = ''
      }
    },
    samePassword() {
      if (this.password1 != this.password2) {
        this.warning2 = '비밀번호가 다릅니다.'
      } else {
        this.warning2 = ''
      }
    }
  }
}
</script>

<style>

</style>