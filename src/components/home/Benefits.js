"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Heading_1 = require("@theme/Heading");
var SectionTitle_1 = require("../shared/SectionTitle");
var Partners_1 = require("./Partners");
var BenefitsCard_1 = require("./BenefitsCard");
var Section_1 = require("../shared/Section");
var Benefits = function () {
    return (react_1.default.createElement("div", { className: "bg-[#1C1D1F] grid-background pb-20 lg:pb-40" },
        react_1.default.createElement(Section_1.default, { className: "!pb-0 lg:pt-24" },
            react_1.default.createElement("div", null,
                react_1.default.createElement(SectionTitle_1.default, { title: "Benefits" }),
                react_1.default.createElement("div", { className: "h-fit sm:flex-row sm:items-center sm:space-x-SPACE_10 lg:space-x-SPACE_20" },
                    react_1.default.createElement(Heading_1.default, { as: "h3", className: "text-title-large sm:text-display-tiny lg:text-display-small text-white md:w-[65%]" }, "Tailcall gives you a best-practice GraphQL backend that checks all the boxes."))),
            react_1.default.createElement(BenefitsCard_1.default, null)),
        react_1.default.createElement(Partners_1.default, null)));
};
exports.default = Benefits;
