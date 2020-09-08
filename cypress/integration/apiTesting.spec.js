/// <reference type = "cypress" / >

// describe('API Testing with cy.request()', () => {
//     beforeEach(() => {
//         cy.request("https://pokeapi.co/api/v2/pokemon/25").as('pikachu');   // make request without baseUrl
//     });
//     it('Validate the header', () => {
//         cy.get('@pikachu')
//             .its('headers')
//             .its('content-type')
//             .should('include', 'application/json; charset=utf-8');
//     });
//     it('Validate the status code', () => {
//         cy.get('@pikachu')
//             .its('status')
//             .should('equal', 200);
//     });
//     it('Validate the pokemon\'s name', () => {
//         cy.get('@pikachu')
//             .its('body')
//             .should('include', { name: 'pikachu' });
//     });
// });

// describe('/Users API Testing with cy.request()', () => {

//     it('should return JSON data', () => {
//         cy.request('/users')    // make request with baseUrl
//             .its('headers')
//             .its('content-type')
//             .should('include', 'application/json')
//     })

//     it('should return status 200', () => {
//         cy.request('/users')        // default request method is GET
//             .its('status').should('eq', 200)
//     })

//     it('should return the correct number of users', () => {
//         cy.request('/users')
//             .its('body').should('have.length', 10)
//     })

//     it('edit username of user id:1 to "Spiderman"', () => {
//         cy.request('PATCH', '/users/1', { "username": "spiderman" })    // request method: PATCH
//             .its('body')
//             .its('username').should('eq', 'spiderman')
//     })

//     it('edit username of user id:1 to "Spiderman" - other way', () => {
//         cy.request({
//             method: 'PATCH',
//             url: "/users/1",
//             body: { "username": "spiderman" }
//         }
//         ).its('body').its('username').should('be.equal', 'spiderman')
//     })
// });

// describe('/Users API Testing with cy.api()', () => {
//     // we have to import cy.api() to index.js before we use cy.api()
//     it('should return status 200', () => {
//         cy.api({ url: '/users' }).then(res => {
//             expect(res.status).to.equal(200)
//         })
//     })
//     it('check length body', () => {
//         cy.api({ url: '/users' }).then(res => {
//             expect(res.body.length).to.equal(10)
//         })
//     })
//     it('should create user by POST method', () => {
//         cy.api({
//             method: 'POST',     // request method: PATCH
//             url: '/users',      // url to request
//             body: {             // body to send with request
//                 "name": "Leanne Graham",
//                 "username": "Bret",
//                 "email": "Sincere@april.biz",
//                 "address": {
//                     "street": "Kulas Light",
//                     "suite": "Apt. 556",
//                     "city": "Gwenborough",
//                     "zipcode": "92998-3874",
//                     "geo": {
//                         "lat": "-37.3159",
//                         "lng": "81.1496"
//                     }
//                 },
//                 "phone": "1-770-736-8031 x56442",
//                 "website": "hildegard.org",
//                 "company": {
//                     "name": "Romaguera-Crona",
//                     "catchPhrase": "Multi-layered client-server neural-net",
//                     "bs": "harness real-time e-markets"
//                 }
//             }
//         }).then(res => {
//             expect(res.status).to.eq(201)
//             expect(res.body.id).to.eq(11)
//         })
//     })

//     it('edit users id:2', () => {
//         cy.api({ method: 'PATCH', url: '/users/2', body: { "username": "Ironman" } })
//             .then(res => {
//                 expect(res.status).to.eq(200)
//                 expect(res.body.username).to.eq('Ironman')
//             })
//     })

//     it('delete user id:3', () => {
//         // cy.api({method:'DELETE', url: '/users/3'}).then(res => {
//         //     expect(res.status).to.eq(200)
//         // })
//         cy.api({ method: 'DELETE', url: '/users/3' }).its('status').should('eq', 200)
//     })
// })

describe('API login test', () => {
    it('login and get data test success', () => {
        cy.api({ method: 'POST', url: 'http://localhost:3000/login', body: { username: 'kennaruk', password: 'mak' } })
            .then(res => {
                const token = res.body
                cy.log(token)

                // get data
                cy.api({ method: 'GET', url: 'http://localhost:3000', headers: { authorization: token } })
                    .then(res => {
                        expect(res.body).to.eq('ยอดเงินคงเหลือ 50')
                    })
            })
    })
    it('login test fail and unauthorized', () => {
        cy.api({ method: 'POST', url: 'http://localhost:3000/login', body: { username: 'kennaruk', password: 'ma' } })
            .then(res => {
                expect(res.body).to.eq("Wrong username and password")
            })
        cy.api({ method: 'POST', url: 'http://localhost:3000/login', body: { username: 'kenn', password: 'mak' } })
            .then(res => {
                expect(res.body).to.eq("Wrong username and password")
            })

        // unauthorized
        cy.api({ method: 'GET', url: 'http://localhost:3000', failOnStatusCode: false })
            .then(res => {
                expect(res.status).to.eq(401)
                expect(res.body).to.eq('Unauthorized')
            })
    })
})
