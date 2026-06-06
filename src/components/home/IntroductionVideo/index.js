"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useCookieConsent_1 = require("@site/src/utils/hooks/useCookieConsent");
require("./style.css");
var IntroductionVideo = function () {
    var videoId = "1011521201";
    var videoRef = (0, react_1.useRef)(null);
    var getCookieConsent = (0, useCookieConsent_1.useCookieConsent)().getCookieConsent;
    var cookieConsent = getCookieConsent();
    var handleVimeoAnalytics = function () {
        return Boolean(cookieConsent === null || cookieConsent === void 0 ? void 0 : cookieConsent.accepted) ? "" : "&dnt=1";
    };
    return (react_1.default.createElement("div", { className: "video-wrapper", ref: videoRef },
        react_1.default.createElement("div", { className: "video-container" },
            react_1.default.createElement("iframe", { src: "https://player.vimeo.com/video/".concat(videoId, "?autoplay=0&badge=0&autopause=0&player_id=0&app_id=58479").concat(handleVimeoAnalytics()), allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true, className: "absolute top-0 left-0 w-full h-full", title: "Tailcall Introduction Video", loading: "lazy" }))));
};
exports.default = IntroductionVideo;
