/// <reference types="cypress"/>
import CheckoutPage from "../pages/CheckoutPage";

const btn_Continue = '[data-test="continue"]'
const errorMenssage = '[data-test="error"]'
const btn_Finish = '[data-test="finish"]'

describe('Checkout', () => {
    beforeEach(() => {
        cy.login()
        cy.visit('/checkout-step-one.html', {failOnStatusCode: false})
        cy.window().then((win)=>{
            win.localStorage.setItem('cart-contents', '[4,0,1]')
        })
    });
    
    it('should require filling in the fields', () => {
        cy.get(btn_Continue).click()
        cy.get(errorMenssage).should('contain', 'First Name is required')
    });

    it('should go to the second step page', () => {
        CheckoutPage.fillPersonalInformation()
        CheckoutPage.isSecondStepPage()
    });

    it('should display purchase information', () => {
        CheckoutPage.fillPersonalInformation()
        CheckoutPage.isSecondStepPage()

        cy.contains('.summary_info_label', 'Payment Information:')
            .next()
            .should('not.be.empty')
        
        cy.contains('.summary_info_label', 'Shipping Information:')
            .next()
            .should('not.be.empty')

        cy.contains('.summary_subtotal_label', 'Item total:')
            .invoke('text').should('not.be.empty')

        cy.contains('.summary_tax_label', 'Tax:')
            .invoke('text').should('not.be.empty')

        cy.contains('.summary_total_label', 'Total:')
            .invoke('text').should('not.be.empty')
    });
    
    it('should complete the checkout', () => {
        CheckoutPage.fillPersonalInformation()
        CheckoutPage.isSecondStepPage()

        cy.get(btn_Finish).click()

        cy.url().should('contain', '/checkout-complete')
        cy.contains('.complete-header', 'THANK YOU FOR YOUR ORDER').should('be.visible')
    });
});