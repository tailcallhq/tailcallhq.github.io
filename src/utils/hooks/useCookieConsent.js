"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCookieConsent = void 0;
var react_cookie_1 = require("react-cookie");
var constants_1 = require("@site/src/constants");
var useCookieConsent = function () {
    var _a = (0, react_cookie_1.useCookies)([constants_1.cookieConstants.USER_CONSENT]), cookies = _a[0], setCookie = _a[1];
    var getCookieConsent = function () {
        return cookies.userConsent;
    };
    var setCookieConsent = function (consentData) {
        setCookie(constants_1.cookieConstants.USER_CONSENT, JSON.stringify(consentData), { maxAge: 366 * 24 * 60 * 60 });
    };
    return {
        getCookieConsent: getCookieConsent,
        setCookieConsent: setCookieConsent,
    };
};
exports.useCookieConsent = useCookieConsent;
