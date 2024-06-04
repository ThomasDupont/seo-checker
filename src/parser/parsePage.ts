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
    } else if(href.split('.').length > 1) {
        return `${Global.rootHostName}/${link!}`
    }
    return `${href}${href.endsWith('/') ? '' : '/'}${link!}`
}

const excludedLinkPrefix = ['#', 'tel:', 'mailto:', 'tel:', 'javascript:', 'data:', 'ftp:', 'file:', 'skype:', 'sms:', 'whatsapp:', 'viber:', 'tg:', '?']
const excludedLinkSuffix = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.zip', '.rar', '.7z', '.tar', '.gz', '.tgz', '.mp3', '.mp4', '.avi', '.mkv', '.mov', '.flv', '.wmv', '.wav', '.ogg', '.webm', '.m4a', '.aac', '.flac', '.wma', '.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.bmp', '.ico', '.tiff', '.tif', '.psd', '.ai', '.eps', '.indd', '.raw', '.cr2', '.nef', '.orf', '.sr2', '.pef', '.dng', '.xmp', '.arw', '.rw2', '.nrw', '.rwl', '.mrw', '.srf', '.3fr', '.kdc', '.raf', '.dcr', '.mos', '.crw', '.cr3', '.erf', '.mef', '.srw', '.r3d', '.dng', '.dcr', '.ptx', '.jpe', '.jif', '.jfif', '.jfi', '.jp2', '.j2k', '.jpf', '.jpx', '.jpm', '.mj2', '.jxr', '.hdp', '.wdp', '.cur', '.ico', '.ani', '.bmp', '.dib', '.rle', '.cpx', '.vga', '.q0', '.q1', '.q2', '.q3', '.q4', '.q5', '.q6', '.q7', '.q8', '.q9', '.q10', '.q11', '.q12', '.q13', '.q14', '.q15', '.q16', '.q17', '.q18', '.q19', '.q20', '.q21', '.q22', '.q23', '.q24', '.q25', '.q26', '.q27', '.q28', '.q29', '.q30', '.q31', '.q32', '.q33', '.q34', '.q35', '.q36', '.q37', '.q38', '.q39', '.q40', '.q41']
const excludedImagePrefix = ['data:']
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

                if (excludedLinkPrefix.some(excluded => href?.startsWith(excluded))) {
                    return false
                }

                if (excludedLinkSuffix.some(excluded => href?.endsWith(excluded))) {
                    return false
                }
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

                if (excludedImagePrefix.some(excluded => src?.startsWith(excluded))) {
                    return false
                }
                return !!src
            })
            .filter((href, i, arr) => arr.indexOf(href) === i)
            .map(src => treatResults(this.href, src!))
    }
}
