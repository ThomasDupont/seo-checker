"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
class Global {
    rootHostName;
    protocol;
    checkExternal = false;
    anomalies = [];
    testedUrls = [];
    excludedStatus = [];
    pagesTested = [];
    constructor() { }
    setUrl(url) {
        const { host, protocol } = new URL(url);
        this.protocol = protocol;
        this.rootHostName = `${protocol}//${host}`;
    }
    setCheckExternal(checkExternal) {
        this.checkExternal = checkExternal;
    }
    setAnomaly(anomaly) {
        console.log(chalk_1.default.red(anomaly));
        this.anomalies.push(anomaly);
    }
    setPageTested(url) {
        this.pagesTested.push(url);
    }
    isPageTested(url) {
        return this.pagesTested.includes(url);
    }
    setTestedUrl(url) {
        this.testedUrls.push(url);
    }
    isNotTested(url) {
        return !this.testedUrls.includes(url);
    }
    isTested(url) {
        return this.testedUrls.includes(url);
    }
    setExcludeStatus(status) {
        this.excludedStatus = status.split(',').map(Number);
    }
}
exports.default = new Global();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2dsb2JhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUF5QjtBQUV6QixNQUFNLE1BQU07SUFDSCxZQUFZLENBQW9CO0lBQ2hDLFFBQVEsQ0FBb0I7SUFDNUIsYUFBYSxHQUFZLEtBQUssQ0FBQTtJQUM5QixTQUFTLEdBQWEsRUFBRSxDQUFBO0lBQ3hCLFVBQVUsR0FBYSxFQUFFLENBQUE7SUFDekIsY0FBYyxHQUFhLEVBQUUsQ0FBQTtJQUM3QixXQUFXLEdBQWEsRUFBRSxDQUFBO0lBQ2pDLGdCQUFlLENBQUM7SUFFaEIsTUFBTSxDQUFDLEdBQVc7UUFDaEIsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUN2QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsUUFBUSxLQUFLLElBQUksRUFBRSxDQUFBO0lBQzVDLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxhQUFzQjtRQUNyQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQTtJQUNwQyxDQUFDO0lBRUQsVUFBVSxDQUFDLE9BQWU7UUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7UUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDOUIsQ0FBQztJQUVELGFBQWEsQ0FBQyxHQUFXO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzVCLENBQUM7SUFFRCxZQUFZLENBQUMsR0FBVztRQUN0QixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7SUFFRCxZQUFZLENBQUMsR0FBVztRQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUMzQixDQUFDO0lBRUQsV0FBVyxDQUFDLEdBQVc7UUFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBVztRQUNsQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3RDLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxNQUFjO1FBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDckQsQ0FBQztDQUNGO0FBRUQsa0JBQWUsSUFBSSxNQUFNLEVBQUUsQ0FBQSJ9