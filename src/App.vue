<template lang="pug">
  #app
    notifications(group="ajaxErrorInfo")
    router-view
</template>

<script>
import { emitter, getToken } from 'src/rest'

export default {
  name: 'app',

  mounted() {
    const token = getToken()
    if (!token) {
      this.$router.push('/login')
    }

    emitter.$on('loginError', data => {
      this.$notify({
        group: 'loginErrorInfo',
        type: 'error',
        title: '错误信息',
        text: data.message,
      })
      this.$router.push('/login')
    })

    emitter.$on('ajaxError', data => {
      this.$notify({
        group: 'ajaxErrorInfo',
        type: 'error',
        title: '错误信息',
        text: data.message,
      })
    })
  }
}
</script>
