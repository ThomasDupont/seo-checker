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
        return pipe(
            T.tryPromise(
                () => getHtml(url)
                    .catch(() => {
                        throw new Error('not_found')
                    })
                    .then(xml => new XMLParser().parse(xml))
                    .then(sitemap.parse)
            ),
            T.catchAll(e => {
                if (e instanceof Error && ['not_found', 'html_empty'].includes(e.message)) {
                    global.setAnomaly(`sitemap.xml is missing on page or not a valid XML ${url}`);
                }
                else {
                    global.setAnomaly(`sitemap.xml is not valid on page ${url} : error ${JSON.stringify(e)}`);
                }
                return T.succeed(null);
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
