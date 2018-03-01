<template lang="pug">
  .container
    p(class="alert alert-danger" v-for="item in errors") {{item.msg}}

    form.form-signin
      h2.form-signin-heading
        | 注册
        small
          router-link(class="pull-right" to="/login") 登录
      label.sr-only 邮箱
      input(type="email" class="form-control" v-model="email" placeholder="Email address")
      label.sr-only 密码
      input(type="password" class="form-control noradius" v-model="password" placeholder="Password")
      label.sr-only 重复密码
      input(type="password" class="form-control" v-model="comfirmPassword" placeholder="comfirm password")
      a(class="btn btn-lg btn-primary btn-block"  @click="reg(email, password, comfirmPassword)") 注册
</template>

<style scoped lang="scss">
@import "../css/signin";
</style>

<script>
export default{
  data() {
    return {
      email: '',
      password: '',
      comfirmPassword: '',
      errors: {}
    }
  },
  methods: {
    reg() {
      this.$http.post('/reg', {
        email: this.email,
        password: this.password,
        comfirmPassword: this.comfirmPassword
      }).then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>
