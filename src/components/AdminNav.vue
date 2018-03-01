<template lang="pug">
  div
    ul(class="nav nav-sidebar")
      router-link(to="/adminArticleList" tag="li")
        a(href="javascript:;")
          i(class="fa fa-files-o") &nbsp;文章列表
      router-link(to="/adminAddArticle" tag="li")
        a(href="javascript:;")
          i(class="fa fa-file-o") &nbsp;添加文章
      router-link(to="/adminCategory" tag="li")
        a(href="javascript:;")
          i(class="fa fa-th-list") &nbsp;分类列表
      router-link(to="/adminAddCategory" tag="li")
        a(href="javascript:;")
          i(class="fa fa-plus") &nbsp;添加分类
    ul(class="nav nav-sidebar")
      router-link(to="/resetPassword" tag="li")
        a(href="javascript:;")
          i(class="fa fa-lock") &nbsp;修改密码
</template>

<style scoped lang="scss">
@import "../css/dashboard";
</style>

<script>
  export default{
    data() {
      return {}
    },
    methods: {},
    components: {}
  }
</script>
