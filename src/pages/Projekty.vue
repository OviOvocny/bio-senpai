<template>
  <section>
    <div class="searchfield-wrap">
      <input class="searchfield" type="text" v-model="search" @input="$refs.iso.filter('text')" placeholder="Vyhledat..." >
    </div>
    <isotope ref="iso" :list="anime" :options="isoOptions" :class="{'tiles': true, 'hidden': hidden, 'zooming': zooming}" v-show="anime.length > 0">
      <router-link class="tl-link" v-for="show in shows" :key="show.url_title" :to="'/projekty/' + show.url_title">
        <anime :data="show"></anime>
      </router-link>
    </isotope>
  </section>
</template>

<script>
import getStaticData from '@/scripts/staticdata'
import isotope from 'vueisotope'
export default {
  submenu: ['Projekty', 'Návrhy', 'Podcast'],
  data () {
    let self = this
    return {
      onlineData: false,
      error: false,
      anime: [],
      hidden: false,
      zooming: false,
      search: '',
      isoOptions: {
        itemSelector: '.tl',
        layoutMode: 'masonry',
        masonry: {
          isFitWidth: true,
          gutter: 30
        },
        getFilterData: {
          text (el) {
            return el.title.toLowerCase().includes(self.search.toLowerCase())
          }
        },
        stagger: 20,
        hiddenStyle: {
          transform: 'translateY(10%) scaleY(1.05)',
          opacity: 0
        }
      }
    }
  },
  computed: {
    shows () {
      return this.anime.filter(a => !a.hidden)
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.anime = getStaticData('anime')
    }
  },
  components: {
    isotope
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'Překlad') {
      this.zooming = true
    }
    this.hidden = true
    setTimeout(next, 100)
  }
}
</script>

<style lang="stylus">
.searchfield-wrap
  text-align center

.tiles
  padding 1em
  left 0
  right 0
  margin 1em auto
  will-change width
  transition width 0.5s

.hidden
  opacity 0
  transition .05s ease-in

.zooming
  transform-origin center
  transform scale(0.95)

.tl-link
  text-decoration none
  &:focus
    outline 0
    .tl
      outline 2px solid
      animation pop .5s
</style>
