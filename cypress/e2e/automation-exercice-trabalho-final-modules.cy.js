/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

const cadastro = require('../../modules/cadastro/index.js')
const login = require('../../modules/login/index.js')
const produto = require('../../modules/produto/index.js')
const pagamento = require('../../modules/pagamento/index.js')


describe('Automation Exercise', () => {
  it('1 - Cadastrar novo usuário com sucesso', () => {
    cy.visit('/')
    cy.get('a[href*=login]').click() //mapear elemento
   
  const email = faker.internet.email();
  cadastro.iniciarCadastro('Teste 002',email)

  cadastro.preencherCadastro()

  cadastro.verificarSeCadastroFoiEfetuadoComSucesso()

  });
  it('2 - Efetuar Login de Usuário com e-mail e senha corretos', ()=>{
    /**
     * Ter uma conta para efetuar o Login
     * teste1791658538930@teste.com | 12345
     */


    //acesso a página de login
    cy.visit('/login')

   
    login.preencherLogin('teste1791658538930@teste.com','12345')
    

    login.verificarSeLoginFoiEfetuadoComsucesso()

  });
  it('3 - Efetuar Login de Usuário com e-mail e senha INCORRETOS',()=>{
     //acesso a página de login
    cy.visit('/login')

    login.preencherLogin('teste1791658538930@teste.com','123456')


    login.verificarSeMensagemDeErroFoiExibidaNoLogin()

  });
  it('4 - Efetuar Logout',()=>{

     //acesso a página de login
  cy.visit('/login')

  login.preencherLogin('teste1791658538930@teste.com', '12345')

  login.efetuarLogout()

  login.verificarSeOUsuarioFoiDeslogado()
  
  });
  it('5 - Tentar cadastrar usuário com e-mail já cadastrado',()=>{

   cy.visit('/')
    cy.get('a[href*=login]').click() //mapear elemento
    
    cadastro.iniciarCadastro('Teste 002',`teste1791658538930@teste.com`)

    cadastro.verificarSeMensagemDeCadastroExistenteFoiExibida()

  });
  it('8 - Verificar a descrição todos os produtos e a página de detalhes do produto',()=>{
    
    cy.visit('/')
    
    cadastro.validarPaginaInicial()
  
    produto.listandoTodosProdutos()

   //selecionando o primeiro produto da lista
   produto.selecionarPrimeiroProdutoDaLista()

   produto.detalhesDoProduto()
    


  });
  it('9 - Pesquisar por produto',()=>{
  cy.visit('/')

  cadastro.validarPaginaInicial()

  produto.listandoTodosProdutos()


  produto.pesquisandoProduto()
    
  });
  it('10 - Verificar assinatura na página inicial',()=>{
  cy.visit('/')

  cadastro.validarPaginaInicial()

  cadastro.realizandoInscricaoComSucesso()
  
  });
  it('15 - Fazer pedido: Registre-se antes de finalizar a compra',()=>{
    
    cy.visit('/')

    cadastro.validarPaginaInicial()

    cy.get('a[href*=login]').click()
    
    const email = faker.internet.email();

    cadastro.iniciarCadastro('Teste 002',email)

    cadastro.preencherCadastro()

    cadastro.verificarSeCadastroFoiEfetuadoComSucesso()

    cy.get('[data-qa="continue-button"]')
      .should('be.visible')
      .click()

    login.verificarSeLoginFoiEfetuadoComsucesso()

    //adicionando produtos ao carrinho
    produto.adicionarProdutoAoCarrinho()
  
    // verifica se a página do carrinho de compras foi exibida
    produto.verificarPaginaCarrinhoDeCompras()
  
    produto.verificarDetalhePedido()

    produto.inserirComentario()
   

      //--
    // clicar no botão de pagamento
    cy.get('a[href*="payment"]')
      .should('be.visible')
      .click()

    pagamento.preencherPagamento()

    pagamento.verificarSeOPedidoFoiConfirmado()

  });
  it('16 - Fazer pedido: Faça login antes de finalizar a compra',()=>{
      
    cy.visit('/')

    cadastro.validarPaginaInicial()

    cy.get('a[href*=login]').click()

    login.preencherLogin('teste1791658538930@teste.com','12345')
    
    login.verificarSeLoginFoiEfetuadoComsucesso()

    produto.adicionarProdutoAoCarrinho()

    // verifica se a página do carrinho de compras foi exibida
    produto.verificarPaginaCarrinhoDeCompras()

    // Verifique os detalhes do endereço e revise seu pedido.
    produto.verificarDetalhePedido()

    produto.inserirComentario()
  

    // clicar no botão de pagamento
    cy.get('a[href*="payment"]')
      .should('be.visible')
      .click()

    pagamento.preencherPagamento()
  
    pagamento.verificarSeOPedidoFoiConfirmado()
 
  });
});

 

