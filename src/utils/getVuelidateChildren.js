export const getVuelidateChildren = self => {
  return self.$children.reduce((r, vm) => {
    if (vm.$options.name.indexOf('vuelidate-') === 0) {
      r.push(vm)
    }
    return r
  }, [])
}
