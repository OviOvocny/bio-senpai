<template>
  <section>
    <error :error="error" @retry="fetchData"></error>
    <div class="searchfield-wrap">
      <input class="searchfield" type="text" v-model="search" @input="$refs.iso.filter('text')" placeholder="Vyhledat..." >
    </div>
    <isotope ref="iso" :list="team" :options="isoOptions" :class="{'tiles': true, 'hidden': hidden}">
      <member-card v-for="member in team" :data="member" :key="member.url_name"></member-card>
    </isotope>
  </section>
</template>

<script>
import gsd from '@/scripts/staticdata'
import isotope from 'vueisotope'
export default {
  submenu: ['Tým', 'Přidat se'],
  data () {
    let self = this
    return {
      onlineData: false,
      error: false,
      hidden: false,
      team: [],
      category: 'bio',
      search: this.$route.params.member || '',
      isoOptions: {
        itemSelector: '.member',
        layoutMode: 'masonry',
        masonry: {
          isFitWidth: true,
          gutter: 30
        },
        getFilterData: {
          text (el) {
            return self.search === '' ? el.categories.includes(self.category) : el.name.toLowerCase().includes(self.search.toLowerCase()) || el.role[0].map(r => r.toLowerCase()).some(r => r.includes(self.search.toLowerCase()))
          }
        },
        getSortData: {
          dbid (el) {
            return parseInt(el.id, 16)
          }
        },
        sortBy: 'dbid',
        sortAscending: true,
        stagger: 20,
        hiddenStyle: {
          transform: 'translateY(10%) scaleY(1.05)',
          opacity: 0
        }
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$emit('error', false)
      this.team = gsd('members')
    }
  },
  watch: {
    category () {
      const cat = this.category
    },
    search () {
      this.$router.replace(this.search ? '/tym/' + this.search : '/tym')
    },
    $route () {
      this.search = this.$route.params.member || ''
    }
  },
  beforeRouteLeave (to, from, next) {
    this.hidden = true
    setTimeout(next, 100)
  },
  components: {
    isotope
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

.tl-link
  text-decoration none
  &:focus
    outline 0
    .tl
      outline 2px solid
      animation pop .5s
</style>
