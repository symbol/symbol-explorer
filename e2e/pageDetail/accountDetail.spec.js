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
            const items = ['Address', 'Alias Namespace', 'Address height', 'Public key', 'Importance', 'Account type', 'Harvested blocks (all)']
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

    describe('Supplemental Keys Card should', () => {
        it('load title', () => {
            cy.get('[data-cy="supplementalKeysTitle"]').should('contain', 'Supplemental Keys')
        })

        it('render table in card', ()=> {
            cy.renderTableInCard("supplementalKeysTitle")
        })

        it('render correct table fields.', () => {
            const items = ['LINKED', 'NODE', 'VRF']
            cy.renderFieldInTable("supplementalKeysTitle", items)
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
            const items = ['Deadline', 'Transaction Hash', 'Type']
            cy.renderHeaderInTable("accountTransactionsTitle", items)
        })
    })

    describe('Harvested Blocks Card should', () => {
        it('load title', () => {
            cy.get('[data-cy="harvestedBlockTitle"]').should('contain', 'Harvested Blocks')
        })

        it('render table in card', () => {
            cy.renderTableInCard("harvestedBlockTitle")
        })

        it('render correct table header.', () => {
            const items = ['Height', 'Age', 'Transactions', 'Total Fee', 'Date', 'Harvester']
            cy.renderHeaderInTable("harvestedBlockTitle", items)
        })
    })

    // Todo: Metadata Entries
    // Todo: Account Restriction

  })