"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCookieConsentManager = exports.CookieConsentProvider = void 0;
var react_1 = require("react");
var useCookieConsent_1 = require("@site/src/utils/hooks/useCookieConsent");
var CookieConsentContext = (0, react_1.createContext)(null);
var useCookieConsentContextValue = function () {
    var _a = (0, useCookieConsent_1.useCookieConsent)(), getCookieConsent = _a.getCookieConsent, setCookieConsent = _a.setCookieConsent;
    var _b = (0, react_1.useState)(false), isCookieConsentModalVisible = _b[0], setIsCookieConsentModalVisible = _b[1];
    var cookieConsent = getCookieConsent();
    var openCookieConsentModal = (0, react_1.useCallback)(function () {
        setIsCookieConsentModalVisible(true);
    }, []);
    var closeCookieConsentModal = (0, react_1.useCallback)(function () {
        setIsCookieConsentModalVisible(false);
    }, []);
    var handleConsentChange = (0, react_1.useCallback)(function (consentData) {
        var isConsentAlreadyAvailable = cookieConsent;
        setCookieConsent(consentData);
        closeCookieConsentModal();
        if (isConsentAlreadyAvailable) {
            window.location.reload();
        }
    }, [cookieConsent, setCookieConsent, closeCookieConsentModal]);
    var onAccept = (0, react_1.useCallback)(function () {
        var consentData = { accepted: true };
        handleConsentChange(consentData);
    }, [setCookieConsent]);
    var onDeny = (0, react_1.useCallback)(function () {
        var consentData = { accepted: false };
        handleConsentChange(consentData);
    }, [setCookieConsent]);
    var onPartialAccept = (0, react_1.useCallback)(function (selectedPreferences) {
        var consentData = {
            accepted: true,
            preferences: selectedPreferences,
        };
        handleConsentChange(consentData);
    }, [setCookieConsent]);
    return {
        cookieConsent: cookieConsent,
        isCookieConsentModalVisible: isCookieConsentModalVisible,
        openCookieConsentModal: openCookieConsentModal,
        closeCookieConsentModal: closeCookieConsentModal,
        onAccept: onAccept,
        onDeny: onDeny,
        onPartialAccept: onPartialAccept,
    };
};
var CookieConsentProvider = function (_a) {
    var children = _a.children;
    var value = useCookieConsentContextValue();
    return react_1.default.createElement(CookieConsentContext.Provider, { value: value }, children);
};
exports.CookieConsentProvider = CookieConsentProvider;
var useCookieConsentManager = function () {
    var context = (0, react_1.useContext)(CookieConsentContext);
    if (!context) {
        throw new Error("useCookieConsentManager must be used within a CookieConsentProvider");
    }
    return context;
};
exports.useCookieConsentManager = useCookieConsentManager;
