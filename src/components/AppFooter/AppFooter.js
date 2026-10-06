// Lógica del pie de página (Composition API).
export function useAppFooter () {
  const year = new Date().getFullYear()

  return { year }
}