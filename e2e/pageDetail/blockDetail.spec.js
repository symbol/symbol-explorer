import config from '../config/network.conf.json'

describe('Symbol Explorer Blocks detail page', () => {
    beforeEach(() => {
        cy.visit(`/block/${config.testBlock.height}`)
    })

    describe('Block Detail Card should', () => {
        it('load title', () => {
            cy.get('[data-cy="blockDetailTitle"]').should('contain', 'Block Detail')
        })

        it('render block pagination button', () => {
            cy.get('[data-cy="blockDetailTitle"] [nextpageaction="block/nextBlock"]').should('have.length', 1)
            cy.get('[data-cy="blockDetailTitle"] [previouspageaction="block/previousBlock"]').should('have.length', 1)
        })

        it('render table in card', ()=> {
            cy.renderTableInCard("blockDetailTitle")
        })

        it('render correct table fields.', () => {
            const items = ['Height', 'Date', 'Total Fee', 'Difficulty', 'Fee Multiplier', 'Transactions', 'Harvester', 'Block Hash', 'Proof Gamma', 'Proof Scalar', 'Beneficiary Address', 'Proof Varification Hash']
            cy.renderFieldInTable("blockDetailTitle", items)
        })
    })

    describe('Block Transactions Card should', () => {
        it('load title', () => {
            cy.get('[data-cy="blockTransactionsTitle"]')
            .should('contain', 'Block Transactions')
        })

        it('render table in card', ()=> {
            cy.renderTableInCard("blockTransactionsTitle")
        })

        it('render correct table header.', () => {
            const items = ['Deadline', 'Transaction Hash', 'Type']
            cy.renderHeaderInTable("blockTransactionsTitle", items)
        })
    })

    describe('Balance Change Receipt Card should', () => {
        it('load title', () => {
            cy.get('[data-cy="balanceChangeReceiptTitle"]').should('contain', 'Balance Change Receipt')
        })

        it('render table in card', ()=> {
            cy.renderTableInCard("balanceChangeReceiptTitle")
        })

        it('render correct table header.', () => {
            const items = ['Version', 'Type', 'Size', 'Address', 'Mosaic ID', 'Amount']
            cy.renderHeaderInTable("balanceChangeReceiptTitle", items)
        })
    })
    // Todo: Test the rest of Reicept
})