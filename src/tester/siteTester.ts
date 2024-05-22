import chalk from "chalk"
import global from "../global.js"
import { pageTester } from "./pageTester.js"

export const siteChecker = async () => {
    if (!global.rootHostName) {
        throw new Error('Root host name is not defined')
    }
    const goodLinks = (await pageTester(global.rootHostName)).goodLinks

    global.setPageTested(global.rootHostName)
    await checkRecursively(goodLinks)
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
