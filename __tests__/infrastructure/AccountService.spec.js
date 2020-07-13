import { AccountService } from '../../src/infrastructure'
import networkConfig from '../config/network.conf.json'
import { constructHttp } from '../utils'

beforeAll(async() => {
    jest.setTimeout(10000)
    await constructHttp()
});

describe('Account Service', () => {

    describe('getAccountInfo should', () => {

        it('return custom account object', async () => {
            const accountInfo = await AccountService.getAccountInfo(networkConfig.testAccount.address)
            expect(accountInfo).not.toBeNull()
        })
    })

    describe('getAccountList should', () => {
        it('return custom account list', async () => {
            const accountList = await AccountService.getAccountList(networkConfig.pagination.pageSize, 'harvested/blocks')
            expect(accountList).not.toBeNull()
        })
    })
})