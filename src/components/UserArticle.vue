<template lang="pug">
  div
    h2(class="page-header post-view-header") {{article.title}}
    .post.post-view
      .post-meta
        span.post-created
          i.fa.fa-calendar &nbsp; {{article.created}}
        span.post-author
          i.fa.fa-user &nbsp;  {{article.author}}
        span.post-category
          i.fa.fa-shopping-basket &nbsp;  {{categoryName(article)}}
        span.post-comment
          i.fa.fa-comment &nbsp;  {{article.comments}}
        span.post-favorite
          a(href="javascript:;" @click="setZan(article.id)")
            i(class="fa fa-star") &nbsp; {{article.heart}}
      div(class="post-content" v-html="article.content")

    .post-comment
      h3 用户评论
      ul(class="post-comment-list" v-show="article.comments")
        li(v-for="item in article.comments")
          h5(class="post-comment-email")
            | {{item.author}}
            small.pull-right {{item.created}}
          p.post-comment-content {{item.content}}
      p(class="alert alert-info" v-show="article.comments") 还没有评论

      form.post-comment-form
        h3 添加评论
        .form-group
          label 邮箱
          input(class="form-control" type="text" v-model="commentAuthor" placeholder="请输入邮箱...")
        .form-group
          label 内容
          textarea(class="form-control" v-model="commentContent")
        a(href="javascript:;" class="btn btn-primary" @click="submitComment(id)") 提交
</template>

<style scoped lang="scss">
@import "../css/blog";
</style>

<script>
import categoryMixin from 'mixins/category'
import formatTime from 'utils/formatTime'

export default {
  data() {
    return {
      article: {},
      id: '',
      categories: [],
      commentAuthor: '1228569763@qq.com',
      commentContent: '',
    }
  },
  mixins: [categoryMixin],
  methods: {
    //显示文章
    getArticle(id) {
      this.$http.get('/article/' + id).then(data => {
        const o = data.data[0]
        o.created = formatTime(o.created)
        this.article = o
      })
    },
    //点赞
    setZan() {},
    //提交评论
    submitComment() {}
  },
  created() {
    this.id = global.location.search.split('=')[1]
    this.getArticle(this.id)
  }
}
</script>
