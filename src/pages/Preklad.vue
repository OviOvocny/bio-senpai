<template>
  <section>
    <!-- <div :class="{'hero-wrap': true, 'revealed': entered && heroLoaded}">
      <cl-image class="hero" :src="'cover/' + $route.params.anime" :alt="'Obal ' + project.title" @imageloaded="heroLoaded = true"></cl-image>
    </div> -->

    <h1 :class="{'hero-title': true, 'long': isLong}">{{project.title}}</h1>
    <div class="project-data-wrap" v-if="ok">
      <span
        :class="{'project-data': true, 'episodes': true, 'complete': eps.done === eps.total}"
        :style="{'--percentage': `${(eps.done / eps.total) * 100}%`}"
      >
        {{epsVerbose}}
        <span v-if="eps.done < eps.total"> z {{eps.total}}</span>
      </span>
      <router-link class="project-data" v-for="tl in project.team.tl" :to="'/tym/' + tl" :key="tl">
        <icon symbol="translate"></icon> Překlad: {{tl}}
      </router-link>
      <router-link class="project-data" v-for="kor in project.team.kor" :to="'/tym/' + kor" :key="kor">
        <icon symbol="auto-fix"></icon> Korekce: {{kor}}
      </router-link>
    </div>

    <div class="center-text" v-if="!ok && !failed">
      <spinner></spinner>
    </div>

    <transition-group name="list-vertical">
      <!-- Hello CETA
      <div class="project-stream" v-if="$route.name === 'Stream'" key="stream">
        <div class="stream-controls" v-if="$route.params.episode">
          <router-link :to="`/stream/${$route.params.anime}/${parseInt($route.params.episode) - 1}`">
            <btn :disabled="parseInt($route.params.episode) <= 1">Předchozí</btn>
          </router-link>
          <span>Epizoda {{$route.params.episode}}</span>
          <router-link :to="`/stream/${$route.params.anime}/${parseInt($route.params.episode) + 1}`">
            <btn :disabled="parseInt($route.params.episode) >= parseInt(project.eps.done)">Další</btn>
          </router-link>
        </div>
        <div class="video-wrap">
          <iframe id="plr" :src="'https://drive.google.com/file/d/' + file + '/preview'" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
      -->

      <div class="project-card" key="project" v-if="ok">
        <div class="actions">
          <div class="actions-inner">
            <!-- Hello CETA
            <a tabindex="-1" :href="project.mega">
              <btn variant="red" icon="download">Přeložená videa</btn>
            </a>
            -->
            <a tabindex="-1" :href="'/static/data/' + project.url_title + '/ass.zip'" download>
              <btn icon="attachment">Všechny titulky</btn>
            </a>
            <div class="release-info">
              <icon symbol="help-circle"></icon>
              <div>
                Externí titulky pro <span v-if="!project.release">neznámé vydání</span>
                <div class="release-name" v-else>{{project.release}}</div>
              </div>
            </div>
          </div>
        </div>
        <transition-group-spring :stiffness="0" :friction="170" :duration="250" :stretch="1.1" tag="div" class="episode-list">
          <div class="episode" v-if="eps.total === 1 && !project.single_type" key="film">
            Film
            <div class="episode-actions">
              <a tabindex="-1" :href="`/static/data/${project.url_title}/%5BBio-senpai%5D%20${ue(project.title)}.ass`" download>
                <btn icon="attachment"></btn>
              </a>
              <!-- Hello CETA
              <router-link tabindex="-1" :to="`/stream/${project.url_title}`">
                <btn icon="play"></btn>
              </router-link>
              -->
            </div>
          </div>
          <div class="episode" v-else v-for="i in eps.done" :key="i">
            Epizoda {{i}}
            <div class="episode-actions">
              <a tabindex="-1" :href="`/static/data/${project.url_title}/%5BBio-senpai%5D%20${pad(i)}%20-%20${ue(project.title)}.ass`" download>
                <btn icon="attachment"></btn>
              </a>
              <!-- Hello CETA
              <router-link tabindex="-1" :to="`/stream/${project.url_title}/${i}`">
                <btn icon="play"></btn>
              </router-link>
              -->
            </div>
          </div>
        </transition-group-spring>
        <div class="project-desc">
          <div v-html="project.desc"></div>
          <div class="relatives" v-if="project.relatives">
            <div class="prequels" v-if="project.relatives.prequels">
              <h3>Předcházející:</h3>
              <router-link class="tl-link" v-for="prequel in prequelArr" :key="prequel" :to="'/projekty/' + prequel.url_title">
                <anime :data="prequel"></anime>
              </router-link>
            </div>
            <div class="sequels" v-if="project.relatives.sequels">
              <h3>Následující:</h3>
              <router-link class="tl-link" v-for="sequel in sequelArr" :key="sequel" :to="'/projekty/' + sequel.url_title">
                <anime :data="sequel"></anime>
              </router-link>
            </div>
            <div class="other" v-if="project.relatives.other">
              <h3>Související:</h3>
              <router-link class="tl-link" v-for="other in otherArr" :key="other" :to="'/projekty/' + other.url_title">
                <anime :data="other"></anime>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </transition-group>

    <router-link to="/survival-guide" class="help">
      <icon symbol="help-circle"></icon>
      {{whatsNext}}
    </router-link>

  </section>
</template>

<script>
import spinner from '@/components/spinner'
import urlencode from 'urlencode'
import getStaticData from '@/scripts/staticdata'

let nexts = [
  'Máte titulky, ale ještě tomu něco chybí? Podívejte se, kde sehnat ingredience.',
  'Takže jste sehnali titulky. Teď se podívejte, kde najdete ten zbytek.',
  'Titulky už máte, teď ještě pojďte najít to ostatní, ať to můžete dát dohromady.',
  'Titulky by byly, ale chtělo by to i ten zbytek. Pojďte se podívat, jak na to.',
  'Bingo! Máte titulky. Bohužel to ale nestačí, pojďte se podívat, co dělat dál.',
  'Ještě pro vás máme pár tipů, pokud nechcete jen číst titulky v texťáku.',
  'Psst, co takhle k tomu přihodit ještě video? Prý je to tak mnohem lepší.'
]

export default {
  data () {
    return {
      ok: false,
      failed: false,
      entered: false,
      error: false,
      project: {
        title: 'Hned to bude...',
        eps: {
          done: 0,
          total: 0
        },
        team: {
          tl: [],
          kor: []
        },
        stream: [],
        relatives: {}
      },
      relativeArr: [],
      heroLoaded: false
    }
  },
  mounted () {
    this.fetchData()
  },
  beforeRouteLeave (to, from, next) {
    if (to.params.anime !== this.$route.params.anime) {
      this.$emit('update:backdrop', '')
      next()
    } else {
      next()
    }
  },
  computed: {
    whatsNext () {
      return nexts[Math.floor(Math.random() * nexts.length)]
    },
    eps () {
      return {
        done: parseInt(this.project.eps.done),
        total: parseInt(this.project.eps.total)
      }
    },
    isLong () {
      return this.project.title.length > 30
    },
    epsVerbose () {
      if (this.project.single_type) {
        return this.project.single_type
      } else if (this.eps.total === 1) {
        return 'Film'
      } else if (this.eps.done === 1) {
        return this.eps.done + ' epizoda'
      } else if (this.eps.done > 1 && this.eps.done <= 4) {
        return this.eps.done + ' epizody'
      } else {
        return this.eps.done + ' epizod'
      }
    },
    prequelArr () {
      return this.relativeArr.filter(rel => this.project.relatives.prequels.includes(rel.url_title))
    },
    sequelArr () {
      return this.relativeArr.filter(rel => this.project.relatives.sequels.includes(rel.url_title))
    },
    otherArr () {
      return this.relativeArr.filter(rel => this.project.relatives.other.includes(rel.url_title))
    },
    file () {
      const ep = this.$route.params.episode ? parseInt(this.$route.params.episode) - 1 : 0
      return this.project.stream[ep]
    }
  },
  methods: {
    ue (str) {
      str = urlencode(str)
      str = str.replace('!', '%21')
      return str
    },
    pad (num) {
      return (String(num).length === 1) ? '0' + num : num
    },
    relativeData () {
      const allAnime = getStaticData('anime')
      if (!this.project.relatives) return
      this.relativeArr = allAnime.filter(rel => {
        return (
          (this.project.relatives.prequels && this.project.relatives.prequels.includes(rel.url_title)) ||
          (this.project.relatives.sequels && this.project.relatives.sequels.includes(rel.url_title)) ||
          (this.project.relatives.other && this.project.relatives.other.includes(rel.url_title))
        )
      })
    },
    fetchData () {
      this.$emit('error', false)
      const allAnime = getStaticData('anime')
      const found = allAnime.find(a => a.url_title === this.$route.params.anime)
      if (found) {
        this.project = found
        this.ok = true
        document.title = `${this.project.title} | Bio-senpai`
        if (this.project.relatives) this.relativeData()
      } else {
        this.project.title = 'Tak nic...'
        this.failed = true
        this.$emit('error', 'Projekt se nedá načíst.')
      }
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.params.anime !== from.params.anime) {
        this.fetchData()
      }
    },
    'project' () {
      this.$emit('update:backdrop', 'cover/' + this.$route.params.anime)
    }
  },
  components: {
    spinner
  }
}
</script>

<style lang="stylus">
bgcolor = #1e2430

.project-desc
  padding 1em
  grid-area desc
  -ms-grid-column 2

.release-info
  //font-size .9em
  display flex
  color alpha(white, 70%)
  margin-top 1em
  i
    margin-right .5em
.release-name
  font-size 1.3em

.episode-list
  padding 1em
  border-right 2px solid bgcolor
  grid-area eps
  -ms-grid-row 2

.actions
  display flex
  align-items center
  padding 1em
  border-right 2px solid bgcolor
  max-width 25ch
  grid-area actions
  -ms-grid-row 1

.actions-inner
  width 100%
  & > a
    display block
  button
    width 100%

.episode
  display flex
  align-items center
  justify-content space-between
  padding .5em 1em
  border-top 1px solid alpha(bgcolor, 50%)

.episode-actions
  margin-left 1em

.project-card
  background lighten(bgcolor, 15%)
  color white
  border-radius 15px
  margin-top 1.5em
  margin-top calc(1em + 1vw)
  margin-bottom 3em
  display grid
  grid-template-areas "actions desc desc" \
                      "eps     desc desc"

@media (max-width: 625px)
  .project-card
    grid-template-areas "actions" \
                        "desc"    \
                        "eps"

  .episode-list, .actions
    border 0

  .project-desc
    -ms-grid-column 1
    -ms-grid-row 3

@supports not (display: -ms-grid)
  @media (min-width: 1055px)
    .project-card
      grid-template-areas "actions desc" \
                          "eps     eps"

    .actions
      margin 1em 0
      border-right 1px solid alpha(bgcolor, 50%)

    .episode-list
      border 0
      border-top 2px solid alpha(bgcolor, 100%)
      display grid
      grid-template-columns repeat(4, 1fr)

    .episode
      border 0
      border-right 1px solid alpha(bgcolor, 50%)
      &:nth-child(4n)
        border 0

.project-data-wrap
  text-align center

.project-data
  display inline-block
  background lighten(bgcolor, 15%)
  color white
  border-radius 1em
  padding .3em 1em
  margin 0 .5em 1em .5em
  text-decoration none
  &.episodes
    --percentage 0%
    background lighten(bgcolor, 15%)
    background linear-gradient(to right, lighten(bgcolor, 40%) var(--percentage), lighten(bgcolor, 15%) var(--percentage))
    color white
    padding .2em .9em
    border .1em solid lighten(bgcolor, 40%)
    &.complete
      border-color hsl(150, 80%, 50%)
      background lighten(bgcolor, 15%)

.hero-wrap
  position absolute
  z-index -1
  top 200px
  left 0
  width 100%
  opacity 0
  //filter blur(0.3vw)
  //transform scale(1.05)
  transition opacity .2s
  &::before
    content ''
    position absolute
    width 100%
    height 100%
    background linear-gradient(alpha(bgcolor, 60%) 0%, alpha(bgcolor, 90%) 50%, bgcolor 80%)
  &.revealed
    opacity 1
    transition opacity 1s

.hero
  width 100%

@media (orientation: portrait)
  .hero-wrap
    top 0

.hero-title
  font-size 3em
  font-size calc(1.5em + 1.5vw)
  margin .5em
  padding 0.3em
  text-align center
  font-family Unica One
  // border solid
  // border-width 1px 0
  &.long
    font-size calc(1.5em + 1vw)

.tl-link
  text-decoration none

.project-stream
  padding 1em
  background-color bgcolor
  border-radius 15px

.stream-controls
  display flex
  justify-content center
  align-items center
  margin-bottom 1em
  span
    text-align center
    flex-grow 2

.video-wrap
  position relative
  padding-top 56.25%
  iframe
    position absolute
    top 0
    left 0
    width 100%
    height 100%

.list-vertical-enter-active, .list-vertical-leave-active, .list-vertical-move
  trannsform-origin top
  transition all .3s
.list-vertical-enter, .list-vertical-leave-to
  opacity 0
  transform scaleY(1.1) translateY(10%)

a.help
  display block
  text-align center
  color alpha(white, 80%)
  text-decoration none
  &:hover
    color white
</style>
