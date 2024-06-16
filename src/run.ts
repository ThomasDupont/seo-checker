import { ProgramOtpions } from "./@types/cli.types"
import global from "./global"
import { getHtml } from "./parser/getHtml"
import { PageTester } from "./tester/pageTester"
import { SiteTester } from "./tester/siteTester"
import { SitemapTester } from "./tester/sitemapTester"
import { getRequestStatus } from "./utils/getRequest"

export const run = async (options: ProgramOtpions, url: string) => {
    global.setUrl(url)
    global.setCheckExternal(options.withExternal)

    if (options.ExcludeStatus) {
        global.setExcludeStatus(options.ExcludeStatus)
    }

    if (options.single) {
        const pageTester = new PageTester(getRequestStatus, getHtml)
        await pageTester.run(url)
    }

    if(options.sitemap) {
        await new SitemapTester(getHtml).testSitemap(url)
    }

    if (options.all) {
        const sitetester = new SiteTester(
            new SitemapTester(getHtml),
            new PageTester(getRequestStatus ,getHtml)
        )
        const tester = await sitetester.run()
        if (tester instanceof Error) {
            throw tester
        }
    }

    if (global.anomalies.length > 0) {
        throw new Error('Anomalies found')
    }
}
