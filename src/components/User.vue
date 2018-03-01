<template lang="pug">
  .blog
    .blog-masthead
      .container
        nav.blog-nav
          router-link(class="blog-nav-item" to="/userArticleList") 博文
          router-link(class="blog-nav-item" to="/userAbout") 关于
          router-link(class="blog-nav-item" to="/userContact") 联系
    .container
      .row
        .col-sm-8.blog-main
          router-view
        user-sider
      user-footer
</template>

<style lang="scss" scoped>
@import "../css/blog";
</style>

<script>
import UserFooter from './UserFooter'
import UserSider from './UserSider'

export default {
  data() {
    return {}
  },
  components: {
    UserFooter,
    UserSider
  }
}
</script>
