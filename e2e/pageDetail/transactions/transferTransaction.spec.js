import config from '../../config/network.conf.json'

describe('Symbol Explorer Transaction detail page for Transfer Transaction', () => {
    beforeEach(() => {
        cy.visit(`/transaction/${config.testTransactions.transferTransactionHash}`)
    })

    describe('Transaction info card should', () => {
        it('load title', () => {
            cy.get('[data-cy="transactionInfoTitle"]').should('contain', 'Transaction Info')
        })

        it('render data info in table', ()=> {
            cy.get('[data-cy="transactionInfoTitle"] table')
            .should('be.visible')

            cy.get('[data-cy="transactionInfoTitle"] tbody > tr')
            .then($data => {
                return $data.length
            }).should('be.at.least',1)
        })

        it('render correct transaction info titles', ()=> {
            cy.get('[data-cy="transactionInfoTitle"] .table-titles').as('infoTitle')

            cy.get('@infoTitle').should('have.length', 10)
            cy.get('@infoTitle').should('contain', 'Block Height')
            cy.get('@infoTitle').should('contain', 'Transaction Hash')
            cy.get('@infoTitle').should('contain', 'Transaction ID')
            cy.get('@infoTitle').should('contain', 'Date')
            cy.get('@infoTitle').should('contain', 'Deadline')
            cy.get('@infoTitle').should('contain', 'Fee')
            cy.get('@infoTitle').should('contain', 'Signature')
            cy.get('@infoTitle').should('contain', 'Signer')
            cy.get('@infoTitle').should('contain', 'Status')
            cy.get('@infoTitle').should('contain', 'Confirmation')
        })
    })

    describe('Transaction Detail card should', () => {
        it('load title', () => {
            cy.get('[data-cy="transactionDetailTitle"]').should('contain', 'Transaction Detail')
        })

        it('render data info in table', ()=> {
            cy.get('[data-cy="transactionDetailTitle"] table')
            .should('be.visible')

            cy.get('[data-cy="transactionDetailTitle"] tbody > tr')
            .then($data => {
                return $data.length
            }).should('be.at.least',1)
        })

        it('render correct transaction detail titles', () => {
            cy.get('[data-cy="transactionDetailTitle"] .table-titles').as('infoTitle')

            cy.get('@infoTitle').should('have.length', 3)
            cy.get('@infoTitle').should('contain', 'Type')
            cy.get('@infoTitle').should('contain', 'Recipient')
            cy.get('@infoTitle').should('contain', 'Message')
        })

    })

    describe('Mosaics card should', () => {
        it('load title', () => {
            cy.get('[data-cy="mosaicsTitle"]').should('contain', 'Mosaics')
        })

        it('render data list in table', () => {
            cy.get('[data-cy="mosaicsTitle"] table')
            .should('be.visible')

            cy.get('[data-cy="mosaicsTitle"] thead > tr > th')
            .should('have.length', 3)

            cy.get('[data-cy="mosaicsTitle"] tbody > tr')
            .then($data => {
                return $data.length
            }).should('be.at.least',1)
        })

        it('render correct table header.', () => {
            cy.get('[data-cy="mosaicsTitle"] thead > tr > th').as('tableHeader')

            cy.get('@tableHeader').should('contain', 'Mosaic ID')
            cy.get('@tableHeader').should('contain', 'Amount')
            cy.get('@tableHeader').should('contain', 'Alias Namespace')
        })
    })

})