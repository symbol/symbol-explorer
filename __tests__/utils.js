
import networkConfig from './config/network.conf.json'
import http from '../src/infrastructure/http'

export const constructHttp = async () => {
    return await http.init(networkConfig.nodeUrl, networkConfig.marketDataUrl)
}