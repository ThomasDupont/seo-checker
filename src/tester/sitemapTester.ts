import { XMLParser } from "fast-xml-parser"
import { getHtml } from "../parser/getHtml"

export const parseSitemap = async (url: string) => {
    const xml = await getHtml(url)
    const parser = new XMLParser();
    let jObj = parser.parse(xml);

    return jObj
}
export const testSitemap = async (url: string) => {
}
