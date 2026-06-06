"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var styles_module_css_1 = require("./styles.module.css");
var clsx_1 = require("clsx");
var constants_1 = require("@site/src/constants");
var Link_1 = require("@docusaurus/Link");
var routes_1 = require("@site/src/constants/routes");
var CookieConsentModal = function (_a) {
    var open = _a.open, onAccept = _a.onAccept, onDeny = _a.onDeny, onPartialAccept = _a.onPartialAccept, onClose = _a.onClose;
    var _b = (0, react_1.useState)(false), showPreferences = _b[0], setShowPreferences = _b[1];
    var consentOptions = __spreadArray(__spreadArray([
        {
            text: "Accept All",
            onClick: onAccept,
        }
    ], [
        showPreferences
            ? {
                text: "Accept Selected",
                onClick: function () {
                    onPartialAccept(selectedPreferencesNames);
                },
            }
            : {
                text: "Manage Settings",
                onClick: function () { return setShowPreferences(true); },
            },
    ], false), [
        {
            text: "Deny",
            onClick: onDeny,
        },
    ], false);
    var initialPreferences = [
        { name: constants_1.CookiePreferenceCategory.NECESSARY, selected: true, readonly: true },
        { name: constants_1.CookiePreferenceCategory.PREFERENCE, selected: false },
        { name: constants_1.CookiePreferenceCategory.MARKETING, selected: false },
        { name: constants_1.CookiePreferenceCategory.ANALYTICS, selected: false },
    ];
    var _c = (0, react_1.useState)(initialPreferences), preferences = _c[0], setPreferences = _c[1];
    var selectedPreferencesNames = (0, react_1.useMemo)(function () {
        return preferences.reduce(function (acc, preference) {
            if (preference.selected)
                acc.push(preference.name);
            return acc;
        }, []);
    }, [preferences]);
    var handlePreferenceToggle = function (index) {
        if (preferences[index].readonly)
            return;
        var updatedPreferences = __spreadArray([], preferences, true);
        updatedPreferences[index].selected = !updatedPreferences[index].selected;
        setPreferences(updatedPreferences);
    };
    var handleClose = function () {
        setShowPreferences(false);
        setPreferences(initialPreferences);
        if (onClose)
            onClose();
    };
    return (react_1.default.createElement(react_1.default.Fragment, null, open ? (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: (0, clsx_1.default)("flex flex-col xl:flex-row xl:justify-between relative py-6 px-8 gap-4 sm:gap-12 xl:gap-0 font-space-mono bg-black rounded-xl", styles_module_css_1.default.cookieConsentModal) },
            react_1.default.createElement("div", { className: "flex flex-col gap-4 text-tailCall-light-300" },
                react_1.default.createElement("div", { className: "flex flex-col gap-2" },
                    react_1.default.createElement("span", { className: "text-content-small font-bold xl:text-title-small" }, "We Value Your Privacy"),
                    react_1.default.createElement("span", { className: "text-content-tiny xl:text-content-small" },
                        "This website uses cookies to ensure you receive the best possible experience.",
                        " ",
                        react_1.default.createElement(Link_1.default, { href: routes_1.pageLinks.privacyPolicy, className: "text-tailCall-light-300 hover:text-tailCall-light-300 underline" }, "Learn More"))),
                showPreferences && (react_1.default.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 sm:w-6/12 xl:w-full gap-6 xl:gap-8" }, preferences.map(function (preference, index) {
                    return (react_1.default.createElement("span", { key: index, className: (0, clsx_1.default)("flex cursor-pointer text-content-tiny xl:text-content-small gap-2", preference.selected ? "text-tailCall-light-600" : ""), onClick: function () { return handlePreferenceToggle(index); } },
                        react_1.default.createElement("span", { className: "whitespace-pre" }, "".concat(preference.selected ? "[ X ]" : "[   ]")),
                        react_1.default.createElement("span", null, preference.name)));
                })))),
            react_1.default.createElement("div", { className: "flex items-end" },
                react_1.default.createElement("div", { className: (0, clsx_1.default)("flex flex-col sm:flex-row flex-1 gap-6 h-fit sm:justify-end", styles_module_css_1.default.consentOptionsContainer) }, consentOptions.map(function (btn, index) {
                    return (react_1.default.createElement("span", { key: index, className: (0, clsx_1.default)("sm:whitespace-nowrap py-1 px-3 text-title-tiny bg-tailCall-dark-400 border border-solid border-tailCall-dark-300 cursor-pointer text-center", styles_module_css_1.default.consentOption), onClick: btn.onClick }, btn.text));
                }))),
            react_1.default.createElement("img", { className: (0, clsx_1.default)("absolute cursor-pointer", styles_module_css_1.default.closeBtn), src: require("@site/static/images/cookie-consent/close-btn.png").default, height: 16, width: 25, onClick: handleClose })))) : null));
};
exports.default = CookieConsentModal;
