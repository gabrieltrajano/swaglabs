/// <reference types="cypress"/>

const productItems = '.cart_list .cart_item'
const btn_RemoveProduct = '[data-test^="remove-sauce-labs"]'
const btn_ProductsPage = '[data-test="continue-shopping"]'
const btn_CheckoutPage = '[data-test="checkout"]'

describe('Cart', () => {
    beforeEach(() => {
        cy.login()
        cy.visit('/cart.html', {failOnStatusCode: false})
        cy.window().then((win)=>{
            win.localStorage.setItem('cart-contents', '[4,0,1]')
        })
        cy.reload()
    });

    it('should remove product on cart page ', () => {
        cy.get(productItems).should('have.length', 3)
        cy.get(btn_RemoveProduct).eq(1).click()
        cy.get(productItems).should('have.length', 2)
    });
    
    it('should return to the products page', () => {
        cy.get(btn_ProductsPage).click()
        cy.url().should('contain', '/inventory')
    });

    it('should redirect to the checkout page',()=>{
        cy.get(btn_CheckoutPage).click()
        cy.url().should('contain', '/checkout-step-one')
    })
});