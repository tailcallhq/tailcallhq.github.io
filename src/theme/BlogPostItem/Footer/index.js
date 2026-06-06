"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BlogPostItemFooter;
var react_1 = require("react");
var clsx_1 = require("clsx");
var client_1 = require("@docusaurus/plugin-content-blog/client");
var theme_common_1 = require("@docusaurus/theme-common");
var EditMetaRow_1 = require("@theme/EditMetaRow");
var ReadMoreLink_1 = require("@theme/BlogPostItem/Footer/ReadMoreLink");
var Authors_1 = require("../Header/Authors");
function BlogPostItemFooter() {
    var _a = (0, client_1.useBlogPost)(), metadata = _a.metadata, isBlogPostPage = _a.isBlogPostPage;
    var tags = metadata.tags, title = metadata.title, editUrl = metadata.editUrl, hasTruncateMarker = metadata.hasTruncateMarker, lastUpdatedBy = metadata.lastUpdatedBy, lastUpdatedAt = metadata.lastUpdatedAt;
    // A post is truncated if it's in the "list view" and it has a truncate marker
    var truncatedPost = !isBlogPostPage && hasTruncateMarker;
    var tagsExists = tags.length > 0;
    var renderFooter = tagsExists || truncatedPost || editUrl;
    if (!renderFooter) {
        return null;
    }
    // BlogPost footer - details view
    if (isBlogPostPage) {
        var canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);
        return (react_1.default.createElement("footer", { className: "docusaurus-mt-lg" },
            react_1.default.createElement("h1", { className: "text-[12px]" }, "Posted By"),
            react_1.default.createElement(Authors_1.default, null),
            canDisplayEditMetaRow && (react_1.default.createElement(EditMetaRow_1.default, { className: (0, clsx_1.default)("margin-top--sm", theme_common_1.ThemeClassNames.blog.blogFooterEditMetaRow), editUrl: editUrl, lastUpdatedAt: lastUpdatedAt, lastUpdatedBy: lastUpdatedBy }))));
    }
    // BlogPost footer - list view
    else {
        return (react_1.default.createElement("footer", { className: "row docusaurus-mt-lg" }, truncatedPost && (react_1.default.createElement("div", { className: (0, clsx_1.default)("col text--right", {
                "col--3": tagsExists,
            }) },
            react_1.default.createElement(ReadMoreLink_1.default, { blogPostTitle: title, to: metadata.permalink })))));
    }
}
