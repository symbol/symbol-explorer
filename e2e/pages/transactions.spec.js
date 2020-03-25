describe('Symbol Explorer Transactions list page should', () => {
    beforeEach(() => {
        cy.visit('/transactions')
    })

    it('load pages titles', () => {
        cy.contains('Transactions')
    })

    it('render table header and table body', () => {
        cy.get('table')
        .should('be.visible')

        cy.get('thead')
        .should('be.visible')

        cy.get('tbody')
        .should('be.visible')
    })

    it('render 7 items in table header', () => {
        cy.get('thead > tr > th')
        .should('have.length', 7)
    })

    it('render at least 1 row data in the table list', () => {
        cy.get('tbody > tr')
        .then($data => {
            return $data.length
        }).should('be.at.least',1)
    })

    it('redirect to transaction detail page given click on transaction hash', () => {
        cy.get('tbody tr .transactionHash a')
        .then($data => {
            return $data[0]
        }).click({ force:true })

        cy.url().should('contain', '/transaction')
    })

    it('redirect to account detail page given click on signer address', () => {
        cy.get('tbody tr .signer a')
        .then($data => {
            return $data[0]
        }).click({ force:true })

        cy.url().should('contain', '/account')
    })

    it('redirect to block detail page given click on block height', () => {
        cy.get('tbody tr .height a')
        .then($data => {
            console.log($data[0])
            return $data[0]
        }).click({ force:true })

        cy.url().should('contain', '/block')
    })
  })