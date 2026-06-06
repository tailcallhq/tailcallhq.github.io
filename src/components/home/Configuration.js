"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Heading_1 = require("@theme/Heading");
var CodeBlock_1 = require("@theme/CodeBlock");
var TabItem_1 = require("@theme/TabItem");
var Link_1 = require("@docusaurus/Link");
var Section_1 = require("../shared/Section");
var Configuration = function () {
    return (react_1.default.createElement(Section_1.default, { className: "flex flex-col lg:flex-row justify-center gap-10", innerClassName: "xl:flex md:gap-10" },
        react_1.default.createElement("div", { className: "max-w-2xl" },
            react_1.default.createElement(Heading_1.default, { as: "h2", className: "text-title-large sm:text-display-tiny lg:text-display-small mb-SPACE_04" },
                "Get ",
                react_1.default.createElement("span", { className: "rounded-lg px-SPACE_02 bg-tailCall-yellow" }, "Started")),
            react_1.default.createElement("p", { className: "text-content-small sm:text-content-medium mb-SPACE_11" }, "Setup the Tailcall instantly via npm and unlock the power of high-performance API orchestration."),
            react_1.default.createElement("div", null,
                react_1.default.createElement("h5", null, "More"),
                react_1.default.createElement("p", { className: "text-content-small sm:text-content-medium mb-SPACE_11" },
                    "To dive deeper into Tailcall checkout our ",
                    react_1.default.createElement(Link_1.default, { href: "/docs" }, "docs"),
                    " for detailed tutorials. Ideal for devs at any level, it's packed with advanced tips, powerful operators and best practices."))),
        react_1.default.createElement("div", null,
            react_1.default.createElement(CodeBlock_1.default, { language: "bash" }, "npm i -g @tailcallhq/tailcall"),
            CodeTabItem({ code: GRAPHQL_CONFIG, language: "graphql" }))));
};
var CodeTabItem = function (_a) {
    var code = _a.code, language = _a.language;
    return (react_1.default.createElement(TabItem_1.default, { value: language, label: language },
        react_1.default.createElement(CodeBlock_1.default, { language: language, showLineNumbers: true, className: "overflow-y-auto h-96 md:min-w-[45rem] min-w-[100%]" }, code),
        react_1.default.createElement(CodeBlock_1.default, { language: "bash" },
            "tailcall start ./app.",
            language)));
};
exports.default = Configuration;
var GRAPHQL_CONFIG = "schema\n  @server(port: 8000) {\n  query: Query\n}\n\ntype Query {\n  users: [User] @http(url: \"http://jsonplaceholder.typicode.com/users\")\n  posts: [Post] @http(url: \"http://jsonplaceholder.typicode.com/posts\")\n}\n\ntype User {\n  id: Int!\n  name: String!\n  username: String!\n  email: String!\n}\n\n\ntype Post {\n  id: Int!\n  title: String!\n  body: String!\n  userId: Int!\n\n  # Expand a post with user information\n  user: User @http(url: \"http://jsonplaceholder.typicode.com/users/{{.value.userId}}\")\n}\n";
