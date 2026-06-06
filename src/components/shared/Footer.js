"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Link_1 = require("@docusaurus/Link");
var constants_1 = require("@site/src/constants");
var tailcall_white_svg_1 = require("@site/static/icons/companies/tailcall-white.svg");
var CookieConsentProvider_1 = require("./CookieConsentProvider");
var Footer = function () {
    var openCookieConsentModal = (0, CookieConsentProvider_1.useCookieConsentManager)().openCookieConsentModal;
    var year = new Date().getFullYear();
    return (react_1.default.createElement("footer", { className: "flex flex-col relative w-full relative px-4 py-8 lg:px-40 lg:pt-20 lg:pb-0 bg-tailCall-dark-700 grid-dark gap-4 lg:gap-8" },
        react_1.default.createElement("div", { className: "grid grid-cols-2 gap-8 lg:flex lg:gap-32 xl:gap-64 w-full z-10" },
            react_1.default.createElement(tailcall_white_svg_1.default, { className: "w-[120px] h-10 col-span-2" }),
            constants_1.footerItems.map(function (category, idx) {
                return (react_1.default.createElement("div", { className: "flex flex-col gap-4 lg:gap-6", key: idx },
                    react_1.default.createElement("span", { className: "text-content-small font-bold lg:text-title-small text-white leading-[20px] lg:leading-[26px]" }, category.title),
                    category.items.map(function (footerItem, index) {
                        return (react_1.default.createElement(Link_1.default, { key: index, href: footerItem.link, className: "text-content-small lg:text-content-medium text-tailCall-light-500 hover:text-tailCall-light-300 hover:no-underline leading-[20px] lg:leading-[26px]" }, footerItem.name));
                    })));
            })),
        react_1.default.createElement("div", { className: "flex flex-col lg:flex-row items-center lg:justify-between w-[100%] lg:w-full z-10 py-2 lg:py-6 gap-2 lg:gap-0" },
            react_1.default.createElement("p", { className: "text-content-mini lg:text-content-tiny text-tailCall-light-700 font-space-mono font-normal cursor-pointer mb-0", onClick: openCookieConsentModal }, "Cookie Settings"),
            react_1.default.createElement("p", { className: "text-content-mini lg:text-content-tiny text-tailCall-light-700 font-space-mono font-normal mb-0" },
                "Copyright \u00A9 ",
                year,
                " Tailcall, Inc."),
            react_1.default.createElement("div", { className: "space-x-SPACE_04" }, constants_1.socials.map(function (social) { return (react_1.default.createElement(Link_1.default, { href: social.href, className: "cursor-pointer", key: social.id },
                react_1.default.createElement(social.image, { className: "h-6 w-6" }))); })))));
};
exports.default = Footer;
