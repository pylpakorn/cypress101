const myaccount = "@youraccount"
const email = "yourEmail"
const password = "yourPassword"

describe('Twitter Flow Login to Logout Success Case', () => {
    it('Visit Twitter Website', () => {
        cy.visit('https://www.twitter.com')
    })
    it('Login and Go to Profile', () => {
        // click login button
        cy.get('[data-testid = "loginButton"]').click()
        // check path url
        cy.url().should('include', '/login')
        // type email
        cy.get('[class = "css-901oao r-1awozwy r-k200y r-hkyrab r-6koalj r-1qd0xha r-1b6yd1w r-16dba41 r-ad9z0x r-bcqeeo r-13qz1uu r-qvutc0"]')
            .find('input[name="session[username_or_email]"]').type(email)
            .should('have.value', 'yourEmail')
        // type password
        cy.get('[class = "css-901oao r-1awozwy r-k200y r-hkyrab r-6koalj r-1qd0xha r-1b6yd1w r-16dba41 r-ad9z0x r-bcqeeo r-13qz1uu r-qvutc0"]')
            .find('input[name="session[password]"]').type(password)
            .should('have.value', 'yourPassword')
        // click login
        cy.get('[data-testid="LoginForm_Login_Button"]').eq(0).click()
        cy.url().should('include', '/home')

        // click profile menu icon
        cy.get('[aria-label="Profile"]').click()
        // check username of your profile
        cy.get('[class="css-1dbjc4n r-1awozwy r-xoduu5 r-18u37iz r-dnmrzs"]').should('contain', 'createforcypress')
        // click tweet button
        cy.get('[aria-label="Tweet"]').click()
        // type message to tweet
        cy.get('[class="DraftEditor-editorContainer"]').click().type('hello6')
        // click button to tweet
        cy.get('[data-testid="tweetButton"]').click()

        cy.wait(3000)   // wait for see result

        // check user
        cy.get('[class = "css-1dbjc4n r-16y2uox r-1wbh5a2 r-1ny4l3l r-1udh08x r-1yt7n81 r-ry3cjt"]').eq(0)
            .find('[class = "css-901oao css-bfa6kz r-1re7ezh r-18u37iz r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-qvutc0"]')
            .should('contain', myaccount)

        // check context that you tweet is exist
        cy.get('[class ="css-901oao r-hkyrab r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-bnwqim r-qvutc0"]').first()
            .should('contain', 'hello6')

        cy.wait(2000)

        // click dropdown
        cy.get('[class="css-1dbjc4n r-1niwhzg r-sdzlij r-1p0dtai r-xoduu5 r-1d2f490 r-podbf7 r-u8s1d r-zchlnj r-ipm5af r-o7ynqc r-6416eg"]')
            .first().click({ force: true })
        // click delete menu
        cy.get('[class = "css-1dbjc4n"] > div[role="menuitem"]').first().click()
        cy.wait(3000)   // see delete popup that occur
        // click delete button
        cy.get('[data-testid = "confirmationSheetConfirm"]').contains('Delete').click()

        cy.wait(3000)
    })

    it('Logout', () => {
        cy.get('[aria-label="createforcypress"]').click({ force: true })    // force click
        cy.wait(2000)
        cy.get('[data-testid="AccountSwitcher_Logout_Button"]').click()
        cy.wait(2000)
        cy.get('[data-testid="confirmationSheetConfirm"]').click()
        cy.url().should('include', '/logout')
    })
})

const wrongPass = "wrongpassword"

describe('Twitter Fail Case', () => {
    it('Visit Twitter Website', () => {
        cy.visit('https://www.twitter.com/login')
    })
    it('Login with wrong password should show error message', () => {
        cy.url().should('include', '/login')
        cy.get('[class = "css-901oao r-1awozwy r-k200y r-hkyrab r-6koalj r-1qd0xha r-1b6yd1w r-16dba41 r-ad9z0x r-bcqeeo r-13qz1uu r-qvutc0"]')
            .find('input[name="session[username_or_email]"]').type(email)
            .should('have.value', 'bbew37451@gmail.com')
        cy.get('[class = "css-901oao r-1awozwy r-k200y r-hkyrab r-6koalj r-1qd0xha r-1b6yd1w r-16dba41 r-ad9z0x r-bcqeeo r-13qz1uu r-qvutc0"]')
            .find('input[name="session[password]"]').type(wrongPass)
            .should('have.value', 'wrongpassword')
        cy.get('[data-testid="LoginForm_Login_Button"]').eq(0).click()

        cy.get('[class="css-901oao r-daml9f r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-qvutc0"]')
            .contains('The email and password you entered did not match our records. Please double-check and try again.')
    })
})

