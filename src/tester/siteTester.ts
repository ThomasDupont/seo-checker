import chalk from "chalk"
import global from "../global.js"
import { pageTester } from "./pageTester.js"
import { SitemapTester } from "./sitemapTester.js"
import { getRequestStatus } from "../utils/getRequest.js"

export const siteChecker = async () => {
    if (!global.rootHostName) {
        throw new Error('Root host name is not defined')
    }
    const goodLinks = (await pageTester(global.rootHostName)).goodLinks

    global.setPageTested(global.rootHostName)
    await checkRecursively(goodLinks)

    const robots = await SitemapTester.parseRobots(global.rootHostName)
    for (const sitemap of robots) {
        await SitemapTester.testSitemap(sitemap)
        await Promise.all(SitemapTester.getUrlsInSitemap().map(getRequestStatus)).then(results =>
            results.forEach(result => {
                if (result.status !== 200) {
                    global.setAnomaly(`URL ${result.url} in sitemap is broken, status code: ${result.status}`)
                }
            })
        )
    }
}

const checkRecursively = async (links: string[]) => {
    for (const link of links) {
        const url = new URL(link)
        if (`${url.protocol}//${url.host}` !== global.rootHostName) {
            continue
        }
        if (!global.isPageTested(link)) {
            console.log(chalk.blueBright(`Start checking ${link} page`))
            const { goodLinks } = await pageTester(link)
            global.setPageTested(link)
            await checkRecursively(goodLinks)
        } else {
            return
        }
    }
}
