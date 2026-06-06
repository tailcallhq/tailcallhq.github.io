"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Banner_1 = require("./Banner");
var Graph_1 = require("./Graph");
var Benefits_1 = require("./Benefits");
var Discover_1 = require("../shared/Discover");
var Configuration_1 = require("./Configuration");
var Testimonials_1 = require("./Testimonials");
var IntroductionVideo_1 = require("./IntroductionVideo");
var HomePage = function () {
    return (react_1.default.createElement("div", { className: "" },
        react_1.default.createElement(Banner_1.default, null),
        react_1.default.createElement(Configuration_1.default, null),
        react_1.default.createElement(IntroductionVideo_1.default, null),
        react_1.default.createElement(Testimonials_1.default, null),
        react_1.default.createElement(Benefits_1.default, null),
        react_1.default.createElement(Graph_1.default, null),
        react_1.default.createElement(Discover_1.default, null)));
};
exports.default = HomePage;
