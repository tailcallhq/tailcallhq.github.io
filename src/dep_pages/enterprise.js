"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_ga4_1 = require("react-ga4");
var Layout_1 = require("@theme/Layout");
var router_1 = require("@docusaurus/router");
var enterprise_1 = require("../components/enterprise");
var titles_1 = require("../constants/titles");
var Enterprise = function () {
    var location = (0, router_1.useLocation)();
    (0, react_1.useEffect)(function () {
        react_ga4_1.default.send({ hitType: "pageview", page: location.pathname, title: "Enterprise Page" });
    }, []);
    return (react_1.default.createElement(Layout_1.default, { title: titles_1.PageTitle.ENTERPRISE, description: titles_1.PageDescription.ENTERPRISE },
        react_1.default.createElement(enterprise_1.default, null)));
};
exports.default = Enterprise;
