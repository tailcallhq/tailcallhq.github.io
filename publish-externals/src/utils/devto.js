"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
var axios_1 = require("axios");
var constants_1 = require("./constants");
var markdown_1 = require("./markdown");
var isOrg = constants_1.DEVTO_ORG_ID && constants_1.DEVTO_ORG_NAME;
var devtoPostHandler = function (frontMatter, content) { return __awaiter(void 0, void 0, void 0, function () {
    var processedMd, title, cover_image, canonical_url, description, postExistsOnDevto;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                processedMd = (0, markdown_1.addBaseUrlToImages)(content);
                title = frontMatter.title, cover_image = frontMatter.cover_image, canonical_url = frontMatter.canonical_url, description = frontMatter.description;
                return [4 /*yield*/, findOnDevto(title)];
            case 1:
                postExistsOnDevto = _a.sent();
                if (!postExistsOnDevto) return [3 /*break*/, 3];
                //notice that the public parameter hasn't been specified / is false. this is to make sure even a published article becomes un-published when edited thru github
                return [4 /*yield*/, updatePostOnDevto(postExistsOnDevto.id, {
                        title: title,
                        body_markdown: processedMd,
                        main_image: cover_image,
                        canonical_url: canonical_url || null,
                        description: description,
                        tags: description,
                        organization_id: isOrg ? constants_1.DEVTO_ORG_ID : null,
                    })];
            case 2:
                //notice that the public parameter hasn't been specified / is false. this is to make sure even a published article becomes un-published when edited thru github
                _a.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, publishPostOnDevto({
                    title: title,
                    body_markdown: processedMd,
                    main_image: cover_image,
                    canonical_url: canonical_url || null,
                    description: description,
                    tags: description,
                    organization_id: isOrg ? constants_1.DEVTO_ORG_ID : null,
                })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.handler = devtoPostHandler;
var devtoApiVars = {
    headers: {
        "api-key": constants_1.DEVTO_API_KEY,
    },
};
var findOnDevto = function (titleToSearch) { return __awaiter(void 0, void 0, void 0, function () {
    var page, per_page, found, url, response, articles, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                page = 1;
                per_page = 50;
                found = void 0;
                found = false;
                _b.label = 1;
            case 1:
                if (!(true && !found)) return [3 /*break*/, 3];
                url = isOrg
                    ? "https://dev.to/api/organizations/".concat(constants_1.DEVTO_ORG_NAME, "/articles")
                    : "https://dev.to/api/articles/me/all";
                return [4 /*yield*/, axios_1.default.get("".concat(url, "?page=").concat(page, "&per_page=").concat(per_page), devtoApiVars)];
            case 2:
                response = _b.sent();
                articles = response.data;
                if (!articles || articles.length === 0) {
                    //stop right here if no (more) articles
                    return [3 /*break*/, 3];
                }
                found = articles.find(function (_a) {
                    var title = _a.title;
                    return title === titleToSearch;
                }) || false;
                //move to next page if not found
                page++;
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/, found];
            case 4:
                _a = _b.sent();
                throw new Error("error, could not check for existing articles on dev.to ❌ ");
            case 5: return [2 /*return*/];
        }
    });
}); };
var publishPostOnDevto = function (article) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.post("https://dev.to/api/articles", { article: article }, devtoApiVars)];
            case 1:
                _b.sent();
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                throw new Error("error: could not publish new article on dev.to ❌ ");
            case 3: return [2 /*return*/];
        }
    });
}); };
var updatePostOnDevto = function (id, article) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.put("https://dev.to/api/articles/".concat(id), { article: article }, devtoApiVars)];
            case 1:
                _b.sent();
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                throw new Error("error: could not edit the article on dev.to ❌ ");
            case 3: return [2 /*return*/];
        }
    });
}); };
