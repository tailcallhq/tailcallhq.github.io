"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@site/src/utils");
var TwitterLogo = function () { return (react_1.default.createElement("svg", { className: "w-5 h-5 inline-block mr-2", viewBox: "0 0 24 24", fill: "currentColor" },
    react_1.default.createElement("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }))); };
var Quiz = function (_a) {
    var questions = _a.questions, title = _a.title;
    var _b = (0, react_1.useState)(0), currentQuestion = _b[0], setCurrentQuestion = _b[1];
    var _c = (0, react_1.useState)(0), score = _c[0], setScore = _c[1];
    var _d = (0, react_1.useState)(false), showScore = _d[0], setShowScore = _d[1];
    var _e = (0, react_1.useState)(null), selectedAnswer = _e[0], setSelectedAnswer = _e[1];
    var handleAnswerClick = function (selectedOption) {
        (0, utils_1.analyticsHandler)(title, "Click", "Answer Clicked");
        setSelectedAnswer(selectedOption);
        if (selectedOption === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }
        setTimeout(function () {
            setSelectedAnswer(null);
            var nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
            }
            else {
                setShowScore(true);
            }
        }, 1000);
    };
    var resetQuiz = function () {
        (0, utils_1.analyticsHandler)(title, "Click", "reset Clicked");
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setSelectedAnswer(null);
    };
    var shareScore = function (platform, score, questionsLength, title) {
        (0, utils_1.analyticsHandler)(title, "score", "score shared");
        var text = "I scored ".concat(score, " out of ").concat(questionsLength, " on the ").concat(title, " Quiz! Test your knowledge too!");
        var url = document.location.href;
        var shareUrl = "";
        if (platform === "twitter") {
            shareUrl = "https://twitter.com/intent/tweet?text=".concat(encodeURIComponent(text), "&url=").concat(encodeURIComponent(url), "&via=tailcallhq");
        }
        window.open(shareUrl, "_blank");
    };
    return (react_1.default.createElement("div", { className: "max-w-2xl mx-auto p-6 bg-gradient-to-r from-purple-100 to-blue-100 shadow-lg rounded-xl" },
        react_1.default.createElement("h2", { className: "text-3xl font-bold mb-6 text-center text-gray-800" },
            title,
            " Quiz!"),
        showScore ? (react_1.default.createElement("div", { className: "text-center" },
            react_1.default.createElement("p", { className: "text-2xl mb-4 font-semibold text-gray-700" },
                "You scored ",
                score,
                " out of ",
                questions.length),
            score > 3 ? (react_1.default.createElement("div", { className: "flex flex-col items-center" },
                react_1.default.createElement("p", { className: "text-5xl mb-4" }, "\uD83C\uDF89"),
                react_1.default.createElement("p", { className: "text-green-600 font-bold text-xl" }, "Congratulations! You're a GraphQL schema change expert!"))) : (react_1.default.createElement("div", { className: "flex flex-col items-center" },
                react_1.default.createElement(lucide_react_1.Frown, { size: 64, className: "text-red-500 mb-4" }),
                react_1.default.createElement("p", { className: "text-red-600 font-bold text-xl" }, "Keep learning about schema changes. You'll get there!"))),
            react_1.default.createElement("div", { className: "mt-6 space-y-3" },
                react_1.default.createElement("button", { onClick: function () { return shareScore("twitter", score, questions.length, title); }, className: "w-full bg-black text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors duration-300 shadow-md flex items-center justify-center" },
                    react_1.default.createElement(TwitterLogo, null),
                    " Share on X (Twitter)")),
            react_1.default.createElement("button", { onClick: resetQuiz, className: "mt-6 bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors duration-300 shadow-md w-full" }, "Retry Quiz"))) : (react_1.default.createElement("div", null,
            react_1.default.createElement("p", { className: "mb-4 text-lg font-semibold text-gray-600" },
                "Question ",
                currentQuestion + 1,
                "/",
                questions.length),
            react_1.default.createElement("p", { className: "text-xl font-bold mb-6 text-gray-800" }, questions[currentQuestion].text),
            react_1.default.createElement("div", { className: "space-y-3" }, questions[currentQuestion].options.map(function (option, index) { return (react_1.default.createElement("button", { key: index, onClick: function () { return handleAnswerClick(index); }, className: "w-full text-left p-4 rounded-lg transition-all duration-300 ".concat(selectedAnswer === null
                    ? "bg-white hover:bg-gray-100 shadow-md"
                    : selectedAnswer === index
                        ? index === questions[currentQuestion].correctAnswer
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        : "bg-white"), disabled: selectedAnswer !== null },
                react_1.default.createElement("span", { className: "text-lg font-medium" }, option),
                selectedAnswer === index && (react_1.default.createElement("span", { className: "float-right" }, index === questions[currentQuestion].correctAnswer ? (react_1.default.createElement(lucide_react_1.Check, { className: "inline text-white", size: 24 })) : (react_1.default.createElement(lucide_react_1.X, { className: "inline text-white", size: 24 })))))); }))))));
};
exports.default = Quiz;
