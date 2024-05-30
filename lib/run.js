"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const global_js_1 = __importDefault(require("./global.js"));
const pageTester_js_1 = require("./tester/pageTester.js");
const siteTester_js_1 = require("./tester/siteTester.js");
const run = async (options, url) => {
    global_js_1.default.setUrl(url);
    global_js_1.default.setCheckExternal(options.withExternal);
    if (options.ExcludeStatus) {
        global_js_1.default.setExcludeStatus(options.ExcludeStatus);
    }
    if (options.single) {
        await (0, pageTester_js_1.pageTester)(url);
    }
    if (options.all) {
        await (0, siteTester_js_1.siteChecker)();
    }
    if (global_js_1.default.anomalies.length > 0) {
        throw new Error('Anomalies found');
    }
};
exports.run = run;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3J1bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSw0REFBZ0M7QUFDaEMsMERBQW1EO0FBQ25ELDBEQUFvRDtBQUU3QyxNQUFNLEdBQUcsR0FBRyxLQUFLLEVBQUUsT0FBdUIsRUFBRSxHQUFXLEVBQUUsRUFBRTtJQUM5RCxtQkFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNsQixtQkFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUU3QyxJQUFJLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN4QixtQkFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUNsRCxDQUFDO0lBRUQsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDakIsTUFBTSxJQUFBLDBCQUFVLEVBQUMsR0FBRyxDQUFDLENBQUE7SUFDekIsQ0FBQztJQUVELElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2QsTUFBTSxJQUFBLDJCQUFXLEdBQUUsQ0FBQTtJQUN2QixDQUFDO0lBRUQsSUFBSSxtQkFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQ3RDLENBQUM7QUFDTCxDQUFDLENBQUE7QUFuQlksUUFBQSxHQUFHLE9BbUJmIn0=