"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNavDropdownItemHtml = exports.isBlogPost = exports.isValidURL = exports.validateEmail = exports.getSearchInputRef = exports.setBodyOverflow = exports.sendConversionEvent = exports.analyticsHandler = void 0;
var react_ga4_1 = require("react-ga4");
// Function to handle analytics events
var analyticsHandler = function (category, action, label) {
    // Sending event to Google Analytics
    react_ga4_1.default.event({
        category: category,
        action: action,
        label: label,
    });
};
exports.analyticsHandler = analyticsHandler;
var sendConversionEvent = function (conversionId, eventCallback) {
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "conversion", {
            send_to: conversionId,
            event_callback: eventCallback,
        });
    }
};
exports.sendConversionEvent = sendConversionEvent;
// Function to set overflow on body
var setBodyOverflow = function (value) {
    document.body.style.overflow = value;
};
exports.setBodyOverflow = setBodyOverflow;
// Function to get search element ref
var getSearchInputRef = function () {
    return document.getElementById("search_input_react");
};
exports.getSearchInputRef = getSearchInputRef;
var validateEmail = function (email) {
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};
exports.validateEmail = validateEmail;
var isValidURL = function (url) {
    try {
        new URL(url);
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.isValidURL = isValidURL;
var isBlogPost = function () {
    var url = new URL(location.pathname, window.location.origin);
    var pathSegments = url.pathname.split("/").filter(Boolean);
    // Check if it's a blog post: starts with 'blog', has more segments, and isn't a pagination page
    var isBlogPost = pathSegments[0] === "blog" && pathSegments.length > 1 && pathSegments[1] !== "page";
    return isBlogPost;
};
exports.isBlogPost = isBlogPost;
var getNavDropdownItemHtml = function (iconSrc, altText, label) {
    return "\n    <div class=\"flex items-center p-1\">\n      <img\n        class=\"mr-2\"\n        src=".concat(iconSrc, "\n        alt=").concat(altText, "\n        style=\"width: 16px; height: 16px;\"\n      />\n      <span class=\"text-content-tiny font-bold lg:text-content-small lg:font-medium\">").concat(label, "</span>\n    </div>");
};
exports.getNavDropdownItemHtml = getNavDropdownItemHtml;
