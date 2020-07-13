import { NamespaceService } from '../../src/infrastructure'
import networkConfig from '../config/network.conf.json'
import { constructHttp } from '../utils'

beforeAll(async() => {
    jest.setTimeout(10000)
    await constructHttp()
});

describe('Namespace Service', () => {

    describe('getNamespaceInfo should', () => {

        it('return custom namespace object', async () => {
            const namespace = await NamespaceService.getNamespaceInfo(networkConfig.testNamespace.rootNamespace)
            expect(namespace).not.toBeNull()
            expect(namespace.namespaceName).toEqual(networkConfig.testNamespace.rootNamespace)
        })
    })

    describe('getNamespaceList should', () => {
        it('return custom namespace list', async () => {
            const namespaceList = await NamespaceService.getNamespaceList(networkConfig.pagination.pageSize)
            expect(namespaceList).not.toBeNull()
        })
    })
})