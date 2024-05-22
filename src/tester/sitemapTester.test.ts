import { parseSitemap } from '../tester/sitemapTester';

describe('Sitemap tester test', () => {
    it('Test parse sitemap with sub-sitemaps', (done) => {
        parseSitemap('https://www.lemonde.fr/sitemap_index.xml').then(result => {
            console.log(result)
            done()
        })
    })
})
