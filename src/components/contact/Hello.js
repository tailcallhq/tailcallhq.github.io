"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Heading_1 = require("@theme/Heading");
var react_hot_toast_1 = require("react-hot-toast");
var grid_large_svg_1 = require("@site/static/images/about/grid-large.svg");
var utils_1 = require("@site/src/utils");
var constants_1 = require("@site/src/constants");
var lucide_react_1 = require("lucide-react");
var Hello = function () {
    var _a = (0, react_1.useState)(""), email = _a[0], setEmail = _a[1];
    var _b = (0, react_1.useState)(""), message = _b[0], setMessage = _b[1];
    var _c = (0, react_1.useState)(""), stage = _c[0], setStage = _c[1];
    var _d = (0, react_1.useState)(true), isValid = _d[0], setIsValid = _d[1];
    var _e = (0, react_1.useState)(true), isStageValid = _e[0], setIsStageValid = _e[1];
    var _f = (0, react_1.useState)(true), showLoader = _f[0], setShowLoader = _f[1];
    var sendData = (0, react_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!email || !stage) {
                        setIsStageValid(Boolean(stage));
                        setIsValid((0, utils_1.validateEmail)(email));
                        return [2 /*return*/];
                    }
                    if (!(0, utils_1.validateEmail)(email)) {
                        setIsValid(false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, fetch(constants_1.zapierLink, {
                            method: "POST",
                            body: JSON.stringify({
                                email: email,
                                stage: stage,
                                message: message,
                            }),
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (data.status === "success") {
                        react_hot_toast_1.default.success("Thank you for contacting us.", {
                            duration: 3000,
                        });
                        (0, utils_1.analyticsHandler)("Contact Page", "Click", "Send message");
                        setEmail("");
                        setMessage("");
                        setStage("");
                        setIsValid(true);
                        setIsStageValid(true);
                    }
                    return [2 /*return*/];
            }
        });
    }); }, [email, message, stage]);
    return (react_1.default.createElement("section", { className: "relative h-auto" },
        react_1.default.createElement(react_hot_toast_1.Toaster, null),
        react_1.default.createElement(grid_large_svg_1.default, { className: "absolute inset-0 -z-10 h-[540px] w-full" }),
        react_1.default.createElement("div", { className: "p-SPACE_06 sm:py-SPACE_10 lg:py-SPACE_20 flex flex-col lg:flex-row items-center lg:items-start justify-center lg:space-x-40" },
            react_1.default.createElement(Heading_1.default, { as: "h2", className: "text-title-large text-center sm:text-left sm:text-display-medium lg:text-display-large lg:max-w-md" },
                "Say ",
                react_1.default.createElement("span", { className: "bg-tailCall-yellow rounded sm:rounded-2xl px-SPACE_01 sm:px-SPACE_02" }, "hello"),
                " to us!"),
            react_1.default.createElement("div", { className: "flex flex-col justify-between space-y-SPACE_07 w-full md:w-fit" },
                showLoader && (react_1.default.createElement("div", { className: "w-full md:w-[640px] h-[80vh] flex justify-center items-center" },
                    react_1.default.createElement(lucide_react_1.LoaderCircle, { className: "animate-spin", size: 40 }))),
                react_1.default.createElement("iframe", { src: "https://docs.google.com/forms/d/e/1FAIpQLSfn6qZlC7ST_LyKmGYPrZEBckQyQm2WNhME9CPJktvR--1mow/viewform?embedded=true", className: "w-full md:w-[640px]", height: "1000", onLoad: function () {
                        setShowLoader(false);
                    } })))));
};
exports.default = Hello;
