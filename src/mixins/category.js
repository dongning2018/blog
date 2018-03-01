import find from 'lodash/find'

export default {
  mounted() {
    this.getCategories()
  },

  methods: {
    // 获取所有分类
    getCategories() {
      this.$http.get('/category').then(data => {
        if (data.success) {
          this.categories = data.data
        }
      })
    },

    categoryName(article) {
      const categories = this.categories || []
      if (categories.length && article.categoryId) {
        const category = find(categories, o => o.id === article.categoryId)
        if (category) {
          return category.name
        }
      }
      return null
    }
  }
}
