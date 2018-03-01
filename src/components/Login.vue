<template lang="pug">
  .container

    vuelidate-form.form-signin(formName="loginForm", :action="login")
      h2.form-signin-heading
        | 登录
        small
          router-link(class="pull-right" to="/reg") 注册
      vuelidate-input(name="email" placeholder="Email address", :validator="validator.required", :login="true")
      vuelidate-input(name="password" placeholder="Password", type="password", :validator="validator.required", :login="true")
      .checkbox
        label
          input(type="checkbox" value="remember-me")
          | 记住我
      button.submit.btn.btn-lg.btn-primary.btn-block(type="submit") 登录
</template>


<style scoped lang="scss">
@import "../css/signin";
</style>

<script>
import VuelidateForm from 'components/VuelidateForm'
import VuelidateInput from 'components/VuelidateInput'
import required from 'utils/required'
import { setToken } from 'src/rest'

export default{
  data() {
    return {
      email: '',
      password: '',
    }
  },

  components: {
    VuelidateForm,
    VuelidateInput,
  },

  computed: {
    validator() {
      return {
        required: {
          required
        }
      }
    }
  },

  methods: {
    login(params) {
      this.$http.get('/login', {
        params
      }).then(data => {
        const user = data.data[0]
        if (user) {
          setToken(JSON.stringify(user))
        }
        this.$router.push('/')
      })
    }
  }
}
</script>
