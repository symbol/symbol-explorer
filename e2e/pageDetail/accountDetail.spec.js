import config from '../config/network.conf.json'

describe('Symbol Explorer Account Detail page', () => {
    beforeEach(() => {
        cy.visit(`/account/${config.testAccount.address}`)
    })

    describe('Account Detail Card should', () => {
        it('load title', () => {
            cy.get('[data-cy="accountDetailTitle"]').should('contain', 'Account Detail')
        })

        it('render table in card', ()=> {
            cy.renderTableInCard("accountDetailTitle")
        })

        it('render correct table fields.', () => {
            const items = ['Address', 'Alias Namespace', 'Address height', 'Public key', 'Importance', 'Type', 'Linked account key']
            cy.renderFieldInTable("accountDetailTitle", items)
        })
    })

    describe('Multisig Cosignatories Card should', () => {
        it('load title', () => {
            cy.get('[data-cy="multisigCosignatoriesTitle"]').should('contain', 'Multisig Cosignatories')
        })

        it('render table in card', ()=> {
            cy.renderTableInCard("multisigCosignatoriesTitle")
        })

        it('render correct table fields.', () => {
            const items = ['Minimum Approval', 'Minimum Removal', 'Cosignatories']
            cy.renderFieldInTable("multisigCosignatoriesTitle", items)
        })
    })

    describe('Owned Mosaics Card should', () => {
        it('load title', () => {
            cy.get('[data-cy="ownedMosaicsTitle"]').should('contain', 'Owned Mosaics')
        })

        it('render table in card', () => {
            cy.renderTableInCard("ownedMosaicsTitle")
        })

        it('render correct table header.', () => {
            const items = ['Mosaic ID', 'Amount', 'Alias Namespace']
            cy.renderHeaderInTable("ownedMosaicsTitle", items)
        })
    })

    describe('Owned Namespaces Card should', () => {
        it('load title', () => {
            cy.get('[data-cy="ownedNamespacesTitle"]').should('contain', 'Owned Namespaces')
        })

        it('render table in card', () => {
            cy.renderTableInCard("ownedNamespacesTitle")
        })

        it('render correct table header.', () => {
            const items = ['Name', 'Status', 'Duration', 'Registration Type']
            cy.renderHeaderInTable("ownedNamespacesTitle", items)
        })
    })

    describe('Importance History Card should', () => {
        it('load title', () => {
            cy.get('[data-cy="importanceHistoryTitle"]').should('contain', 'Importance History')
        })

        it('render table in card', () => {
            cy.renderTableInCard("importanceHistoryTitle")
        })

        it('render correct table header.', () => {
            const items = ['Recalculation Block #', 'Total Fees Paid', 'Beneficiary Count', 'Importance Score']
            cy.renderHeaderInTable("importanceHistoryTitle", items)
        })
    })

    describe('Transactions Card should', () => {
        it('load title', () => {
            cy.get('[data-cy="accountTransactionsTitle"]').should('contain', 'Transactions')
        })

        it('render table in card', () => {
            cy.renderTableInCard("accountTransactionsTitle")
        })

        it('render correct table header.', () => {
            const items = ['Deadline', 'Transaction Hash', 'Transaction Type']
            cy.renderHeaderInTable("accountTransactionsTitle", items)
        })
    })

    // Todo: Metadata Entries
    // Todo: Account Restriction

  })