"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractFrontMatterAndContent = exports.addBaseUrlToImages = void 0;
var fs_1 = require("fs");
var gray_matter_1 = require("gray-matter");
var constants_1 = require("./constants");
var addBaseUrlToImages = function (markdown) {
    var imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    return markdown.replace(imageRegex, function (match, alt, src) {
        if (!src.startsWith("http") && !src.startsWith("https")) {
            // Remove leading '../' if present
            src = src.replace(/^\.\.\//, "");
            // Add 'static/' if not already present
            if (!src.startsWith("static/")) {
                src = "static/".concat(src);
            }
            src = "".concat(constants_1.BASE_URL_ASSETS).concat(src);
        }
        return "![".concat(alt, "](").concat(src, ")");
    });
};
exports.addBaseUrlToImages = addBaseUrlToImages;
var extractFrontMatterAndContent = function (filePath) {
    var md = fs_1.default.readFileSync(filePath, "utf-8");
    var _a = (0, gray_matter_1.default)(md), data = _a.data, content = _a.content;
    var _b = getCoAuthors(data.authors || []), author = _b.author, coAuthors = _b.coAuthors;
    var frontMatter = __assign(__assign({}, data), { cover_image: data.image ? constants_1.BASE_URL_ASSETS + "static/" + data.image : undefined, author: author, coAuthors: coAuthors });
    return { frontMatter: frontMatter, content: content };
};
exports.extractFrontMatterAndContent = extractFrontMatterAndContent;
var getCoAuthors = function (authors) {
    var defaultAuthor = constants_1.authorsMap["tushar"];
    if (authors.length === 0) {
        return { author: defaultAuthor, coAuthors: [] };
    }
    var authorsList = authors.map(function (author) {
        var authorKey = Object.keys(constants_1.authorsMap).find(function (key) { return author.name.toLowerCase().includes(key.toLowerCase()); });
        return authorKey ? constants_1.authorsMap[authorKey] : defaultAuthor;
    });
    var mainAuthor = authorsList[0];
    var coAuthors = authorsList.slice(1).filter(function (a) { return a !== mainAuthor; });
    return { author: mainAuthor, coAuthors: coAuthors };
};
