// Lógica del encabezado: contador de favoritos y botón de modo oscuro (Composition API).
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useTheme } from 'vuetify'

const THEME_KEY = 'vps-theme'

export function useAppHeader () {
  const store = useStore()   // acceso a Vuex
  const theme = useTheme()   // acceso al tema de Vuetify

  const favoritesCount = computed(() => store.getters['favorites/count'])
  const isDark = computed(() => theme.global.name.value === 'dark')

  function applyTheme (name) {
    theme.change(name) // cambia entre "light" y "dark"
  }

  function toggleTheme () {
    const next = isDark.value ? 'light' : 'dark'
    applyTheme(next)
    localStorage.setItem(THEME_KEY, next)
  }

  // Ciclo de vida: cuando el header aparece en pantalla,
  // recupera el tema que el usuario eligió la última vez.
  onMounted(() => {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'dark' || saved === 'light') {
      applyTheme(saved)
    }
  })

  return { favoritesCount, isDark, toggleTheme }
}