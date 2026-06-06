"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Hero_1 = require("./Hero");
var WhoWeAre_1 = require("./WhoWeAre");
var Founders_1 = require("./Founders");
// import Investors from "./Investors"
var SocialBuzz_1 = require("./SocialBuzz");
var Discover_1 = require("../shared/Discover");
var AboutPage = function () {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Hero_1.default, null),
        react_1.default.createElement(WhoWeAre_1.default, null),
        react_1.default.createElement(Founders_1.default, null),
        react_1.default.createElement("div", { className: "grid-bg-section" },
            react_1.default.createElement(SocialBuzz_1.default, null)),
        react_1.default.createElement(Discover_1.default, null)));
};
exports.default = AboutPage;
