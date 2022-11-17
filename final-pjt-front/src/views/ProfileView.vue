<template>
  <div>
    <h3>{{ user.username }}</h3>
    <input type="password" @keyup.enter="pwChange" v-model="newPassword" @input="newPW">
    <button @click="pwChange">비밀번호 변경</button>
    <span>{{warning}}</span>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  computed: {
    user() {return this.$store.getters.user}
  },
  data() {
    return {
      newPassword: null,
      warning: '비밀번호는 8자 이상이어야 합니다.'
    }
  },
  methods: {
    pwChange() {
      this.$store.dispatch('pwChange', this.newPassword)
      this.newPassword = null
    },
    newPW() {
      if (this.newPassword.length < 8) {
        this.warning = '비밀번호는 8자 이상이어야 합니다.'
      } else {
        this.warning = ''
      }
    }
  }
}
</script>

<style>

</style>