"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var SectionTitle_1 = require("../shared/SectionTitle");
var SocialBuzz = function () {
    return (react_1.default.createElement("section", { className: "py-SPACE_16 sm:py-24 relative flex items-center justify-center mx-SPACE_04 sm:mx-SPACE_10 lg:mx-SPACE_12 lg:space-x-SPACE_10 max-w-8xl" },
        react_1.default.createElement("div", { className: "flex flex-col gap-SPACE_06 lg:gap-y-44" },
            react_1.default.createElement("div", { className: "ml-SPACE_04 lg:ml-32" },
                react_1.default.createElement(SectionTitle_1.default, { title: "About Us" }),
                react_1.default.createElement("span", { className: "text-title-semi-large sm:text-display-small" }, "Social & Buzz")),
            react_1.default.createElement("img", { src: require("@site/static/images/about/tweet-2.jpg").default, srcSet: "".concat(require("@site/static/images/about/tweet-2.jpg").default, " 1x,\n          ").concat(require("@site/static/images/about/tweet-2-2x.jpg").default, " 2x\n          "), alt: "tweet 2", className: "rounded-3xl m-SPACE_02 lg:hidden border border-solid border-tailCall-border-light-500" }),
            react_1.default.createElement("img", { src: require("@site/static/images/about/tweet-1.jpg").default, srcSet: "".concat(require("@site/static/images/about/tweet-1.jpg").default, " 1x,\n          ").concat(require("@site/static/images/about/tweet-1-2x.jpg").default, " 2x\n          "), alt: "Devs love tailcall", className: "border border-solid border-tailCall-border-light-500 rounded-3xl m-SPACE_02" })),
        react_1.default.createElement("img", { src: require("@site/static/images/about/tweet-2.jpg").default, srcSet: "".concat(require("@site/static/images/about/tweet-2.jpg").default, " 1x,\n          ").concat(require("@site/static/images/about/tweet-2-2x.jpg").default, " 2x\n          "), alt: "tweet 2", className: "border border-solid border-tailCall-border-light-500 rounded-3xl m-SPACE_02 lg:block hidden" })));
};
exports.default = SocialBuzz;
