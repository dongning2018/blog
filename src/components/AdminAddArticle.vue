<template lang="pug">
  div
    h2(class="sub-header") 添加文章

    vuelidate-form(formName="articleForm", :action="add")
      vuelidate-input(name="title" label="标题" placeholder="请输入标题...", :defaultValue="title", :validator="validator.required")
      vuelidate-input(name="category" label="分类" type="select", :options="categories", :defaultValue="category")
      vuelidate-input(name="content" label="内容" type="textarea", :defaultValue="content", :validator="validator.required")
      button.submit.btn.btn-primary(type="submit") {{ submit }}
</template>

<style lang="scss" scoped>
@import "../css/dashboard";
button.submit {
  margin-left: 7.8rem;
}
</style>

<script>
import VuelidateInput from 'components/VuelidateInput'
import VuelidateForm from 'components/VuelidateForm'
import required from 'utils/required'

export default {
  name: 'admin-add-article',

  data() {
    return {
      title: '',
      category: '',
      content: '',
      submit: '',
      id: '',
      categories: [],
    }
  },
  components: {
    VuelidateForm,
    VuelidateInput,
  },
  computed: {
    validator() {
      return {
        required: {
          required
        }
      }
    }
  },
  methods: {
    add(options) {
      const { id, $router, $http } = this
      const { post } = $http
      // edit
      if(id !== '') {
        post('/article/' + id, options).then(() => $router.push('/adminArticleList'))
      // add
      } else {
        post('/article', options).then(() => this.$router.push('/adminArticleList'))
      }
    },

    //显示要修改的文章
    getModifyArticle(id) {
      this.$http.get('/article/' + id).then(data => {
        const article = data.data[0]
        this.title = article.title
        this.category = article.categoryId
        this.content = article.content
      })
    },

    //获取所有分类
    getCategories() {
      this.$http.get('/category').then(data => {
        this.categories = data.data
      })
    }
  },
  mounted() {
    this.submit = '添加'
    this.id = global.location.search.split('=')[1]
    if (this.id) {
      this.submit = '修改'
      this.getModifyArticle(this.id)
    } else {
      this.id = ''
    }
    this.getCategories()
  }
}
</script>
