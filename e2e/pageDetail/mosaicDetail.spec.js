import config from '../config/network.conf.json'

describe('Symbol Explorer Mosaic Detail page', () => {
    beforeEach(() => {
        cy.visit(`/mosaic/${config.testMosaic.mosaicId}`)
    })

    describe('Mosaic Detail Card should', () => {
        it('load title', () => {
            cy.get('[data-cy="mosaicDetailTitle"]').should('contain', 'Mosaic Detail')
        })

        it('render table in card', ()=> {
            cy.renderTableInCard("mosaicDetailTitle")
        })

        it('render correct table fields.', () => {
            const items = ['Mosaic ID', 'Alias Namespace', 'Divisibility', 'Address', 'Supply', 'Relative Amount', 'Revision', 'Registered at Height', 'Duration', 'Supply Mutable', 'Transferable', 'Restrictable']
            cy.renderFieldInTable("mosaicDetailTitle", items)
        })
    })

    // Todo: Metadata Entries
    // Todo: Mosaic Restriction
    // Todo: Mosaic Restriction List
  })