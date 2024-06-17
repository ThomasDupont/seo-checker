import fs from 'fs'
import path from 'path'
import global from '../global';
import { SitemapTester } from '../tester/sitemapTester';

describe('Sitemap tester test', () => {
    const getHtmlMock = jest.fn()
    afterEach(() => {
        global.anomalies = []
        global.testedUrls = []
        getHtmlMock.mockReset()
    })
    it('Test parse sitemap index', (done) => {
        const sitemapIndex = fs.readFileSync(path.join(__dirname, '../fixtures/sitemap_index.xml'), 'utf-8')
        getHtmlMock.mockResolvedValue(sitemapIndex)
        const sitemapTester = new SitemapTester(getHtmlMock)
        sitemapTester.parseSitemap('https://www.lemonde.fr/sitemap_index.xml').then(result => {
            expect(getHtmlMock).toHaveBeenCalledWith('https://www.lemonde.fr/sitemap_index.xml')
            expect(result).toBeDefined()
            done()
        })
    })
    it('Test parse sitemap urlset', (done) => {
        const sitemapUrlset = fs.readFileSync(path.join(__dirname, '../fixtures/1958-04-21.xml'), 'utf-8')
        getHtmlMock.mockResolvedValue(sitemapUrlset)
        const sitemapTester = new SitemapTester(getHtmlMock)
        sitemapTester.parseSitemap('https://www.lemonde.fr/sitemap/articles/1958-04-21.xml').then(result => {
            expect(getHtmlMock).toHaveBeenCalledWith('https://www.lemonde.fr/sitemap/articles/1958-04-21.xml')
            expect(result).toBeDefined()
            done()
        })
    })

    it ('Test parse robots.txt', (done) => {
        const robots = fs.readFileSync(path.join(__dirname, '../fixtures/robots.txt'), 'utf-8')
        getHtmlMock.mockResolvedValue(robots)
        const sitemapTester = new SitemapTester(getHtmlMock)
        sitemapTester.parseRobots('https://www.lemonde.fr').then(result => {
            expect(getHtmlMock).toHaveBeenCalledWith('https://www.lemonde.fr/robots.txt')
            expect(result.length).toBeGreaterThan(0)
            done()
        })
    })

    it('Should return all urls in sitemap', (done) => {
        const sitemap = fs.readFileSync(path.join(__dirname, '../fixtures/shopify-sitemap.xml'), 'utf-8')
        getHtmlMock.mockResolvedValueOnce(sitemap)
        getHtmlMock.mockResolvedValue(fs.readFileSync(path.join(__dirname, '../fixtures/1958-04-21.xml'), 'utf-8'))
        const sitemapTester = new SitemapTester(getHtmlMock)
        sitemapTester.testSitemap('https://gorde-theme.myshopify.com/sitemap.xml').then(() => {
            expect(getHtmlMock).toHaveBeenCalledWith('https://gorde-theme.myshopify.com/sitemap.xml')
            const urls = sitemapTester.getUrlsInSitemap()
            expect(urls.length).toBeGreaterThan(0)
            done()
        })
    })
    it('Should return null for invalid sitemap', (done) => {
        getHtmlMock.mockRejectedValue('invalid xml')
        const sitemapTester = new SitemapTester(getHtmlMock)
        sitemapTester.parseSitemap('https://www.lemonde.fr/sitemap_wrong.xml').then(result => {
            expect(result).toBeNull()
            done()
        })
    })

    it('Should return result for sitemap index with single sitemap', (done) => {
        getHtmlMock.mockResolvedValueOnce(fs.readFileSync(path.join(__dirname, '../fixtures/sitemap_index_single.xml'), 'utf-8'))
        const sitemapTester = new SitemapTester(getHtmlMock)
        sitemapTester.parseSitemap('https://www.lemonde.fr/sitemap_index.xml').then(result => {
            expect(getHtmlMock).toHaveBeenCalledWith('https://www.lemonde.fr/sitemap_index.xml')
            expect(result).toBeDefined()
            done()
        })
    })

    it('Should return a result for sitemap index with single path', (done) => {
        getHtmlMock.mockResolvedValueOnce(fs.readFileSync(path.join(__dirname, '../fixtures/sitemap_single.xml'), 'utf-8'))
        const sitemapTester = new SitemapTester(getHtmlMock)
        sitemapTester.parseSitemap('https://www.lemonde.fr/sitemap.xml').then(result => {
            expect(getHtmlMock).toHaveBeenCalledWith('https://www.lemonde.fr/sitemap.xml')
            expect(result).toBeDefined()
            done()
        })
    })
})
