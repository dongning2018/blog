<template lang="pug">
  div(style="padding-top:40px")
    nav(class="navbar navbar-inverse navbar-fixed-top")
      div(class="container-fluid")
        div(class="navbar-header")
          button(type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar")
            span(class="sr-only") Toggle navigation
            span(class="icon-bar")
            span(class="icon-bar")
            span(class="icon-bar")
          router-link(class="navbar-brand" to="/") Blog
        div(id="navbar" class="navbar-collapse collapse")
          ul(class="nav navbar-nav navbar-right")
            li(@click="logout")
              a(href="#") {{user ? user.email : null}} &nbsp; 注销
            li
              a(href="javascript:;") _(•̀ω•́)_

    div(class="container-fluid float-top")
      div(class="row")
        div(class="col-sm-3 col-md-2 sidebar")
          admin-nav
        div(class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main")
          router-view
</template>

<style scoped lang="scss">
@import "../css/dashboard";
</style>

<script>
import adminNav from './AdminNav.vue'

export default{
  data() {
    return {
      user: null
    }
  },
  methods: {
    logout() {
      console.log('注销开始操作')
    }
  },

  components: {
    adminNav,
  }
}
</script>
