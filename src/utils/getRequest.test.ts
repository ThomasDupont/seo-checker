import { AxiosResponse } from 'axios'
import * as getRequest from './getRequest'
import global from '../global'

const requestMock = jest.spyOn(getRequest, 'request')

describe('getRequest test', () => {
    it('should call axios.get and return 200', async () => {
        requestMock.mockResolvedValueOnce({ status: 200 } as AxiosResponse)
        const response = await getRequest.getRequestStatus('https://google.com')
        expect(getRequest.request).toHaveBeenCalledWith('https://google.com')
        expect(response.status).toBe(200)
    })

    it ('should call axios.get and return 404', async () => {
        requestMock.mockResolvedValueOnce({ status: 404 } as AxiosResponse)
        const response = await getRequest.getRequestStatus('https://google.com')
        expect(getRequest.request).toHaveBeenCalledWith('https://google.com')
        expect(response.status).toBe(404)
    })
})
