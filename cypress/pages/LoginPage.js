class Login{
    fillCredentials(username, password){
        cy.get('[data-test="username"]').type(username)
        cy.get('[data-test="password"]').type(password, {log: false})
    }
    logIn(){
        cy.get('[data-test="login-button"]').click()
    }
}

export default new Login