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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BlogLayout;
var react_1 = require("react");
var clsx_1 = require("clsx");
var Layout_1 = require("@theme/Layout");
var BlogRecentPosts_1 = require("../BlogRecentPosts");
var utils_1 = require("@site/src/utils");
var router_1 = require("@docusaurus/router");
function BlogLayout(props) {
    var sidebar = props.sidebar, toc = props.toc, children = props.children, layoutProps = __rest(props, ["sidebar", "toc", "children"]);
    var _a = (0, react_1.useState)(false), isBlogPostPage = _a[0], setIsBlogPostPage = _a[1];
    var location = (0, router_1.useLocation)();
    (0, react_1.useEffect)(function () {
        setIsBlogPostPage((0, utils_1.isBlogPost)());
    }, [location.pathname]);
    return (react_1.default.createElement(Layout_1.default, __assign({}, layoutProps),
        react_1.default.createElement("div", { className: "container mx-auto mt-3 mb-10 md:my-8 px-4 " },
            react_1.default.createElement("div", { className: "flex flex-row" },
                isBlogPostPage && react_1.default.createElement("div", { className: "hidden lg:block lg:w-[20.83%]" }),
                react_1.default.createElement("div", { className: (0, clsx_1.default)("w-full", isBlogPostPage && "lg:w-[58.33%]") }, children),
                toc && (react_1.default.createElement("div", { className: "hidden lg:block lg:w-[20.83%] pl-8 mt-12" },
                    react_1.default.createElement("div", { className: "sticky top-28" },
                        react_1.default.createElement("div", { className: "border-l-solid border-gray-200 pl-4" }, toc)))))),
        react_1.default.createElement(BlogRecentPosts_1.default, { sidebar: sidebar })));
}
