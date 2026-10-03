// El "navegador falso" de Jest no trae ResizeObserver; Vuetify lo necesita.
global.ResizeObserver = class {
  observe () {}
  unobserve () {}
  disconnect () {}
}

// Tampoco trae el objeto CSS del navegador; creamos una versión mínima.
global.CSS = { supports: () => false, escape: value => value }