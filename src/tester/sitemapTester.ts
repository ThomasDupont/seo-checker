import { XMLParser } from "fast-xml-parser"
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
        try {
            const robotTxt = await getHtml(url + '/robots.txt')
            return this.extractSitemaps(robotTxt)
        } catch (e) {
            global.setAnomaly(`robots.txt is missing on website ${url}`)
            return []
        }
        
    }

    public static async parseSitemap(url: string): Promise<Sitemap | null> {
        let jObj
        try {
            const xml = await getHtml(url)
            const parser = new XMLParser();
            jObj = parser.parse(xml);
        } catch (e) {
            global.setAnomaly(`sitemap.xml is missing on page or not a valid XML ${url}`)
            return null
        }

        try {
            return sitemap.parse(jObj)
        }
        catch (e) {
            global.setAnomaly(`sitemap.xml is not valid on page ${url} : error ${JSON.stringify(e)}`)
            return null
        }
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
