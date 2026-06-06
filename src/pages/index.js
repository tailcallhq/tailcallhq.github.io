"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Layout_1 = require("@theme/Layout");
var react_ga4_1 = require("react-ga4");
var router_1 = require("@docusaurus/router");
var home_1 = require("../components/home");
var titles_1 = require("../constants/titles");
var Home = function () {
    var isDevelopment = process.env.NODE_ENV === "development";
    var location = (0, router_1.useLocation)();
    (0, react_1.useEffect)(function () {
        react_ga4_1.default.send({ hitType: "pageview", page: location.pathname, title: "Home Page" });
    }, []);
    return (react_1.default.createElement(Layout_1.default, { title: titles_1.PageTitle.HOME, description: titles_1.PageDescription.HOME },
        react_1.default.createElement(home_1.default, null),
        !isDevelopment && (react_1.default.createElement("img", { style: { height: 0, width: 0 }, referrerPolicy: "no-referrer-when-downgrade", src: "https://static.scarf.sh/a.png?x-pxid=45ec365f-ab8a-4848-a6a9-bd4ffecfe72e", alt: "pixel" }))));
};
exports.default = Home;
