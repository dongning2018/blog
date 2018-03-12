<template lang="pug">
  #app
    notifications(group="ajaxErrorInfo")
    router-view
</template>

<style lang="scss">
@import "~nprogress/nprogress.css";
</style>

<script>
import { emitter, getToken } from 'src/rest'
import { emitter as routerEmitter } from 'src/main'

export default {
  name: 'app',

  mounted() {
    const token = getToken()
    if (!token) {
      this.$router.push('/login')
    }

    if (this.$nprogress) {
      const { $nprogress } = this
      routerEmitter.on('start', () => {
        $nprogress.start()
      })

      routerEmitter.on('stop', () => {
        setTimeout(() => {
          $nprogress.done()
          $nprogress.remove()
        }, 300)
      })
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
