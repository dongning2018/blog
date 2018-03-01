<template lang="pug">
  div
    h2.page-header 全部博文
    .post(v-for="(article, index) in articles")
      h3.post-title
        router-link(:to="{name: 'userArticle', query:{id: article.id}}") {{article.title}}
      .post-abstract {{article.content}}
      .post-meta
        span.post-created 时间:&nbsp; {{article.created}}
        span.post-author 作者:&nbsp;  {{article.author}}
        span.post-category 分类:&nbsp;  {{categoryName(article)}}
        span.post-comment 评论:&nbsp;  {{article.comments}}
        span.post-favorite 被赞:&nbsp; {{article.heart}}
        router-link(:to="{path: '/userArticle', query: {id: article.id}}") 查看全文

    nav
      ul.pagination
        li(v-for="n in pages", :class="{'active':n==curPage}")
          a(href="javascript:;" @click="getArticleList(n)") {{n}}
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
      articles: [],
      pages: [],
      curPage: 1,
      pageCount: Number
    }
  },
  mixins: [categoryMixin],
  methods: {
    //获取所有文章
    getArticleList() {
      this.$http.get('/article').then(data => {
        this.articles = data.data.map(o => {
          o.created = formatTime(o.created)
          return o
        })
      })
    }
  },

  mounted() {
    this.getArticleList()
  }
}
</script>
