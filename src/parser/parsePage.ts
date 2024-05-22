import { parse } from 'node-html-parser';
import Global from '../global';

const avoidExternal = (href: string) => {
    if (Global.checkExternal) return true

    try {
        const url = new URL(href)
        return `${url.protocol}//${url.host}` === Global.rootHostName
    } catch (e) { return true }
}
const treatResults = (href: string, link: string) => {
    if (link!.startsWith('http')) {
        return link!
    } else if (link!.startsWith('/')) {
        return `${Global.rootHostName}${link!}`
    } else {
        return `${href}${href.endsWith('/') ? '' : '/'}${link!}`
    }
}
export class ParseHtml {
    public document
    constructor(html: string, private href: string) {
        this.document = parse(html)
    }

    getCanonical() {
        return this.document.querySelector('link[rel="canonical"]')?.getAttribute('href')
    }

    getLinksHref() {
        return this.document.querySelectorAll('a')
            .map(a => a.getAttribute('href'))
            .filter((href, i) => {
                if (!href) { 
                    Global.setAnomaly(`href is empty in link index ${i} on page ${this.href}`)
                    return false
                }

                if (href.startsWith('#')) return false
                if (href.startsWith('tel:')) return false
                if (href.startsWith('mailto:')) return false
                

                return !!href
            })
            .filter((href, i, arr) => arr.indexOf(href) === i)
            .filter(href => avoidExternal(href!))
            .map(href => treatResults(this.href, href!))
    }

    getImagesSrc() {
        return this.document.querySelectorAll('img')
            .map(img => img.getAttribute('src'))
            .filter((src, i) => {
                if (!src) Global.setAnomaly(`src is empty in images index ${i} on page ${this.href}`)
                return !!src
            })
            .filter((href, i, arr) => arr.indexOf(href) === i)
            .map(src => treatResults(this.href, src!))
    }
}
