/// <reference types="cypress"/>
import LoginPage from "../pages/LoginPage";

const standardUser = Cypress.env('STANDARD_USER')
const lockedOutUser = Cypress.env('LOCKED_OUT_USER')
const password = Cypress.env('PASSWORD')
const invalidPassword = 'senha invalida'

const errorMessage = '[data-test="error"]'
const toggleMenu = '#react-burger-menu-btn'
const logOutOption = '#logout_sidebar_link'

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/')
  });
  
  it('should login successfully', () => {    
    LoginPage.fillCredentials(standardUser, password)
    LoginPage.logIn()
    cy.url().should('contain', '/inventory')
  });
  
  it('should require credentials', () => {
    LoginPage.logIn()
    cy.contains(errorMessage, 'Username is required')
  });
  
  it('should require the correct password', () => {
    LoginPage.fillCredentials(standardUser, invalidPassword)
    LoginPage.logIn()
    cy.contains(errorMessage, 'Username and password do not match')
  });
  
  it('should log out successfully', () => {
    cy.login(standardUser, password)
    cy.visit('/inventory.html', {failOnStatusCode: false})
    
    cy.get(toggleMenu).click()
    cy.get(logOutOption).click()
    
    cy.url().should('eq', 'https://www.saucedemo.com/')
  });
  
  it('should prevent log in of a blocked user', () => {
    LoginPage.fillCredentials(lockedOutUser, password)
    LoginPage.logIn()
    cy.contains(errorMessage, 'Sorry, this user has been locked out.')
  });
})