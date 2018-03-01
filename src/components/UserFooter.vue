<template lang="pug">
  div
    footer.blog-footer
      p Blog template built for 
        a(href="javascript:;") Bootstrap
        | &nbsp;by&nbsp;
        a(href="javascript:;") @mdo
        | .
      router-link(class="login" to="/login") 用户登陆
      router-link(class="login" to="/reg") 用户注册
      p
        a(href="#") Back to top
</template>

<style lang="scss" scoped>
@import "../css/blog";
</style>
