"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var theme_common_1 = require("@docusaurus/theme-common");
var internal_1 = require("@docusaurus/theme-common/internal");
var client_1 = require("@docusaurus/plugin-content-docs/client");
var GithubStarsProvider_1 = require("@site/src/components/shared/GithubStarsProvider");
var Footer_1 = require("@site/src/components/shared/Footer");
var WrappedCookiesProvider_1 = require("@site/src/components/shared/WrappedCookiesProvider");
var CookieConsentProvider_1 = require("@site/src/components/shared/CookieConsentProvider");
// Compose the providers to create a single Provider component
var Provider = (0, theme_common_1.composeProviders)([
    internal_1.ColorModeProvider,
    WrappedCookiesProvider_1.default,
    CookieConsentProvider_1.CookieConsentProvider,
    internal_1.AnnouncementBarProvider,
    internal_1.ScrollControllerProvider,
    client_1.DocsPreferredVersionContextProvider,
    internal_1.PluginHtmlClassNameProvider,
    internal_1.NavbarProvider,
    GithubStarsProvider_1.default,
]);
// LayoutProvider component wraps the composed providers around its children
var LayoutProvider = function (_a) {
    var children = _a.children;
    return (react_1.default.createElement(Provider, null,
        children,
        react_1.default.createElement(Footer_1.default, null)));
};
exports.default = LayoutProvider;
