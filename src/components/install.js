"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var CodeBlock_1 = require("@theme/CodeBlock");
var Version_1 = require("./Version");
var InstallCommand = function () {
    var command = "curl -sSL https://tailcall.run/install.sh | bash -s -- ";
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(CodeBlock_1.default, null,
            command,
            react_1.default.createElement(Version_1.default, null))));
};
exports.default = InstallCommand;
