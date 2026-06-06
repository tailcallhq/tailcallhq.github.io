"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_countup_1 = require("react-countup");
var react_on_screen_1 = require("react-on-screen");
var LottieContainer_1 = require("./LottieContainer.tsxsrc/components/home/LottieContainer");
var GraphContainer = function (_a) {
    var metricTitle = _a.metricTitle, metricData = _a.metricData, metricDesc = _a.metricDesc, visual = _a.visual, delay = _a.delay, duration = _a.duration, start = _a.start;
    var lottieRef = (0, react_1.useRef)(null);
    var interactivity = {
        mode: "scroll",
        actions: [
            {
                visibility: [0, 1],
                type: "loop",
                frames: [0],
            },
        ],
    };
    (0, react_1.useEffect)(function () {
        setTimeout(function () {
            var _a;
            (_a = lottieRef.current) === null || _a === void 0 ? void 0 : _a.pause();
        }, delay);
    }, []);
    return (react_1.default.createElement("div", { className: "border-2 border-solid border-tailCall-border-dark-300 h-[300px] lg:h-[400px] w-full sm:w-[680px] rounded-3xl sm:rounded-[32px] flex flex-col relative overflow-hidden" },
        react_1.default.createElement("div", { className: "flex flex-col px-SPACE_06 py-SPACE_04 lg:px-SPACE_12 lg:py-SPACE_08 z-10" },
            react_1.default.createElement("span", { className: "text-content-small sm:text-content-medium text-tailCall-light-100" }, metricTitle),
            react_1.default.createElement("span", { className: "text-title-medium sm:text-title-large text-tailCall-light-100" },
                react_1.default.createElement(react_on_screen_1.default, { style: {
                        height: "36px",
                    }, partialVisibility: true, once: true, offset: 100 }, function (_a) {
                    var isVisible = _a.isVisible;
                    return (react_1.default.createElement(react_1.default.Fragment, null, isVisible ? (react_1.default.createElement(react_countup_1.default, { start: start, end: metricData, decimals: 2, duration: duration, delay: delay })) : null));
                })),
            react_1.default.createElement("span", { className: "text-content-tiny sm:text-content-small text-tailCall-light-400" }, metricDesc)),
        react_1.default.createElement("div", { className: "absolute right-SPACE_01 bottom-SPACE_01" },
            react_1.default.createElement(LottieContainer_1.default, { lottieRef: lottieRef, animationData: visual, interactivity: interactivity, loop: false }))));
};
exports.default = GraphContainer;
