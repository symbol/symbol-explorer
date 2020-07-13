import config from '../config/network.conf.json'

describe('Symbol Explorer Namespace detail page', () => {
    beforeEach(() => {
        cy.visit(`/namespace/${config.testNamespace.subNamespace}`)
    })

    describe('Namespace Detail Card should', () => {
        it('load title', () => {
            cy.get('[data-cy="namespaceDetailTitle"]').should('contain', 'Namespace Detail')
        })

        it('render table in card', ()=> {
            cy.renderTableInCard("namespaceDetailTitle")
        })

        it('render correct table fields.', () => {
            const items = ['Owner Address', 'Name', 'Namespace ID', 'Registration Type', 'Status', 'Alias Type', 'Alias', 'Registered at Height', 'Expired In Block', 'End at Height']
            cy.renderFieldInTable("namespaceDetailTitle", items)
        })
    })

    describe('Namespace Level Card should', () => {
        it('load title', () => {
            cy.get('[data-cy="namespaceLevelTitle"]')
            .should('contain', 'Namespace Level')
        })

        it('render table in card', ()=> {
            cy.renderTableInCard("namespaceLevelTitle")
        })

        it('render correct table header.', () => {
            const items = ['Name', 'Namespace ID', 'Parent ID']
            cy.renderHeaderInTable("namespaceLevelTitle", items)
        })
    })

    // Todo: Metadata Entries
  })