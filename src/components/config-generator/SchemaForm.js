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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var SearchableSelect_1 = require("./SearchableSelect");
var SchemaForm = function (_a) {
    var schema = _a.schema, config = _a.config, onChange = _a.onChange;
    var _b = (0, react_1.useState)(new Set(["server", "upstream"])), expandedSections = _b[0], setExpandedSections = _b[1];
    var toggleSection = function (key) {
        var newExpanded = new Set(expandedSections);
        if (newExpanded.has(key)) {
            newExpanded.delete(key);
        }
        else {
            newExpanded.add(key);
        }
        setExpandedSections(newExpanded);
    };
    var updateConfig = function (path, value) {
        var newConfig = __assign({}, config);
        var current = newConfig;
        for (var i = 0; i < path.length - 1; i++) {
            if (!current[path[i]]) {
                current[path[i]] = {};
            }
            current = current[path[i]];
        }
        if (value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) {
            delete current[path[path.length - 1]];
        }
        else {
            current[path[path.length - 1]] = value;
        }
        onChange(newConfig);
    };
    var renderField = function (key, property, path, value, required) {
        if (required === void 0) { required = false; }
        var fieldPath = __spreadArray(__spreadArray([], path, true), [key], false);
        var fieldId = fieldPath.join(".");
        // Handle references
        if (property.$ref) {
            var refPath = property.$ref.split("/").slice(1);
            var refSchema = schema;
            for (var _i = 0, refPath_1 = refPath; _i < refPath_1.length; _i++) {
                var part = refPath_1[_i];
                refSchema = refSchema[part];
            }
            if (refSchema) {
                return renderField(key, refSchema, path, value, required);
            }
        }
        // Handle anyOf, oneOf, allOf
        if (property.anyOf || property.oneOf) {
            var options = property.anyOf || property.oneOf;
            // Use the first non-null option as the primary schema
            var primaryOption = options.find(function (opt) { return opt.type !== "null"; }) || options[0];
            return renderField(key, primaryOption, path, value, required);
        }
        var type = property.type;
        var description = property.description;
        // Arrays
        if (type === "array" || Array.isArray(type) && type.includes("array")) {
            return renderArrayField(key, property, fieldPath, value || [], description, required);
        }
        // Objects
        if (type === "object" || property.properties) {
            return renderObjectField(key, property, fieldPath, value || {}, description, required);
        }
        // Enums
        if (property.enum) {
            return renderEnumField(key, property, fieldPath, value, description, required);
        }
        // Booleans
        if (type === "boolean" || (Array.isArray(type) && type.includes("boolean"))) {
            return renderBooleanField(key, fieldPath, value, description, required);
        }
        // Numbers
        if (type === "number" || type === "integer" || (Array.isArray(type) && (type.includes("number") || type.includes("integer")))) {
            return renderNumberField(key, property, fieldPath, value, description, required);
        }
        // Strings
        return renderStringField(key, property, fieldPath, value, description, required);
    };
    var renderStringField = function (key, property, path, value, description, required) {
        if (required === void 0) { required = false; }
        return (react_1.default.createElement("div", { key: path.join("."), className: "mb-SPACE_04" },
            react_1.default.createElement("label", { className: "block text-content-small font-medium text-tailCall-dark-700 mb-SPACE_02" },
                formatLabel(key),
                required && react_1.default.createElement("span", { className: "text-red-500 ml-1" }, "*")),
            description && (react_1.default.createElement("div", { className: "flex items-start gap-SPACE_02 mb-SPACE_02 text-content-tiny text-tailCall-dark-100" },
                react_1.default.createElement(lucide_react_1.Info, { size: 14, className: "mt-0.5 flex-shrink-0" }),
                react_1.default.createElement("span", null, description))),
            react_1.default.createElement("input", { type: "text", value: value || "", onChange: function (e) { return updateConfig(path, e.target.value); }, placeholder: property.default || "Enter ".concat(formatLabel(key).toLowerCase()), className: "w-full px-SPACE_04 py-SPACE_03 border border-solid border-tailCall-border-light-500 rounded-lg text-content-small outline-none focus:border-tailCall-yellow" })));
    };
    var renderNumberField = function (key, property, path, value, description, required) {
        var _a;
        if (required === void 0) { required = false; }
        return (react_1.default.createElement("div", { key: path.join("."), className: "mb-SPACE_04" },
            react_1.default.createElement("label", { className: "block text-content-small font-medium text-tailCall-dark-700 mb-SPACE_02" },
                formatLabel(key),
                required && react_1.default.createElement("span", { className: "text-red-500 ml-1" }, "*")),
            description && (react_1.default.createElement("div", { className: "flex items-start gap-SPACE_02 mb-SPACE_02 text-content-tiny text-tailCall-dark-100" },
                react_1.default.createElement(lucide_react_1.Info, { size: 14, className: "mt-0.5 flex-shrink-0" }),
                react_1.default.createElement("span", null, description))),
            react_1.default.createElement("input", { type: "number", value: value !== null && value !== void 0 ? value : "", onChange: function (e) {
                    var val = e.target.value === "" ? undefined : property.type === "integer" ? parseInt(e.target.value) : parseFloat(e.target.value);
                    updateConfig(path, val);
                }, min: property.minimum, max: property.maximum, step: property.type === "integer" ? 1 : 0.1, placeholder: ((_a = property.default) === null || _a === void 0 ? void 0 : _a.toString()) || "Enter ".concat(formatLabel(key).toLowerCase()), className: "w-full px-SPACE_04 py-SPACE_03 border border-solid border-tailCall-border-light-500 rounded-lg text-content-small outline-none focus:border-tailCall-yellow" })));
    };
    var renderBooleanField = function (key, path, value, description, required) {
        if (required === void 0) { required = false; }
        return (react_1.default.createElement("div", { key: path.join("."), className: "mb-SPACE_04" },
            react_1.default.createElement("label", { className: "flex items-center gap-SPACE_03 cursor-pointer" },
                react_1.default.createElement("input", { type: "checkbox", checked: value || false, onChange: function (e) { return updateConfig(path, e.target.checked); }, className: "w-5 h-5 rounded border-tailCall-border-light-500 text-tailCall-yellow focus:ring-tailCall-yellow cursor-pointer" }),
                react_1.default.createElement("span", { className: "text-content-small font-medium text-tailCall-dark-700" },
                    formatLabel(key),
                    required && react_1.default.createElement("span", { className: "text-red-500 ml-1" }, "*"))),
            description && (react_1.default.createElement("div", { className: "flex items-start gap-SPACE_02 mt-SPACE_02 ml-8 text-content-tiny text-tailCall-dark-100" },
                react_1.default.createElement(lucide_react_1.Info, { size: 14, className: "mt-0.5 flex-shrink-0" }),
                react_1.default.createElement("span", null, description)))));
    };
    var renderEnumField = function (key, property, path, value, description, required) {
        if (required === void 0) { required = false; }
        var options = property.enum.map(function (val) { return ({
            value: val,
            label: String(val),
        }); });
        return (react_1.default.createElement("div", { key: path.join("."), className: "mb-SPACE_04" },
            react_1.default.createElement("label", { className: "block text-content-small font-medium text-tailCall-dark-700 mb-SPACE_02" },
                formatLabel(key),
                required && react_1.default.createElement("span", { className: "text-red-500 ml-1" }, "*")),
            description && (react_1.default.createElement("div", { className: "flex items-start gap-SPACE_02 mb-SPACE_02 text-content-tiny text-tailCall-dark-100" },
                react_1.default.createElement(lucide_react_1.Info, { size: 14, className: "mt-0.5 flex-shrink-0" }),
                react_1.default.createElement("span", null, description))),
            react_1.default.createElement(SearchableSelect_1.default, { options: options, value: value, onChange: function (val) { return updateConfig(path, val); }, placeholder: "Select ".concat(formatLabel(key).toLowerCase()) })));
    };
    var renderArrayField = function (key, property, path, value, description, required) {
        if (required === void 0) { required = false; }
        var items = property.items || {};
        var isExpanded = expandedSections.has(path.join("."));
        var addItem = function () {
            var newValue = __spreadArray([], value, true);
            // Initialize new item based on type
            if (items.type === "object" || items.properties) {
                newValue.push({});
            }
            else if (items.type === "array") {
                newValue.push([]);
            }
            else if (items.type === "boolean") {
                newValue.push(false);
            }
            else if (items.type === "number" || items.type === "integer") {
                newValue.push(0);
            }
            else {
                newValue.push("");
            }
            updateConfig(path, newValue);
        };
        var removeItem = function (index) {
            var newValue = value.filter(function (_, i) { return i !== index; });
            updateConfig(path, newValue.length > 0 ? newValue : undefined);
        };
        var updateItem = function (index, itemValue) {
            var newValue = __spreadArray([], value, true);
            newValue[index] = itemValue;
            updateConfig(path, newValue);
        };
        return (react_1.default.createElement("div", { key: path.join("."), className: "mb-SPACE_04 border border-solid border-tailCall-border-light-500 rounded-lg p-SPACE_04" },
            react_1.default.createElement("div", { className: "flex items-start justify-between mb-SPACE_03" },
                react_1.default.createElement("div", { className: "flex-1" },
                    react_1.default.createElement("button", { onClick: function () { return toggleSection(path.join(".")); }, className: "flex items-center gap-SPACE_02 text-content-small font-medium text-tailCall-dark-700 hover:text-tailCall-dark-500" },
                        isExpanded ? react_1.default.createElement(lucide_react_1.ChevronDown, { size: 16 }) : react_1.default.createElement(lucide_react_1.ChevronRight, { size: 16 }),
                        formatLabel(key),
                        required && react_1.default.createElement("span", { className: "text-red-500 ml-1" }, "*"),
                        react_1.default.createElement("span", { className: "text-content-tiny text-tailCall-dark-100 ml-2" },
                            "(",
                            value.length,
                            " items)")),
                    description && (react_1.default.createElement("div", { className: "flex items-start gap-SPACE_02 mt-SPACE_02 text-content-tiny text-tailCall-dark-100" },
                        react_1.default.createElement(lucide_react_1.Info, { size: 14, className: "mt-0.5 flex-shrink-0" }),
                        react_1.default.createElement("span", null, description)))),
                react_1.default.createElement("button", { onClick: addItem, className: "flex items-center gap-SPACE_02 px-SPACE_03 py-SPACE_01 bg-tailCall-yellow text-tailCall-dark-700 rounded text-content-tiny font-medium hover:opacity-90" },
                    react_1.default.createElement(lucide_react_1.Plus, { size: 14 }),
                    "Add")),
            isExpanded && value.length > 0 && (react_1.default.createElement("div", { className: "space-y-SPACE_03 mt-SPACE_03" }, value.map(function (item, index) { return (react_1.default.createElement("div", { key: index, className: "bg-white rounded p-SPACE_03 border border-solid border-tailCall-border-light-300" },
                react_1.default.createElement("div", { className: "flex items-start justify-between mb-SPACE_02" },
                    react_1.default.createElement("span", { className: "text-content-tiny font-medium text-tailCall-dark-700" },
                        "Item ",
                        index + 1),
                    react_1.default.createElement("button", { onClick: function () { return removeItem(index); }, className: "text-red-500 hover:text-red-700", title: "Remove item" },
                        react_1.default.createElement(lucide_react_1.Trash2, { size: 14 }))),
                renderArrayItemField(items, __spreadArray(__spreadArray([], path, true), [index.toString()], false), item, function (val) { return updateItem(index, val); }))); })))));
    };
    var renderArrayItemField = function (itemSchema, path, value, onChange) {
        // Handle references
        if (itemSchema.$ref) {
            var refPath = itemSchema.$ref.split("/").slice(1);
            var refSchema = schema;
            for (var _i = 0, refPath_2 = refPath; _i < refPath_2.length; _i++) {
                var part = refPath_2[_i];
                refSchema = refSchema[part];
            }
            if (refSchema) {
                itemSchema = refSchema;
            }
        }
        if (itemSchema.type === "object" || itemSchema.properties) {
            var properties_1 = itemSchema.properties || {};
            var required_1 = itemSchema.required || [];
            return (react_1.default.createElement("div", { className: "space-y-SPACE_03" }, Object.entries(properties_1).map(function (_a) {
                var propKey = _a[0], propSchema = _a[1];
                var propValue = value === null || value === void 0 ? void 0 : value[propKey];
                return renderField(propKey, propSchema, path, propValue, required_1.includes(propKey));
            })));
        }
        if (itemSchema.enum) {
            var options = itemSchema.enum.map(function (val) { return ({
                value: val,
                label: String(val),
            }); });
            return (react_1.default.createElement(SearchableSelect_1.default, { options: options, value: value, onChange: onChange, placeholder: "Select value" }));
        }
        if (itemSchema.type === "boolean") {
            return (react_1.default.createElement("label", { className: "flex items-center gap-SPACE_02 cursor-pointer" },
                react_1.default.createElement("input", { type: "checkbox", checked: value || false, onChange: function (e) { return onChange(e.target.checked); }, className: "w-4 h-4 rounded border-tailCall-border-light-500 text-tailCall-yellow focus:ring-tailCall-yellow cursor-pointer" }),
                react_1.default.createElement("span", { className: "text-content-small" }, "Enabled")));
        }
        if (itemSchema.type === "number" || itemSchema.type === "integer") {
            return (react_1.default.createElement("input", { type: "number", value: value !== null && value !== void 0 ? value : "", onChange: function (e) {
                    var val = e.target.value === "" ? undefined : itemSchema.type === "integer" ? parseInt(e.target.value) : parseFloat(e.target.value);
                    onChange(val);
                }, className: "w-full px-SPACE_03 py-SPACE_02 border border-solid border-tailCall-border-light-500 rounded text-content-small outline-none focus:border-tailCall-yellow" }));
        }
        return (react_1.default.createElement("input", { type: "text", value: value || "", onChange: function (e) { return onChange(e.target.value); }, className: "w-full px-SPACE_03 py-SPACE_02 border border-solid border-tailCall-border-light-500 rounded text-content-small outline-none focus:border-tailCall-yellow" }));
    };
    var renderObjectField = function (key, property, path, value, description, required) {
        if (required === void 0) { required = false; }
        var properties = property.properties || {};
        var requiredFields = property.required || [];
        var isExpanded = expandedSections.has(path.join("."));
        if (Object.keys(properties).length === 0) {
            // Free-form object
            return renderStringField(key, property, path, value ? JSON.stringify(value) : "", description, required);
        }
        return (react_1.default.createElement("div", { key: path.join("."), className: "mb-SPACE_04 border border-solid border-tailCall-border-light-500 rounded-lg p-SPACE_04" },
            react_1.default.createElement("button", { onClick: function () { return toggleSection(path.join(".")); }, className: "flex items-center gap-SPACE_02 text-content-small font-medium text-tailCall-dark-700 hover:text-tailCall-dark-500 mb-SPACE_03" },
                isExpanded ? react_1.default.createElement(lucide_react_1.ChevronDown, { size: 16 }) : react_1.default.createElement(lucide_react_1.ChevronRight, { size: 16 }),
                formatLabel(key),
                required && react_1.default.createElement("span", { className: "text-red-500 ml-1" }, "*")),
            description && (react_1.default.createElement("div", { className: "flex items-start gap-SPACE_02 mb-SPACE_03 text-content-tiny text-tailCall-dark-100" },
                react_1.default.createElement(lucide_react_1.Info, { size: 14, className: "mt-0.5 flex-shrink-0" }),
                react_1.default.createElement("span", null, description))),
            isExpanded && (react_1.default.createElement("div", { className: "ml-SPACE_04 space-y-SPACE_03" }, Object.entries(properties).map(function (_a) {
                var propKey = _a[0], propSchema = _a[1];
                var propValue = value === null || value === void 0 ? void 0 : value[propKey];
                return renderField(propKey, propSchema, path, propValue, requiredFields.includes(propKey));
            })))));
    };
    var formatLabel = function (key) {
        return key
            .split(/(?=[A-Z])|_/)
            .map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1); })
            .join(" ");
    };
    var properties = schema.properties || {};
    var requiredFields = schema.required || [];
    return (react_1.default.createElement("div", { className: "space-y-SPACE_04" },
        react_1.default.createElement("div", { className: "mb-SPACE_06" },
            react_1.default.createElement("h2", { className: "text-title-medium text-tailCall-dark-700 mb-SPACE_02" }, "Configuration Fields"),
            react_1.default.createElement("p", { className: "text-content-small text-tailCall-dark-100" }, "Configure your Tailcall setup. Expand sections to see more options.")),
        Object.entries(properties)
            .sort(function (_a, _b) {
            var keyA = _a[0];
            var keyB = _b[0];
            // Sort to show important fields first
            var priority = {
                server: 1,
                upstream: 2,
                schema: 3,
                links: 4,
            };
            return (priority[keyA] || 99) - (priority[keyB] || 99);
        })
            .map(function (_a) {
            var key = _a[0], property = _a[1];
            var value = config[key];
            return renderField(key, property, [], value, requiredFields.includes(key));
        })));
};
exports.default = SchemaForm;
