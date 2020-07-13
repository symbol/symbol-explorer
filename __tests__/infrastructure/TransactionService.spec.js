import { TransactionService } from '../../src/infrastructure'
import networkConfig from '../config/network.conf.json'
import { constructHttp } from '../utils'

beforeAll(async() => {
    jest.setTimeout(10000)
    await constructHttp()
});

describe('Transaction Service', () => {

    describe('getTransactionInfo should', () => {

        it('return custom transaction object', async () => {
            const transactionInfo = await TransactionService.getTransactionInfo(networkConfig.testTransactions.transferTransactionHash)
            expect(transactionInfo).not.toBeNull()
            expect(transactionInfo.transactionHash).toEqual(networkConfig.testTransactions.transferTransactionHash)
        })
    })

    describe('getTransactionList should', () => {
        it('return custom tranasaction list', async () => {
            const transactionList = await TransactionService.getTransactionList(networkConfig.pagination.pageSize)
            expect(transactionList).not.toBeNull()
        })
    })
})