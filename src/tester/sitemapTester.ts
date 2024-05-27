import { XMLParser } from "fast-xml-parser"
import { Effect as T, pipe } from "effect"
import { getHtml } from "../parser/getHtml"
import { Sitemap, SitemapIndex, sitemap } from "../@types/program.types";
import global from "../global";

export class SitemapTester {
    private static urlsInSitemap: string[] = []

    private static extractSitemaps(robotsTxt: string) {
        const sitemapLines = robotsTxt.split('\n').filter(line => line.trim().startsWith('Sitemap:'));
        return sitemapLines.map(line => line.split(' ')[1].trim());
    }

    public static async parseRobots(url: string) {
        return pipe(
            T.tryPromise(() => getHtml(url + '/robots.txt')),
            T.map(this.extractSitemaps),
            T.catchAll(_ => {
                global.setAnomaly(`robots.txt is missing on website ${url}`)
                return T.succeed([])
            }),
            T.runPromise
        )
    }

    public static async parseSitemap(url: string): Promise<Sitemap | null> {
        const test1 = await pipe(
            T.tryPromise(async () => {
                const xml = await getHtml(url)
                if (!xml) {
                    throw new Error('HTML is empty')
                }
                const parser = new XMLParser();
                return parser.parse(xml);
            }),
            T.catchAll(_ => {
                global.setAnomaly(`sitemap.xml is missing on page or not a valid XML ${url}`)
                return T.succeed(null)
            }),
            T.runPromise
        )

        if (!test1) return null


        return pipe(
            T.try(() => sitemap.parse(test1)),
            T.catchAll(e => {
                global.setAnomaly(`sitemap.xml is not valid on page ${url} : error ${JSON.stringify(e)}`)
                return T.succeed(null)
            }),
            T.runPromise
        )
    }

    public static async testSitemap(url: string) {
        const sitemap = await this.parseSitemap(url)
        if (!sitemap) return
        if (this.isIndexSitemap(sitemap)) {
            for (const set of sitemap.sitemapindex.sitemap) {
                await this.testSitemap(set.loc)
            }
            return
        }

        sitemap.urlset.url.forEach(url => {
            this.urlsInSitemap.push(url.loc)
        })
    }

    public static getUrlsInSitemap() {
        return this.urlsInSitemap
    }

    private static isIndexSitemap(sitemap: Sitemap): sitemap is SitemapIndex {
        return 'sitemapindex' in sitemap
    }
}
