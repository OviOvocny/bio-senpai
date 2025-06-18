<template>
  <div>
    <section>
      <div class="top-container">
          <svg id="bio" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" version="1.1" @click="party">
              <g>
                  <path d="m45.041 198.32a119.61 100.17 0 0 0 220.14 -16.18"/>
                  <g id="eyes">
                      <path d="m105.79 152.77a12.767 12.767 0 1 0 -25.534 0 12.767 12.767 0 0 0 25.534 0z"/>
                      <path d="m221.96 151.99a12.767 12.767 0 1 0 -25.534 0 12.767 12.767 0 0 0 25.534 0z"/>
                  </g>
                  <path d="m148.35 197.16-8.6748 15.025a3.1918 3.1918 0 0 0 2.7642 4.7877h17.35a3.1918 3.1918 0 0 0 2.7642 -4.7877l-8.6748-15.025a3.1918 3.1918 0 0 0 -5.5283 0z"/>
                  <path d="m151.11 45.192a113.66 113.66 0 0 0 -124.84 168.1"/>
                  <g id="bang">
                      <path d="m120.59 166.2a121.01 121.01 0 0 0 33.51 -107.56"/>
                      <path d="m120.59 166.2a64.853 64.853 0 0 0 33.51 -107.56"/>
                  </g>
                  <path d="m87.934 116.54a83.357 83.357 0 0 0 66.166 -57.9"/>
                  <path d="m265.59 179.86a122.24 122.24 0 0 0 -111.49 -121.22"/>
                  <path d="m248.81 232.89a107.82 107.82 0 0 0 -97.7 -187.7"/>
                  <path d="m45.041 198.32a51.525 51.525 0 0 0 21.835 41.464"/>
                  <path d="m26.271 213.29a69.972 69.972 0 0 0 40.604 26.493"/>
                  <path class="blush" d="m79.208 190.58 10.879-11.35"/>
                  <path class="blush" d="m85.592 190.58 10.879-11.35"/>
                  <path class="blush" d="m91.975 190.58 10.875-11.35"/>
                  <path class="blush" d="m195.38 190.58 10.879-11.345"/>
                  <path class="blush" d="m201.77 190.58 10.879-11.345"/>
                  <path class="blush" d="m208.15 190.58 10.88-11.35"/>
                  <path d="m265.18 182.14a6.3836 6.3836 0 0 0 0.40904 -2.2768"/>
                  <path d="m87.934 116.65a18.828 18.828 0 1 0 -37.657 0 18.828 18.828 0 0 0 37.657 0z"/>
                  <path d="m75.302 129.34a14.121 14.121 0 1 0 -3.84 1.2339"/>
                  <path d="m75.302 129.34 2.573-11.914a2.7547 2.7547 0 0 0 -3.5354 -3.2042l-10.902 3.5031a2.7547 2.7547 0 0 0 -1.0072 4.6638l9.0316 8.1855"/>
                  <path d="m54.651 128.72a73.899 73.899 0 0 0 12.224 111.06"/>
                  <path d="m248.81 232.89a125.21 125.21 0 0 0 -97.7 -187.7"/>
                  <g id="ahoge">
                      <path d="m151.11 45.192a35.004 35.004 0 0 0 -68.993 -11.643"/>
                      <path d="m151.11 45.192a41.654 41.654 0 0 0 -68.993 -11.643"/>
                  </g>
                  <path d="m87.934 116.54a54.464 54.464 0 0 0 28.756 -53.571"/>
              </g>
          </svg>
          <div class="top-title">Bio-senpai</div>
          <div class="top-version">v4.S Haruka</div>

          <div class="licence">
            Bio-senpai je archivovaná statická webová aplikace postavená na <a href="https://vuejs.org">Vue 2</a>,
            <a href="https://github.com/mzabriskie/axios">Axiosu</a> a <a href="https://cloudinary.com">Cloudinary</a>.
            Aplikaci distribuuje <a href="https://netlify.com">Netlify</a>.
          </div>
      </div>
    </section>

    <!-- Unsure...
    <section class="options">
      <h3>Zaškrtávátka</h3>
      <p>
        Podle toho, jak si vaše zařízení vedlo při animování některých částí webu, jsme možná vypuli některé náročnější efekty, protože nechceme, abyste nás soudili, že se vám ze zasekaných animací udělalo nevolno a zničili jste si klávesnici.
      </p>
      <p>
        Tady to můžete změnit, ale pak je to na vás. Muhahaha.
      </p>
      <div class="checkboxContainer">
        <input type="checkbox" name="highPerfTransition" id="option:transitions" class="checkbox-hidden"
        @change="options" :checked="highPerfTransition" />
        <label for="option:transitions" class="checkbox">
          <div class="checkboxIcons"><i class="mdi mdi-close"></i><i class="mdi mdi-check"></i></div>
        </label>
        <label for="option:transitions" class="checkboxLabel"><i class="mdi mdi-animation"></i> Animované přechody</label>
      </div>
      <p class="reading-size-adjust indent-250">
        Buďte jako kapitán Kirk a warpujte mezi jednotlivými sekcemi stylově.
      </p>
      <div class="checkboxContainer">
        <input type="checkbox" name="highPerf" id="option:effects" class="checkbox-hidden"
        @change="options" :checked="highPerf" />
        <label for="option:effects" class="checkbox">
          <div class="checkboxIcons"><i class="mdi mdi-close"></i><i class="mdi mdi-check"></i></div>
        </label>
        <label for="option:effects" class="checkboxLabel"><i class="mdi mdi-rice"></i> Pokročilé efekty</label>
      </div>
      <p class="reading-size-adjust indent-250">
        Nudí se vaše grafická jednotka? I na to jsme pomysleli.
      </p>
    </section>
    -->

    <section class="log reading-size-adjust" v-for="log in logs" :key="log">
        <h2>Verze {{log.version}} — {{log.hana}}</h2>
        <p>
            {{log.desc}}
        </p>
        <h3>Seznam změn</h3>
        <ul>
            <li v-for="change in log.changelog" :key="change">{{change}}</li>
        </ul>
    </section>

    <p>
      Pokud je něco špatně nebo jste tajný agent, můžete smazat vaše místní data, jako uložené jméno, rozepsanou nebo <strong>zatím neodeslanou</strong> zprávu, pozici v podcastech a nastavení zobrazení. Bude to, jako byste k nám přišli poprvně. Můžete to udělat i offline, Bio-senpai zůstane nainstalovaná.
    </p>
    <btn class="reset" @click="burnMe" icon="delete" variant="red">Smazat data</btn>
    <span>Tohle bez mikrovlnky nelze vrátit!</span>
  </div>
</template>

<script>
let party = 0
import gsd from '@/scripts/staticdata'
export default {
  data () {
    return {
      error: false,
      logs: [],
      latest: {}
      /*
      highPerfTransition: localStorage.getItem('highPerfTransition') === 'true' || !localStorage.getItem('highPerfTransition'),
      highPerf: localStorage.getItem('highPerf') === 'true' || !localStorage.getItem('highPerf')
      */
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    /*
    options (e) {
      const camel = e.target.name.replace(/-([a-z])/g, g => g[1].toUpperCase())
      this[camel] = e.target.checked
      localStorage.setItem(e.target.name, this[camel])
      this.$emit(`option:${e.target.checked ? 'set' : 'unset'}`, camel)
    },
    */
    burnMe () {
      const l = localStorage.length - 1
      for (let i = l; i >= 0; i--) {
        localStorage.removeItem(localStorage.key(i))
      }
      sessionStorage.setItem('deleted', Date.now())
      location.reload()
    },
    fetchData () {
      this.$emit('error', false)
      this.logs = gsd('changelogs')
    },
    party () {
      document.body.classList[++party % 3 === 0 ? 'add' : 'remove']('super-ultra-party-mode')
    }
  }
}
</script>

<style lang="stylus">
.top-container
  width 100%
  text-align center

.top-title
  font calc(2em + 1.5vw) Unica One
  user-select none
  cursor default
.top-version
  font-size calc(.9em + .8vw)
  user-select none
  cursor default
  margin-bottom 1em

.log, .options
  margin-bottom 6em

#bio path
  stroke #fff
  fill none
  stroke-linecap round

//@supports (background-blend-mode: normal)
#bio path:not(.blush)
  stroke-dasharray 300
  animation draw 3s

#bio .blush
  transition 1s
  opacity 0
  stroke-dasharray 20
  stroke-dashoffset 20
  &:nth-child(even)
    stroke-dashoffset -20

#bio
  width 80%
  max-width 400px
  transition transform .3s
  &:hover .blush
    stroke-dashoffset 0
    opacity 1
  &:active
    transform scaleY(.9)

@supports (tab-size 4)
  #ahoge
    transform-origin 50% 15%
    animation wind 2s alternate infinite
  #bang
    transform rotate(-8deg)
    transform-origin 52% 17%
    animation breeze 2s alternate infinite
  #eyes
    transform-origin 0 55%
    animation blink 5s infinite

@-webkit-keyframes draw
  from
    stroke-dashoffset 300
@keyframes draw
  from
    stroke-dashoffset 300
@-webkit-keyframes float-in
  to
    transform translateY(0)
    opacity 1
@keyframes float-in
  to
    transform translateY(0)
    opacity 1
@-webkit-keyframes wind
  from
    transform rotate(8deg)
  to
    transform rotate(-10deg)
@keyframes wind
  from
    transform rotate(8deg)
  to
    transform rotate(-10deg)
@-webkit-keyframes breeze
  to
    transform rotate(0)
@keyframes breeze
  to
    transform rotate(0)
@-webkit-keyframes blink
  48%, 55%
    transform scaleY(1)
  50%
    transform scaleY(0)
@keyframes blink
  48%, 55%
    transform scaleY(1)
  50%
    transform scaleY(0)
</style>
