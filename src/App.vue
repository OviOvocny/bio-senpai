<template>
  <div id="app">
    <error :error="error" @retry="reFetchView" @ignore="error = false"></error>
    <ticker :ticker="ticker" :tickerIcon="tickerIcon" :buttons="tickerButtons" @ignore="ticker = false" :tickerTimeout="tickerTimeout"></ticker>
    <bio-nav
      :items="navItems"
      :show="show"
      :hp="highPerf"
      :audioSource="audioSource"
      :audioMetadata="audioMeta"
      :audioChapter="audioChapter"
      :podcast="audioActive"
      @close="updateAudio"
      @ticker="updateTicker"
      autosave></bio-nav>
    <backdrop :src="backdropImage" :params="backdropParameters"></backdrop>
    <main>
      <bio-header @error="updateError" :hp="highPerf" ref="header"></bio-header>
      <transition :name="highPerfTransition? 'warp' : 'quick'" mode="out-in" @after-enter="$refs.view.entered = true">
        <router-view
          ref="view"
          :show="show"
          @update:subnav="val => subnav = val"
          @update:audio="updateAudio"
          @update:audio-meta="val => audioMeta = val"
          @update:audio-chapter="val => audioChapter = val"
          @update:backdrop="updateBackdrop"
          @option:set="setOption"
          @option:unset="unsetOption"
          @error="updateError"
          @ticker="updateTicker"
        ></router-view>
      </transition>
    </main>
    <show-offline>
      <transition-spring from="left">
        <div class="offline-badge">
          <icon symbol="wifi-off"></icon>
        </div>
      </transition-spring>
    </show-offline>
    <!--<audio-player></audio-player>-->
    <bio-footer></bio-footer>
  </div>
</template>

<script>
import bioHeader from './components/bio-header'
import bioNav from './components/bio-nav'
import backdrop from './components/backdrop'
import bioFooter from './components/bio-footer'
import showOffline from './components/show-offline'
import {navItems} from './router/routes'
import collectFPS from 'collect-fps'

export default {
  name: 'app',
  data: function () {
    return {
      navItems,
      show: undefined,
      audioSource: '',
      audioMeta: {},
      audioChapter: undefined,
      backdropImage: '',
      backdropParameters: {},
      error: false,
      ticker: false,
      tickerIcon: '',
      tickerButtons: [],
      tickerTimeout: 5000,
      highPerfTransition: localStorage.getItem('highPerfTransition') === 'true' || !localStorage.getItem('highPerfTransition'),
      highPerf: localStorage.getItem('highPerf') === 'true' || !localStorage.getItem('highPerf')
    }
  },
  computed: {
    audioActive () {
      return Boolean(this.audioSource)
    }
  },
  methods: {
    setOption (val) {
      this[val] = true
      localStorage.setItem(val, this[val])
    },
    unsetOption (val) {
      this[val] = false
      localStorage.setItem(val, this[val])
    },
    toggleOption (val) {
      this[val] = !this[val]
      localStorage.setItem(val, this[val])
    },
    checkSW () {
      if (document.body.classList.contains('outdated-sw')) {
        this.updateTicker(
          'Pro dokončení aktualizace znovu načtěte stránku',
          'update',
          60000,
          [
            {
              label: 'Aktualizovat',
              icon: 'reload',
              action: () => window.location.reload()
            }
          ]
        )
      }
    },
    fetchData () {
      this.show = {
        title: 'Hanayamata',
        url_title: 'hanayamata'
      }
    },
    updateAudio (val = '') {
      this.audioSource = val
    },
    updateError (val = false) {
      this.error = val
    },
    updateTicker (msg = false, icon = '', timeout = 5000, buttons = []) {
      this.ticker = msg
      this.tickerIcon = icon
      this.tickerButtons = buttons
      this.tickerTimeout = timeout
    },
    updateBackdrop (src = '', params = {}) {
      this.backdropImage = src
      this.backdropParameters = params
    },
    reFetchView () {
      this.$refs.view.fetchData()
    },
  },
  components: {
    bioHeader,
    bioNav,
    backdrop,
    bioFooter,
    showOffline
  },
  watch: {
    '$route' (to, from) {
      if (from.name && !localStorage.getItem('highPerfTransition')) {
        const end = collectFPS()
        setTimeout(() => {
          const fps = end()
          this.highPerfTransition = fps > 40
          localStorage.setItem('highPerfTransition', this.highPerfTransition)
        }, 100)
      }
    }
  },
  created () {
    window.addEventListener('keydown', e => {
      if (e.ctrlKey && e.shiftKey) {
        switch (e.code) {
          case 'KeyT':
            e.preventDefault()
            this.toggleOption('highPerfTransition')
            break
          case 'KeyP':
            e.preventDefault()
            this.toggleOption('highPerf')
            break
          case 'KeyK':
            e.preventDefault()
            this.$refs.header.fetchData()
            break
        }
      }
    })
    this.fetchData()
  },
  mounted () {
    if (sessionStorage.getItem('deleted')) {
      sessionStorage.removeItem('deleted')
      this.updateTicker(
          'Všechno jsme smazali... A vy jste kdo?',
          'delete-empty'
        )
    }
  }
}
</script>

<style lang="stylus">
@import "stylus/unified-color"
ease-out-expo = cubic-bezier(0.19, 1, 0.22, 1)

.list-enter-active, .list-leave-active, .list-move
  transition all .3s
.list-enter, .list-leave-to
  opacity 0
  transform scaleY(.5)

wdist = 4em
wstr = 1.05
.warp-enter-active
  transform-origin top
  transition transform 350ms, opacity 150ms
  transition-timing-function ease-out-expo
.warp-leave-active
  transform-origin top
  transition transform 0ms, opacity 50ms
  transition-timing-function ease-in
.warp-enter
  opacity 0
  transform translateY(wdist)
.warp-leave-to
  opacity 0
  //transform scaleY(wstr) translateY(-(wdist))

.fade-enter-active
  transition .6s cubic-bezier(0.190, 1.000, 0.220, 1.000)
.fade-leave-active
  transition .1s ease-in

.fade-leave-to
  opacity 0
  transform translateX(-.2em)
.fade-enter
  opacity 0
  transform translateX(.5em)

.quick-enter-active
  transition .2s cubic-bezier(0.190, 1.000, 0.220, 1.000)
.quick-leave-active
  transition .1s ease-in

.quick-leave-to
  opacity 0
.quick-enter
  opacity 0

#app
  min-height 100vh
  padding-bottom 5em
  transition padding-left .7s ease-out-expo

@media (min-width: 700px) and (min-height: 28em)
  #app
    padding-left 220px

*
  outline-color hsl(150, 80%, 50%)

@media (min-width: 600px)
  p
    text-align justify

.center-text
  text-align center

.relative
  position relative

@keyframes pop
  0%
    // transform scale(1.05)
    box-shadow 0 0 0 hsl(150,80%,50%)
  100%
    box-shadow 0 0 0 .7em transparent

@import 'assets/font/noto-sans.css'
@import 'assets/font/unica-one.css'
@import '~@mdi/font/css/materialdesignicons.min.css'

green(l)
  hsl(150, 80%, l)

*, *::before, *::after
  box-sizing border-box
::-moz-selection
  background green(60)
::selection
  background green(60)

body
  background bgcolor
  font-family Noto Sans
  color #eee
  -webkit-touch-callout none
  position relative
  min-height 100vh
  overflow-x hidden
  line-height normal
.super-ultra-party-mode
  animation supm 5s infinite
  // background-image linear-gradient(rgba(206,106,255,.2) 0%,rgba(201,97,252,.2) 0%,rgba(95,255,255,.2) 34%,rgba(102,249,98,.2) 65%,rgba(255,96,96,.2) 100%,rgba(255,105,106,.2) 100%)

@keyframes supm
  to
    filter hue-rotate(1turn)

a
  display inline-block
  color green(60)
a:visited
  color green(40)

.no-scroll
  overflow-y hidden

.offline-badge
  position fixed
  position sticky
  bottom 1em
  left 1em
  text-align center
  width 2.5em
  height @width
  line-height @height - 0.2
  background-color: bg(palette.red)
  border: 2px solid ln(palette.red)
  border-radius 2em

main
  padding 1em 2em
  width 100%
  max-width 1100px
  margin auto

.reading-size-adjust
  font-size .9rem
.reading-line-adjust
  line-height 1.2em
.indent-250
  padding-left 2.5em

input[type=text], input[type=search], input[type=number]
  border-radius 2em
  padding .3em .9em
  background-color lighten(bgcolor, 15%)
  color white
  font-family Noto Sans
  border 2px solid lighten(#1e2430, 50%)
  transition border-color .2s
  outline 0
  &:hover, &:focus
    animation pop .5s
    border-color hsl(150,80%,50%)
  &::placeholder
    color alpha(white, 90%)

.radio-group
  border 0
  padding 0
  margin 1em 0
  label
    display inline-block
    cursor pointer
    margin .5em -3px
    padding 0.3em 1em
    border: 2px solid ln(palette.green)
    background-color: bg(palette.green)
    transition .2s
    &:nth-child(2)
      border-radius 2em 0 0 2em
    &:last-child
      border-radius 0 2em 2em 0
  input[type=radio]
    display none
    &:checked + label
      background-color: ln(palette.green)
      color #1e2430

.checkboxContainer
  height 1em
  margin 1em 0.3em
  display flex
  align-items center
  .checkboxLabel
    height 1.25em

.checkbox-hidden
  opacity 0
  width 0
  &:checked
    & + .checkbox
      background: bg(palette.green)
      border-color: ln(palette.green)
      .checkboxIcons
        transform translateY(-1.25em)
        transform translateY(-1.25em)
  &:focus + .checkbox
    border-color white

.checkbox
  position relative
  display inline-flex
  align-items center
  overflow hidden
  justify-content center
  width 20px
  height 20px
  margin 0.3em
  border-radius 0.4em
  border-style solid
  border-width 2px
  border-color: ln(palette.red)
  background: bg(palette.red)
  color white
  // box-shadow 0 0.2em 0.3em rgba(0,0,0,0.15)
  transition-property border, color, background-color, box-shadow
  transition-duration 0.15s
  &:hover
    // box-shadow 0 0.2em 0.5em rgba(0,0,0,0.25)
  &:active
    transform scale(0.8)
    transform scale(0.8)
    // box-shadow 0 0 0 0
    transition-duration 0.1s
  i
    cursor pointer

.checkboxIcons
  position absolute
  top -.10em
  left .05em
  transition transform 0.3s
  .mdi
    font-size 14px
    display block
    height 20px

input[type=submit]
  font-family Noto Sans
  padding 0.3em 1em
  margin 0.3em
  border-radius 2em
  color #fff
  border-width 2px
  border-style solid
  border-color: ln(palette.green)
  background-color: bg(palette.green)
  outline none
  transition-property box-shadow, border-color, transform
  transition-duration: 0.5s
  &:focus
    &:not(:hover)
      border-color currentColor
      animation pop .5s
  &:hover
    &:not([disabled])
      border-color currentColor
      transition-duration 0.15s
  &:active
    transform scale(0.95)
    transition-duration 0.1s
</style>
