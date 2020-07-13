import { MosaicService } from '../../src/infrastructure'
import networkConfig from '../config/network.conf.json'
import { constructHttp } from '../utils'

beforeAll(async() => {
    jest.setTimeout(10000)
    await constructHttp()
});

describe('Mosaic Service', () => {

    describe('getMosaicInfo should', () => {

        it('return custom mosaic object', async () => {
            const mosaicInfo = await MosaicService.getMosaicInfo(networkConfig.testMosaic.mosaicId)
            expect(mosaicInfo).not.toBeNull()
            expect(mosaicInfo.mosaicId).toEqual(networkConfig.testMosaic.mosaicId)
        })
    })

    describe('getMosaicList should', () => {
        it('return custom mosaic list', async () => {
            const mosaicList = await MosaicService.getMosaicList(networkConfig.pagination.pageSize)
            expect(mosaicList).not.toBeNull()
        })
    })
})