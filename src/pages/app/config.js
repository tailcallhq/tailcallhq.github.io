"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_ga4_1 = require("react-ga4");
var Layout_1 = require("@theme/Layout");
var config_generator_1 = require("../../components/config-generator");
var router_1 = require("@docusaurus/router");
var titles_1 = require("../../constants/titles");
var ConfigGeneratorPage = function () {
    var location = (0, router_1.useLocation)();
    (0, react_1.useEffect)(function () {
        react_ga4_1.default.send({ hitType: "pageview", page: location.pathname, title: "Config Generator Page" });
    }, []);
    return (react_1.default.createElement(Layout_1.default, { title: titles_1.PageTitle.CONFIG_GENERATOR, description: titles_1.PageDescription.CONFIG_GENERATOR },
        react_1.default.createElement(config_generator_1.default, null)));
};
exports.default = ConfigGeneratorPage;
