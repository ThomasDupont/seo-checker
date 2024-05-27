import { parse } from 'node-html-parser';
import { Effect as T, pipe } from 'effect'
import Global from '../global';

export const avoidExternal = (href: string) => {
    if (Global.checkExternal) return true
    return pipe(
        T.try(() => {
            const url = new URL(href)
            return `${url.protocol}//${url.host}` === Global.rootHostName
        }),
        T.catchAll(_ => T.succeed(true)),
        T.runSync
    )
}
const treatResults = (href: string, link: string) => {
    if (link!.startsWith('http')) {
        return link!
    } else if (link!.startsWith('//')) {
        return `${Global.protocol}${link}`
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
        const a = this.document.querySelectorAll('a')
        return a.map(a => a.getAttribute('href'))
            .filter((href, i) => {
                if (!href) { 
                    Global.setAnomaly(`href is empty in link ${JSON.stringify(a[i]?.rawAttributes)} on page ${this.href}`)
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
        const imgs = this.document.querySelectorAll('img')
        return imgs.map(img => img.getAttribute('src'))
            .filter((src, i) => {
                
                if (!src) {
                    Global.setAnomaly(`src is empty in images ${JSON.stringify(imgs[i]?.rawAttributes)} on page ${this.href}`)
                }
                return !!src
            })
            .filter((href, i, arr) => arr.indexOf(href) === i)
            .map(src => treatResults(this.href, src!))
    }
}
