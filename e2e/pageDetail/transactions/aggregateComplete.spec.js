import config from '../../config/network.conf.json'
import datafiled from '../../config/datafiled.json'

describe('Symbol Explorer Transaction detail page for Aggregate Complete', () => {
    beforeEach(() => {
        cy.visit(`/transaction/${config.testTransactions.aggregateComplete}`)
    })

    describe('Transaction info card should', () => {
        it('load title', () => {
            cy.get('[data-cy="transactionInfoTitle"]').should('contain', 'Transaction Info')
        })

        it('render data info in table', ()=> {
            cy.renderTableInCard("transactionInfoTitle")
        })

        it('render correct transaction info titles', ()=> {
            const items = datafiled.transactionInfoFields
            cy.renderFieldInTable("transactionInfoTitle", items)
        })
    })

    describe('Transaction Detail card should', () => {
        it('load title', () => {
            cy.get('[data-cy="transactionDetailTitle"]').should('contain', 'Transaction Detail')
        })

        it('render data info in table', ()=> {
            cy.renderTableInCard("transactionDetailTitle")
        })

        it('render correct transaction detail titles', () => {
            const items = ['Type']
            cy.renderFieldInTable("transactionDetailTitle", items)
        })

    })

    describe('Aggregate Inner Transactions card should', () => {
        it('load title', () => {
            cy.get('[data-cy="aggregateInnerTransactionsTitle"]').should('contain', 'Aggregate Inner Transactions')
        })

        it('render data list in table', () => {
            cy.renderTableInCard('aggregateInnerTransactionsTitle')
        })

        it('render correct table header.', () => {
            const items = ['Transaction Type', 'Signer', 'Transaction Detail']
            cy.renderHeaderInTable('aggregateInnerTransactionsTitle', items)
        })
    })

})