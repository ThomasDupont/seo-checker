
import { AxiosResponse } from 'axios'
import fs from 'fs'
import path from 'path'
import * as getRequest from '../utils/getRequest'
import { pageTester } from "./pageTester"
import * as getHtml from "../parser/getHtml"
import global from '../global'

const getHtmlMock = jest.spyOn(getHtml, 'getHtml')
const requestMock = jest.spyOn(getRequest, 'request')
describe('Page tester test', () => {
    afterEach(() => {
        global.anomalies = []
        global.testedUrls = []
    })
    global.setUrl('https://monformateurindependant.com')
    it ('Should test the page without anomalies', (done) => {
        getHtmlMock.mockResolvedValueOnce(fs.readFileSync(path.join(__dirname, '../fixtures/good_html.html'), 'utf-8'))
        requestMock.mockResolvedValue({ status: 200 } as AxiosResponse)

        pageTester('https://monformateurindependant.com').then(result => {
            expect(result.url).toBe('https://monformateurindependant.com')
            expect(result.goodLinks.length).toBe(10)
            expect(result.goodSrc.length).toBe(26)
            expect(global.anomalies.length).toBe(0)
            getHtmlMock.mockReset()
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

        pageTester('https://monformateurindependant.com').then(result => {
            expect(result.url).toBe('https://monformateurindependant.com')
            expect(result.goodLinks.length).toBe(9)
            expect(result.goodSrc.length).toBe(26)
            expect(global.anomalies.length).toBe(1)
            done()
        })
    })
})
