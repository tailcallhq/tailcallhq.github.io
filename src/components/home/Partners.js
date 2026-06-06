"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TrustedByMarquee_1 = require("@site/src/components/home/TrustedByMarquee");
var constants_1 = require("@site/src/constants");
var react_1 = require("react");
var Partners = function () {
    var handleClick = function () {
        window.open("/docs/deploy-graphql-github-actions/", "_blank");
    };
    return react_1.default.createElement(TrustedByMarquee_1.default, { logos: constants_1.partnerImages, onClick: handleClick });
};
exports.default = Partners;
