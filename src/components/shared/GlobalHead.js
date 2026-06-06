"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Head_1 = require("@docusaurus/Head");
var constants_1 = require("@site/src/constants");
var GlobalHead = function (_a) {
    var _b = _a.isCookieConsentAccepted, isCookieConsentAccepted = _b === void 0 ? false : _b, preferences = _a.preferences;
    var injectAnalyticsScripts = function () {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("script", { async: true, src: "https://www.googletagmanager.com/gtag/js?id=G-JEP3QDWT0G" }),
            react_1.default.createElement("script", null, constants_1.gtagScriptContent),
            react_1.default.createElement("script", { async: true, src: "https://tag.clearbitscripts.com/v1/pk_498a76355e253f5c7f4e7c7bed78748e/tags.js", referrerPolicy: "strict-origin-when-cross-origin" }),
            react_1.default.createElement("script", { type: "text/javascript" }, constants_1.reb2bScriptContent)));
    };
    var injectScripts = function (preferences) {
        var activeScripts = [];
        var preferenceMapping = {
            Analytics: injectAnalyticsScripts,
        };
        if (!preferences) {
            Object.values(preferenceMapping).forEach(function (injectFunction, index) {
                return activeScripts.push(react_1.default.createElement(react_1.default.Fragment, { key: index }, injectFunction()));
            });
        }
        else {
            preferences.forEach(function (preference) {
                var injectFunction = preferenceMapping[preference];
                if (injectFunction)
                    activeScripts.push(injectFunction());
            });
        }
        return activeScripts;
    };
    return react_1.default.createElement(Head_1.default, null, isCookieConsentAccepted && injectScripts(preferences));
};
exports.default = GlobalHead;
