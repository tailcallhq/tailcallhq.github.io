"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Heading_1 = require("@theme/Heading");
var Playground = function () {
    return (react_1.default.createElement("div", { className: "hidden lg:flex flex-col items-center justify-center my-SPACE_16" },
        react_1.default.createElement(Heading_1.default, { as: "h3", className: "text-display-medium text-start" }, "Playground"),
        react_1.default.createElement("iframe", { title: "Tailcall GraphQL Playground", style: {
                width: "90%",
                height: 700,
                outline: "1px solid #252525",
                border: 0,
                borderRadius: 8,
                marginBottom: 0,
                zIndex: 100,
                scale: 0.95,
            }, className: "max-w-7xl", src: "https://codesandbox.io/p/github/tailcallhq/tailcall-sandbox/main?file=%2Fexercises%2Fexercise_1.graphql" })));
};
exports.default = Playground;
