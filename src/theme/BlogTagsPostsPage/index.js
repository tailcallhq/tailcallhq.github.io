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
exports.default = BlogTagsPostsPage;
var react_1 = require("react");
var clsx_1 = require("clsx");
var Translate_1 = require("@docusaurus/Translate");
var theme_common_1 = require("@docusaurus/theme-common");
var SearchMetadata_1 = require("@theme/SearchMetadata");
var BlogPostList_1 = require("../BlogPostList");
var Layout_1 = require("@theme/Layout");
var TagSelectionModal_1 = require("@site/src/components/blog/TagSelectionModal/TagSelectionModal");
// Very simple pluralization: probably good enough for now
function useBlogPostsPlural() {
    var selectMessage = (0, theme_common_1.usePluralForm)().selectMessage;
    return function (count) {
        return selectMessage(count, (0, Translate_1.translate)({
            id: "theme.blog.post.plurals",
            description: 'Pluralized label for "{count} posts". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
            message: "One post|{count} posts",
        }, { count: count }));
    };
}
function useBlogTagsPostsPageTitle(tag) {
    var blogPostsPlural = useBlogPostsPlural();
    return (0, Translate_1.translate)({
        id: "theme.blog.tagTitle",
        description: "The title of the page for a blog tag",
        message: '{nPosts} tagged with "{tagName}"',
    }, { nPosts: blogPostsPlural(tag.count), tagName: tag.label });
}
function BlogTagsPostsPageMetadata(_a) {
    var tag = _a.tag;
    var title = useBlogTagsPostsPageTitle(tag);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(theme_common_1.PageMetadata, { title: title, description: tag.description }),
        react_1.default.createElement(SearchMetadata_1.default, { tag: "blog_tags_posts" })));
}
function BlogTagsPostsPageContent(_a) {
    var tag = _a.tag, items = _a.items;
    var _b = (0, react_1.useState)(false), showTagsModal = _b[0], setShowTagsModal = _b[1];
    var openTagSelectionModal = (0, react_1.useCallback)(function () {
        setShowTagsModal(true);
    }, []);
    var closeTagSelectionModal = (0, react_1.useCallback)(function () {
        setShowTagsModal(false);
    }, []);
    return (react_1.default.createElement(Layout_1.default, null,
        react_1.default.createElement("div", { className: "container mx-auto mt-3 mb-10 md:my-8 px-4 md:w-8/12" },
            react_1.default.createElement("div", { className: "flex flex-col md:flex-row gap-2 mb-5" },
                react_1.default.createElement("span", { className: "text-title-medium text-tailCall-light-600" }, "Results for"),
                react_1.default.createElement("span", { className: "flex items-center justify-between flex-1" },
                    react_1.default.createElement("span", { className: "text-content-small px-3 py-1 text-tailCall-dark-100 rounded-full bg-tailCall-light-200" }, tag.label),
                    react_1.default.createElement("span", { className: "text-content-small text-tailCall-dark-500 underline cursor-pointer", onClick: openTagSelectionModal }, "See all Tags"))),
            react_1.default.createElement(BlogPostList_1.default, { items: items })),
        react_1.default.createElement(TagSelectionModal_1.default, { open: showTagsModal, onClose: closeTagSelectionModal })));
}
function BlogTagsPostsPage(props) {
    return (react_1.default.createElement(theme_common_1.HtmlClassNameProvider, { className: (0, clsx_1.default)(theme_common_1.ThemeClassNames.wrapper.blogPages, theme_common_1.ThemeClassNames.page.blogTagPostListPage) },
        react_1.default.createElement(BlogTagsPostsPageMetadata, __assign({}, props)),
        react_1.default.createElement(BlogTagsPostsPageContent, __assign({}, props))));
}
