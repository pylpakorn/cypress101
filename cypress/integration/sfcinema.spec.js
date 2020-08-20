/// <reference type = "cypress" / >

const email = 'your email'
const mobile = 'your mobileNo.'
// remarks: must to have sf's account before reserve or buy ticket

describe('sfCinema reserve ticket testing success case', () => {
    it('Visit sfcinema website', () => {
        cy.visit('https://www.sfcinemacity.com/')
    })
    it('Choose Movie and Cinema', () => {
        cy.wait(2000)
        // choose cinema
        cy.get('[class="button dropdown-button"]').first().click()
        cy.get('a').contains('เอส เอฟ เอ็กซ์ ซีเนม่า เซ็นทรัล พลาซา ลาดพร้าว ').click()
        // choose movie
        cy.get('[class="button dropdown-button"]').last().click()
        cy.get('h3').contains('ฝ่านรกซอมบี้คลั่ง').click()
        cy.wait(2000)
        // click showtime
        cy.get('[class="button showtime-button"]').click()
        cy.wait(2000)
    })
    it('Choose showtime', () => {
        // TEST ON TUESDAY 18Aug20

        // choose date
        cy.get('[data-slick-index="1"]').find('h1').contains('พุธ').click()
        // choose time
        cy.get('[class="button button-showtime"]').contains('19:50').click()
    })
    it('Choose seat', () => {
        cy.get('button[seatname="G6"]').click()
        cy.get('button').contains('ดำเนินการต่อ').click()
    })
    it('reserve ticket', () => {
        cy.get('[class="button button-reserve"]').contains('จองตั๋วชมภาพยนตร์').click()
        cy.get('input[name="email"]').type(email)
        cy.get('input[name="mobile"]').type(mobile)
        cy.get('button').contains('ดำเนินการต่อ').click()
    })
    it('should show message when reserve success', () => {
        cy.get('[class = "heading"]').should('contain', 'จองตั๋วภาพยนตร์เรียบร้อยแล้ว')
    })
})