"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_cookie_1 = require("react-cookie");
var WrappedCookiesProvider = function (_a) {
    var children = _a.children;
    return react_1.default.createElement(react_cookie_1.CookiesProvider, null, children);
};
exports.default = WrappedCookiesProvider;
