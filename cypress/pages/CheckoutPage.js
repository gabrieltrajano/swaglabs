import { faker } from '@faker-js/faker';

class Checkout{
    fillPersonalInformation(){
        cy.get('[data-test="firstName"]').type(faker.name.firstName())
        cy.get('[data-test="lastName"]').type(faker.name.lastName())
        cy.get('[data-test="postalCode"]').type(faker.address.zipCode())
        cy.get('[data-test="continue"]').click()
    }
    isSecondStepPage(){
        cy.url().should('contain', '/checkout-step-two')
    }
}

export default new Checkout