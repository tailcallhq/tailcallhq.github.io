"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var LinkButton_1 = require("../shared/LinkButton");
var utils_1 = require("@site/src/utils");
var constants_1 = require("@site/src/constants");
var questions = [
    {
        id: 1,
        text: "Do you have a complete, up-to-date inventory of all your APIs?",
    },
    {
        id: 2,
        text: "Is there a clear, documented process for API design and development in your organization?",
    },
    {
        id: 3,
        text: "Do you have metrics in place to measure the usage and performance of your APIs?",
    },
    {
        id: 4,
        text: "Is there a designated team or individual responsible for API governance?",
    },
    {
        id: 5,
        text: "Do you have a system in place for managing API versions and deprecating old APIs?",
    },
    {
        id: 6,
        text: "Are your APIs consistently documented and easily discoverable by developers?",
    },
    {
        id: 7,
        text: "Do you have security protocols in place specifically for API protection?",
    },
    {
        id: 8,
        text: "Is API development aligned with your business objectives and KPIs?",
    },
    {
        id: 9,
        text: "Do you have a process for gathering and incorporating feedback from API consumers?",
    },
    {
        id: 10,
        text: "Are you able to quickly onboard new partners or customers using your APIs?",
    },
];
var APIStrategyQuiz = function () {
    var _a = (0, react_1.useState)({}), answers = _a[0], setAnswers = _a[1];
    var _b = (0, react_1.useState)(0), currentQuestion = _b[0], setCurrentQuestion = _b[1];
    var _c = (0, react_1.useState)(false), showResult = _c[0], setShowResult = _c[1];
    var _d = (0, react_1.useState)(""), animation = _d[0], setAnimation = _d[1];
    var handleAnswer = function (answer) {
        setAnswers(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[questions[currentQuestion].id] = answer, _a)));
        });
        setAnimation("fadeOut");
        setTimeout(function () {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(function (prev) { return prev + 1; });
            }
            else {
                setShowResult(true);
            }
            setAnimation("fadeIn");
        }, 300);
    };
    var calculateScore = function () {
        return Object.values(answers).filter(function (answer) { return answer === "yes"; }).length;
    };
    var getResultData = function (score) {
        if (score >= 8) {
            return {
                icon: react_1.default.createElement(lucide_react_1.SmilePlus, { className: "w-24 h-24 text-green-500" }),
                title: "Excellent!",
                message: "Your API strategy is robust and well-implemented.",
                gradient: "from-green-400 to-blue-500",
            };
        }
        else if (score >= 5) {
            return {
                icon: react_1.default.createElement(lucide_react_1.Meh, { className: "w-24 h-24 text-yellow-500" }),
                title: "Good Start",
                message: "Your API strategy is on the right track but has room for improvement.",
                gradient: "from-yellow-400 to-orange-500",
            };
        }
        else {
            return {
                icon: react_1.default.createElement(lucide_react_1.Frown, { className: "w-24 h-24 text-red-500" }),
                title: "Needs Work",
                message: "Your API strategy needs significant attention and improvement.",
                gradient: "from-red-400 to-pink-500",
            };
        }
    };
    var resetQuiz = function () {
        setAnswers({});
        setCurrentQuestion(0);
        setShowResult(false);
        setAnimation("fadeIn");
    };
    var score = calculateScore();
    var resultData = getResultData(score);
    var progressPercentage = (currentQuestion / questions.length) * 100;
    return (react_1.default.createElement("div", { className: "max-w-2xl mx-auto p-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-lg text-white ".concat(animation, " min-h-[500px] flex flex-col justify-center") }, showResult ? (react_1.default.createElement("div", { className: "text-center" },
        resultData.icon,
        react_1.default.createElement("h2", { className: "text-3xl font-bold mt-4" }, resultData.title),
        react_1.default.createElement("p", { className: "text-xl mt-2" },
            "Your score: ",
            score,
            " out of 10"),
        react_1.default.createElement("p", { className: "text-lg mt-4" }, resultData.message),
        score < 8 && (react_1.default.createElement("p", { className: "mt-4 text-white opacity-80" }, "Consider revisiting the key components and best practices of API strategy outlined in this blog.")),
        react_1.default.createElement("div", { className: "flex justify-center space-x-4 mt-4" },
            react_1.default.createElement(LinkButton_1.default, { title: "Retake Quiz", theme: constants_1.Theme.Gray, width: "auto", onClick: function () {
                    (0, utils_1.analyticsHandler)("Quiz", "Click", "Retake Quiz");
                    resetQuiz();
                } })))) : (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h2", { className: "text-3xl font-bold mb-6 text-center" }, "API Strategy Assessment Quiz"),
        questions[currentQuestion] && ( // Safeguard to ensure currentQuestion index is valid
        react_1.default.createElement("div", { className: "mb-6 flex-grow flex flex-col justify-center items-center" },
            react_1.default.createElement("h2", { className: "font-semibold mb-4 text-lg text-center" }, questions[currentQuestion].text),
            react_1.default.createElement("div", { className: "flex justify-center space-x-4 mt-4" },
                react_1.default.createElement(LinkButton_1.default, { title: "Yes", theme: constants_1.Theme.Gray, width: "auto", onClick: function () {
                        (0, utils_1.analyticsHandler)("Quiz", "Click", "Answer Yes - Q".concat(currentQuestion + 1));
                        handleAnswer("yes");
                    } }),
                react_1.default.createElement(LinkButton_1.default, { title: "No", theme: constants_1.Theme.Gray, width: "auto", onClick: function () {
                        (0, utils_1.analyticsHandler)("Quiz", "Click", "Answer No - Q".concat(currentQuestion + 1));
                        handleAnswer("no");
                    } })))),
        react_1.default.createElement("div", { className: "mt-8" },
            react_1.default.createElement("div", { className: "w-full bg-white rounded-full h-2.5" },
                react_1.default.createElement("div", { className: "bg-green-500 h-2.5 rounded-full transition-all duration-500 ease-out", style: { width: "".concat(progressPercentage, "%") } })),
            react_1.default.createElement("div", { className: "mt-2 text-center text-white" },
                "Question ",
                Math.min(currentQuestion + 1, questions.length),
                " of ",
                questions.length))))));
};
exports.default = APIStrategyQuiz;
