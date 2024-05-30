"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHtml = void 0;
const axios_1 = __importDefault(require("axios"));
const getHtml = async (url) => {
    const response = await axios_1.default.get(url);
    return response.data;
};
exports.getHtml = getHtml;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SHRtbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXIvZ2V0SHRtbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBeUI7QUFFbEIsTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUFFLEdBQVcsRUFBRSxFQUFFO0lBQ3pDLE1BQU0sUUFBUSxHQUFHLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBUyxHQUFHLENBQUMsQ0FBQTtJQUM3QyxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUE7QUFDeEIsQ0FBQyxDQUFBO0FBSFksUUFBQSxPQUFPLFdBR25CIn0=