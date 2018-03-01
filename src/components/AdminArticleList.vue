<template lang="pug">
  .acticle-list
    h2.sub-header 文章列表
    form(class="form-inline form-filter")
      .form-group
        label 分类
        select(class="form-control" v-model="category")
          option(value="") - 选择分类 -
          option(v-for="item in categories", :value="item.id.toString()") {{item.name}}
      .form-group
        label 关键词
        input(class="form-control" v-model="keyword" type="text")
      a(class="btn btn-info" @click="getArticleList(1, sortby, sortdir, category, user, keyword)") 筛选

    div(class="table-responsive articleList")
      table(class="table table-striped")
        thead
          tr
            th(width="15%")
              a(href="javascript:;") 标题
                span(v-show="showArrow=='title'") {{arrow}}
            th
              a(href="javascript:;") 分类
                span(v-show="showArrow=='category'") {{arrow}}
            th
              a(href="javascript:;") 作者
                span(v-show="showArrow=='user'") {{arrow}}
            th
              a(href="javascript:;") 添加时间
                span(v-show="showArrow=='created'") {{arrow}}
            th 被赞
            th 评论
            th
              a(href="javascript:;") 状态
                span(v-show="showArrow=='published'") {{arrow}}
            th 管理
        tbody
          tr(v-for="(article,index) in articles")
            td {{article.title}}
            td {{categoryName(article)}}
            td {{article.author}}
            td {{article.created}}
            td {{article.heart}}
            td {{article.commentCount}}
            td {{state[article.state]}}
            td
              router-link(class="btn btn-sm btn-success" :to="{ path: '/userArticle', query: {id: article.id} }") 查看
              router-link(class="btn btn-sm btn-info" :to="{ path: '/adminAddArticle', query: {id: article.id} }") 编辑
              a(href="javascript:;" class="btn btn-sm btn-danger" @click="deleteArticle(article.id, index)") 删除
    nav
      ul.pagination
        li(v-for="n in pages", :class="{'active':n==curPage}")
          a(href="javascript:;" @click="getArticleList(n, sortby, followPageSort, category, user, keyword)") {{n}}
</template>


<style scoped lang="scss">
@import "../css/dashboard";
</style>


<script>
import categoryMixin from 'mixins/category'
import formatTime from 'utils/formatTime'

export default {
  data() {
    return {
      state: {
        0: '未读',
        1: '已读',
        2: '已赞',
      },
      //pagination
      articles: [],
      pages: [],
      curPage: 1,
      pageCount: Number,
      //sort
      sortby: 'created',
      sortdir: 'desc',
      followPageSort: '',
      arrow: '⤓',
      showArrow: 'created',
      //filter
      categories: [],
      users: [],
      category: '',
      user: '',
      keyword: ''
    }
  },
  mixins: [categoryMixin],
  methods: {
    getArticleList() {
      this.$http.get('/article').then(data => {
        this.articles = data.data.map(o => {
          o.created = formatTime(o.created)
          return o
        })
      })
    },

    // 删除文章
    deleteArticle(id) {
      this.$http.delete('/article/' + id).then(() => {
        this.getArticleList()
      })
    }
  },
  mounted() {
    this.getArticleList()
  }
}
</script>
