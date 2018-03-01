/*
 * 定制VuelidateInput组件错误提示文字
 * 键为对应验证器的名字，
 * 值为String，或函数
 * */
export default {
  required: label => `${label || ''}必须填写`,
  password: label => `${label || ''}最小6位`,
  sameAsPassword: '两次密码不一样'
}
