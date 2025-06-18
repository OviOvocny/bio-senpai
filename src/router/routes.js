// import Home from '@/pages/Home'
// import Projekty from '@/pages/Projekty'
// import Preklad from '@/pages/Preklad'
// import Navrhy from '@/pages/Navrhy'
// import Podcast from '@/pages/Podcast'
// import Tym from '@/pages/Tym'
// import Prihlaska from '@/pages/Prihlaska'
// import Kontakt from '@/pages/Kontakt'
// import FAQ from '@/pages/FAQ'
// import About from '@/pages/About'

const Home = r => require.ensure([], () => r(require('@/pages/Home.vue')))
const Projekty = r => require.ensure([], () => r(require('@/pages/Projekty.vue')))
const Preklad = r => require.ensure([], () => r(require('@/pages/Preklad.vue')))
const Podcast = r => require.ensure([], () => r(require('@/pages/Podcast.vue')))
const Tym = r => require.ensure([], () => r(require('@/pages/Tym.vue')))
const About = r => require.ensure([], () => r(require('@/pages/About.vue')))
const Survival = r => require.ensure([], () => r(require('@/pages/Survival.vue')))

const routes = [
  {
    path: '/',
    name: 'Přehled',
    component: Home,
    alias: '/novinky',
    meta: {
      title: 'Bio-senpai',
      icon: 'home'
    }
  },
  {
    path: '/podcast',
    name: 'Podcast',
    component: Podcast,
    meta: {
      title: 'Yoimiru | Bio-senpai',
      icon: 'radio'
      // navHidden: true
    }
  },
  {
    path: '/projekty',
    name: 'Projekty',
    component: Projekty,
    meta: {
      title: 'Projekty | Bio-senpai',
      icon: 'flask'
    }
  },
  {
    path: '/projekty/:anime',
    name: 'Překlad',
    component: Preklad,
    meta: {
      title: 'Překlad | Bio-senpai',
      navHidden: true
    }
  },
  {
    path: '/stream/:anime/:episode?',
    name: 'Stream',
    component: Preklad,
    meta: {
      title: 'Stream | Bio-senpai',
      navHidden: true
    }
  },
  {
    path: '/tym/:member?',
    name: 'Tým',
    component: Tym,
    meta: {
      title: 'Tým | Bio-senpai',
      icon: 'account-multiple'
    }
  },
  {
    path: '/survival-guide/:category?',
    name: 'Survival guide',
    component: Survival,
    meta: {
      title: 'Survival guide | Bio-senpai',
      icon: 'compass',
      navHidden: false,
      categorized: true
    }
  },
  {
    path: '/about',
    name: 'O aplikaci',
    component: About,
    meta: {
      title: 'O aplikaci Bio-senpai',
      icon: 'details'
    }
  }
]

const navItems = routes
  .filter(rt => !rt.meta.navHidden)
  .map(rt => ({
    to: rt.path.split('/:')[0],
    label: rt.name,
    icon: rt.meta.icon
  }))

const allItems = routes
  .map(rt => ({
    to: rt.path.split('/:')[0],
    label: rt.name,
    icon: rt.meta.icon
  }))

export default routes
export {navItems, allItems}
