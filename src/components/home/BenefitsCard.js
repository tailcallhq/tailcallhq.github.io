"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var constants_1 = require("@site/src/constants");
var lucide_react_1 = require("lucide-react");
var Link_1 = require("@docusaurus/Link");
var clsx_1 = require("clsx");
var BenefitsCard = function () {
    return (react_1.default.createElement("div", { className: "mt-16 mb-10 lg:my-24" },
        react_1.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-10 w-full" }, constants_1.benefits.map(function (item, index) { return (react_1.default.createElement(Link_1.default, { className: (0, clsx_1.default)("group border-2 border-solid border-tailCall-border-dark-300 rounded-3xl p-6 flex flex-col md:flex-row items-start hover:border-[#FDEA2E] cursor-pointer hover:no-underline benefits-drop-shadow", constants_1.benefits.length % 2 !== 0 &&
                index === constants_1.benefits.length - 1 &&
                "md:col-span-2 md:max-w-[calc(50%-20px)] md:mx-auto"), key: item.id, href: item.redirection_url },
            react_1.default.createElement("div", { className: "flex-shrink-0 mb-4 md:mb-0 md:mr-6" },
                react_1.default.createElement("img", { src: item.image, alt: "Image Describing Why Tailcall", className: "w-16 h-16 object-contain" })),
            react_1.default.createElement("div", { className: "flex-grow" },
                react_1.default.createElement("p", { className: "text-title-small sm:text-title-large text-white mb-2 flex items-center justify-between" },
                    item.title,
                    react_1.default.createElement("span", { className: "text-gray-400 group-hover:text-white" },
                        react_1.default.createElement(lucide_react_1.ArrowRight, { size: 20 }))),
                react_1.default.createElement("p", { className: "text-content-tiny sm:text-content-small text-tailCall-light-600" }, item.description)))); }))));
};
exports.default = BenefitsCard;
