<template>
  <footer>
    <div>
      <router-link to="/about">
        <div class="footer-title">Bio-senpai</div>
        <div class="version" v-if="fHana">v{{fVersion}} {{fHana}}</div>
      </router-link>
    </div>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      fHana: 'Haruka',
      fVersion: '4.S'
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="stylus">
f-color = hsl(220, 23%, 50%)

footer
  position absolute
  bottom .5em
  padding 0 1em
  left 0
  right 0
  width 100%
  //max-width 1100px
  margin auto
  color f-color
  font-size .9em
  display flex
  justify-content flex-end
  align-items center

  a
    color f-color
    text-decoration none
    text-align right
  a:visited
    color f-color
  a:hover
    color hsl(150, 80%, 50%)

  ::selection
    color white

.footer-title
  font 1.3em Unica One

.version
  font-size .8em
</style>
