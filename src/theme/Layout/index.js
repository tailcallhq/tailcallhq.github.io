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
exports.default = Layout;
var react_1 = require("react");
var clsx_1 = require("clsx");
var ErrorBoundary_1 = require("@docusaurus/ErrorBoundary");
var theme_common_1 = require("@docusaurus/theme-common");
var internal_1 = require("@docusaurus/theme-common/internal");
var SkipToContent_1 = require("@theme/SkipToContent");
var AnnouncementBar_1 = require("@theme/AnnouncementBar");
var Navbar_1 = require("@theme/Navbar");
var Footer_1 = require("@theme/Footer");
var Provider_1 = require("@theme/Layout/Provider");
var ErrorPageContent_1 = require("@theme/ErrorPageContent");
var styles_module_css_1 = require("./styles.module.css");
var GlobalLayout_1 = require("@site/src/components/shared/GlobalLayout");
var Announcement_1 = require("@site/src/components/shared/Announcement");
function Layout(props) {
    var children = props.children, noFooter = props.noFooter, wrapperClassName = props.wrapperClassName, 
    // Not really layout-related, but kept for convenience/retro-compatibility
    title = props.title, description = props.description;
    (0, internal_1.useKeyboardNavigation)();
    var targetDate = new Date("2024-11-25T20:00:00-08:00"); // Nov 25, 6:00 PM - 8:00 PM PST
    var currentDate = new Date();
    return (react_1.default.createElement(Provider_1.default, null,
        react_1.default.createElement(GlobalLayout_1.default, null),
        react_1.default.createElement(theme_common_1.PageMetadata, { title: title, description: description }),
        react_1.default.createElement(SkipToContent_1.default, null),
        react_1.default.createElement(AnnouncementBar_1.default, null),
        currentDate < targetDate && (react_1.default.createElement(Announcement_1.default, { text: "🚀 Scaling APIs: Rest, gRPC, or GraphQL? Let’s Break It Down!", refLink: "https://lu.ma/8sqfoc81", refText: "Register here" })),
        react_1.default.createElement(Navbar_1.default, null),
        react_1.default.createElement("div", { id: theme_common_1.SkipToContentFallbackId, className: (0, clsx_1.default)(theme_common_1.ThemeClassNames.wrapper.main, styles_module_css_1.default.mainWrapper, wrapperClassName) },
            react_1.default.createElement(ErrorBoundary_1.default, { fallback: function (params) { return react_1.default.createElement(ErrorPageContent_1.default, __assign({}, params)); } }, children)),
        !noFooter && react_1.default.createElement(Footer_1.default, null)));
}
