import { mapGetters } from 'vuex'

const THEME_KEY = 'vps-theme'

export default {
  name: 'AppHeader',

  computed: {
    ...mapGetters('favorites', { favoritesCount: 'count' }),

    isDark () {
      return this.$vuetify.theme.global.name === 'dark'
    }
  },

  methods: {
    applyTheme (name) {
      this.$vuetify.theme.global.name = name
    },

    toggleTheme () {
      const next = this.isDark ? 'light' : 'dark'
      this.applyTheme(next)
      localStorage.setItem(THEME_KEY, next)
    }
  },

  mounted () {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'dark' || saved === 'light') {
      this.applyTheme(saved)
    }
  }
}