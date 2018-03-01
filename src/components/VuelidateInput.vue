<template lang="pug">
.vuelidate-input(:class="{ login }")
  <!-- 下拉框 -->
  .form-group.flex(v-if="type === 'select'")
    label.control-label {{ label }}
    .control
      select(:name="name" class="form-control" v-model="value")
        <!-- option(value="") - 请选择 - -->
        option(v-for="item in options", :value="item.id") {{item.name}}

  <!-- 多行文本 -->
  .form-group.flex(v-else-if="type === 'textarea'", :class="{'has-error': valid, 'has-success': success}")
    label.control-label {{ label }}
    .control
      textarea(:name="name" rows="10" cols="80" class="form-control" v-model="value", @input="touch")
    .help-block(v-show="valid") {{ errorMsg }}

  <!-- 密码 -->
  .form-group.flex(v-else-if="type === 'password'", :class="{'has-error': valid, 'has-success': success}")
    label.control-label {{ label }}
    .control
      input(:name="name" class="form-control" type="password" v-model="value", :placeholder="placeholder", @input="touch")
    .help-block(v-show="valid") {{ errorMsg }}

  <!-- 文本 -->
  .form-group.flex(v-else, :class="{'has-error': valid, 'has-success': success}")
    label.control-label {{ label }}
    .control
      input(:name="name" class="form-control" type="text" v-model="value", :placeholder="placeholder", @input="touch")
    .help-block(v-show="valid") {{ errorMsg }}
</template>

<style lang="scss" scoped>
.flex {
  display: flex;
}

.vuelidate-input {
  .form-group {
    line-height: 2.6rem;

    .control-label {
      min-width: 7rem;
      padding: 0 1rem;
    }
    .control {
      flex-basis: 50%;
      padding: 0 1rem;
    }
    .help-block {
      margin: 0;
    }
  }

  &.login {
    .form-group {
      flex-wrap: wrap;

      .control-label {
        flex-basis: 0;
      }
      .control {
        flex-basis: 100%;
        flex-shrink: 0;
        padding: 0;
      }
    }
  }
}
</style>

<script>
import errorMessage from 'src/errorMessage'

export default {
  name: 'vuelidate-input',

  data() {
    return {
      value: ''
    }
  },
  watch: {
    options(list) {
      const { id } = this.$route.query
      // 添加时默认第一个项
      if(list.length && !id) {
        this.value = list[0].id
      }
    },
    defaultValue(value) {
      // 修改时给输入框赋值
      const { id } = this.$route.query
      if (value && id) {
        this.value = value
      }
    }
  },
  props: {
    login: Boolean,
    label: String,
    name: String,
    placeholder: String,
    defaultValue: [String, Number],
    type: String,
    // select
    options: {
      type: Array,
      default() {
        return []
      }
    },
    validator: {
      type: Object
    }
  },
  validations() {
    const { validator } = this
    if (validator) {
      return {
        value: validator
      }
    }
    return {}
  },
  computed: {
    success() {
      if (this.validator) {
        return !this.$v.$invalid && this.$v.$dirty
      }
      return false
    },
    valid() {
      if (!this.validator) {
        return false
      }
      return this.$v.$error
    },
    errorMsg() {
      let message = ''
      if (!this.validator) {
        return message
      }

      const { $v, label } = this
      // 从$v.value内找到未通过校验
      const errorProp = Object.keys($v.value).find(p => p && p.indexOf('$') !== 0 && $v.value[p] === false)
      if (errorProp) {
        message = errorMessage[errorProp]
        if (typeof message === 'function') {
          message = message(label)
        }
        message = message || `need define ${errorProp} in errorMessage.js`
      }
      return message
    }
  },
  methods: {
    touch(...args) {
      if (this.validator) {
        this.$v.value.$touch(args)
      }
    }
  }
}
</script>
