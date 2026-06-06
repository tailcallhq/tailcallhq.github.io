"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Hero_1 = require("./Hero");
var Partners_1 = require("../home/Partners");
var EnterpriseFeatures_1 = require("./EnterpriseFeatures");
var MoreEnterpriseFeatures_1 = require("./MoreEnterpriseFeatures");
var Discover_1 = require("../shared/Discover");
var Pricing_1 = require("./Pricing");
var EnterprisePage = function () {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Hero_1.default, null),
        react_1.default.createElement(Partners_1.default, null),
        react_1.default.createElement(EnterpriseFeatures_1.default, null),
        react_1.default.createElement(MoreEnterpriseFeatures_1.default, null),
        react_1.default.createElement(Pricing_1.default, null),
        react_1.default.createElement(Discover_1.default, null)));
};
exports.default = EnterprisePage;
