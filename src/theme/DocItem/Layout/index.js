"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DocItemLayout;
var react_1 = require("react");
var clsx_1 = require("clsx");
var theme_common_1 = require("@docusaurus/theme-common");
var client_1 = require("@docusaurus/plugin-content-docs/client");
var Paginator_1 = require("@theme/DocItem/Paginator");
var DocVersionBanner_1 = require("@theme/DocVersionBanner");
var DocVersionBadge_1 = require("@theme/DocVersionBadge");
var Footer_1 = require("@theme/DocItem/Footer");
var Mobile_1 = require("@theme/DocItem/TOC/Mobile");
var Desktop_1 = require("@theme/DocItem/TOC/Desktop");
var Content_1 = require("@theme/DocItem/Content");
var DocBreadcrumbs_1 = require("@theme/DocBreadcrumbs");
var styles_module_css_1 = require("./styles.module.css");
var react_2 = require("@giscus/react");
function useDocTOC() {
    var _a = (0, client_1.useDoc)(), frontMatter = _a.frontMatter, toc = _a.toc;
    var windowSize = (0, theme_common_1.useWindowSize)();
    var hidden = frontMatter.hide_table_of_contents;
    var canRender = !hidden && toc.length > 0;
    var mobile = canRender ? react_1.default.createElement(Mobile_1.default, null) : undefined;
    var desktop = canRender && (windowSize === "desktop" || windowSize === "ssr") ? react_1.default.createElement(Desktop_1.default, null) : undefined;
    return {
        hidden: hidden,
        mobile: mobile,
        desktop: desktop,
    };
}
function DocItemLayout(_a) {
    var children = _a.children;
    var docTOC = useDocTOC();
    var giscus = (react_1.default.createElement("div", { className: "min-h-[450px]" },
        react_1.default.createElement("hr", null),
        react_1.default.createElement("br", null),
        react_1.default.createElement(react_2.default, { id: "comments", repo: "tailcallhq/tailcallhq.github.io", repoId: "R_kgDOH8lUfQ", category: "General", categoryId: "DIC_kwDOH8lUfc4Ceff2", mapping: "pathname", reactionsEnabled: "1", emitMetadata: "1", inputPosition: "top", theme: "https://tailcall.run/css/giscus-theme.css", lang: "en", strict: "0", loading: "lazy" })));
    return (react_1.default.createElement("div", { className: "row" },
        react_1.default.createElement("div", { className: (0, clsx_1.default)("col", !docTOC.hidden && styles_module_css_1.default.docItemCol) },
            react_1.default.createElement(DocVersionBanner_1.default, null),
            react_1.default.createElement("div", { className: styles_module_css_1.default.docItemContainer },
                react_1.default.createElement("article", null,
                    react_1.default.createElement(DocBreadcrumbs_1.default, null),
                    react_1.default.createElement(DocVersionBadge_1.default, null),
                    docTOC.mobile,
                    react_1.default.createElement(Content_1.default, null, children),
                    react_1.default.createElement(Footer_1.default, null)),
                react_1.default.createElement(Paginator_1.default, null),
                giscus)),
        docTOC.desktop && react_1.default.createElement("div", { className: "col col--3" }, docTOC.desktop)));
}
