
import { AxiosResponse } from 'axios'
import fs from 'fs'
import path from 'path'
import { PageTester } from "./pageTester"
import global from '../global'

const getHtmlMock = jest.fn()
const requestMock = jest.fn()

const pageTester = new PageTester(requestMock, getHtmlMock)
describe('Page tester test', () => {
    afterEach(() => {
        getHtmlMock.mockReset()
        requestMock.mockReset()
        global.anomalies = []
        global.testedUrls = []
        global.canonicals = []
    })
    global.setUrl('https://monformateurindependant.com')
    it ('Should test the page without anomalies', (done) => {
        getHtmlMock.mockResolvedValueOnce(fs.readFileSync(path.join(__dirname, '../fixtures/good_html.html'), 'utf-8'))
        requestMock.mockResolvedValue({ status: 200 } as AxiosResponse)

        pageTester.run('https://monformateurindependant.com').then(result => {
            expect(result.url).toBe('https://monformateurindependant.com')
            expect(result.goodLinks.length).toBe(10)
            expect(result.goodSrc.length).toBe(26)
            expect(global.anomalies.length).toBe(0)  
            done()
        })
    })
    it ('Should test the page with anomalies', (done) => {
        getHtmlMock.mockResolvedValueOnce(fs.readFileSync(path.join(__dirname, '../fixtures/good_html.html'), 'utf-8'))
        requestMock.mockResolvedValueOnce({ status: 200 } as AxiosResponse)
        requestMock.mockResolvedValueOnce({ status: 200 } as AxiosResponse)
        requestMock.mockResolvedValueOnce({ status: 200 } as AxiosResponse) 
        requestMock.mockResolvedValueOnce({ status: 404 } as AxiosResponse)
        requestMock.mockResolvedValue({ status: 200 } as AxiosResponse) 

        pageTester.run('https://monformateurindependant.com').then(result => {
            expect(result.url).toBe('https://monformateurindependant.com')
            expect(result.goodLinks.length).toBe(9)
            expect(result.goodSrc.length).toBe(26)
            expect(global.anomalies.length).toBe(1)
            done()
        })
    })
})
