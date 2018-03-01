<template lang="pug">
  div
    div(class="col-sm-3 col-sm-offset-1 blog-sidebar")
      .sidebar-module
        h4 文章分类
        ol.list-unstyled
          li(v-for="item in categories")
            a(href="javascript:;", @click="change(item._id, item.slug)") {{item.name}}
      .sidebar-module
        h4 Elsewhere
        ol.list-unstyled
          li
            a(href="javascript:;") GitHub
          li
            a(href="javascript:;") Twitter
          li
            a(href="javascript:;") Facebook
</template>

<style scoped lang="scss">
@import '../css/blog';
</style>

<script>
export default{
  data() {
    return {
      categories: []
    }
  },
  methods: {
    change(id, slug) {
      this.$router.push({ name: 'userCategoryArticleList', query: { id:id, slug:slug }})
      global.location.reload()
    }
  }
}
</script>
