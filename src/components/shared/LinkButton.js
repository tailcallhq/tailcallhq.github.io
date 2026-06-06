"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Link_1 = require("@docusaurus/Link");
var constants_1 = require("@site/src/constants");
var clsx_1 = require("clsx");
var react_1 = require("react");
var LinkButton = function (_a) {
    var _b;
    var title = _a.title, titleClassName = _a.titleClassName, Icon = _a.Icon, theme = _a.theme, onClick = _a.onClick, href = _a.href, _c = _a.width, width = _c === void 0 ? "auto" : _c, disabled = _a.disabled;
    // Generate button widths as tailwind is not able to handle dynamic widths
    var setButtonWidth = function () {
        switch (width) {
            case "small":
                return "w-[228px]";
            case "medium":
                return "w-[300px]";
            case "large":
                return "w-[500px]";
            case "full":
                return "w-full";
            case "auto":
                return "w-fit";
            default:
                return "w-fit";
        }
    };
    // Generate classes based on the provided theme
    var generateThemeClasses = function () {
        var _a;
        var themes = (_a = {},
            _a[constants_1.Theme.Light] = {
                classes: "border border-solid border-tailCall-border-dark-100 text-tailCall-dark-500 bg-transparent hover:text-tailCall-dark-500",
                gridClasses: "",
            },
            _a[constants_1.Theme.Dark] = {
                classes: "border-2 border-solid border-tailCall-border-dark-100 text-tailCall-light-100 bg-white hover:text-tailCall-light-100",
                gridClasses: "",
            },
            _a[constants_1.Theme.Gray] = {
                classes: "border-2 border-solid border-tailCall-light-100 text-tailCall-light-100 bg-transparent hover:text-tailCall-light-100",
                gridClasses: "hidden",
            },
            _a[constants_1.Theme.Tailcall] = {
                classes: "bg-yellow-300 border border-solid text-tailCall-dark-500 bg-transparent hover:text-tailCall-dark-500",
                gridClasses: "",
            },
            _a);
        return themes[theme] || { classes: "", styles: "", gridClasses: "" };
    };
    var renderBackgroundElements = function (buttonTheme) {
        if (buttonTheme === constants_1.Theme.Dark || buttonTheme === constants_1.Theme.Gray) {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { className: "lg:block rounded-md lg:rounded-lg absolute inset-0 w-full bg-tailCall-dark-500 group-hover:lg:scale-x-[0.98] group-hover:lg:scale-y-[0.95] transform transition-all ease-out duration-250" }),
                !disabled && (
                // Dark theme grid background (only if not disabled)
                react_1.default.createElement("div", { className: "hidden lg:block button-grid-bg-section h-full w-full scale-90 opacity-0 group-hover:scale-[0.98] group-hover:opacity-100 transform transition-all ease-out duration-250" }))));
        }
        else if (buttonTheme === constants_1.Theme.Light && !disabled) {
            // Light theme grid background (only if not disabled)
            return (react_1.default.createElement("div", { className: "hidden lg:block button-grid-bg-section-dark h-full w-full scale-90 opacity-0 group-hover:scale-[1] group-hover:opacity-100 transform transition-all ease-out duration-250" }));
        }
        else {
            // If no matching theme, return null
            return null;
        }
    };
    return (react_1.default.createElement(Link_1.default, { to: href, onClick: onClick, className: "\n      group relative disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center gap-x-SPACE_03 hover:no-underline rounded-lg sm:rounded-xl h-12 sm:h-16 text-content-small font-bold sm:text-title-small cursor-pointer px-SPACE_06 py-SPACE_03 sm:px-SPACE_08 lg:px-SPACE_10 sm:py-SPACE_04 lg:py-SPACE_05\n      ".concat(setButtonWidth(), " \n      ").concat((_b = generateThemeClasses().classes) !== null && _b !== void 0 ? _b : "", " \n      ").concat(disabled ? "cursor-not-allowed opacity-20" : "", " ") },
        renderBackgroundElements(theme),
        Icon && react_1.default.createElement(Icon, { className: "w-6 h-6 sm:w-7 sm:h-7 lg:h-8 lg:w-8 text-white z-[1]" }),
        title && react_1.default.createElement("span", { className: (0, clsx_1.default)("z-20", titleClassName) },
            " ",
            title)));
};
exports.default = LinkButton;
