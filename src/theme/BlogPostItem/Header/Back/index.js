"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BlogBackButton;
var Link_1 = require("@docusaurus/Link");
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
function BlogBackButton() {
    return (react_1.default.createElement(Link_1.default, { to: "/blog", className: "flex items-center gap-2 my-8 cursor-pointer !no-underline", onClick: function () { } },
        react_1.default.createElement(lucide_react_1.ArrowLeft, { size: 24, color: "black" }),
        react_1.default.createElement("span", { className: "text-content-small text-tailCall-light-600" }, "Back to Blogs")));
}
