"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BlogPostItemHeaderInfo;
var react_1 = require("react");
var clsx_1 = require("clsx");
var Translate_1 = require("@docusaurus/Translate");
var theme_common_1 = require("@docusaurus/theme-common");
var internal_1 = require("@docusaurus/theme-common/internal");
var client_1 = require("@docusaurus/plugin-content-blog/client");
var styles_module_css_1 = require("./styles.module.css");
var Link_1 = require("@docusaurus/Link");
// Very simple pluralization: probably good enough for now
function useReadingTimePlural() {
    var selectMessage = (0, theme_common_1.usePluralForm)().selectMessage;
    return function (readingTimeFloat) {
        var readingTime = Math.ceil(readingTimeFloat);
        return selectMessage(readingTime, (0, Translate_1.translate)({
            id: "theme.blog.post.readingTime.plurals",
            description: 'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
            message: "One min read|{readingTime} min read",
        }, { readingTime: readingTime }));
    };
}
function ReadingTime(_a) {
    var readingTime = _a.readingTime;
    var readingTimePlural = useReadingTimePlural();
    return react_1.default.createElement(react_1.default.Fragment, null, readingTimePlural(readingTime));
}
function DateTime(_a) {
    var date = _a.date, formattedDate = _a.formattedDate;
    return react_1.default.createElement("time", { dateTime: date }, formattedDate);
}
function Spacer() {
    return react_1.default.createElement(react_1.default.Fragment, null, " · ");
}
function BlogPostItemHeaderInfo(_a) {
    var className = _a.className;
    var metadata = (0, client_1.useBlogPost)().metadata;
    var date = metadata.date, readingTime = metadata.readingTime, tags = metadata.tags;
    var tagsExists = tags.length > 0;
    var dateTimeFormat = (0, internal_1.useDateTimeFormat)({
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    });
    var formatDate = function (blogDate) { return dateTimeFormat.format(new Date(blogDate)); };
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)(styles_module_css_1.default.container, "margin-vert--md", className) },
        react_1.default.createElement(DateTime, { date: date, formattedDate: formatDate(date) }),
        typeof readingTime !== "undefined" && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Spacer, null),
            react_1.default.createElement(ReadingTime, { readingTime: readingTime }))),
        tagsExists && (react_1.default.createElement("div", { className: "w-full flex flex-wrap gap-2 mt-4" }, tags.map(function (tag) {
            return (react_1.default.createElement(Link_1.default, { to: tag.permalink, className: "bg-tailCall-light-200 !no-underline text-tailCall-dark-100 px-3 py-2 rounded-full cursor-pointer" }, tag.label));
        })))));
}
