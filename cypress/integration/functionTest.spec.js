/// <reference type = "cypress" / >

function minus(a, b) {
    return a - b
}

function add(a, b) {
    return a + b
}

const filter = (words) => {
    return words.filter(word => word.length < 6)
}

function isTrue(text) {
    if (text == "true") {
        return true
    }
    return false
}

describe('Function Test', function () {
    it('Minus test', () => {
        expect(5).to.equal(minus(10, 5))
    })
    it('Add test', () => {
        expect(4).to.equal(add(2, 2))
    })
    it('Filter', () => {
        const fruits = ['Apple', 'Watermelon', 'Banana', 'Coconut', 'Durian', 'Guava']
        // console.log(fruits)
        expect(filter(fruits)).to.include('Apple')
    })
    it('isTrue', () => {
        expect(isTrue("true")).to.be.true
        expect(isTrue("false")).to.be.false
    })
})