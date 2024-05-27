import { ParseHtml, avoidExternal } from './parsePage'
import fs from 'fs'
import path from 'path'
import global from '../global'

describe('Parse page test', () => {
    it ('Should avoid external', () => {
        const external = avoidExternal('https://www.google.com')
        expect(external).toBe(false)
    })
    it('Should return the links of the page', done => {
        global.setUrl('https://monformateurindependant.com')
        const html = fs.readFileSync(path.join(__dirname, '../fixtures/good_html.html'), 'utf-8')
        const parser = new ParseHtml(html, 'https://monformateurindependant.com')
        const canonical = parser.getCanonical()
        const links = parser.getLinksHref()
        const images = parser.getImagesSrc()

        expect(canonical).toBe('https://monformateurindependant.com');
        [...images, ...links].forEach(link => {
            const url = new URL(link)
            expect(`${url.protocol}//${url.hostname}`).toBe('https://monformateurindependant.com')
        })

        expect(links.length).toBe(10)
        expect(images.length).toBe(26)
        done()

    })
})
