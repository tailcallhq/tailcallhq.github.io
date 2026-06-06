"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var CustomerFeedbackCard = function (_a) {
    var classNames = _a.classNames, citation = _a.citation, designation = _a.designation, name = _a.name, department = _a.department, isCenterCard = _a.isCenterCard, display = _a.display;
    return (react_1.default.createElement("div", { className: "customer-feedback-card md:w-[33%] flex flex-col items-center justify-between bg-tailCall-dark-600 tailcall-light-100 text-white py-SPACE_06 px-SPACE_06 text-center text-content-small gap-y-SPACE_06 pb-10 ".concat(classNames, " ").concat(isCenterCard && "md:!relative md:-top-10") },
        department && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("span", { className: "sm:text-content-medium lg:text-content-large !font-bold !text-title-large" }, "Loved by ",
                react_1.default.createElement("span", { className: isCenterCard ? "text-tailCall-yellow" : "" }, department)))),
        react_1.default.createElement("span", { className: "text-content-small sm:text-content-medium" }, "\u201C".concat(citation, "\u201D")),
        react_1.default.createElement("span", { className: "flex flex-col" }, display === "Show" && name && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("span", { className: "text-content-tiny sm:text-content-small" }, designation),
            react_1.default.createElement("span", { className: "text-content-small sm:text-content-medium lg:text-content-large !font-bold" }, name))))));
};
exports.default = CustomerFeedbackCard;
