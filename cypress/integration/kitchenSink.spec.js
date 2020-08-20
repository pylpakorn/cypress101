describe('Kitchen Sink Test', () => {
    it('Visit KitchenSink', function () {
        cy.visit('https://example.cypress.io')
    })
    it('Get element contain "type"', function () {
        cy.contains('type').should('exist').click()
        // check path url
        cy.url().should('include', '/commands/actions')
    })
    it('Type email', function () {
        cy.get('#email1').type('fake@email.com')
            .should('have.value', 'fake@email.com')
        cy.get('#email1').type('{backspace}')
            .should('have.value', 'fake@email.co')
    })
})