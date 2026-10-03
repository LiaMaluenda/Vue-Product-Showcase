describe('Filtro de productos por categoría', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('muestra solo productos de "Electrónica" al elegir esa categoría', () => {
   
    cy.get('[data-cy="product-card"]').should('have.length', 6)

  
    cy.get('[data-cy="category-filter"]').click()
    cy.get('.v-overlay .v-list-item').contains('Electrónica').click()

    
    cy.get('[data-cy="product-card"]').should('have.length', 2)
    cy.get('[data-cy="product-category"]').each(chip => {
      cy.wrap(chip).should('contain.text', 'Electrónica')
    })
    cy.get('[data-cy="results-count"]').should('contain.text', '2 producto(s)')

    
    cy.get('[data-cy="reset-filters"]').click()
    cy.get('[data-cy="product-card"]').should('have.length', 6)
  })
})