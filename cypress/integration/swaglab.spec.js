const username = "standard_user"
const password = "secret_sauce"

describe('Swaglab Test', () => {
    it('Visit Swaglab', () => {
        cy.visit('https://www.saucedemo.com/')
    })
    it('Login', () => {
        cy.get('[data-test = "username"]')
            .type(username, { dalay: 100 })     // slower type
            .should('have.value', 'standard_user')
        cy.get('[data-test = "password"]')
            .type(password, { delay: 100 })
            .should('have.value', 'secret_sauce')
        cy.get('.btn_action').click()
        cy.url().should('include', '/inventory')
    })
    it('Add Product', () => {
        // click add to cart button of 'Sauce Labs Bolt T-Shirt' item
        cy.get(':nth-child(3) > .pricebar > .btn_primary').click()
        // cy.get('button').contains('ADD TO CART')
    })
    it('Go to cart', () => {
        // click icon cart
        cy.get('[class="shopping_cart_link fa-layers fa-fw"]').click()
        // check product
        cy.get('[class="inventory_item_name"]').should('contain', 'Sauce Labs Bolt T-Shirt')
        // click checkout button
        cy.get('[class="btn_action checkout_button"]').click()
    })
    it('Fill Information', () => {
        // fill firstname, lastname, postal code
        cy.get('[data-test = "firstName"]').type('Firstname')
        cy.get('[data-test = "lastName"]').type('Lastname')
        cy.get('[data-test = "postalCode"]').type(10000)
        cy.contains('CONTINUE').click()
    })
    it('Checkout', () => {
        // check product
        cy.get('[class="inventory_item_name"]').should('contain', 'Sauce Labs Bolt T-Shirt')
        // click finish button
        cy.contains('FINISH').click()
        // check text in finish page
        cy.contains('THANK YOU FOR YOUR ORDER').should('be.visible')
    })
})