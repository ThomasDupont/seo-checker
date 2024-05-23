import { SitemapTester } from '../tester/sitemapTester';

describe('Sitemap tester test', () => {
    it('Test parse sitemap index', (done) => {
        SitemapTester.parseSitemap('https://www.lemonde.fr/sitemap_index.xml').then(result => {
            expect(result).toBeDefined()
            done()
        })
    })
    it('Test parse sitemap urlset', (done) => {
        SitemapTester.parseSitemap('https://www.lemonde.fr/sitemap/articles/1958-04-21.xml').then(result => {
            console.log(result)
            expect(result).toBeDefined()
            done()
        })
    })

    it ('Test parse robots.txt', (done) => {
        SitemapTester.parseRobots('https://www.lemonde.fr').then(result => {
            expect(result.length).toBeGreaterThan(0)
            done()
        })
    })

    it('Should return all urls in sitemap', (done) => {
        SitemapTester.testSitemap('https://gorde-theme.myshopify.com/sitemap.xml').then(() => {
            const urls = SitemapTester.getUrlsInSitemap()
            expect(urls.length).toBeGreaterThan(0)
            done()
        })
    })
})
