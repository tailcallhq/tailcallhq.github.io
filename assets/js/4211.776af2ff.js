(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4211],{47111:(e,i,t)=>{"use strict";t.d(i,{A:()=>oe});var o=t(96540),n=t(34164),a=t(36350),r=t(18630),s=t(403),l=t(56347),c=t(82216),d=t(86957),b=t(20020),u=t(23230),m=t(74848);function p(e){return(0,m.jsx)("svg",{width:"20",height:"20","aria-hidden":"true",...e,children:(0,m.jsxs)("g",{fill:"#7a7a7a",children:[(0,m.jsx)("path",{d:"M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0"}),(0,m.jsx)("path",{d:"M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0"})]})})}const w={collapseSidebarButton:"collapseSidebarButton_PEFL",collapseSidebarButtonIcon:"collapseSidebarButtonIcon_kv0_"};function h(e){let{onClick:i}=e;return(0,m.jsx)("button",{type:"button",title:(0,u.T)({id:"theme.docs.sidebar.collapseButtonTitle",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),"aria-label":(0,u.T)({id:"theme.docs.sidebar.collapseButtonAriaLabel",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),className:(0,n.A)("button button--secondary button--outline",w.collapseSidebarButton),onClick:i,children:(0,m.jsx)(p,{className:w.collapseSidebarButtonIcon})})}var f=t(40002),v=t(24245),g=t(5215),x=t(4799);const k=Symbol("EmptyContext"),y=o.createContext(k);function _(e){let{children:i}=e;const[t,n]=(0,o.useState)(null),a=(0,o.useMemo)((()=>({expandedItem:t,setExpandedItem:n})),[t]);return(0,m.jsx)(y.Provider,{value:a,children:i})}var j=t(94549),S=t(80260),A=t(14783),T=t(11062);function C(e){let{collapsed:i,categoryLabel:t,onClick:o}=e;return(0,m.jsx)("button",{"aria-label":i?(0,u.T)({id:"theme.DocSidebarItem.expandCategoryAriaLabel",message:"Expand sidebar category '{label}'",description:"The ARIA label to expand the sidebar category"},{label:t}):(0,u.T)({id:"theme.DocSidebarItem.collapseCategoryAriaLabel",message:"Collapse sidebar category '{label}'",description:"The ARIA label to collapse the sidebar category"},{label:t}),"aria-expanded":!i,type:"button",className:"clean-btn menu__caret",onClick:o})}function N(e){let{item:i,onItemClick:t,activePath:a,level:s,index:l,...c}=e;const{items:b,label:u,collapsible:p,className:w,href:h}=i,{docs:{sidebar:{autoCollapseCategories:f}}}=(0,d.p)(),v=function(e){const i=(0,T.A)();return(0,o.useMemo)((()=>e.href&&!e.linkUnlisted?e.href:!i&&e.collapsible?(0,g.Nr)(e):void 0),[e,i])}(i),_=(0,g.w8)(i,a),N=(0,S.ys)(h,a),{collapsed:B,setCollapsed:I}=(0,j.u)({initialState:()=>!!p&&(!_&&i.collapsed)}),{expandedItem:E,setExpandedItem:M}=function(){const e=(0,o.useContext)(y);if(e===k)throw new x.dV("DocSidebarItemsExpandedStateProvider");return e}(),O=function(e){void 0===e&&(e=!B),M(e?null:l),I(e)};return function(e){let{isActive:i,collapsed:t,updateCollapsed:n}=e;const a=(0,x.ZC)(i);(0,o.useEffect)((()=>{i&&!a&&t&&n(!1)}),[i,a,t,n])}({isActive:_,collapsed:B,updateCollapsed:O}),(0,o.useEffect)((()=>{p&&null!=E&&E!==l&&f&&I(!0)}),[p,E,l,I,f]),(0,m.jsxs)("li",{className:(0,n.A)(r.G.docs.docSidebarItemCategory,r.G.docs.docSidebarItemCategoryLevel(s),"menu__list-item",{"menu__list-item--collapsed":B},w),children:[(0,m.jsxs)("div",{className:(0,n.A)("menu__list-item-collapsible",{"menu__list-item-collapsible--active":N}),children:[(0,m.jsx)(A.A,{className:(0,n.A)("menu__link",{"menu__link--sublist":p,"menu__link--sublist-caret":!h&&p,"menu__link--active":_}),onClick:p?e=>{t?.(i),h?O(!1):(e.preventDefault(),O())}:()=>{t?.(i)},"aria-current":N?"page":void 0,role:p&&!h?"button":void 0,"aria-expanded":p&&!h?!B:void 0,href:p?v??"#":v,...c,children:u}),h&&p&&(0,m.jsx)(C,{collapsed:B,categoryLabel:u,onClick:e=>{e.preventDefault(),O()}})]}),(0,m.jsx)(j.N,{lazy:!0,as:"ul",className:"menu__list",collapsed:B,children:(0,m.jsx)(z,{items:b,tabIndex:B?-1:0,onItemClick:t,activePath:a,level:s+1})})]})}var B=t(40877),I=t(90716);const E={menuExternalLink:"menuExternalLink_NmtK"};function M(e){let{item:i,onItemClick:t,activePath:o,level:a,index:s,...l}=e;const{href:c,label:d,className:b,autoAddBaseUrl:u}=i,p=(0,g.w8)(i,o),w=(0,B.A)(c);return(0,m.jsx)("li",{className:(0,n.A)(r.G.docs.docSidebarItemLink,r.G.docs.docSidebarItemLinkLevel(a),"menu__list-item",b),children:(0,m.jsxs)(A.A,{className:(0,n.A)("menu__link",!w&&E.menuExternalLink,{"menu__link--active":p}),autoAddBaseUrl:u,"aria-current":p?"page":void 0,to:c,...w&&{onClick:t?()=>t(i):void 0},...l,children:[d,!w&&(0,m.jsx)(I.A,{})]})},d)}const O={menuHtmlItem:"menuHtmlItem_M9Kj"};function P(e){let{item:i,level:t,index:o}=e;const{value:a,defaultStyle:s,className:l}=i;return(0,m.jsx)("li",{className:(0,n.A)(r.G.docs.docSidebarItemLink,r.G.docs.docSidebarItemLinkLevel(t),s&&[O.menuHtmlItem,"menu__list-item"],l),dangerouslySetInnerHTML:{__html:a}},o)}function L(e){let{item:i,...t}=e;switch(i.type){case"category":return(0,m.jsx)(N,{item:i,...t});case"html":return(0,m.jsx)(P,{item:i,...t});default:return(0,m.jsx)(M,{item:i,...t})}}function q(e){let{items:i,...t}=e;const o=(0,g.Y)(i,t.activePath);return(0,m.jsx)(_,{children:o.map(((e,i)=>(0,m.jsx)(L,{item:e,index:i,...t},i)))})}const z=(0,o.memo)(q),R={menu:"menu_SIkG",menuWithAnnouncementBar:"menuWithAnnouncementBar_GW3s"};function U(e){let{path:i,sidebar:t,className:a}=e;const s=function(){const{isActive:e}=(0,f.M)(),[i,t]=(0,o.useState)(e);return(0,v.Mq)((i=>{let{scrollY:o}=i;e&&t(0===o)}),[e]),e&&i}();return(0,m.jsx)("nav",{"aria-label":(0,u.T)({id:"theme.docs.sidebar.navAriaLabel",message:"Docs sidebar",description:"The ARIA label for the sidebar navigation"}),className:(0,n.A)("menu thin-scrollbar",R.menu,s&&R.menuWithAnnouncementBar,a),children:(0,m.jsx)("ul",{className:(0,n.A)(r.G.docs.docSidebarMenu,"menu__list"),children:(0,m.jsx)(z,{items:t,activePath:i,level:1})})})}const V="sidebar_njMd",D="sidebarWithHideableNavbar_wUlq",H="sidebarHidden_VK0M",G="sidebarLogo_isFc";function W(e){let{path:i,sidebar:t,onCollapse:o,isHidden:a}=e;const{navbar:{hideOnScroll:r},docs:{sidebar:{hideable:s}}}=(0,d.p)();return(0,m.jsxs)("div",{className:(0,n.A)(V,r&&D,a&&H),children:[r&&(0,m.jsx)(b.A,{tabIndex:-1,className:G}),(0,m.jsx)(U,{path:i,sidebar:t}),s&&(0,m.jsx)(h,{onClick:o})]})}const F=o.memo(W);var K=t(70763),Y=t(61938);const Z=e=>{let{sidebar:i,path:t}=e;const o=(0,Y.M)();return(0,m.jsx)("ul",{className:(0,n.A)(r.G.docs.docSidebarMenu,"menu__list"),children:(0,m.jsx)(z,{items:i,activePath:t,onItemClick:e=>{"category"===e.type&&e.href&&o.toggle(),"link"===e.type&&o.toggle()},level:1})})};function $(e){return(0,m.jsx)(K.GX,{component:Z,props:e})}const X=o.memo($);function Q(e){const i=(0,c.l)(),t="desktop"===i||"ssr"===i,o="mobile"===i;return(0,m.jsxs)(m.Fragment,{children:[t&&(0,m.jsx)(F,{...e}),o&&(0,m.jsx)(X,{...e})]})}const J={expandButton:"expandButton_TmdG",expandButtonIcon:"expandButtonIcon_i1dp"};function ee(e){let{toggleSidebar:i}=e;return(0,m.jsx)("div",{className:J.expandButton,title:(0,u.T)({id:"theme.docs.sidebar.expandButtonTitle",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),"aria-label":(0,u.T)({id:"theme.docs.sidebar.expandButtonAriaLabel",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),tabIndex:0,role:"button",onKeyDown:i,onClick:i,children:(0,m.jsx)(p,{className:J.expandButtonIcon})})}const ie={docSidebarContainer:"docSidebarContainer_YfHR",docSidebarContainerHidden:"docSidebarContainerHidden_DPk8",sidebarViewport:"sidebarViewport_aRkj"};function te(e){let{children:i}=e;const t=(0,s.t)();return(0,m.jsx)(o.Fragment,{children:i},t?.name??"noSidebar")}function oe(e){let{sidebar:i,hiddenSidebarContainer:t,setHiddenSidebarContainer:s}=e;const{pathname:c}=(0,l.zy)(),[d,b]=(0,o.useState)(!1),u=(0,o.useCallback)((()=>{d&&b(!1),!d&&(0,a.O)()&&b(!0),s((e=>!e))}),[s,d]);return(0,m.jsx)("aside",{className:(0,n.A)(r.G.docs.docSidebarContainer,ie.docSidebarContainer,t&&ie.docSidebarContainerHidden),onTransitionEnd:e=>{e.currentTarget.classList.contains(ie.docSidebarContainer)&&t&&b(!0)},children:(0,m.jsx)(te,{children:(0,m.jsxs)("div",{className:(0,n.A)(ie.sidebarViewport,d&&ie.sidebarViewportHidden),children:[(0,m.jsx)(Q,{sidebar:i,path:c,onCollapse:u,isHidden:d}),d&&(0,m.jsx)(ee,{toggleSidebar:u})]})})})}},28780:(e,i,t)=>{"use strict";t.r(i),t.d(i,{default:()=>k});var o=t(96540),n=t(34164),a=t(96644),r=t(18630),s=t(5215),l=t(403),c=t(23230),d=t(24245),b=t(54067);const u={backToTopButton:"backToTopButton_sjWU",backToTopButtonShow:"backToTopButtonShow_xfvO"};var m=t(74848);function p(){const{shown:e,scrollToTop:i}=function(e){let{threshold:i}=e;const[t,n]=(0,o.useState)(!1),a=(0,o.useRef)(!1),{startScroll:r,cancelScroll:s}=(0,d.gk)();return(0,d.Mq)(((e,t)=>{let{scrollY:o}=e;const r=t?.scrollY;r&&(a.current?a.current=!1:o>=r?(s(),n(!1)):o<i?n(!1):o+window.innerHeight<document.documentElement.scrollHeight&&n(!0))})),(0,b.$)((e=>{e.location.hash&&(a.current=!0,n(!1))})),{shown:t,scrollToTop:()=>r(0)}}({threshold:300});return(0,m.jsx)("button",{"aria-label":(0,c.T)({id:"theme.BackToTopButton.buttonAriaLabel",message:"Scroll back to top",description:"The ARIA label for the back to top button"}),className:(0,n.A)("clean-btn",r.G.common.backToTopButton,u.backToTopButton,e&&u.backToTopButtonShow),type:"button",onClick:i})}var w=t(2054);const h={docMainContainer:"docMainContainer_TBSr",docMainContainerEnhanced:"docMainContainerEnhanced_lQrH",docItemWrapperEnhanced:"docItemWrapperEnhanced_JWYK"};function f(e){let{hiddenSidebarContainer:i,children:t}=e;const o=(0,l.t)();return(0,m.jsx)("main",{className:(0,n.A)(h.docMainContainer,(i||!o)&&h.docMainContainerEnhanced),children:(0,m.jsx)("div",{className:(0,n.A)("container padding-top--md padding-bottom--lg",h.docItemWrapper,i&&h.docItemWrapperEnhanced),children:t})})}const v={docRoot:"docRoot_UBD9",docsWrapper:"docsWrapper_hBAB"};function g(e){let{children:i}=e;const t=(0,l.t)(),[n,a]=(0,o.useState)(!1);return(0,m.jsxs)("div",{className:v.docsWrapper,children:[(0,m.jsx)(p,{}),(0,m.jsxs)("div",{className:v.docRoot,children:[t&&(0,m.jsx)(w.A,{sidebar:t.items,hiddenSidebarContainer:n,setHiddenSidebarContainer:a}),(0,m.jsx)(f,{hiddenSidebarContainer:n,children:i})]})]})}var x=t(83510);function k(e){const i=(0,s.B5)(e);if(!i)return(0,m.jsx)(x.A,{});const{docElement:t,sidebarName:o,sidebarItems:c}=i;return(0,m.jsx)(a.e3,{className:(0,n.A)(r.G.page.docsDocPage),children:(0,m.jsx)(l.V,{name:o,items:c,children:(0,m.jsx)(g,{children:t})})})}},83510:(e,i,t)=>{"use strict";t.d(i,{A:()=>s});t(96540);var o=t(34164),n=t(23230),a=t(85225),r=t(74848);function s(e){let{className:i}=e;return(0,r.jsx)("main",{className:(0,o.A)("container margin-vert--xl",i),children:(0,r.jsx)("div",{className:"row",children:(0,r.jsxs)("div",{className:"col col--6 col--offset-3",children:[(0,r.jsx)(a.A,{as:"h1",className:"hero__title",children:(0,r.jsx)(n.A,{id:"theme.NotFound.title",description:"The title of the 404 page",children:"Page Not Found"})}),(0,r.jsx)("p",{children:(0,r.jsx)(n.A,{id:"theme.NotFound.p1",description:"The first paragraph of the 404 page",children:"We could not find what you were looking for."})}),(0,r.jsx)("p",{children:(0,r.jsx)(n.A,{id:"theme.NotFound.p2",description:"The 2nd paragraph of the 404 page",children:"Please contact the owner of the site that linked you to the original URL and let them know their link is broken."})})]})})})}},32372:(e,i,t)=>{"use strict";var o=function(){function e(e,i){for(var t=0;t<i.length;t++){var o=i[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(i,t,o){return t&&e(i.prototype,t),o&&e(i,o),i}}(),n=t(96540),a=r(n);function r(e){return e&&e.__esModule?e:{default:e}}var s=(new(r(t(77232)).default)).getResult(),l=s.os.name,c=s.os.version,d=s.browser.name,b=s.browser.version,u=s.device.type,m=s.device.model,p=s.device.vendor,w=s.engine.name,h=s.engine.version,f=s.cpu.architecture,v=s.ua,g={OS:l,OSVersion:c,Browser:d,BrowserVersion:b,DeviceType:u,DeviceModel:m,DeviceVendor:p,Engine:w,EngineVersion:h,CPU:f,UA:v},x=function(e){function i(){return function(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}(this,i),function(e,i){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!i||"object"!=typeof i&&"function"!=typeof i?e:i}(this,(i.__proto__||Object.getPrototypeOf(i)).apply(this,arguments))}return function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Super expression must either be null or a function, not "+typeof i);e.prototype=Object.create(i&&i.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),i&&(Object.setPrototypeOf?Object.setPrototypeOf(e,i):e.__proto__=i)}(i,e),o(i,[{key:"render",value:function(){var e=this.props,i=e.children,t=e.rules,o=e.className,n=e.style;return"function"==typeof i?i(g):Object.keys(t).find((function(e){return g[e]!==t[e]}))?null:"string"==typeof i||i instanceof Array?a.default.createElement("div",{className:o,style:n},i):a.default.cloneElement(i)}}]),i}(n.Component);x.OS=l,x.OSVersion=c,x.Browser=d,x.BrowserVersion=b,x.DeviceType=u,x.DeviceModel=m,x.DeviceVendor=p,x.Engine=w,x.EngineVersion=h,x.CPU=f,x.UA=v,x.defaultProps={rules:{},className:"",style:{}},x.select=function(e){return Object.keys(e).find((function(e){return e===(void 0).OS}))},i.A=x},77232:function(e,i,t){var o;!function(n,a){"use strict";var r="function",s="undefined",l="object",c="string",d="major",b="model",u="name",m="type",p="vendor",w="version",h="architecture",f="console",v="mobile",g="tablet",x="smarttv",k="wearable",y="embedded",_="Amazon",j="Apple",S="ASUS",A="BlackBerry",T="Browser",C="Chrome",N="Firefox",B="Google",I="Huawei",E="LG",M="Microsoft",O="Motorola",P="Opera",L="Samsung",q="Sharp",z="Sony",R="Xiaomi",U="Zebra",V="Facebook",D="Chromium OS",H="Mac OS",G=function(e){for(var i={},t=0;t<e.length;t++)i[e[t].toUpperCase()]=e[t];return i},W=function(e,i){return typeof e===c&&-1!==F(i).indexOf(F(e))},F=function(e){return e.toLowerCase()},K=function(e,i){if(typeof e===c)return e=e.replace(/^\s\s*/,""),typeof i===s?e:e.substring(0,500)},Y=function(e,i){for(var t,o,n,s,c,d,b=0;b<i.length&&!c;){var u=i[b],m=i[b+1];for(t=o=0;t<u.length&&!c&&u[t];)if(c=u[t++].exec(e))for(n=0;n<m.length;n++)d=c[++o],typeof(s=m[n])===l&&s.length>0?2===s.length?typeof s[1]==r?this[s[0]]=s[1].call(this,d):this[s[0]]=s[1]:3===s.length?typeof s[1]!==r||s[1].exec&&s[1].test?this[s[0]]=d?d.replace(s[1],s[2]):a:this[s[0]]=d?s[1].call(this,d,s[2]):a:4===s.length&&(this[s[0]]=d?s[3].call(this,d.replace(s[1],s[2])):a):this[s]=d||a;b+=2}},Z=function(e,i){for(var t in i)if(typeof i[t]===l&&i[t].length>0){for(var o=0;o<i[t].length;o++)if(W(i[t][o],e))return"?"===t?a:t}else if(W(i[t],e))return"?"===t?a:t;return e},$={ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"},X={browser:[[/\b(?:crmo|crios)\/([\w\.]+)/i],[w,[u,"Chrome"]],[/edg(?:e|ios|a)?\/([\w\.]+)/i],[w,[u,"Edge"]],[/(opera mini)\/([-\w\.]+)/i,/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],[u,w],[/opios[\/ ]+([\w\.]+)/i],[w,[u,P+" Mini"]],[/\bopr\/([\w\.]+)/i],[w,[u,P]],[/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i],[w,[u,"Baidu"]],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,/(avant|iemobile|slim)\s?(?:browser)?[\/ ]?([\w\.]*)/i,/(?:ms|\()(ie) ([\w\.]+)/i,/(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,/(heytap|ovi)browser\/([\d\.]+)/i,/(weibo)__([\d\.]+)/i],[u,w],[/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],[w,[u,"UC"+T]],[/microm.+\bqbcore\/([\w\.]+)/i,/\bqbcore\/([\w\.]+).+microm/i,/micromessenger\/([\w\.]+)/i],[w,[u,"WeChat"]],[/konqueror\/([\w\.]+)/i],[w,[u,"Konqueror"]],[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],[w,[u,"IE"]],[/ya(?:search)?browser\/([\w\.]+)/i],[w,[u,"Yandex"]],[/slbrowser\/([\w\.]+)/i],[w,[u,"Smart Lenovo "+T]],[/(avast|avg)\/([\w\.]+)/i],[[u,/(.+)/,"$1 Secure "+T],w],[/\bfocus\/([\w\.]+)/i],[w,[u,N+" Focus"]],[/\bopt\/([\w\.]+)/i],[w,[u,P+" Touch"]],[/coc_coc\w+\/([\w\.]+)/i],[w,[u,"Coc Coc"]],[/dolfin\/([\w\.]+)/i],[w,[u,"Dolphin"]],[/coast\/([\w\.]+)/i],[w,[u,P+" Coast"]],[/miuibrowser\/([\w\.]+)/i],[w,[u,"MIUI "+T]],[/fxios\/([-\w\.]+)/i],[w,[u,N]],[/\bqihu|(qi?ho?o?|360)browser/i],[[u,"360 "+T]],[/(oculus|sailfish|huawei|vivo)browser\/([\w\.]+)/i],[[u,/(.+)/,"$1 "+T],w],[/samsungbrowser\/([\w\.]+)/i],[w,[u,L+" Internet"]],[/(comodo_dragon)\/([\w\.]+)/i],[[u,/_/g," "],w],[/metasr[\/ ]?([\d\.]+)/i],[w,[u,"Sogou Explorer"]],[/(sogou)mo\w+\/([\d\.]+)/i],[[u,"Sogou Mobile"],w],[/(electron)\/([\w\.]+) safari/i,/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,/m?(qqbrowser|2345Explorer)[\/ ]?([\w\.]+)/i],[u,w],[/(lbbrowser)/i,/\[(linkedin)app\]/i],[u],[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],[[u,V],w],[/(Klarna)\/([\w\.]+)/i,/(kakao(?:talk|story))[\/ ]([\w\.]+)/i,/(naver)\(.*?(\d+\.[\w\.]+).*\)/i,/safari (line)\/([\w\.]+)/i,/\b(line)\/([\w\.]+)\/iab/i,/(alipay)client\/([\w\.]+)/i,/(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i],[u,w],[/\bgsa\/([\w\.]+) .*safari\//i],[w,[u,"GSA"]],[/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],[w,[u,"TikTok"]],[/headlesschrome(?:\/([\w\.]+)| )/i],[w,[u,C+" Headless"]],[/ wv\).+(chrome)\/([\w\.]+)/i],[[u,C+" WebView"],w],[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],[w,[u,"Android "+T]],[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],[u,w],[/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],[w,[u,"Mobile Safari"]],[/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],[w,u],[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],[u,[w,Z,{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}]],[/(webkit|khtml)\/([\w\.]+)/i],[u,w],[/(navigator|netscape\d?)\/([-\w\.]+)/i],[[u,"Netscape"],w],[/mobile vr; rv:([\w\.]+)\).+firefox/i],[w,[u,N+" Reality"]],[/ekiohf.+(flow)\/([\w\.]+)/i,/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,/(firefox)\/([\w\.]+)/i,/(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,/(links) \(([\w\.]+)/i,/panasonic;(viera)/i],[u,w],[/(cobalt)\/([\w\.]+)/i],[u,[w,/master.|lts./,""]]],cpu:[[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],[[h,"amd64"]],[/(ia32(?=;))/i],[[h,F]],[/((?:i[346]|x)86)[;\)]/i],[[h,"ia32"]],[/\b(aarch64|arm(v?8e?l?|_?64))\b/i],[[h,"arm64"]],[/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],[[h,"armhf"]],[/windows (ce|mobile); ppc;/i],[[h,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],[[h,/ower/,"",F]],[/(sun4\w)[;\)]/i],[[h,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],[[h,F]]],device:[[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],[b,[p,L],[m,g]],[/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,/samsung[- ]([-\w]+)/i,/sec-(sgh\w+)/i],[b,[p,L],[m,v]],[/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],[b,[p,j],[m,v]],[/\((ipad);[-\w\),; ]+apple/i,/applecoremedia\/[\w\.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i],[b,[p,j],[m,g]],[/(macintosh);/i],[b,[p,j]],[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],[b,[p,q],[m,v]],[/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],[b,[p,I],[m,g]],[/(?:huawei|honor)([-\w ]+)[;\)]/i,/\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],[b,[p,I],[m,v]],[/\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,/\b; (\w+) build\/hm\1/i,/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,/\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,/oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i],[[b,/_/g," "],[p,R],[m,v]],[/oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i,/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],[[b,/_/g," "],[p,R],[m,g]],[/; (\w+) bui.+ oppo/i,/\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],[b,[p,"OPPO"],[m,v]],[/vivo (\w+)(?: bui|\))/i,/\b(v[12]\d{3}\w?[at])(?: bui|;)/i],[b,[p,"Vivo"],[m,v]],[/\b(rmx[1-3]\d{3})(?: bui|;|\))/i],[b,[p,"Realme"],[m,v]],[/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,/\bmot(?:orola)?[- ](\w*)/i,/((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],[b,[p,O],[m,v]],[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],[b,[p,O],[m,g]],[/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],[b,[p,E],[m,g]],[/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,/\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,/\blg-?([\d\w]+) bui/i],[b,[p,E],[m,v]],[/(ideatab[-\w ]+)/i,/lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],[b,[p,"Lenovo"],[m,g]],[/(?:maemo|nokia).*(n900|lumia \d+)/i,/nokia[-_ ]?([-\w\.]*)/i],[[b,/_/g," "],[p,"Nokia"],[m,v]],[/(pixel c)\b/i],[b,[p,B],[m,g]],[/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],[b,[p,B],[m,v]],[/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[b,[p,z],[m,v]],[/sony tablet [ps]/i,/\b(?:sony)?sgp\w+(?: bui|\))/i],[[b,"Xperia Tablet"],[p,z],[m,g]],[/ (kb2005|in20[12]5|be20[12][59])\b/i,/(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],[b,[p,"OnePlus"],[m,v]],[/(alexa)webm/i,/(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,/(kf[a-z]+)( bui|\)).+silk\//i],[b,[p,_],[m,g]],[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],[[b,/(.+)/g,"Fire Phone $1"],[p,_],[m,v]],[/(playbook);[-\w\),; ]+(rim)/i],[b,p,[m,g]],[/\b((?:bb[a-f]|st[hv])100-\d)/i,/\(bb10; (\w+)/i],[b,[p,A],[m,v]],[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],[b,[p,S],[m,g]],[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],[b,[p,S],[m,v]],[/(nexus 9)/i],[b,[p,"HTC"],[m,g]],[/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,/(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i],[p,[b,/_/g," "],[m,v]],[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],[b,[p,"Acer"],[m,g]],[/droid.+; (m[1-5] note) bui/i,/\bmz-([-\w]{2,})/i],[b,[p,"Meizu"],[m,v]],[/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i],[b,[p,"Ulefone"],[m,v]],[/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,/(hp) ([\w ]+\w)/i,/(asus)-?(\w+)/i,/(microsoft); (lumia[\w ]+)/i,/(lenovo)[-_ ]?([-\w]+)/i,/(jolla)/i,/(oppo) ?([\w ]+) bui/i],[p,b,[m,v]],[/(kobo)\s(ereader|touch)/i,/(archos) (gamepad2?)/i,/(hp).+(touchpad(?!.+tablet)|tablet)/i,/(kindle)\/([\w\.]+)/i,/(nook)[\w ]+build\/(\w+)/i,/(dell) (strea[kpr\d ]*[\dko])/i,/(le[- ]+pan)[- ]+(\w{1,9}) bui/i,/(trinity)[- ]*(t\d{3}) bui/i,/(gigaset)[- ]+(q\w{1,9}) bui/i,/(vodafone) ([\w ]+)(?:\)| bui)/i],[p,b,[m,g]],[/(surface duo)/i],[b,[p,M],[m,g]],[/droid [\d\.]+; (fp\du?)(?: b|\))/i],[b,[p,"Fairphone"],[m,v]],[/(u304aa)/i],[b,[p,"AT&T"],[m,v]],[/\bsie-(\w*)/i],[b,[p,"Siemens"],[m,v]],[/\b(rct\w+) b/i],[b,[p,"RCA"],[m,g]],[/\b(venue[\d ]{2,7}) b/i],[b,[p,"Dell"],[m,g]],[/\b(q(?:mv|ta)\w+) b/i],[b,[p,"Verizon"],[m,g]],[/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],[b,[p,"Barnes & Noble"],[m,g]],[/\b(tm\d{3}\w+) b/i],[b,[p,"NuVision"],[m,g]],[/\b(k88) b/i],[b,[p,"ZTE"],[m,g]],[/\b(nx\d{3}j) b/i],[b,[p,"ZTE"],[m,v]],[/\b(gen\d{3}) b.+49h/i],[b,[p,"Swiss"],[m,v]],[/\b(zur\d{3}) b/i],[b,[p,"Swiss"],[m,g]],[/\b((zeki)?tb.*\b) b/i],[b,[p,"Zeki"],[m,g]],[/\b([yr]\d{2}) b/i,/\b(dragon[- ]+touch |dt)(\w{5}) b/i],[[p,"Dragon Touch"],b,[m,g]],[/\b(ns-?\w{0,9}) b/i],[b,[p,"Insignia"],[m,g]],[/\b((nxa|next)-?\w{0,9}) b/i],[b,[p,"NextBook"],[m,g]],[/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],[[p,"Voice"],b,[m,v]],[/\b(lvtel\-)?(v1[12]) b/i],[[p,"LvTel"],b,[m,v]],[/\b(ph-1) /i],[b,[p,"Essential"],[m,v]],[/\b(v(100md|700na|7011|917g).*\b) b/i],[b,[p,"Envizen"],[m,g]],[/\b(trio[-\w\. ]+) b/i],[b,[p,"MachSpeed"],[m,g]],[/\btu_(1491) b/i],[b,[p,"Rotor"],[m,g]],[/(shield[\w ]+) b/i],[b,[p,"Nvidia"],[m,g]],[/(sprint) (\w+)/i],[p,b,[m,v]],[/(kin\.[onetw]{3})/i],[[b,/\./g," "],[p,M],[m,v]],[/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],[b,[p,U],[m,g]],[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],[b,[p,U],[m,v]],[/smart-tv.+(samsung)/i],[p,[m,x]],[/hbbtv.+maple;(\d+)/i],[[b,/^/,"SmartTV"],[p,L],[m,x]],[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],[[p,E],[m,x]],[/(apple) ?tv/i],[p,[b,j+" TV"],[m,x]],[/crkey/i],[[b,C+"cast"],[p,B],[m,x]],[/droid.+aft(\w+)( bui|\))/i],[b,[p,_],[m,x]],[/\(dtv[\);].+(aquos)/i,/(aquos-tv[\w ]+)\)/i],[b,[p,q],[m,x]],[/(bravia[\w ]+)( bui|\))/i],[b,[p,z],[m,x]],[/(mitv-\w{5}) bui/i],[b,[p,R],[m,x]],[/Hbbtv.*(technisat) (.*);/i],[p,b,[m,x]],[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,/hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i],[[p,K],[b,K],[m,x]],[/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],[[m,x]],[/(ouya)/i,/(nintendo) ([wids3utch]+)/i],[p,b,[m,f]],[/droid.+; (shield) bui/i],[b,[p,"Nvidia"],[m,f]],[/(playstation [345portablevi]+)/i],[b,[p,z],[m,f]],[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],[b,[p,M],[m,f]],[/((pebble))app/i],[p,b,[m,k]],[/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],[b,[p,j],[m,k]],[/droid.+; (glass) \d/i],[b,[p,B],[m,k]],[/droid.+; (wt63?0{2,3})\)/i],[b,[p,U],[m,k]],[/(quest( 2| pro)?)/i],[b,[p,V],[m,k]],[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],[p,[m,y]],[/(aeobc)\b/i],[b,[p,_],[m,y]],[/droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i],[b,[m,v]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],[b,[m,g]],[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],[[m,g]],[/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],[[m,v]],[/(android[-\w\. ]{0,9});.+buil/i],[b,[p,"Generic"]]],engine:[[/windows.+ edge\/([\w\.]+)/i],[w,[u,"EdgeHTML"]],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[w,[u,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/ekioh(flow)\/([\w\.]+)/i,/(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,/(icab)[\/ ]([23]\.[\d\.]+)/i,/\b(libweb)/i],[u,w],[/rv\:([\w\.]{1,9})\b.+(gecko)/i],[w,u]],os:[[/microsoft (windows) (vista|xp)/i],[u,w],[/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i],[u,[w,Z,$]],[/windows nt 6\.2; (arm)/i,/windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,/(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i],[[w,Z,$],[u,"Windows"]],[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,/cfnetwork\/.+darwin/i],[[w,/_/g,"."],[u,"iOS"]],[/(mac os x) ?([\w\. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i],[[u,H],[w,/_/g,"."]],[/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],[w,u],[/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,/(blackberry)\w*\/([\w\.]*)/i,/(tizen|kaios)[\/ ]([\w\.]+)/i,/\((series40);/i],[u,w],[/\(bb(10);/i],[w,[u,A]],[/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],[w,[u,"Symbian"]],[/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],[w,[u,N+" OS"]],[/web0s;.+rt(tv)/i,/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],[w,[u,"webOS"]],[/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],[w,[u,"watchOS"]],[/crkey\/([\d\.]+)/i],[w,[u,C+"cast"]],[/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],[[u,D],w],[/panasonic;(viera)/i,/(netrange)mmh/i,/(nettv)\/(\d+\.[\w\.]+)/i,/(nintendo|playstation) ([wids345portablevuch]+)/i,/(xbox); +xbox ([^\);]+)/i,/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,/(mint)[\/\(\) ]?(\w*)/i,/(mageia|vectorlinux)[; ]/i,/([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,/(hurd|linux) ?([\w\.]*)/i,/(gnu) ?([\w\.]*)/i,/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,/(haiku) (\w+)/i],[u,w],[/(sunos) ?([\w\.\d]*)/i],[[u,"Solaris"],w],[/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,/(aix) ((\d)(?=\.|\)| )[\w\.])*/i,/\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,/(unix) ?([\w\.]*)/i],[u,w]]},Q=function(e,i){if(typeof e===l&&(i=e,e=a),!(this instanceof Q))return new Q(e,i).getResult();var t=typeof n!==s&&n.navigator?n.navigator:a,o=e||(t&&t.userAgent?t.userAgent:""),f=t&&t.userAgentData?t.userAgentData:a,x=i?function(e,i){var t={};for(var o in e)i[o]&&i[o].length%2==0?t[o]=i[o].concat(e[o]):t[o]=e[o];return t}(X,i):X,k=t&&t.userAgent==o;return this.getBrowser=function(){var e,i={};return i[u]=a,i[w]=a,Y.call(i,o,x.browser),i[d]=typeof(e=i[w])===c?e.replace(/[^\d\.]/g,"").split(".")[0]:a,k&&t&&t.brave&&typeof t.brave.isBrave==r&&(i[u]="Brave"),i},this.getCPU=function(){var e={};return e[h]=a,Y.call(e,o,x.cpu),e},this.getDevice=function(){var e={};return e[p]=a,e[b]=a,e[m]=a,Y.call(e,o,x.device),k&&!e[m]&&f&&f.mobile&&(e[m]=v),k&&"Macintosh"==e[b]&&t&&typeof t.standalone!==s&&t.maxTouchPoints&&t.maxTouchPoints>2&&(e[b]="iPad",e[m]=g),e},this.getEngine=function(){var e={};return e[u]=a,e[w]=a,Y.call(e,o,x.engine),e},this.getOS=function(){var e={};return e[u]=a,e[w]=a,Y.call(e,o,x.os),k&&!e[u]&&f&&"Unknown"!=f.platform&&(e[u]=f.platform.replace(/chrome os/i,D).replace(/macos/i,H)),e},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}},this.getUA=function(){return o},this.setUA=function(e){return o=typeof e===c&&e.length>500?K(e,500):e,this},this.setUA(o),this};Q.VERSION="0.7.37",Q.BROWSER=G([u,w,d]),Q.CPU=G([h]),Q.DEVICE=G([b,p,m,f,v,x,g,k,y]),Q.ENGINE=Q.OS=G([u,w]),typeof i!==s?(e.exports&&(i=e.exports=Q),i.UAParser=Q):t.amdO?(o=function(){return Q}.call(i,t,i,e))===a||(e.exports=o):typeof n!==s&&(n.UAParser=Q);var J=typeof n!==s&&(n.jQuery||n.Zepto);if(J&&!J.ua){var ee=new Q;J.ua=ee.getResult(),J.ua.get=function(){return ee.getUA()},J.ua.set=function(e){ee.setUA(e);var i=ee.getResult();for(var t in i)J.ua[t]=i[t]}}}("object"==typeof window?window:this)}}]);