function preencherPagamento(){
// preencher dados de pagamento
    cy.get('[data-qa="name-on-card"]')
      .should('be.visible')
      .type('Teste de pagamento')
    cy.get('[data-qa="card-number"]')
      .should('be.visible')
      .type('1234 5678 9012 3456')
    cy.get('[data-qa="cvc"]')
      .should('be.visible')
      .type('123')
    cy.get('[data-qa="expiry-month"]')
      .should('be.visible')
      .type('12')
    cy.get('[data-qa="expiry-year"]')
      .should('be.visible')
      .type('2035')
    cy.get('[data-qa="pay-button"]').click()

}
function verificarSeOPedidoFoiConfirmado() {
  cy.location('pathname').should((pathname) => {
    expect(
      pathname,
      'Your order has been placed successfully!'
    ).to.include('/payment_done/')
  })
}



module.exports = {
    preencherPagamento,
    verificarSeOPedidoFoiConfirmado
}