import chalk from "chalk"
import global from "../global"
import { PageTester } from "./pageTester"
import { SitemapTester } from "./sitemapTester"
import { getRequestStatus } from "../utils/getRequest"

export class SiteTester {
    constructor(private sitemapTester : SitemapTester, private pageTester: PageTester) {}

    public run = async () => {
        if (!global.rootHostName) {
            return new Error('Root host name is not defined')
        }
        const doNotCheckCanonicalForRootUrl = true
        const goodLinks = (await this.pageTester.run(global.rootHostName, doNotCheckCanonicalForRootUrl)).goodLinks
    
        global.setPageTested(global.rootHostName)
        await this.checkRecursively(goodLinks)
    
        const robots = await this.sitemapTester.parseRobots(global.rootHostName)
        for (const sitemap of robots) {
            await this.sitemapTester.testSitemap(sitemap)
            await Promise.allSettled(this.sitemapTester.getUrlsInSitemap().map(getRequestStatus)).then(results => 
                results.forEach(result => {
                    if (result.status === 'fulfilled' && result.value.status !== 200) {
                        global.setAnomaly(`URL ${result.value.url} in sitemap is broken, status code: ${result.value.status}`)
                    } else if (result.status === 'rejected') {
                        global.setAnomaly(`ERROR :  ${JSON.stringify(result.reason)}`)
                    }
                })
            )
        }
    }

    public checkRecursively = async (links: string[]) => {
        for (const link of links) {
            const url = new URL(link)
            if (`${url.protocol}//${url.host}` !== global.rootHostName) {
                continue
            }
            if (!global.isPageTested(link)) {
                console.log(chalk.blueBright(`Start checking ${link} page`))
                const { goodLinks } = await this.pageTester.run(link)
                global.setPageTested(link)
                await this.checkRecursively(goodLinks)
            } else {
                return
            }
        }
    }
}
