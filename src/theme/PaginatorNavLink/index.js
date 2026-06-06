"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PaginatorNavLink;
var react_1 = require("react");
var Link_1 = require("@docusaurus/Link");
var lucide_react_1 = require("lucide-react");
var lucide_react_2 = require("lucide-react");
function NavigatorIcon(_a) {
    var isNext = _a.isNext;
    return (react_1.default.createElement("div", { className: "w-10 h-10 p-2 bg-tailCall-yellow flex justify-center items-center rounded-full" }, isNext ? react_1.default.createElement(lucide_react_1.ArrowRight, { size: 24, color: "black" }) : react_1.default.createElement(lucide_react_2.ArrowLeft, { size: 24, color: "black" })));
}
function PaginatorNavLink(props) {
    var permalink = props.permalink, title = props.title, subLabel = props.subLabel, isNext = props.isNext;
    return (react_1.default.createElement(Link_1.default, { className: "!no-underline flex gap-3 items-center", to: permalink },
        !isNext && react_1.default.createElement(NavigatorIcon, { isNext: isNext }),
        react_1.default.createElement("div", { className: "hidden md:block" },
            subLabel && react_1.default.createElement("div", { className: "text-tailCall-dark-100 text-[12px] font-medium" }, subLabel),
            react_1.default.createElement("div", { className: "pagination-nav__label text-black text-content-small font-medium" }, title)),
        isNext && react_1.default.createElement(NavigatorIcon, { isNext: isNext })));
}
