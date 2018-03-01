<template lang="pug">
  div
    h2(class="sub-header") 添加分类

    vuelidate-form(formName="categoryForm", :action="add")
      vuelidate-input(name="name" label="分类名称" placeholder="请输入分类名称...", :defaultValue="name", :validator="validator.required")
      button.submit.btn.btn-primary(type="submit") {{ submit }}
</template>

<style lang="scss" scoped>
@import "../css/dashboard";
button.submit {
  margin-left: 8rem;
}
</style>

<script>
import querystring from 'querystring'
import VuelidateInput from 'components/VuelidateInput'
import VuelidateForm from 'components/VuelidateForm'
import required from 'utils/required'

export default {
  name: 'admin-add-category',

  data() {
    return {
      name: '',
      id: '',
      submit: '',
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
      const { id, $http, $router } = this
      const { post } = $http
      // edit
      if (id !== '') {
        post('/category/' + id, options).then(() => $router.push('/adminCategory'))
      // add
      } else {
        post('/category', options).then(() => $router.push('/adminCategory'))
      }
    }
  },
  mounted() {
    const search = global.location.search.slice(1)
    const query = querystring.parse(search)
    this.submit = '添加'
    this.id = query.id
    if (this.id) {
      this.submit = '修改'
      this.name = query.name
    } else {
      this.id = ''
    }
  }
}
</script>
