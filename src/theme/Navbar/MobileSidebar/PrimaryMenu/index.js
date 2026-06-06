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
var react_1 = require("react");
var theme_common_1 = require("@docusaurus/theme-common");
var internal_1 = require("@docusaurus/theme-common/internal");
var NavbarItem_1 = require("@theme/NavbarItem");
var useNavbarItems = function () {
    // TODO temporary casting until ThemeConfig type is improved (added by docusaurus)
    return (0, theme_common_1.useThemeConfig)().navbar.items;
};
// The primary menu displays the navbar items
var NavbarMobilePrimaryMenu = function () {
    var mobileSidebar = (0, internal_1.useNavbarMobileSidebar)();
    // TODO how can the order be defined for mobile? (added by docusaurus)
    // Should we allow providing a different list of items?
    var items = useNavbarItems();
    return (react_1.default.createElement("ul", { className: "menu__list" }, items.map(function (item, i) { return (react_1.default.createElement(NavbarItem_1.default, __assign({ mobile: true }, item, { onClick: function () { return mobileSidebar.toggle(); }, key: i }))); })));
};
exports.default = NavbarMobilePrimaryMenu;
