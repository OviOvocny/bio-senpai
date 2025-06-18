<template>
  <section class="relative">
    <transition-zoom :distance="0.3" :twist="-20" :enabled="highPerf">
      <cl-image v-if="entered || !highPerf" class="top-anime__mascot" :src="'mascot-ng/' + randomMascot" width="350"></cl-image>
    </transition-zoom>

    <div class="top-anime">
      <div class="top-anime__cover">
        <cl-image ref="topImage" v-if="ready" :src="'cover/' + show.url_title"></cl-image>
      </div>
      <div class="top-anime--info">
        <h2 class="top-anime__title">
          <router-link :to="'/projekty/' + show.url_title">{{show.title}}</router-link>
        </h2>
        <h3 v-if="show.team.tl && show.team.tl.length">Zprasil {{show.team.tl[0]}} {{releasedTimeAgo}}</h3>
        <span class="top-anime__episodes">Přeloženo {{show.eps.done}} z {{show.eps.total}}</span>
        <div class="top-anime--buttons">
          <a tabindex="-1" :href="`//data.bio-senpai.ovi.moe/data/${show.url_title}/ass.zip`" download>
            <btn icon="attachment">Stáhnout titulky</btn>
          </a>
          <router-link :to="'/projekty/' + show.url_title">
            <btn icon="magnify">Detail</btn>
          </router-link>
        </div>
      </div>
    </div>

    <div class="top-modules">
      <div class="top-modules--area top-modules__yoimiru">
        <div class="yoimiru__flex">
          <div class="yoimiru__flex">
            <svg class="yoimiru__logo" viewBox="0 0 284 259" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M161.695 119.311C171.36 102.571 192.766 96.835 209.506 106.5C226.246 116.165 231.982 137.571 222.317 154.311L172.317 240.913C162.652 257.654 141.246 263.389 124.506 253.724C107.766 244.059 102.03 222.654 111.695 205.913L161.695 119.311Z"/>
              <path d="M113.195 35C113.195 15.67 128.865 0 148.195 0H248.195C267.525 0 283.195 15.67 283.195 35C283.195 54.33 267.525 70 248.195 70H148.195C128.865 70 113.195 54.33 113.195 35Z"/>
              <path d="M102.506 153.724C85.7656 163.389 64.3599 157.654 54.695 140.913L4.69496 54.3109C-4.97003 37.5706 0.765602 16.165 17.5058 6.49999C34.2461 -3.16499 55.6518 2.57064 65.3167 19.3109L115.317 105.913C124.982 122.654 119.246 144.059 102.506 153.724Z"/>
            </svg>
            <h2>Zkuste Yoimiru, náš podcast o anime a všem okolo!</h2>
          </div>
          <router-link to="/podcast">
            <btn icon="radio">Podcast</btn>
          </router-link>
        </div>
      </div>

      <div class="top-modules--flex">
        <div class="top-modules--area top-modules__guide">
          <h2>
            <icon symbol="compass" class="spinny-spinny"></icon>
            Survival guide
          </h2>
          <p>
            Zjistěte, jak sehnat video k naším titulkům.
            Protože nemůžeme přímo poskytovat nebo odkazovat na naše zdroje,
            připravili jsme pro vás stručnou příručku.
          </p>
          <router-link to="/survival-guide">
            <btn icon="hand-pointing-right">Tudy</btn>
          </router-link>
        </div>
        <div class="top-modules--area top-modules__social">
          <div>
            <h2>
              <icon symbol="message"></icon>
              Pojďte prohodit pár slov
            </h2>
            <p>Pokud vás neodradili naše citáty v hlavičce, tak si určitě budeme rozumět.</p>
          </div>
          <div class="social-links">
            <a href="//discord.gg/dcJ3E3y" class="social-links__discord">
              <icon symbol="discord"></icon>
              <span class="social-links__label">Discord</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const randomMascotArray = [
  'wow', 'cat', 'devious', 'lewd', 'nani', 'shady', 'supersmile'
]

import getStaticData from '@/scripts/staticdata'
export default {
  data () {
    return {
      ready: false,
      entered: false,
      highPerf: localStorage.getItem('highPerf') === 'true' || !localStorage.getItem('highPerf'),
      show: {
        title: '',
        url_title: '',
        team: { tl: [] },
        eps: { done: 0, total: 0 },
        updated: 0
      }
    }
  },
  computed: {
    releasedTimeAgo () {
      if (!this.show.updated) return ''
      return require('moment').unix(this.show.updated).locale('cs').fromNow()
    },
    randomMascot () {
      return new Date().getMonth() === 11 ? 'santa' : randomMascotArray[Math.floor(Math.random() * randomMascotArray.length)]
    }
  },
  methods: {
    pad (num) {
      return (String(num).length === 1) ? '0' + num : num
    },
    isLong (str) {
      return str.length > 35
    },
    handleScroll () {
      if (window.matchMedia('(prefers-reduced-motion)').matches || localStorage.getItem('highPerf') === 'false') return
      let percent = (20 / window.innerHeight) * window.pageYOffset * 2
      if (window.pageYOffset < window.innerHeight && this.$refs.topImage) this.$refs.topImage.$el.style.transform = `translateY(-${(20 - percent)}%)`
    },
    playEpisode () {},
    articleDate () {}
  },
  created () {
    const animeList = getStaticData('anime')
    // Use hanayamata as the hero anime
    const hanayamata = animeList.find(a => a.url_title === 'hanayamata')
    this.show = hanayamata || (animeList && animeList.length ? animeList[0] : this.show)
    this.ready = true
    window.addEventListener('scroll', this.handleScroll, {passive: true})
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="stylus">
@import "../stylus/unified-color"

.top-modules
  margin -.5em
  margin-bottom 1em

.top-modules--flex
  display flex
  flex-wrap wrap
  .top-modules--area
    flex 1 2 400px

.top-modules--area
  background-color lighten(bgcolor, 15%)
  padding 1em
  border-radius 15px
  margin .5em
  h2
    margin-top .25em

.yoimiru__logo
  height 18px
  margin-right .3em
  margin-top .9em
  fill currentColor

.yoimiru__flex
  display flex
  justify-content space-between
  align-items flex-start

@media (max-width: 600px)
  .yoimiru__flex h2
    display none

.yoimiru__episodes
  display flex
  justify-content space-between
  flex-wrap wrap
  margin-bottom -1em

.yoimiru__ep
  margin 1em
  flex 1 1 20em
  img
    margin-right 1em
    width 100%
    max-width 160px
    max-height @max-width
    border-radius 5px

.yoimiru__ep-flex
  display flex

.yoimiru__ep-header
  position relative
  width 100%
  h3
    max-width 10em
    font-size 1.6em
    margin 0
    &.long
      font-size 1.3em
  button
    position absolute
    bottom .2em
    margin 0
    margin-top .5em

@media (max-width: 500px)
  .yoimiru__ep img
    max-width 80px
    max-height @max-width
  .yoimiru__ep-header
    h3
      font-size 1.2em
    button
      position relative

.top-modules__social
  display flex
  flex-direction column
  justify-content space-between

.social-links
  display flex
  justify-content space-around
  & > *
    text-align center
    text-decoration none
    flex-grow 1
    padding 0.3em 1em
    margin 0.3em
    border-radius 2em
    border-width 2px
    border-style solid
    outline none
    user-select none
    cursor default
    transition border-color .5s
    &:visited
      color white
    &:hover
      transition-duration .15s
      border-color white
@media (max-width: 850px)
  .social-links__label
    display none
  .social-links > *
    padding .35em

.social-links__native
  color white
  border: 2px solid ln(palette.green)
  background-color: bg(palette.green)
.social-links__facebook
  color white
  border 2px solid #4f7cda
  background-color modest(#4f7cda)
.social-links__twitter
  color white
  border 2px solid #1da1f2
  background-color modest(#1da1f2)
.social-links__discord
  color white
  border 2px solid #7289da
  background-color modest(#7289da)


.top-news__grid
  article
    padding 1em
    border-radius 15px
    background lighten(bgcolor, 15%)
    margin-bottom 1em
  h3
    margin-top 0

.article__meta
  display flex
  align-items center
  justify-content space-between

.article__author
  display flex
  align-items center
  img
    height 40px
    width @height
    border-radius (@height / 2)
    border 2px solid
    margin-right .75em

.top-anime
  position relative
  overflow hidden
  border-radius 15px 15px 0 0
  margin-top 1em
  margin-bottom 2em

.top-anime__mascot
  position absolute
  top -2rem
  left -5%
  max-width 230px
  transition top .5s, left .5s

@media (max-width: 1400px)
  .top-anime__mascot
    left -.5vw
    width 16vw
    @media (max-width: 600px), (orientation: portrait)
      .top-anime__mascot
        display none

.top-anime__cover
  position absolute
  height 100%
  width 100%
  max-height max-content
  overflow hidden
  z-index -1
  &::before
    content ""
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background-image linear-gradient(alpha(bgcolor, 60%) 0%, alpha(bgcolor, 90%) 50%, bgcolor 80%)
  img
    position relative
    z-index -1
    width 100%
    transform translateY(-20%)
    object-fit cover

.top-anime--info
  text-align right
  margin 2rem
  font-size calc(0.8rem + 0.25vw)
  & > *
    padding 0.3rem
    margin 0 1rem
@media (max-width: 600px), (orientation: portrait)
  .top-anime--info
    text-align center

.top-anime__title
  font-size 3em
  margin 0 .5rem
  font-family Unica One
  a
    color white
    text-decoration none

.top-anime__episodes
  display inline-block
  background-color white
  color bgcolor
  font-size 1.25em
  padding .3em .7em
  margin .5em 1em
  border-radius 1em

.top-anime--buttons
  padding 1rem 0
  a.wtf
    color alpha(white, 80%)
    text-decoration none
    &:hover
      color white

.spinny-spinny::before
  animation spinny 1s
@keyframes spinny
  0%
    transform rotate(-80deg)
  30%
    transform rotate(40deg)
  70%
    transform rotate(-20deg)
</style>
