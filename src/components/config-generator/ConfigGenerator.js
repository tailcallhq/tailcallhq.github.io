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
var lucide_react_1 = require("lucide-react");
var react_hot_toast_1 = require("react-hot-toast");
var SchemaForm_1 = require("./SchemaForm");
var SCHEMA_URL = "https://raw.githubusercontent.com/tailcallhq/tailcall/main/generated/.tailcallrc.schema.json";
var ConfigGeneratorUI = function () {
    var _a = (0, react_1.useState)(null), schema = _a[0], setSchema = _a[1];
    var _b = (0, react_1.useState)({}), config = _b[0], setConfig = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)("json"), outputFormat = _d[0], setOutputFormat = _d[1];
    (0, react_1.useEffect)(function () {
        loadSchema();
    }, []);
    var loadSchema = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, schemaData_1, initialConfig_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    setLoading(true);
                    return [4 /*yield*/, fetch(SCHEMA_URL)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Failed to load schema");
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    schemaData_1 = _a.sent();
                    setSchema(schemaData_1);
                    initialConfig_1 = {};
                    if (schemaData_1.properties) {
                        Object.keys(schemaData_1.properties).forEach(function (key) {
                            var prop = schemaData_1.properties[key];
                            if (prop.default !== undefined) {
                                initialConfig_1[key] = prop.default;
                            }
                        });
                    }
                    setConfig(initialConfig_1);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    react_hot_toast_1.default.error("Failed to load schema. Please try again.");
                    console.error("Schema loading error:", error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleConfigChange = function (newConfig) {
        setConfig(newConfig);
    };
    var convertToYAML = function (obj, indent) {
        if (indent === void 0) { indent = 0; }
        var spaces = "  ".repeat(indent);
        var yaml = "";
        if (obj === null || obj === undefined) {
            return "null";
        }
        if (typeof obj !== "object") {
            if (typeof obj === "string") {
                // Check if string needs quotes
                if (obj.includes(":") || obj.includes("#") || obj.includes("\n")) {
                    return "\"".concat(obj.replace(/"/g, '\\"'), "\"");
                }
                return obj;
            }
            return String(obj);
        }
        if (Array.isArray(obj)) {
            if (obj.length === 0)
                return "[]";
            obj.forEach(function (item) {
                if (typeof item === "object" && item !== null) {
                    yaml += "".concat(spaces, "- ").concat(convertToYAML(item, indent + 1).trimStart(), "\n");
                }
                else {
                    yaml += "".concat(spaces, "- ").concat(convertToYAML(item, 0), "\n");
                }
            });
            return yaml;
        }
        Object.entries(obj).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (value === undefined)
                return;
            if (Array.isArray(value)) {
                if (value.length === 0) {
                    yaml += "".concat(spaces).concat(key, ": []\n");
                }
                else {
                    yaml += "".concat(spaces).concat(key, ":\n").concat(convertToYAML(value, indent + 1));
                }
            }
            else if (typeof value === "object" && value !== null) {
                yaml += "".concat(spaces).concat(key, ":\n").concat(convertToYAML(value, indent + 1));
            }
            else {
                yaml += "".concat(spaces).concat(key, ": ").concat(convertToYAML(value, 0), "\n");
            }
        });
        return yaml;
    };
    var convertToGraphQL = function (obj) {
        // Basic GraphQL SDL conversion - this is a simplified version
        // In a real implementation, this would need more sophisticated conversion
        var graphql = "";
        if (obj.schema) {
            graphql += "schema {\n";
            if (obj.schema.query) {
                graphql += "  query: ".concat(obj.schema.query, "\n");
            }
            if (obj.schema.mutation) {
                graphql += "  mutation: ".concat(obj.schema.mutation, "\n");
            }
            graphql += "}\n\n";
        }
        // This is a placeholder - actual GraphQL conversion would be more complex
        graphql += "# Configuration:\n# ".concat(JSON.stringify(obj, null, 2).split("\n").join("\n# "), "\n");
        return graphql;
    };
    var downloadConfig = function () {
        try {
            var content = "";
            var filename = "";
            var mimeType = "";
            // Remove undefined and empty values
            var cleanConfig = JSON.parse(JSON.stringify(config));
            switch (outputFormat) {
                case "json":
                    content = JSON.stringify(cleanConfig, null, 2);
                    filename = "tailcall-config.json";
                    mimeType = "application/json";
                    break;
                case "yaml":
                    content = convertToYAML(cleanConfig);
                    filename = "tailcall-config.yml";
                    mimeType = "text/yaml";
                    break;
                case "graphql":
                    content = convertToGraphQL(cleanConfig);
                    filename = "tailcall-config.graphql";
                    mimeType = "text/plain";
                    break;
            }
            var blob = new Blob([content], { type: mimeType });
            var url = URL.createObjectURL(blob);
            var link = document.createElement("a");
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            react_hot_toast_1.default.success("Configuration downloaded as ".concat(filename));
        }
        catch (error) {
            react_hot_toast_1.default.error("Failed to download configuration");
            console.error("Download error:", error);
        }
    };
    var formatButtons = [
        { format: "json", icon: lucide_react_1.FileJson, label: "JSON" },
        { format: "yaml", icon: lucide_react_1.FileText, label: "YAML" },
        { format: "graphql", icon: lucide_react_1.Code2, label: "GraphQL" },
    ];
    if (loading) {
        return (react_1.default.createElement("div", { className: "min-h-screen flex items-center justify-center" },
            react_1.default.createElement("div", { className: "text-center" },
                react_1.default.createElement("div", { className: "inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-tailCall-yellow" }),
                react_1.default.createElement("p", { className: "mt-SPACE_04 text-content-medium text-tailCall-dark-100" }, "Loading schema..."))));
    }
    if (!schema) {
        return (react_1.default.createElement("div", { className: "min-h-screen flex items-center justify-center" },
            react_1.default.createElement("div", { className: "text-center" },
                react_1.default.createElement("p", { className: "text-content-medium text-red-600" }, "Failed to load schema"),
                react_1.default.createElement("button", { onClick: loadSchema, className: "mt-SPACE_04 px-SPACE_06 py-SPACE_03 bg-tailCall-yellow text-tailCall-dark-700 rounded-lg font-semibold hover:opacity-90" }, "Retry"))));
    }
    return (react_1.default.createElement("div", { className: "min-h-screen bg-white" },
        react_1.default.createElement(react_hot_toast_1.Toaster, { position: "top-right" }),
        react_1.default.createElement("div", { className: "max-w-7xl mx-auto px-SPACE_04 py-SPACE_08" },
            react_1.default.createElement("div", { className: "mb-SPACE_08" },
                react_1.default.createElement("h1", { className: "text-title-large font-space-grotesk text-tailCall-dark-700 mb-SPACE_03" }, "Tailcall Config Generator"),
                react_1.default.createElement("p", { className: "text-content-medium text-tailCall-dark-100" }, "Generate and customize your Tailcall configuration with ease")),
            react_1.default.createElement("div", { className: "mb-SPACE_06 flex flex-col sm:flex-row gap-SPACE_04 items-start sm:items-center justify-between" },
                react_1.default.createElement("div", { className: "flex gap-SPACE_02" }, formatButtons.map(function (_a) {
                    var format = _a.format, Icon = _a.icon, label = _a.label;
                    return (react_1.default.createElement("button", { key: format, onClick: function () { return setOutputFormat(format); }, className: "flex items-center gap-SPACE_02 px-SPACE_04 py-SPACE_02 rounded-lg border border-solid transition-colors ".concat(outputFormat === format
                            ? "bg-tailCall-yellow border-tailCall-yellow text-tailCall-dark-700"
                            : "bg-white border-tailCall-border-light-500 text-tailCall-dark-100 hover:border-tailCall-border-light-600") },
                        react_1.default.createElement(Icon, { size: 16 }),
                        react_1.default.createElement("span", { className: "text-content-small font-medium" }, label)));
                })),
                react_1.default.createElement("button", { onClick: downloadConfig, className: "flex items-center gap-SPACE_02 px-SPACE_06 py-SPACE_03 bg-tailCall-yellow text-tailCall-dark-700 rounded-lg font-semibold hover:opacity-90 transition-opacity" },
                    react_1.default.createElement(lucide_react_1.Download, { size: 20 }),
                    react_1.default.createElement("span", null, "Download Config"))),
            react_1.default.createElement("div", { className: "bg-tailCall-border-light-100 rounded-lg p-SPACE_06" },
                react_1.default.createElement(SchemaForm_1.default, { schema: schema, config: config, onChange: handleConfigChange })))));
};
exports.default = ConfigGeneratorUI;
