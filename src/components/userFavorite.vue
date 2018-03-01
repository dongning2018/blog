<template lang="pug">
  div
    h2(class="page-header post-view-header") {{article.title}}
    .post.post-view
      .post-meta
        span.post-created
          i.fa.fa-calendar &nbsp; {{article.created}}
        span.post-author
          i.fa.fa-user &nbsp;  {{article.author.name}}
        span.post-category
          i.fa.fa-shopping-basket &nbsp;  {{article.category.name}}
        span.post-comment
          i.fa.fa-comment &nbsp;  {{article.commentCount}}
        span.post-favorite
          router-link(:to="{name:'userFavorite', query:{id:article.slug}}")
            i.fa.fa-star &nbsp; {{article.meta.favorites}}
      .post-content {{article.content}}

    .post-comment
      h3 用户评论
      .post-comment-list
        h5.post-comment-email 2324234@qq.com
        p.post-comment-content sdlfkjsdlfksdfkl
      p.alert.alert-info 还没有评论

      form.post-comment-form
        h3 添加评论
        .form-group
          label 邮箱
          input(class="form-control" type="text" placeholder="请输入邮箱...")
        .form-group
          label 内容
          textarea.form-control
        button.btn.btn-primary 提交
</template>

<style scoped lang="scss">
@import '../css/blog';
@import "../../node_modules/font-awesome/css/font-awesome";
</style>

<script>

export default {
  data() {
    return {
      article: {},
      id: ''
    }
  },

  created() {
    this.id = global.location.search.split('=')[1]
    this.setZan(this.id)
  }
}
</script>
