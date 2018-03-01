<template lang="pug">
  form(ref="vuelidate-form", :name="formName", @submit.prevent.stop="submit")
    slot
</template>

<script>
import { getVuelidateChildren } from 'utils/getVuelidateChildren'

export default {
  name: 'vuelidate-form',

  props: {
    formName: {
      type: String
    },
    action: {
      type: Function
    }
  },
  methods: {
    getValues(inputs) {
      return inputs.reduce((result, input) => {
        if (input.name) {
          result[input.name] = input.value
        }
        return result
      }, {})
    },
    submit() {
      let inputs = getVuelidateChildren(this)
      const options = this.getValues(inputs)
      inputs = inputs.map(c => {
        if (c.validator) {
          c.$v.value.$touch()
        }
        return 'valid' in c ? c.valid : false
      })
      // 所有校验通过，返回false
      if (inputs.indexOf(true) === -1) {
        this.action(options)
      }
    }
  }
}
</script>
