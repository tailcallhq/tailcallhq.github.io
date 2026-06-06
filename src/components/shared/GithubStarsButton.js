"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var GithubStarsProvider_1 = require("./GithubStarsProvider");
var constants_1 = require("@site/src/constants");
var github_svg_1 = require("@site/static/icons/companies/github.svg");
var Link_1 = require("@docusaurus/Link");
// Export the GithubStarsButton component
var GithubStarsButton = function (_a) {
    var className = _a.className;
    // Get stars count from context
    var starsCount = (0, react_1.useContext)(GithubStarsProvider_1.GithubStarsContext);
    return (react_1.default.createElement(Link_1.default, { to: constants_1.githubRepoURL, target: "_blank", className: "".concat(className, " header-button header-button-github") },
        react_1.default.createElement("div", { className: "hidden lg:block button-grid-bg-section-dark h-full w-40 scale-90 opacity-0 hover:scale-[1] hover:opacity-100 transform transition-all ease-out duration-250 active:hidden" }),
        react_1.default.createElement(github_svg_1.default, null),
        react_1.default.createElement("span", null,
            "Star ",
            react_1.default.createElement("span", { className: "min-w-[3ch] inline-block" }, starsCount))));
};
exports.default = GithubStarsButton;
