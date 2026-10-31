function adicionarProdutoAoCarrinho(){
 cy.get('.product-image-wrapper')
      .first()
      .should('be.visible')
      .within(() => {
        cy.get('.add-to-cart')
          .first()
          .click()
      })

}

function verificarDetalhePedido(){
    cy.contains('Address Details')
      .should('be.visible')

    cy.contains('Review Your Order')
      .should('be.visible')
}
function inserirComentario(){	
cy.get('textarea[name="message"]')
      .should('be.visible')
      .type('Teste de comentário - Bruna')
}
function listandoTodosProdutos() {
  cy.contains('.shop-menu a', 'Products')
      .should('be.visible')
      .click()

    cy.contains('All Products')
      .should('be.visible')
}

function pesquisandoProduto() {
    
  cy.get('[name="search"]')
    .should('be.visible')
    .type('top')  

  cy.get('#submit_search')
    .should('be.visible')
    .click()  

  cy.contains('Searched Products')
    .should('be.visible')
    
  cy.get('.features_items .product-image-wrapper')
    .invoke('text')
    .should('match', /top/i)
}

function detalhesDoProduto(){
    // verificando se esta exibindo onome
    cy.contains('.product-information h2', 'Blue Top')
      .should('be.visible')
    //categoria
    cy.get('.product-information p')
      .should('be.visible')
      .and('contain.text', 'Category: Women > Tops')
    //preço
    cy.get('.product-information > span > span')
    .should('be.visible')
    .and('have.text', 'Rs. 500')
    //disponibilidade 
    cy.contains('.product-information p', 'Availability:')
      .should('be.visible')
      .within(() => {
        cy.get('b').should('have.text', 'Availability:')
        cy.root().should('contain.text', 'In Stock')
    })
    //condição
    cy.contains('.product-information p', 'Condition:')
      .should('be.visible')
      .within(() => {
        cy.get('b').should('have.text', 'Condition:')
        cy.root().should('contain.text', 'New')
      })
    //marca
    cy.contains('.product-information p', 'Brand:')
      .should('be.visible')
      .within(() => {
        cy.get('b').should('have.text', 'Brand:')
        cy.root().should('contain.text', 'Polo')
      })
}

function selecionarPrimeiroProdutoDaLista(){
    cy.get('.choose a[href*="product_details/"]')
      .first()
      .should('be.visible')
      .click()
}

function verificarPaginaCarrinhoDeCompras(){
    cy.get('a[href="/view_cart"]')
      .last()
      .click()
      .should('be.visible')

    // clicar no botão finalizar compra
    cy.get('.btn.btn-default.check_out')
      .should('be.visible')
      .click()
}

    

module.exports = {
    adicionarProdutoAoCarrinho,
    verificarDetalhePedido,
    inserirComentario,
    listandoTodosProdutos,
    pesquisandoProduto,
    detalhesDoProduto,
    selecionarPrimeiroProdutoDaLista,
    verificarPaginaCarrinhoDeCompras
}
