"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var SearchableSelect = function (_a) {
    var options = _a.options, value = _a.value, onChange = _a.onChange, _b = _a.placeholder, placeholder = _b === void 0 ? "Select..." : _b;
    var _c = (0, react_1.useState)(false), isOpen = _c[0], setIsOpen = _c[1];
    var _d = (0, react_1.useState)(""), searchTerm = _d[0], setSearchTerm = _d[1];
    var containerRef = (0, react_1.useRef)(null);
    var inputRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var handleClickOutside = function (event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchTerm("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return function () { return document.removeEventListener("mousedown", handleClickOutside); };
    }, []);
    (0, react_1.useEffect)(function () {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);
    var filteredOptions = options.filter(function (option) {
        return option.label.toLowerCase().includes(searchTerm.toLowerCase());
    });
    var selectedOption = options.find(function (opt) { return opt.value === value; });
    var handleSelect = function (option) {
        onChange(option.value);
        setIsOpen(false);
        setSearchTerm("");
    };
    var handleClear = function (e) {
        e.stopPropagation();
        onChange(undefined);
    };
    return (react_1.default.createElement("div", { ref: containerRef, className: "relative" },
        react_1.default.createElement("button", { type: "button", onClick: function () { return setIsOpen(!isOpen); }, className: "w-full px-SPACE_04 py-SPACE_03 border border-solid border-tailCall-border-light-500 rounded-lg text-content-small outline-none focus:border-tailCall-yellow bg-white flex items-center justify-between hover:border-tailCall-border-light-600 transition-colors" },
            react_1.default.createElement("span", { className: selectedOption ? "text-tailCall-dark-700" : "text-tailCall-dark-100" }, selectedOption ? selectedOption.label : placeholder),
            react_1.default.createElement("div", { className: "flex items-center gap-SPACE_02" },
                selectedOption && (react_1.default.createElement("button", { onClick: handleClear, className: "hover:text-tailCall-dark-500 text-tailCall-dark-100", type: "button" },
                    react_1.default.createElement(lucide_react_1.X, { size: 16 }))),
                react_1.default.createElement(lucide_react_1.ChevronDown, { size: 16, className: "transition-transform ".concat(isOpen ? "rotate-180" : "") }))),
        isOpen && (react_1.default.createElement("div", { className: "absolute z-10 w-full mt-SPACE_01 bg-white border border-solid border-tailCall-border-light-500 rounded-lg shadow-lg max-h-64 overflow-hidden" },
            react_1.default.createElement("div", { className: "p-SPACE_02 border-b border-solid border-tailCall-border-light-300" },
                react_1.default.createElement("div", { className: "relative" },
                    react_1.default.createElement(lucide_react_1.Search, { size: 16, className: "absolute left-SPACE_03 top-1/2 transform -translate-y-1/2 text-tailCall-dark-100" }),
                    react_1.default.createElement("input", { ref: inputRef, type: "text", value: searchTerm, onChange: function (e) { return setSearchTerm(e.target.value); }, placeholder: "Search...", className: "w-full pl-9 pr-SPACE_03 py-SPACE_02 border border-solid border-tailCall-border-light-500 rounded text-content-small outline-none focus:border-tailCall-yellow" }))),
            react_1.default.createElement("div", { className: "overflow-y-auto max-h-48" }, filteredOptions.length > 0 ? (filteredOptions.map(function (option, index) { return (react_1.default.createElement("button", { key: index, type: "button", onClick: function () { return handleSelect(option); }, className: "w-full text-left px-SPACE_04 py-SPACE_03 text-content-small hover:bg-tailCall-border-light-100 transition-colors ".concat(option.value === value ? "bg-tailCall-border-light-100 font-medium" : "") }, option.label)); })) : (react_1.default.createElement("div", { className: "px-SPACE_04 py-SPACE_06 text-center text-content-small text-tailCall-dark-100" }, "No options found")))))));
};
exports.default = SearchableSelect;
