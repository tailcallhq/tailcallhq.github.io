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
var path_1 = require("path");
var hashnode = require("./utils/hashnode");
var markdown_1 = require("./utils/markdown");
var devTo = require("./utils/devto");
var snapshot_json_1 = require("../snapshot.json");
var fs_1 = require("fs");
var crypto_1 = require("crypto");
var ExternalPublications = [
    { name: "Hashnode", handler: hashnode.handler },
    { name: "Dev.to", handler: devTo.handler },
];
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var args, hasPublishFlag, currentFiles, blogs, toPublish, _i, ExternalPublications_1, publication, _a, currentFiles_1, file, frontMatter, slug, _b, _c, _d, _e, _f, slug, file, content, contentHash, _g, _h, _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                args = process.argv.slice(2);
                hasPublishFlag = args.includes("--publish");
                currentFiles = fs_1.default.readdirSync(path_1.default.join(__dirname, "../../blog/"));
                blogs = snapshot_json_1.default.blogs || {};
                toPublish = 0;
                _k.label = 1;
            case 1:
                _k.trys.push([1, , 17, 22]);
                _i = 0, ExternalPublications_1 = ExternalPublications;
                _k.label = 2;
            case 2:
                if (!(_i < ExternalPublications_1.length)) return [3 /*break*/, 16];
                publication = ExternalPublications_1[_i];
                _a = 0, currentFiles_1 = currentFiles;
                _k.label = 3;
            case 3:
                if (!(_a < currentFiles_1.length)) return [3 /*break*/, 7];
                file = currentFiles_1[_a];
                file = "blog/".concat(file);
                frontMatter = (0, markdown_1.extractFrontMatterAndContent)(path_1.default.join(__dirname, "../../", file)).frontMatter;
                slug = frontMatter.slug;
                if (!(!blogs[slug] || !blogs[slug].platforms[publication.name])) return [3 /*break*/, 6];
                console.log("Publishing new blog", slug);
                toPublish++;
                _b = hasPublishFlag;
                if (!_b) return [3 /*break*/, 5];
                return [4 /*yield*/, publish(file, blogs, publication)];
            case 4:
                _b = (_k.sent());
                _k.label = 5;
            case 5:
                _b;
                _k.label = 6;
            case 6:
                _a++;
                return [3 /*break*/, 3];
            case 7:
                _c = blogs;
                _d = [];
                for (_e in _c)
                    _d.push(_e);
                _f = 0;
                _k.label = 8;
            case 8:
                if (!(_f < _d.length)) return [3 /*break*/, 15];
                _e = _d[_f];
                if (!(_e in _c)) return [3 /*break*/, 14];
                slug = _e;
                file = blogs[slug].file;
                content = (0, markdown_1.extractFrontMatterAndContent)(path_1.default.join(__dirname, "../../", file)).content;
                contentHash = (0, crypto_1.createHash)("sha256").update(content).digest("hex");
                if (!!blogs[slug].hash) return [3 /*break*/, 11];
                console.log("Publishing new blog from snapshot", slug);
                toPublish++;
                _g = hasPublishFlag;
                if (!_g) return [3 /*break*/, 10];
                return [4 /*yield*/, publish(file, blogs, publication)];
            case 9:
                _g = (_k.sent());
                _k.label = 10;
            case 10:
                _g;
                return [3 /*break*/, 14];
            case 11:
                if (!(blogs[slug].hash !== contentHash)) return [3 /*break*/, 14];
                console.log("Publishing updated blog", slug);
                toPublish++;
                _h = hasPublishFlag;
                if (!_h) return [3 /*break*/, 13];
                return [4 /*yield*/, publish(file, blogs, publication)];
            case 12:
                _h = (_k.sent());
                _k.label = 13;
            case 13:
                _h;
                _k.label = 14;
            case 14:
                _f++;
                return [3 /*break*/, 8];
            case 15:
                _i++;
                return [3 /*break*/, 2];
            case 16: return [3 /*break*/, 22];
            case 17:
                if (!(toPublish === 0)) return [3 /*break*/, 18];
                console.log("No changes detected. Exiting.");
                return [3 /*break*/, 21];
            case 18:
                _j = hasPublishFlag;
                if (!_j) return [3 /*break*/, 20];
                return [4 /*yield*/, writeSnapshot(blogs)];
            case 19:
                _j = (_k.sent());
                _k.label = 20;
            case 20:
                _j;
                _k.label = 21;
            case 21: return [7 /*endfinally*/];
            case 22: return [2 /*return*/];
        }
    });
}); };
var publish = function (file, blogs, publication) { return __awaiter(void 0, void 0, void 0, function () {
    var filePath, _a, frontMatter, content, platform, contentHash, slug, error_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                filePath = path_1.default.join(__dirname, "../../", file);
                _a = (0, markdown_1.extractFrontMatterAndContent)(filePath), frontMatter = _a.frontMatter, content = _a.content;
                platform = publication.name;
                contentHash = (0, crypto_1.createHash)("sha256").update(content).digest("hex");
                slug = frontMatter.slug;
                console.log("[".concat(platform, "] ").concat(frontMatter.slug, " ... publishing \u23F3"));
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, publication.handler(frontMatter, content)];
            case 2:
                _c.sent();
                blogs[slug] = blogs[slug] || {
                    file: file,
                    platforms: {},
                };
                blogs[slug].platforms[platform] = {
                    published: true,
                    lastUpdatePublished: true,
                    lastSuccessfulPublishedAt: new Date().toUTCString(),
                };
                blogs[slug].hash = contentHash;
                console.log("[".concat(platform, "] Success ").concat(frontMatter.slug, " ... succeeded \u2705"));
                return [3 /*break*/, 4];
            case 3:
                error_1 = _c.sent();
                console.error("[".concat(platform, "] Failure ").concat(frontMatter.slug, " ... failed \uD83D\uDC80"));
                blogs[slug] = blogs[slug] || {
                    file: file,
                    platforms: {},
                };
                blogs[slug].platforms[platform] = {
                    published: ((_b = blogs[slug].platforms[platform]) === null || _b === void 0 ? void 0 : _b.published) || false,
                    lastUpdatePublished: false,
                };
                console.log(blogs[slug]);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var writeSnapshot = function (blogs) { return __awaiter(void 0, void 0, void 0, function () {
    var snapshot;
    return __generator(this, function (_a) {
        console.log("Writing Snapshot");
        snapshot = JSON.stringify({ blogs: blogs }, null, 2);
        console.log(snapshot);
        try {
            fs_1.default.writeFile(path_1.default.join(__dirname, "../", "snapshot.json"), snapshot, function (err) {
                if (err) {
                    console.error(err);
                }
            });
        }
        catch (err) {
            console.error(err);
        }
        return [2 /*return*/];
    });
}); };
main();
