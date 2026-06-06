"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialDisplay = void 0;
var react_1 = require("react");
var Heading_1 = require("@theme/Heading");
var CustomerFeedbackCard_1 = require("./CustomerFeedbackCard");
var constants_1 = require("@site/src/constants");
var Section_1 = require("../shared/Section");
var TrustedByMarquee_1 = require("@site/src/components/home/TrustedByMarquee");
var TestimonialDisplay;
(function (TestimonialDisplay) {
    TestimonialDisplay["Hide"] = "Hide";
    TestimonialDisplay["Show"] = "Show";
    TestimonialDisplay["Anon"] = "Anon";
})(TestimonialDisplay || (exports.TestimonialDisplay = TestimonialDisplay = {}));
var config = {
    testimonials: TestimonialDisplay.Anon, // Default value
};
var Testimonials = function () {
    if (config.testimonials === TestimonialDisplay.Hide) {
        return null;
    }
    return (react_1.default.createElement(Section_1.default, { className: "customer-container !bg-tailCall-dark-600 h-full w-full text-tailCall-light-100 !bg-contain md:!bg-center md:!bg-top py-16 md:py-20 lg:pt-48 lg:pb-24" },
        react_1.default.createElement("div", { className: "flex flex-row items-center justify-center" },
            react_1.default.createElement(Heading_1.default, { as: "h5", className: "text-title-large sm:text-display-tiny lg:text-display-medium flex flex-col items-center md:flex-row lg:mb-20" },
                react_1.default.createElement("span", null, "Developers"),
                react_1.default.createElement("span", { className: "bg-tailCall-yellow rounded-lg text-black px-SPACE_01 ml-SPACE_02" }, "love us!"))),
        react_1.default.createElement("div", { className: "flex flex-col space-y-SPACE_10 md:flex-row md:space-x-SPACE_02 md:space-y-0 mt-SPACE_18" }, constants_1.testimonials.map(function (feedback) { return (react_1.default.createElement(CustomerFeedbackCard_1.default, { key: feedback.id, isCenterCard: feedback.id === 2, citation: feedback.citation, designation: feedback.designation, name: feedback === null || feedback === void 0 ? void 0 : feedback.name, department: feedback === null || feedback === void 0 ? void 0 : feedback.department, display: config.testimonials })); })),
        react_1.default.createElement(TrustedByMarquee_1.default, { title: "Trusted by developers at", logos: constants_1.companies })));
};
exports.default = Testimonials;
