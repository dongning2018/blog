<template lang="pug">
  div
    h2.sub-header 修改密码
    vuelidate-form(formName="resetPasswordForm", :action="modify")
      vuelidate-input(ref="password" name="password" label="新密码" placeholder="输入新密码", :validator="validator.password")
      vuelidate-input(name="comfirmPassword" label="重复密码" placeholder="输入新密码", :validator="validator.comfirmPassword")
      button.submit.btn.btn-primary(type="submit") 修改
</template>

<style scoped lang="scss">
@import "../css/dashboard";
button.submit {
  margin-left: 8rem;
}
</style>

<script>
import { withParams } from 'vuelidate'
import VuelidateInput from 'components/VuelidateInput'
import VuelidateForm from 'components/VuelidateForm'
import required from 'utils/required'
import password from 'utils/password'
import { getToken } from 'src/rest'

export default {
  data() {
    return {
      token: '',
      user: null
    }
  },
  components: {
    VuelidateForm,
    VuelidateInput,
  },
  computed: {
    validator() {
      const self = this
      return {
        password: {
          required,
          password
        },
        comfirmPassword: {
          required,
          sameAsPassword: withParams({ type: 'sameAsPassword' }, v => {
            return v === self.$refs.password.value
          })
        }
      }
    }
  },
  methods: {
    modify(options) {
      const data  = {
        ...options,
        user: this.token.username
      }
      this.$http.post('/resetPassword', data).then(() => {
        this.$router.push('/login')
      })
    }
  },
  mounted() {
    const token = JSON.parse(getToken())
    this.token = token
    if (!token) {
      this.$router.push('/login')
    }
  }
}
</script>
