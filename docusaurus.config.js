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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
var prism_react_renderer_1 = require("prism-react-renderer");
var theme_1 = require("./src/theme/CodeBlock/theme");
var utils_1 = require("./src/utils");
var title = "Tailcall";
var organization = "tailcallhq";
var project = "tailcallhq.github.io";
exports.default = {
    title: title,
    trailingSlash: true,
    tagline: "GraphQL platform engineered for scale",
    headTags: [
        {
            tagName: "script",
            attributes: {
                id: "chatbotscript",
                "data-accountid": "CZPG9aVdtk59Tjz4SMTu8w==",
                "data-websiteid": "75VGI0NlBqessD4BQn2pFg==",
                src: "https://app.robofy.ai/bot/js/common.js?v=" + new Date().getTime(),
            },
        },
        {
            tagName: "script",
            attributes: {
                type: "application/ld+json",
            },
            innerHTML: JSON.stringify({
                "@context": "https://schema.org/",
                "@type": "WebSite",
                name: "Tailcall",
                url: "https://tailcall.run/",
            }),
        },
    ],
    url: "https://tailcall.run",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "throw",
    onBrokenAnchors: "throw",
    favicon: "images/favicon.ico",
    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: organization, // Usually your GitHub org/user name.
    projectName: project, // Usually your repo name.
    deploymentBranch: "main", // Branch that GitHub pages will deploy from.
    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
        localeConfigs: {
            en: {
                label: "English",
            },
        },
    },
    future: {
        experimental_faster: false, // Required for faster production builds. For reference: https://docusaurus.io/blog/releases/3.6#adoption-strategy
    },
    presets: [
        [
            "classic",
            /** @type {import("@docusaurus/preset-classic").Options} */
            {
                docs: {
                    // docRootComponent: require.resolve("./src/components/docs/Layout.tsx"),
                    sidebarPath: require.resolve("./sidebars.ts"),
                    showLastUpdateTime: true,
                    sidebarCollapsible: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: "https://github.com/".concat(organization, "/").concat(project, "/tree/develop"),
                },
                blog: false,
                theme: {
                    customCss: require.resolve("./src/css/custom.css"),
                },
                sitemap: {
                    changefreq: "weekly",
                    priority: 0.5,
                    ignorePatterns: ["/blogs/**"],
                },
            },
        ],
    ],
    themeConfig: {
        // Replace with your project's social card
        image: "icons/companies/tailcall.svg",
        algolia: {
            appId: "X27WDVHRQ3",
            apiKey: "35bc100f239853cd8a7195b23ed7393b",
            indexName: "tailcall",
            contextualSearch: false,
            searchParameters: {
                facetFilters: [],
            },
        },
        navbar: {
            hideOnScroll: true,
            logo: {
                alt: "My Site Logo",
                src: "icons/companies/tailcall.svg",
            },
            items: [
                { to: "/", label: "Home", position: "left", activeBaseRegex: "^/$" },
                // {to: "/about", label: "About", position: "left"},
                // {to: "/enterprise", label: "Enterprise", position: "left"},
                { to: "/blog", label: "Blog", position: "left" },
                {
                    label: "Developers",
                    position: "left",
                    items: [
                        {
                            to: "/docs",
                            html: (0, utils_1.getNavDropdownItemHtml)("/images/home/book.svg", "Docs Icon", "Docs"),
                        },
                        {
                            to: "/graphql",
                            html: (0, utils_1.getNavDropdownItemHtml)("/images/home/archive.svg", "Learn Icon", "Learn"),
                        },
                        {
                            to: "/releases",
                            html: (0, utils_1.getNavDropdownItemHtml)("/images/home/git-merge.svg", "Releases Icon", "Releases"),
                        },
                    ],
                },
                {
                    type: "search",
                    position: "right",
                    className: "hidden lg:flex search-icon-navbar",
                },
            ],
        },
        prism: {
            theme: theme_1.default,
            darkTheme: prism_react_renderer_1.themes.dracula,
            additionalLanguages: ["protobuf", "json", "diff"],
        },
        colorMode: {
            disableSwitch: true,
            defaultMode: "light",
            respectPrefersColorScheme: false,
        },
        tableOfContents: {},
    },
    plugins: [
        [
            "./plugins/custom-blog-plugin.ts",
            {
                path: "blog",
                editLocalizedFiles: false,
                blogTitle: "Feed of Tailcall blogs",
                blogDescription: "List of blog posts on Tailcall blog",
                blogSidebarCount: 10,
                blogSidebarTitle: "Recent Blog Posts",
                routeBasePath: "blog",
                include: ["**/*.{md,mdx}"],
                exclude: ["**/_*.{js,jsx,ts,tsx,md,mdx}", "**/_*/**", "**/*.test.{js,jsx,ts,tsx}", "**/__tests__/**"],
                postsPerPage: "ALL",
                blogListComponent: "@theme/BlogListPage",
                blogPostComponent: "@theme/BlogPostPage",
                blogTagsListComponent: "@theme/BlogTagsListPage",
                blogTagsPostsComponent: "@theme/BlogTagsPostsPage",
                rehypePlugins: [],
                beforeDefaultRemarkPlugins: [],
                beforeDefaultRehypePlugins: [],
                truncateMarker: /<!--\s*(truncate)\s*-->/,
                showReadingTime: true,
                feedOptions: {
                    type: "all",
                    copyright: "Copyright \u00A9 ".concat(new Date().getFullYear(), " Tailcall, Inc."),
                },
                onInlineAuthors: "throw",
            },
        ],
        [
            "@docusaurus/plugin-content-docs",
            {
                id: "privacy",
                path: "privacy",
                routeBasePath: "privacy",
                showLastUpdateTime: true,
                sidebarPath: require.resolve("./privacy/sidebar.ts"),
            },
        ],
        [
            "@docusaurus/plugin-content-docs",
            {
                id: "graphql",
                path: "graphql",
                routeBasePath: "graphql",
                showLastUpdateTime: true,
                sidebarPath: require.resolve("./graphql/sidebar.ts"),
            },
        ],
        [
            "@docusaurus/plugin-content-docs",
            {
                id: "releases",
                path: "releases",
                routeBasePath: "releases",
                showLastUpdateTime: true,
                sidebarItemsGenerator: function (_a) {
                    return __awaiter(this, void 0, void 0, function () {
                        var sidebarItems;
                        var defaultSidebarItemsGenerator = _a.defaultSidebarItemsGenerator, args = __rest(_a, ["defaultSidebarItemsGenerator"]);
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, defaultSidebarItemsGenerator(args)];
                                case 1:
                                    sidebarItems = _b.sent();
                                    return [2 /*return*/, sidebarItems.reverse()];
                            }
                        });
                    });
                },
            },
        ],
        function tailwindPlugin() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, {
                            name: "docusaurus-tailwindcss",
                            configurePostCss: function (postcssOptions) {
                                return __assign(__assign({}, postcssOptions), { plugins: __spreadArray(__spreadArray([], postcssOptions.plugins, true), [require("tailwindcss"), require("autoprefixer")], false) });
                            },
                        }];
                });
            });
        },
    ],
};
