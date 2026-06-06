"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var routes_1 = require("@site/src/constants/routes");
var CookieConsentModal_1 = require("./CookieConsentModal/CookieConsentModal");
var GlobalHead_1 = require("./GlobalHead");
var CookieConsentProvider_1 = require("./CookieConsentProvider");
var GlobalLayout = function () {
    var _a = (0, CookieConsentProvider_1.useCookieConsentManager)(), isCookieConsentModalVisible = _a.isCookieConsentModalVisible, openCookieConsentModal = _a.openCookieConsentModal, closeCookieConsentModal = _a.closeCookieConsentModal, onAccept = _a.onAccept, onDeny = _a.onDeny, onPartialAccept = _a.onPartialAccept, cookieConsent = _a.cookieConsent;
    (0, react_1.useEffect)(function () {
        if (typeof window !== "undefined" && window.location.pathname.includes(routes_1.pageLinks.privacyPolicy))
            return;
        if (!cookieConsent) {
            openCookieConsentModal();
        }
    }, [cookieConsent]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(CookieConsentModal_1.default, { open: isCookieConsentModalVisible, onClose: closeCookieConsentModal, onAccept: onAccept, onDeny: onDeny, onPartialAccept: onPartialAccept }),
        react_1.default.createElement(GlobalHead_1.default, { isCookieConsentAccepted: Boolean(cookieConsent === null || cookieConsent === void 0 ? void 0 : cookieConsent.accepted), preferences: cookieConsent === null || cookieConsent === void 0 ? void 0 : cookieConsent.preferences })));
};
exports.default = GlobalLayout;
