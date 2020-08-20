const num1 = Math.floor(Math.random() * 10)
const num2 = Math.floor(Math.random() * 10)
const number = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
const operator = ['plus', 'minus', 'times', 'div']

describe('MathCalculator Test', function () {
    it('Visits math.com', function () {
        cy.visit('http://www.math.com/students/calculators/source/basic.html')
    })
    afterEach(() => { // use afterEach instead of cy.get('input[name="clear"]').click() in every test
        cy.get('input[name="clear"]').click()
    })
    it('Calculator Add', () => {
        cy.get(`input[name=${number[num1]}]`).click()
        cy.get(`input[name=${operator[0]}]`).click()
        cy.get(`input[name=${number[num2]}]`).click()
        cy.get(`input[name="DoIt"]`).click()
        cy.get(`input[name="Input"]`).should('have.value', num1 + num2)
        cy.wait(3000)   // wait for see result
        // cy.get('input[name="clear"]').click()  --> use afterEach() instead
    })
    it('Calculator Minus', () => {
        cy.get(`input[name=${number[num1]}]`).click()
        cy.get(`input[name=${operator[1]}]`).click()
        cy.get(`input[name=${number[num2]}]`).click()
        cy.get(`input[name="DoIt"]`).click()
        cy.get(`input[name="Input"]`).should('have.value', num1 - num2)
        cy.wait(3000)
        // cy.get('input[name="clear"]').click()
    })
    it('Calculator Multiply', () => {
        cy.get(`input[name=${number[num1]}]`).click()
        cy.get(`input[name=${operator[2]}]`).click()
        cy.get(`input[name=${number[num2]}]`).click()
        cy.get(`input[name="DoIt"]`).click()
        cy.get(`input[name="Input"]`).should('have.value', num1 * num2)
        cy.wait(3000)
        // cy.get('input[name="clear"]').click()
    })
    it('Calculator Divide', () => {
        cy.get(`input[name=${number[num1]}]`).click()
        cy.get(`input[name=${operator[3]}]`).click()
        cy.get(`input[name=${number[num2]}]`).click()
        cy.get(`input[name="DoIt"]`).click()
        cy.get(`input[name="Input"]`).should('have.value', num1 / num2)
        cy.wait(3000)
        // cy.get('input[name="clear"]').click()
    })
})