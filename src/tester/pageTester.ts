import { Effect as T } from "effect"
import { ReturnGetStatusRequest } from "../@types/program.types"
import global from "../global"
import { ParseHtml } from "../parser/parsePage"

type TreatResultsArgs = {
    links: string[]
    url: string
    type: 'Links' | 'Images'
}
export class PageTester {
    constructor(
        private getRequestStatus : (url: string) => Promise<ReturnGetStatusRequest>,
        private getHtml: (url: string) => Promise<string>
    ) {}

    public run = async (url: string, isRootUrl = false) => {
        global.setTestedUrl(url)
        const html = await T.tryPromise(() => this.getHtml(url)).pipe(
            T.catchAll(_ => {
                global.setAnomaly(`HTML is empty on page ${url}`)
                return T.succeed(null)
            }),
            T.runPromise
        )
    
        if (!html) {
            return {
                url,
                goodLinks: [],
                goodSrc: []
            }
        }
        const parser = new ParseHtml(html, url)
    
        const links = parser.getLinksHref()
        const canonical = !isRootUrl && parser.getCanonical()
        const images = parser.getImagesSrc()
    
        const filteredLinks = links.filter(global.isNotTested.bind(global))
        const goodLinks: string[] = await Promise
            .allSettled(filteredLinks.map(this.getRequestStatus))
            .then(this.treatResults({links: filteredLinks, url, type: 'Links'}))
    
        if (canonical) {
            await T.tryPromise(() => this.getRequestStatus(canonical)).pipe(
                T.map(result => {
                    if (result.status !== 200) {
                        global.setAnomaly(`Canonical ${canonical} is broken on page ${url}, status code: ${result.status}`)
                    } else {
                        global.setCanonical(canonical, url)
                    }
                }),
                T.catchAll(_ => {
                    global.setAnomaly(`Canonical ${canonical} is broken on page ${url}`)
                    return T.succeed(null)
                }),
                T.runPromise
            )
        } else if (!isRootUrl) {
            global.setAnomaly(`Canonical is missing on page ${url}`)
        }
        
        const filteredSrc = images.filter(global.isNotTested.bind(global))
        const goodSrc: string[] = await Promise
            .allSettled(filteredSrc.map(this.getRequestStatus))
            .then(this.treatResults({links: filteredSrc, url, type: 'Images'}))
    
        return {
            url,
            goodLinks,
            goodSrc
        }
    }

    private treatResults = ({links, url, type}: TreatResultsArgs) => (results: PromiseSettledResult<ReturnGetStatusRequest>[]): string[] => results.map((result, i) => {
        global.setTestedUrl(links[i])
    
        if (result.status === 'rejected') {
            global.setAnomaly(`${type} ${links[i]} is broken on page ${url}`)
            return null
        }
    
        if (![200, 999].includes(result.value.status)) {
            global.setAnomaly(`${type} ${links[i]} is broken on page ${url}, status code: ${result.value.status}`)
            return null
        }
    
        return result.value.url
    }).filter(url => url !== null).map(url => url!)
}
