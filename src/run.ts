import { ProgramOtpions } from "./@types/cli.types.js"
import global from "./global.js"
import { pageTester } from "./tester/pageTester.js"
import { siteChecker } from "./tester/siteTester.js"
import { SitemapTester } from "./tester/sitemapTester.js"

export const run = async (options: ProgramOtpions, url: string) => {
    global.setUrl(url)
    global.setCheckExternal(options.withExternal)

    if (options.ExcludeStatus) {
        global.setExcludeStatus(options.ExcludeStatus)
    }

    if (options.single) {
        await pageTester(url)
    }

    if(options.sitemap) {
        await SitemapTester.testSitemap(url)
    }

    if (options.all) {
        await siteChecker()
    }

    if (global.anomalies.length > 0) {
        throw new Error('Anomalies found')
    }
}
