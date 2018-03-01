<template lang="pug">
  div
    div(class="post" v-for="(article, index) in articles")
      h3.post-title
        router-link(:to="{path:'/userArticle', query:{id: article.id}}") {{article.title}}
      .post-abstract {{article.content}}
      .post-meta
        span(class="post-created") 时间:&nbsp; {{article.created}}
        span(class="post-author") 作者:&nbsp;  {{article.author}}
        span(class="post-category") 分类:&nbsp;  {{categoryName(article)}}
        span(class="post-comment") 评论:&nbsp;  {{article.comments}}
        span(class="post-favorite") 被赞:&nbsp; {{article.heart}}
        router-link(:to="{path:'/userArticle', query:{id: article.id}}") 查看全文
</template>

<style scoped lang="scss">
@import "../css/blog";
</style>

<script>
import categoryMixin from 'mixins/category'
import formatTime from 'utils/formatTime'

export default{
  data() {
    return {
      articles: [],
      categoryId: '',
      slug: ''
    }
  },
  mixins: [categoryMixin],
  methods: {
    //获取所有文章
    getArticleList(id) {
      this.$http.get('/articleByCategoryId/' + id).then(data => {
        this.articles = data.data.map(o => {
          o.created = formatTime(o.created)
          return o
        })
      })
    }
  },

  created() {
    this.categoryId = global.location.search.slice(1).split('=')[1]
    this.getArticleList(this.categoryId)
  }
}
</script>
