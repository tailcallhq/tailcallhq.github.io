"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8401],{33768:(e,t,n)=>{n.r(t),n.d(t,{default:()=>ie});var s=n(96540),a=n(61213),i=n(89532),o=n(74848);const l=s.createContext(null);function r(e){let{children:t,content:n}=e;const a=function(e){return(0,s.useMemo)((()=>({metadata:e.metadata,frontMatter:e.frontMatter,assets:e.assets,contentTitle:e.contentTitle,toc:e.toc})),[e])}(n);return(0,o.jsx)(l.Provider,{value:a,children:t})}function c(){const e=(0,s.useContext)(l);if(null===e)throw new i.dV("DocProvider");return e}function d(){const{metadata:e,frontMatter:t,assets:n}=c();return(0,o.jsx)(a.be,{title:e.title,description:e.description,keywords:t.keywords,image:n.image??t.image})}var m=n(34164),u=n(24581),h=n(21312),v=n(39022);function b(e){const{previous:t,next:n}=e;return(0,o.jsxs)("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,h.T)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages",description:"The ARIA label for the docs pagination"}),children:[t&&(0,o.jsx)(v.A,{...t,subLabel:(0,o.jsx)(h.A,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc",children:"Previous"})}),n&&(0,o.jsx)(v.A,{...n,subLabel:(0,o.jsx)(h.A,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc",children:"Next"}),isNext:!0})]})}function x(){const{metadata:e}=c();return(0,o.jsx)(b,{previous:e.previous,next:e.next})}var p=n(44586),g=n(28774),f=n(48295),j=n(17559),C=n(55597),N=n(32252);const L={unreleased:function(e){let{siteTitle:t,versionMetadata:n}=e;return(0,o.jsx)(h.A,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:(0,o.jsx)("b",{children:n.label})},children:"This is unreleased documentation for {siteTitle} {versionLabel} version."})},unmaintained:function(e){let{siteTitle:t,versionMetadata:n}=e;return(0,o.jsx)(h.A,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:(0,o.jsx)("b",{children:n.label})},children:"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained."})}};function A(e){const t=L[e.versionMetadata.banner];return(0,o.jsx)(t,{...e})}function _(e){let{versionLabel:t,to:n,onClick:s}=e;return(0,o.jsx)(h.A,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:(0,o.jsx)("b",{children:(0,o.jsx)(g.A,{to:n,onClick:s,children:(0,o.jsx)(h.A,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label",children:"latest version"})})})},children:"For up-to-date documentation, see the {latestVersionLink} ({versionLabel})."})}function k(e){let{className:t,versionMetadata:n}=e;const{siteConfig:{title:s}}=(0,p.A)(),{pluginId:a}=(0,f.vT)({failfast:!0}),{savePreferredVersionName:i}=(0,C.g1)(a),{latestDocSuggestion:l,latestVersionSuggestion:r}=(0,f.HW)(a),c=l??(d=r).docs.find((e=>e.id===d.mainDocId));var d;return(0,o.jsxs)("div",{className:(0,m.A)(t,j.G.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert",children:[(0,o.jsx)("div",{children:(0,o.jsx)(A,{siteTitle:s,versionMetadata:n})}),(0,o.jsx)("div",{className:"margin-top--md",children:(0,o.jsx)(_,{versionLabel:r.label,to:c.path,onClick:()=>i(r.name)})})]})}function T(e){let{className:t}=e;const n=(0,N.r)();return n.banner?(0,o.jsx)(k,{className:t,versionMetadata:n}):null}function H(e){let{className:t}=e;const n=(0,N.r)();return n.badge?(0,o.jsx)("span",{className:(0,m.A)(t,j.G.docs.docVersionBadge,"badge badge--secondary"),children:(0,o.jsx)(h.A,{id:"theme.docs.versionBadge.label",values:{versionLabel:n.label},children:"Version: {versionLabel}"})}):null}var y=n(62053),w=n(4336);function M(){const{metadata:e}=c(),{editUrl:t,lastUpdatedAt:n,lastUpdatedBy:s,tags:a}=e,i=a.length>0,l=!!(t||n||s);return i||l?(0,o.jsxs)("footer",{className:(0,m.A)(j.G.docs.docFooter,"docusaurus-mt-lg"),children:[i&&(0,o.jsx)("div",{className:(0,m.A)("row margin-top--sm",j.G.docs.docFooterTagsRow),children:(0,o.jsx)("div",{className:"col",children:(0,o.jsx)(y.A,{tags:a})})}),l&&(0,o.jsx)(w.A,{className:(0,m.A)("margin-top--sm",j.G.docs.docFooterEditMetaRow),editUrl:t,lastUpdatedAt:n,lastUpdatedBy:s})]}):null}var I=n(41422),E=n(65195);const B={tocCollapsibleButton:"tocCollapsibleButton_TO0P",tocCollapsibleButtonExpanded:"tocCollapsibleButtonExpanded_MG3E"};function O(e){let{collapsed:t,...n}=e;return(0,o.jsx)("button",{type:"button",...n,className:(0,m.A)("clean-btn",B.tocCollapsibleButton,!t&&B.tocCollapsibleButtonExpanded,n.className),children:(0,o.jsx)(h.A,{id:"theme.TOCCollapsible.toggleButtonLabel",description:"The label used by the button on the collapsible TOC component",children:"On this page"})})}const S={tocCollapsible:"tocCollapsible_ETCw",tocCollapsibleContent:"tocCollapsibleContent_vkbj",tocCollapsibleExpanded:"tocCollapsibleExpanded_sAul"};function P(e){let{toc:t,className:n,minHeadingLevel:s,maxHeadingLevel:a}=e;const{collapsed:i,toggleCollapsed:l}=(0,I.u)({initialState:!0});return(0,o.jsxs)("div",{className:(0,m.A)(S.tocCollapsible,!i&&S.tocCollapsibleExpanded,n),children:[(0,o.jsx)(O,{collapsed:i,onClick:l}),(0,o.jsx)(I.N,{lazy:!0,className:S.tocCollapsibleContent,collapsed:i,children:(0,o.jsx)(E.A,{toc:t,minHeadingLevel:s,maxHeadingLevel:a})})]})}const G={tocMobile:"tocMobile_ITEo"};function V(){const{toc:e,frontMatter:t}=c();return(0,o.jsx)(P,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:(0,m.A)(j.G.docs.docTocMobile,G.tocMobile)})}var R=n(67763);function U(){const{toc:e,frontMatter:t}=c();return(0,o.jsx)(R.A,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:j.G.docs.docTocDesktop})}var D=n(51107),F=n(72857);function z(e){let{children:t}=e;const n=function(){const{metadata:e,frontMatter:t,contentTitle:n}=c();return t.hide_title||void 0!==n?null:e.title}();return(0,o.jsxs)("div",{className:(0,m.A)(j.G.docs.docMarkdown,"markdown"),children:[n&&(0,o.jsx)("header",{children:(0,o.jsx)(D.A,{as:"h1",children:n})}),(0,o.jsx)(F.A,{children:t})]})}var q=n(84142),$=n(99169),J=n(86025);function Q(e){return(0,o.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,o.jsx)("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"})})}const W={breadcrumbHomeIcon:"breadcrumbHomeIcon_YNFT"};function Y(){const e=(0,J.Ay)("/");return(0,o.jsx)("li",{className:"breadcrumbs__item",children:(0,o.jsx)(g.A,{"aria-label":(0,h.T)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:"breadcrumbs__link",href:e,children:(0,o.jsx)(Q,{className:W.breadcrumbHomeIcon})})})}const Z={breadcrumbsContainer:"breadcrumbsContainer_Z_bl"};function K(e){let{children:t,href:n,isLast:s}=e;const a="breadcrumbs__link";return s?(0,o.jsx)("span",{className:a,itemProp:"name",children:t}):n?(0,o.jsx)(g.A,{className:a,href:n,itemProp:"item",children:(0,o.jsx)("span",{itemProp:"name",children:t})}):(0,o.jsx)("span",{className:a,children:t})}function X(e){let{children:t,active:n,index:s,addMicrodata:a}=e;return(0,o.jsxs)("li",{...a&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"},className:(0,m.A)("breadcrumbs__item",{"breadcrumbs__item--active":n}),children:[t,(0,o.jsx)("meta",{itemProp:"position",content:String(s+1)})]})}function ee(){const e=(0,q.OF)(),t=(0,$.Dt)();return e?(0,o.jsx)("nav",{className:(0,m.A)(j.G.docs.docBreadcrumbs,Z.breadcrumbsContainer),"aria-label":(0,h.T)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"}),children:(0,o.jsxs)("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList",children:[t&&(0,o.jsx)(Y,{}),e.map(((t,n)=>{const s=n===e.length-1,a="category"===t.type&&t.linkUnlisted?void 0:t.href;return(0,o.jsx)(X,{active:s,index:n,addMicrodata:!!a,children:(0,o.jsx)(K,{href:a,isLast:s,children:t.label})},n)}))]})}):null}const te={docItemContainer:"docItemContainer_c0TR",docItemCol:"docItemCol_z5aJ"};function ne({id:e,host:t,repo:a,repoId:i,category:l,categoryId:r,mapping:c,term:d,strict:m,reactionsEnabled:u,emitMetadata:h,inputPosition:v,theme:b,lang:x,loading:p}){const[g,f]=(0,s.useState)(!1);return(0,s.useEffect)((()=>{g||(n.e(1135).then(n.bind(n,1135)),f(!0))}),[]),g?(0,o.jsx)("giscus-widget",{id:e,host:t,repo:a,repoid:i,category:l,categoryid:r,mapping:c,term:d,strict:m,reactionsenabled:u,emitmetadata:h,inputposition:v,theme:b,lang:x,loading:p}):null}var se=n(95293);function ae(e){let{children:t}=e;const n=function(){const{frontMatter:e,toc:t}=c(),n=(0,u.l)(),s=e.hide_table_of_contents,a=!s&&t.length>0;return{hidden:s,mobile:a?(0,o.jsx)(V,{}):void 0,desktop:!a||"desktop"!==n&&"ssr"!==n?void 0:(0,o.jsx)(U,{})}}(),{colorMode:s}=(0,se.G)(),a=(0,o.jsxs)("div",{className:"min-h-[450px]",children:[(0,o.jsx)("hr",{}),(0,o.jsx)("br",{}),(0,o.jsx)(ne,{id:"comments",repo:"tailcallhq/tailcallhq.github.io",repoId:"R_kgDOH8lUfQ",category:"General",categoryId:"DIC_kwDOH8lUfc4Ceff2",mapping:"pathname",reactionsEnabled:"1",emitMetadata:"1",inputPosition:"top",theme:s,lang:"en",strict:"0",loading:"lazy"})]});return(0,o.jsxs)("div",{className:"row",children:[(0,o.jsxs)("div",{className:(0,m.A)("col",!n.hidden&&te.docItemCol),children:[(0,o.jsx)(T,{}),(0,o.jsxs)("div",{className:te.docItemContainer,children:[(0,o.jsxs)("article",{children:[(0,o.jsx)(ee,{}),(0,o.jsx)(H,{}),n.mobile,(0,o.jsx)(z,{children:t}),(0,o.jsx)(M,{})]}),(0,o.jsx)(x,{}),a]})]}),n.desktop&&(0,o.jsx)("div",{className:"col col--3",children:n.desktop})]})}function ie(e){const t=`docs-doc-id-${e.content.metadata.id}`,n=e.content;return(0,o.jsx)(r,{content:e.content,children:(0,o.jsxs)(a.e3,{className:t,children:[(0,o.jsx)(d,{}),(0,o.jsx)(ae,{children:(0,o.jsx)(n,{})})]})})}},67763:(e,t,n)=>{n.d(t,{A:()=>c});n(96540);var s=n(34164),a=n(65195);const i={tableOfContents:"tableOfContents_bqdL",docItemContainer:"docItemContainer_F8PC"};var o=n(74848);const l="table-of-contents__link toc-highlight",r="table-of-contents__link--active";function c(e){let{className:t,...n}=e;return(0,o.jsx)("div",{className:(0,s.A)(i.tableOfContents,"thin-scrollbar",t),children:(0,o.jsx)(a.A,{...n,linkClassName:l,linkActiveClassName:r})})}},65195:(e,t,n)=>{n.d(t,{A:()=>b});var s=n(96540),a=n(6342);function i(e){const t=e.map((e=>({...e,parentIndex:-1,children:[]}))),n=Array(7).fill(-1);t.forEach(((e,t)=>{const s=n.slice(2,e.level);e.parentIndex=Math.max(...s),n[e.level]=t}));const s=[];return t.forEach((e=>{const{parentIndex:n,...a}=e;n>=0?t[n].children.push(a):s.push(a)})),s}function o(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:s}=e;return t.flatMap((e=>{const t=o({toc:e.children,minHeadingLevel:n,maxHeadingLevel:s});return function(e){return e.level>=n&&e.level<=s}(e)?[{...e,children:t}]:t}))}function l(e){const t=e.getBoundingClientRect();return t.top===t.bottom?l(e.parentNode):t}function r(e,t){let{anchorTopOffset:n}=t;const s=e.find((e=>l(e).top>=n));if(s){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(l(s))?s:e[e.indexOf(s)-1]??null}return e[e.length-1]??null}function c(){const e=(0,s.useRef)(0),{navbar:{hideOnScroll:t}}=(0,a.p)();return(0,s.useEffect)((()=>{e.current=t?0:document.querySelector(".navbar").clientHeight}),[t]),e}function d(e){const t=(0,s.useRef)(void 0),n=c();(0,s.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:s,linkActiveClassName:a,minHeadingLevel:i,maxHeadingLevel:o}=e;function l(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(s),l=function(e){let{minHeadingLevel:t,maxHeadingLevel:n}=e;const s=[];for(let a=t;a<=n;a+=1)s.push(`h${a}.anchor`);return Array.from(document.querySelectorAll(s.join()))}({minHeadingLevel:i,maxHeadingLevel:o}),c=r(l,{anchorTopOffset:n.current}),d=e.find((e=>c&&c.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,n){n?(t.current&&t.current!==e&&t.current.classList.remove(a),e.classList.add(a),t.current=e):e.classList.remove(a)}(e,e===d)}))}return document.addEventListener("scroll",l),document.addEventListener("resize",l),l(),()=>{document.removeEventListener("scroll",l),document.removeEventListener("resize",l)}}),[e,n])}var m=n(28774),u=n(74848);function h(e){let{toc:t,className:n,linkClassName:s,isChild:a}=e;return t.length?(0,u.jsx)("ul",{className:a?void 0:n,children:t.map((e=>(0,u.jsxs)("li",{children:[(0,u.jsx)(m.A,{to:`#${e.id}`,className:s??void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,u.jsx)(h,{isChild:!0,toc:e.children,className:n,linkClassName:s})]},e.id)))}):null}const v=s.memo(h);function b(e){let{toc:t,className:n="table-of-contents table-of-contents__left-border",linkClassName:l="table-of-contents__link",linkActiveClassName:r,minHeadingLevel:c,maxHeadingLevel:m,...h}=e;const b=(0,a.p)(),x=c??b.tableOfContents.minHeadingLevel,p=m??b.tableOfContents.maxHeadingLevel,g=function(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:a}=e;return(0,s.useMemo)((()=>o({toc:i(t),minHeadingLevel:n,maxHeadingLevel:a})),[t,n,a])}({toc:t,minHeadingLevel:x,maxHeadingLevel:p});return d((0,s.useMemo)((()=>{if(l&&r)return{linkClassName:l,linkActiveClassName:r,minHeadingLevel:x,maxHeadingLevel:p}}),[l,r,x,p])),(0,u.jsx)(v,{toc:g,className:n,linkClassName:l,...h})}},26334:(e,t,n)=>{n.d(t,{A:()=>o});var s=n(96540),a=n(21432),i=n(74848);function o(e){const[t,n]=(0,s.useState)(!1),o=(e=>{if(!e)return{};const t={},n=/(\w+)(?:="([^"]*)"|\s*)/g;let s;for(;null!==(s=n.exec(e));){const[,e,n]=s;t[e]=n||"true"}return t})(e.metastring);return(0,i.jsxs)("div",{className:"rounded-3xl overflow-hidden",children:[(0,i.jsxs)("div",{className:"bg-[#35353A] p-4 flex justify-between items-center",children:[(0,i.jsx)("span",{className:"text-white text-xs font-space-mono",children:o.title}),(0,i.jsx)("div",{className:"relative",children:(0,i.jsxs)("button",{onClick:()=>{navigator.clipboard.writeText(e.children?.toString()||""),n(!0),setTimeout((()=>n(!1)),2e3)},"aria-label":"Copy code",className:"flex flex-row items-center bg-transparent appearance-none border-none",children:[t&&(0,i.jsx)("span",{className:"text-xs text-white mr-2 opacity-70 font-space-mono p-0",style:{lineHeight:"0"},children:"Copied!"}),(0,i.jsx)("img",{src:"/icons/basic/copy-icon.svg",alt:"Copy Icon",className:"w-4 h-4 cursor-pointer hover:opacity-80 transition-opacity duration-150"})]})})]}),(0,i.jsx)(a.A,{...e})]})}}}]);