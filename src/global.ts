import chalk from "chalk"

class Global {
  public rootHostName: string | undefined
  public protocol: string | undefined
  public checkExternal: boolean = false
  public anomalies: string[] = []
  public testedUrls: string[] = []
  public excludedStatus: number[] = []
  public pagesTested: string[] = []
  public canonicals: string[] = []

  setUrl(url: string) {
    const { host, protocol } = new URL(url)
    this.protocol = protocol
    this.rootHostName = `${protocol}//${host}`
  }

  setCheckExternal(checkExternal: boolean) {
    this.checkExternal = checkExternal
  }

  setAnomaly(anomaly: string) {
    console.log(chalk.red(anomaly))
    this.anomalies.push(anomaly)
  }

  setPageTested(url: string) {
    this.pagesTested.push(url)
  }

  isPageTested(url: string) {
    return this.pagesTested.includes(url)
  }

  setTestedUrl(url: string) {
    this.testedUrls.push(url)
  }

  isNotTested(url: string) {
    return !this.testedUrls.includes(url)
  }

  setExcludeStatus(status: string) {
    this.excludedStatus = status.split(',').map(Number)
  }

  setCanonical(canonical: string, url: string) {
    if (this.canonicals.includes(canonical)) {
      this.setAnomaly(`Canonical ${canonical} is duplicated for page ${url}`)
    }
    this.canonicals.push(canonical)
  }
}

export default new Global()
