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
var graphiql_1 = require("graphiql");
var utils_1 = require("@site/src/utils");
var constants_1 = require("@site/src/constants");
require("graphiql/graphiql.css");
require("../../css/graphiql.css");
var useCookieConsent_1 = require("@site/src/utils/hooks/useCookieConsent");
var create_fetcher_1 = require("@graphiql/create-fetcher");
var useDebouncedValue = function (inputValue, delay) {
    var _a = (0, react_1.useState)(inputValue), debouncedValue = _a[0], setDebouncedValue = _a[1];
    (0, react_1.useEffect)(function () {
        var handler = setTimeout(function () {
            setDebouncedValue(inputValue);
        }, delay);
        return function () {
            clearTimeout(handler);
        };
    }, [inputValue, delay]);
    return debouncedValue;
};
var Playground = function () {
    var apiEndpointParam = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("u");
    var initialApiEndpoint = (typeof apiEndpointParam === "string" && (0, utils_1.isValidURL)(apiEndpointParam) && new URL(apiEndpointParam)) || "";
    var _a = (0, react_1.useState)(initialApiEndpoint !== "" ? new URL(initialApiEndpoint) : ""), apiEndpoint = _a[0], setApiEndpoint = _a[1];
    var _b = (0, react_1.useState)(initialApiEndpoint.toString()), inputValue = _b[0], setInputValue = _b[1];
    var getCookieConsent = (0, useCookieConsent_1.useCookieConsent)().getCookieConsent;
    var cookieConsent = getCookieConsent();
    var debouncedApiEndpoint = useDebouncedValue(inputValue, 500);
    var apiEndpointInputClasses = "border border-solid border-tailCall-border-light-500 rounded-lg font-space-grotesk h-11 w-[100%]\n    p-SPACE_04 text-content-small outline-none focus:border-x-tailCall-light-700";
    (0, react_1.useEffect)(function () {
        if ((0, utils_1.isValidURL)(debouncedApiEndpoint)) {
            setApiEndpoint(new URL(debouncedApiEndpoint));
        }
    }, [debouncedApiEndpoint]);
    var graphQLFetcher = function (graphQLParams, opts) { return __awaiter(void 0, void 0, void 0, function () {
        var fetcher;
        return __generator(this, function (_a) {
            if (apiEndpoint.toString().trim() === "") {
                return [2 /*return*/, Promise.resolve({})];
            }
            (0, utils_1.analyticsHandler)("GraphQL", "tc_fetch_query", apiEndpoint.toString());
            (0, utils_1.sendConversionEvent)(constants_1.playgroundAdsConversionId);
            fetcher = (0, create_fetcher_1.createGraphiQLFetcher)({ url: apiEndpoint.toString() });
            return [2 /*return*/, fetcher(graphQLParams, opts)];
        });
    }); };
    var emptyGraphiqlStorageObject = {
        getItem: function () { return null; },
        setItem: function () { return undefined; },
        removeItem: function () { return undefined; },
        clear: function () { return undefined; },
        length: 0,
    };
    var graphiqlStorage = (0, react_1.useMemo)(function () {
        var _a;
        if ((cookieConsent === null || cookieConsent === void 0 ? void 0 : cookieConsent.accepted) &&
            (!(cookieConsent === null || cookieConsent === void 0 ? void 0 : cookieConsent.preferences) || ((_a = cookieConsent === null || cookieConsent === void 0 ? void 0 : cookieConsent.preferences) === null || _a === void 0 ? void 0 : _a.includes(constants_1.CookiePreferenceCategory.PREFERENCE)))) {
            // Defaults to local storage
            return undefined;
        }
        // Block storing graphiql data in local storage if user denies cookie consent
        return emptyGraphiqlStorageObject;
    }, [cookieConsent]);
    return (react_1.default.createElement("div", { className: "min-h-[90vh]" }, typeof window !== "undefined" && (react_1.default.createElement("div", { className: "mt-SPACE_06" },
        react_1.default.createElement("div", { className: "flex px-SPACE_04" },
            react_1.default.createElement("input", { name: "api-endpoint", type: "url", value: inputValue, onChange: function (e) { return setInputValue(e.target.value); }, className: apiEndpointInputClasses, placeholder: "API Endpoint" })),
        react_1.default.createElement("div", { className: "flex my-SPACE_03" },
            react_1.default.createElement(graphiql_1.GraphiQL, { fetcher: graphQLFetcher, storage: graphiqlStorage },
                react_1.default.createElement(graphiql_1.GraphiQL.Logo, null,
                    react_1.default.createElement(react_1.default.Fragment, null))))))));
};
exports.default = Playground;
