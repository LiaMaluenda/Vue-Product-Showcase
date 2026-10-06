// jsdom (el entorno de Jest) no incluye ResizeObserver, que Vuetify necesita.
global.ResizeObserver = class {
  observe () {}
  unobserve () {}
  disconnect () {}
}

// Tampoco trae el objeto CSS del navegador; creamos una versión mínima.
global.CSS = { supports: () => false, escape: value => value }