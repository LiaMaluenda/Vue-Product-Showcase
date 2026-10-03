import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: { colors: { primary: '#3949AB', secondary: '#FF7043' } },
      dark: { colors: { primary: '#7986CB', secondary: '#FF8A65' } }
    }
  }
})