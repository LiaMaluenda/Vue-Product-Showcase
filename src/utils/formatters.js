export const USD_TO_CLP = 950

export const CATEGORY_LABELS = {
  electronics: 'Electrónica',
  jewelery: 'Joyería',
  "men's clothing": 'Ropa de hombre',
  "women's clothing": 'Ropa de mujer'
}

export function categoryLabel (category) {
  return CATEGORY_LABELS[category] || category
}

export function formatPriceCLP (usd) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(Math.round(usd * USD_TO_CLP))
}