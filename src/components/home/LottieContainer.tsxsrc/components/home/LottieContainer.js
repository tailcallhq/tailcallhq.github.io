"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var BrowserOnly_1 = require("@docusaurus/BrowserOnly");
var ExecutionEnvironment_1 = require("@docusaurus/ExecutionEnvironment");
var LottieContainer = function (_a) {
    var animationData = _a.animationData, _b = _a.loop, loop = _b === void 0 ? true : _b, _c = _a.className, className = _c === void 0 ? "" : _c;
    var _d = (0, react_1.useState)(null), Lottie = _d[0], setLottie = _d[1];
    (0, react_1.useEffect)(function () {
        if (ExecutionEnvironment_1.default.canUseDOM) {
            Promise.resolve().then(function () { return require("lottie-light-react"); }).then(function (LottieModule) {
                setLottie(LottieModule);
            });
        }
    }, []);
    return (react_1.default.createElement(BrowserOnly_1.default, null, function () { return (Lottie ? react_1.default.createElement(Lottie.default, { animationData: animationData, loop: loop, className: className }) : react_1.default.createElement(react_1.default.Fragment, null)); }));
};
exports.default = LottieContainer;
