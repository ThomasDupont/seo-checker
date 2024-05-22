import axios from 'axios'
import { ReturnGetStatusRequest } from '../@types/program.types'
import global from '../global'

export const request = (url: string) => axios.get(url, {
    validateStatus: () => true 
})

export const getRequestStatus = async (url: string): Promise<ReturnGetStatusRequest> => {
    const response = await request(url)

    if (global.excludedStatus.includes(response.status)) {
        return { status: 200, url }
    }

    return { status: response.status, url }
}
