// Funciones de apoyo para mostrar los datos en español y en pesos chilenos.
export const USD_TO_CLP = 950

// Traducción de las categorías que entrega la API (que vienen en inglés).
export const CATEGORY_LABELS = {
  electronics: 'Electrónica',
  jewelery: 'Joyería',
  "men's clothing": 'Ropa de hombre',
  "women's clothing": 'Ropa de mujer'
}

// Devuelve el nombre en español de una categoría 
export function categoryLabel (category) {
  return CATEGORY_LABELS[category] || category
}

// Convierte un precio en dólares a pesos chilenos 
export function formatPriceCLP (usd) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(Math.round(usd * USD_TO_CLP))
}