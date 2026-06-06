"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubStarsContext = void 0;
var react_1 = require("react");
// Create the context
exports.GithubStarsContext = (0, react_1.createContext)(null);
// Storage utility to get and set data
var storage = {
    get: function (key) {
        if (typeof window !== "undefined" && window["__tc_data__"]) {
            return window["__tc_data__"][key];
        }
        return null;
    },
    set: function (key, val) {
        if (typeof window !== "undefined") {
            window["__tc_data__"] = window["__tc_data__"] || {};
            window["__tc_data__"][key] = val;
        }
    },
};
var GithubStarsProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(storage.get("githubStars")), starsCount = _b[0], setStarsCount = _b[1];
    // Fetch Github stars count
    var fetchGithubStars = function () {
        return fetch("https://api.github.com/repos/tailcallhq/tailcall")
            .then(function (resp) { return resp.json(); })
            .then(function (resp) {
            var respStarsCount = resp.stargazers_count;
            setStarsCount(respStarsCount);
            storage.set("githubStars", respStarsCount);
            return respStarsCount;
        })
            .catch(function () {
            console.error("Failed to fetch Github stars count");
        });
    };
    // Fetch stars count on component mount
    (0, react_1.useEffect)(function () {
        fetchGithubStars();
    }, []);
    // Provide the stars count value through context
    return react_1.default.createElement(exports.GithubStarsContext.Provider, { value: starsCount }, children);
};
exports.default = GithubStarsProvider;
