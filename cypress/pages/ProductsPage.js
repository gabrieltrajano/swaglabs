class Products{
    addToCart(product){
        cy.get(product).click()
        cy.get(product).should('have.text', 'Remove')
    }
    
    removeFromCart(product){
        cy.get(product).should('have.text', 'Add to cart')
    }
}

export default new Products