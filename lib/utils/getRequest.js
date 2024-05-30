"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestStatus = exports.request = void 0;
const axios_1 = __importDefault(require("axios"));
const global_1 = __importDefault(require("../global"));
const request = (url) => axios_1.default.get(url, {
    validateStatus: () => true
});
exports.request = request;
const getRequestStatus = async (url) => {
    const response = await (0, exports.request)(url);
    if (global_1.default.excludedStatus.includes(response.status)) {
        return { status: 200, url };
    }
    return { status: response.status, url };
};
exports.getRequestStatus = getRequestStatus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9nZXRSZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtEQUF5QjtBQUV6Qix1REFBOEI7QUFFdkIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO0lBQ25ELGNBQWMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJO0NBQzdCLENBQUMsQ0FBQTtBQUZXLFFBQUEsT0FBTyxXQUVsQjtBQUVLLE1BQU0sZ0JBQWdCLEdBQUcsS0FBSyxFQUFFLEdBQVcsRUFBbUMsRUFBRTtJQUNuRixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUEsZUFBTyxFQUFDLEdBQUcsQ0FBQyxDQUFBO0lBRW5DLElBQUksZ0JBQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ2xELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFBO0lBQy9CLENBQUM7SUFFRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUE7QUFDM0MsQ0FBQyxDQUFBO0FBUlksUUFBQSxnQkFBZ0Isb0JBUTVCIn0=