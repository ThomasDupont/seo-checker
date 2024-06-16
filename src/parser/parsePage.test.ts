import { ParseHtml } from './parsePage'
import fs from 'fs'
import path from 'path'
import global from '../global'

describe('Parse page test (specific method)', () => {
    global.setUrl('https://monformateurindependant.com')
    it ('avoidExternal Should avoid external with external URL and withExternalOption is false', () => {
        const parser = new ParseHtml('<html></html>', 'https://monformateurindependant.com')
        const external = parser.avoidExternal('https://www.google.com')
        expect(external).toBe(false)
    })
    it ('avoidExternal Should avoid external with internal URL and withExternalOption is false', () => {
        const parser = new ParseHtml('<html></html>', 'https://monformateurindependant.com')
        const external = parser.avoidExternal('https://monformateurindependant.com/foo/bar')
        expect(external).toBe(true)
    })

    it('treatResults Should return the given link (start whith http) ', () => {
        const parser = new ParseHtml('<html></html>', 'https://monformateurindependant.com/foo')
        const link = parser.treatResults('https://monformateurindependant.com/foo/bar')
        expect(link).toBe('https://monformateurindependant.com/foo/bar')
    })

    it('treatResults Should return the built link (is absolute)', () => {
        const parser = new ParseHtml('<html></html>', 'https://monformateurindependant.com/foo')
        const link = parser.treatResults('/foo/bar')
        expect(link).toBe('https://monformateurindependant.com/foo/bar')
    })

    it('treatResults Should return the built link (absolute without protocol)', () => {
        const parser = new ParseHtml('<html></html>', 'https://monformateurindependant.com/foo')
        const link = parser.treatResults('//monformateurindependant.com/foo/bar')
        expect(link).toBe('https://monformateurindependant.com/foo/bar')
    })

    it('treatResults Should a built link if is relative (without end / on initial HREF)', () => {
        const parser = new ParseHtml('<html></html>', 'https://monformateurindependant.com/blog')
        const link = parser.treatResults('foo/bar')
        expect(link).toBe('https://monformateurindependant.com/blog/foo/bar')
    })

    it('treatResults Should a built link if is relative (with end / on initial HREF)', () => {
        const parser = new ParseHtml('<html></html>', 'https://monformateurindependant.com/blog/')
        const link = parser.treatResults('foo/bar')
        expect(link).toBe('https://monformateurindependant.com/blog/foo/bar')
    })

    it('treatResults Should a built link if is relative (with a .htm page)', () => {
        const parser = new ParseHtml('<html></html>', 'https://monformateurindependant.com/blog.html')
        const link = parser.treatResults('/foo/bar')
        expect(link).toBe('https://monformateurindependant.com/foo/bar')
    })
})
describe('Parse page test', () => {
    global.setUrl('https://monformateurindependant.com')
    it('Parser Should return no error with invalid HTML', () => {
        const parser = new ParseHtml('', 'https://monformateurindependant.com')
        const canonical = parser.getCanonical()
        const links = parser.getLinksHref()
        const images = parser.getImagesSrc()
        expect(canonical).toBe(undefined)
        expect(links.length).toBe(0)
        expect(images.length).toBe(0)
    })
    it('Parser Should return the links of the page', done => {
        
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
