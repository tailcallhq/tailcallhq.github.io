"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8209],{69158:(e,t,s)=>{s.r(t),s.d(t,{default:()=>x});s(96540);var a=s(34164),l=s(21312);const n=()=>(0,l.T)({id:"theme.tags.tagsPageTitle",message:"Tags",description:"The title of the tag list page"});var r=s(61213),i=s(17559),c=s(19575),o=s(56133),d=s(51107);const g={tag:"tag_Nnez"};var m=s(74848);function h(e){let{letterEntry:t}=e;return(0,m.jsxs)("article",{children:[(0,m.jsx)(d.A,{as:"h2",id:t.letter,children:t.letter}),(0,m.jsx)("ul",{className:"padding--none",children:t.tags.map((e=>(0,m.jsx)("li",{className:g.tag,children:(0,m.jsx)(o.A,{...e})},e.permalink)))}),(0,m.jsx)("hr",{})]})}function u(e){let{tags:t}=e;const s=function(e){const t={};return Object.values(e).forEach((e=>{const s=function(e){return e[0].toUpperCase()}(e.label);t[s]??=[],t[s].push(e)})),Object.entries(t).sort(((e,t)=>{let[s]=e,[a]=t;return s.localeCompare(a)})).map((e=>{let[t,s]=e;return{letter:t,tags:s.sort(((e,t)=>e.label.localeCompare(t.label)))}}))}(t);return(0,m.jsx)("section",{className:"margin-vert--lg",children:s.map((e=>(0,m.jsx)(h,{letterEntry:e},e.letter)))})}var j=s(41463);function x(e){let{tags:t,sidebar:s}=e;const l=n();return(0,m.jsxs)(r.e3,{className:(0,a.A)(i.G.wrapper.blogPages,i.G.page.blogTagsListPage),children:[(0,m.jsx)(r.be,{title:l}),(0,m.jsx)(j.A,{tag:"blog_tags_list"}),(0,m.jsxs)(c.A,{sidebar:s,children:[(0,m.jsx)(d.A,{as:"h1",children:l}),(0,m.jsx)(u,{tags:t})]})]})}},56133:(e,t,s)=>{s.d(t,{A:()=>i});s(96540);var a=s(34164),l=s(28774);const n={tag:"tag_zVej",tagRegular:"tagRegular_sFm0",tagWithCount:"tagWithCount_h2kH"};var r=s(74848);function i(e){let{permalink:t,label:s,count:i,description:c}=e;return(0,r.jsxs)(l.A,{href:t,title:c,className:(0,a.A)(n.tag,i?n.tagWithCount:n.tagRegular),children:[s,i&&(0,r.jsx)("span",{children:i})]})}},19575:(e,t,s)=>{s.d(t,{A:()=>d});var a=s(96540),l=s(34164),n=s(7407),r=s(28774),i=s(56347),c=s(74848);function o(e){let{sidebar:t}=e;const[s,l]=a.useState(!1),n=(0,i.zy)();return(0,a.useEffect)((()=>{const e=new URL(n.pathname,window.location.origin).pathname.split("/").filter(Boolean),t="blog"===e[0]&&e.length>1&&"page"!==e[1];l(t)}),[n.pathname]),s?(0,c.jsx)("div",{className:"container",children:(0,c.jsx)("div",{className:"row justify-center",children:(0,c.jsxs)("div",{className:"col col--7",children:[(0,c.jsx)("hr",{className:"h-[1px] !bg-tailCall-light-300"}),(0,c.jsx)("h1",{className:" text-title-medium",children:"Recent Blog Posts"}),(0,c.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:t?.items.map((e=>(0,c.jsxs)(r.A,{to:e.permalink,className:"w-full my-4 !no-underline",children:[(0,c.jsx)("img",{src:`/images/${e.permalink}.png`,className:"w-full rounded-xl aspect-[1.88] object-cover",alt:""}),(0,c.jsx)("h1",{className:" text-title-medium text-black",children:e.title})]})))})]})})}):(0,c.jsx)(c.Fragment,{})}function d(e){const{sidebar:t,toc:s,children:a,...r}=e,i=t&&t.items.length>0;return(0,c.jsxs)(n.A,{...r,children:[(0,c.jsx)("div",{className:"container my-8",children:(0,c.jsxs)("div",{className:"row justify-center",children:[(0,c.jsx)("main",{className:(0,l.A)("col",{"col--7":i,"col--9 col--offset-1":!i}),children:a}),s&&(0,c.jsx)("div",{className:"col col--2",children:s})]})}),(0,c.jsx)(o,{sidebar:t})]})}}}]);