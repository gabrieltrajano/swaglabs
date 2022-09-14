/// <reference types="cypress"/>
import ProductsPage from "../pages/ProductsPage";

const productOne = '.inventory_item:nth-child(1) button'
const productTwo = '.inventory_item:nth-child(2) button'
const productThree = '.inventory_item:nth-child(3) button'

describe('Product Catalog', () => { 
    beforeEach(() => {
        cy.login()
        cy.visit('/inventory.html', { failOnStatusCode: false })
    });
    
    it('should add products to cart', () => {
        ProductsPage.addToCart(productOne)
        ProductsPage.addToCart(productTwo)
    });
    
    it('should remove products from cart', () => {
        // Inserindo produtos diretamente pelo window.localStorage
        window.localStorage.setItem('cart-contents', [4,0,1])
        
        ProductsPage.removeFromCart(productOne)
        ProductsPage.removeFromCart(productTwo)
        ProductsPage.removeFromCart(productThree)
    });

    it('should count products added to cart', () => {
        ProductsPage.addToCart(productOne)
        cy.get('.shopping_cart_badge').should('have.text', '1')
        
        ProductsPage.addToCart(productThree)
        cy.get('.shopping_cart_badge').should('have.text', '2')
    });

    it('should access the cart page', () => {
        cy.get('.shopping_cart_link').click()
        cy.url().should('contain', '/cart.html')
    });
});