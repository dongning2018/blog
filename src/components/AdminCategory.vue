<template lang="pug">
  div
    h2.sub-header 分类列表
    div(class="table-responsive articleList")
      table(class="table table-striped")
        thead
          tr
            th(width="30%") 名称
            th 别名
            th 创建时间
            th 管理
        tbody
          tr(v-for="(item, index) in categories")
            td {{item.name}}
            td 无
            td {{item.created}}
            td
              router-link(class="btn btn-sm btn-success" :to="{ name: 'userCategoryArticleList', query: { id: item.id }}") 查看
              router-link(class="btn btn-sm btn-info" :to="{ path: 'adminAddCategory', query: { id: item.id, name: item.name }}") 编辑
</template>

<style scoped lang="scss">
@import "../css/dashboard";
</style>

<script>
import formatTime from 'utils/formatTime'

export default {
  data() {
    return {
      categories: [],
    }
  },
  methods: {
    //删除分类
    deleteCategory() {},

    //获取所有分类
    getCategories() {
      this.$http.get('/category').then(data => {
        this.categories = data.data.map(o => {
          o.created = formatTime(o.created)
          return o
        })
      })
    }
  },
  created() {
    this.getCategories()
  }
}
</script>
