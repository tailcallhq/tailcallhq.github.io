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
exports.default = DropdownNavbarItem;
var react_1 = require("react");
var clsx_1 = require("clsx");
var theme_common_1 = require("@docusaurus/theme-common");
var internal_1 = require("@docusaurus/theme-common/internal");
var NavbarNavLink_1 = require("@theme/NavbarItem/NavbarNavLink");
var NavbarItem_1 = require("@theme/NavbarItem");
var styles_module_css_1 = require("./styles.module.css");
function isItemActive(item, localPathname) {
    if ((0, internal_1.isSamePath)(item.to, localPathname)) {
        return true;
    }
    if ((0, theme_common_1.isRegexpStringMatch)(item.activeBaseRegex, localPathname)) {
        return true;
    }
    if (item.activeBasePath && localPathname.startsWith(item.activeBasePath)) {
        return true;
    }
    return false;
}
function containsActiveItems(items, localPathname) {
    return items.some(function (item) { return isItemActive(item, localPathname); });
}
function DropdownNavbarItemDesktop(_a) {
    var _b;
    var items = _a.items, position = _a.position, className = _a.className, onClick = _a.onClick, props = __rest(_a, ["items", "position", "className", "onClick"]);
    var localPathname = (0, internal_1.useLocalPathname)();
    var containsActive = containsActiveItems(items, localPathname);
    var dropdownRef = (0, react_1.useRef)(null);
    var _c = (0, react_1.useState)(false), showDropdown = _c[0], setShowDropdown = _c[1];
    (0, react_1.useEffect)(function () {
        var handleClickOutside = function (event) {
            if (!dropdownRef.current || dropdownRef.current.contains(event.target)) {
                return;
            }
            setShowDropdown(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
        document.addEventListener("focusin", handleClickOutside);
        return function () {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
            document.removeEventListener("focusin", handleClickOutside);
        };
    }, [dropdownRef]);
    return (react_1.default.createElement("div", { ref: dropdownRef, className: (0, clsx_1.default)("navbar__item", "dropdown", "dropdown--hoverable", {
            "dropdown--right": position === "right",
            "dropdown--show": showDropdown,
            "navbar__link--active": containsActive,
        }) },
        react_1.default.createElement(NavbarNavLink_1.default, __assign({ "aria-haspopup": "true", "aria-expanded": showDropdown, role: "button", 
            // # hash permits to make the <a> tag focusable in case no link target
            // See https://github.com/facebook/docusaurus/pull/6003
            // There's probably a better solution though...
            href: props.to ? undefined : "#", className: (0, clsx_1.default)("navbar__link", className) }, props, { onClick: props.to ? undefined : function (e) { return e.preventDefault(); }, onKeyDown: function (e) {
                if (e.key === "Enter") {
                    e.preventDefault();
                    setShowDropdown(!showDropdown);
                }
            } }), (_b = props.children) !== null && _b !== void 0 ? _b : props.label),
        react_1.default.createElement("ul", { className: "dropdown__menu" }, items.map(function (childItemProps, i) { return (react_1.default.createElement(NavbarItem_1.default, __assign({ isDropdownItem: true, activeClassName: "dropdown__link--active" }, childItemProps, { key: i }))); }))));
}
function DropdownNavbarItemMobile(_a) {
    var _b;
    var items = _a.items, className = _a.className, position = _a.position, // Need to destructure position from props so that it doesn't get passed on.
    onClick = _a.onClick, props = __rest(_a, ["items", "className", "position", "onClick"]);
    var localPathname = (0, internal_1.useLocalPathname)();
    var containsActive = containsActiveItems(items, localPathname);
    var _c = (0, theme_common_1.useCollapsible)({
        initialState: function () { return !containsActive; },
    }), collapsed = _c.collapsed, toggleCollapsed = _c.toggleCollapsed, setCollapsed = _c.setCollapsed;
    // Expand/collapse if any item active after a navigation
    (0, react_1.useEffect)(function () {
        if (containsActive) {
            setCollapsed(!containsActive);
        }
    }, [localPathname, containsActive, setCollapsed]);
    return (react_1.default.createElement("li", { className: (0, clsx_1.default)("menu__list-item", {
            "menu__list-item--collapsed": collapsed,
        }) },
        react_1.default.createElement(NavbarNavLink_1.default, __assign({ role: "button", className: (0, clsx_1.default)(styles_module_css_1.default.dropdownNavbarItemMobile, "menu__link menu__link--sublist menu__link--sublist-caret", className) }, props, { onClick: function (e) {
                e.preventDefault();
                toggleCollapsed();
            } }), (_b = props.children) !== null && _b !== void 0 ? _b : props.label),
        react_1.default.createElement(theme_common_1.Collapsible, { lazy: true, as: "ul", className: "menu__list", collapsed: collapsed }, items.map(function (childItemProps, i) { return (react_1.default.createElement(NavbarItem_1.default, __assign({ mobile: true, isDropdownItem: true, onClick: onClick, activeClassName: "menu__link--active" }, childItemProps, { key: i }))); }))));
}
function DropdownNavbarItem(_a) {
    var _b = _a.mobile, mobile = _b === void 0 ? false : _b, props = __rest(_a, ["mobile"]);
    var Comp = mobile ? DropdownNavbarItemMobile : DropdownNavbarItemDesktop;
    return react_1.default.createElement(Comp, __assign({}, props));
}
