"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_fast_marquee_1 = require("react-fast-marquee");
var gt_undescore_gray_svg_1 = require("@site/static/icons/basic/gt-undescore-gray.svg");
var TrustedByMarquee = function (_a) {
    var _b = _a.title, title = _b === void 0 ? "Deploy Anywhere" : _b, logos = _a.logos, onClick = _a.onClick, _c = _a.titleClassName, titleClassName = _c === void 0 ? "text-content-small font-bold sm:text-title-tiny lg:text-title-small text-tailCall-light-500 text-center space-x-1" : _c, _d = _a.desktopClassName, desktopClassName = _d === void 0 ? "hidden sm:flex space-x-SPACE_16 px-8 mt-SPACE_10 overflow-hidden" : _d, _e = _a.mobileClassName, mobileClassName = _e === void 0 ? "sm:hidden flex items-center justify-around flex-wrap mt-SPACE_06 space-y-SPACE_02" : _e;
    var handleClick = function () {
        if (onClick) {
            onClick();
        }
    };
    var renderLogo = function (partner) { return (react_1.default.createElement("div", { key: partner.name, className: "h-20" }, partner.link ? (react_1.default.createElement("a", { href: partner.link, target: "_blank", rel: "noopener noreferrer" },
        react_1.default.createElement("img", { src: partner.logo, alt: partner.name, className: "max-w-[152px]" }))) : (react_1.default.createElement("img", { src: partner.logo, alt: partner.name, className: "max-w-[152px]" })))); };
    return (react_1.default.createElement("section", { className: "px-10 md:px-0 ".concat(onClick ? "cursor-pointer" : ""), onClick: handleClick },
        react_1.default.createElement("div", { className: titleClassName },
            react_1.default.createElement(gt_undescore_gray_svg_1.default, { className: "h-4 w-6" }),
            react_1.default.createElement("span", null, title)),
        react_1.default.createElement(react_fast_marquee_1.default, { autoFill: true },
            react_1.default.createElement("div", { className: desktopClassName }, logos.map(renderLogo))),
        react_1.default.createElement("div", { className: mobileClassName }, logos.map(renderLogo))));
};
exports.default = TrustedByMarquee;
