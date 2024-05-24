"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1107],{8748:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>a,metadata:()=>r,toc:()=>c});var n=s(4848),i=s(8453);const a={title:"Deduplication",sidebar_position:4,description:"Learn how deduplication can help you optimize performance and reduce server requests using Tailcall. Discover how to eliminate duplicate requests and improve response times using practical solutions and step-by-step examples with the TailCall CLI for GraphQL applications."},o=void 0,r={id:"n+1/dedupe",title:"Deduplication",description:"Learn how deduplication can help you optimize performance and reduce server requests using Tailcall. Discover how to eliminate duplicate requests and improve response times using practical solutions and step-by-step examples with the TailCall CLI for GraphQL applications.",source:"@site/docs/n+1/dedupe.md",sourceDirName:"n+1",slug:"/n+1/dedupe",permalink:"/docs/n+1/dedupe",draft:!1,unlisted:!1,editUrl:"https://github.com/tailcallhq/tailcallhq.github.io/tree/develop/docs/n+1/dedupe.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{title:"Deduplication",sidebar_position:4,description:"Learn how deduplication can help you optimize performance and reduce server requests using Tailcall. Discover how to eliminate duplicate requests and improve response times using practical solutions and step-by-step examples with the TailCall CLI for GraphQL applications."},sidebar:"tutorialSidebar",previous:{title:"N + 1 in Tailcall",permalink:"/docs/n+1/tailcall-config"},next:{title:"N + 1 Checks",permalink:"/docs/n+1/compile-time-check"}},l={},c=[];function p(e){const t={a:"a",admonition:"admonition",code:"code",img:"img",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.p,{children:"If you run the query, at first you will observe a lot of duplicate requests are being made for getting the same author details."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"Duplicate Upstream Calls",src:s(9768).A+"",width:"3540",height:"1869"})}),"\n",(0,n.jsxs)(t.p,{children:["This happens because of the 100 posts, a lot them are authored by the same user and by default Tailcall will make a request for every user when requested. You can fix this by setting ",(0,n.jsx)(t.a,{href:"/docs/directives/upstream#dedupe",children:"dedupe"})," to ",(0,n.jsx)(t.code,{children:"true"})," in ",(0,n.jsx)(t.a,{href:"/docs/directives/upstream",children:"upstream"}),"."]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-graphql",metastring:"{4}",children:'schema\n  @upstream(\n    baseURL: "http://jsonplaceholder.typicode.com"\n    dedupe: true\n  ) {\n  query: Query\n}\n\ntype Query {\n  # ...\n}\n\ntype Post {\n  # ...\n}\n\ntype User {\n  # ...\n}\n'})}),"\n",(0,n.jsxs)(t.p,{children:["When you enable ",(0,n.jsx)(t.code,{children:"dedupe"}),", for each downstream request, Tailcall will automatically deduplicate all upstream requests and instead of making 100 it will only make 10 requests for unique users:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-text",metastring:"{6-16}",children:"\u276f tailcall start ./examples/jsonplaceholder.graphql\n  INFO File read: ./examples/jsonplaceholder.graphql ... ok\n  INFO N + 1 detected: 1\n  INFO \ud83d\ude80 Tailcall launched at [0.0.0.0:8000] over HTTP/1.1\n  INFO \ud83c\udf0d Playground: https://tailcall.run/playground/?u=http://127.0.0.1:8000/graphql\n  INFO GET http://jsonplaceholder.typicode.com/posts HTTP/1.1\n  INFO GET http://jsonplaceholder.typicode.com/users/1 HTTP/1.1\n  INFO GET http://jsonplaceholder.typicode.com/users/2 HTTP/1.1\n  INFO GET http://jsonplaceholder.typicode.com/users/3 HTTP/1.1\n  INFO GET http://jsonplaceholder.typicode.com/users/4 HTTP/1.1\n  INFO GET http://jsonplaceholder.typicode.com/users/5 HTTP/1.1\n  INFO GET http://jsonplaceholder.typicode.com/users/6 HTTP/1.1\n  INFO GET http://jsonplaceholder.typicode.com/users/7 HTTP/1.1\n  INFO GET http://jsonplaceholder.typicode.com/users/8 HTTP/1.1\n  INFO GET http://jsonplaceholder.typicode.com/users/9 HTTP/1.1\n  INFO GET http://jsonplaceholder.typicode.com/users/10 HTTP/1.1\n"})}),"\n",(0,n.jsx)(t.p,{children:"This is a massive 10x improvement over the previous implementation. However, it might not always be the case. For eg: If all the posts are created by different users you might still end up making 100 requests upstream."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"Unique Upstream Calls",src:s(3814).A+"",width:"3540",height:"1689"})}),"\n",(0,n.jsx)(t.admonition,{type:"tip",children:(0,n.jsx)(t.p,{children:"Dedupe has a slight performance overhead so if your use case doesn't have any N + 1 issues, it might be worth keeping this setting disabled."})})]})}function d(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(p,{...e})}):p(e)}},9768:(e,t,s)=>{s.d(t,{A:()=>n});const n=s.p+"assets/images/n+1-duplicate-d7ebe2ce6262463ba6e5b8d8077c8efd.png"},3814:(e,t,s)=>{s.d(t,{A:()=>n});const n=s.p+"assets/images/n+1-unique-2a6b2c32101fd1472eac5eac44a62890.png"},8453:(e,t,s)=>{s.d(t,{R:()=>o,x:()=>r});var n=s(6540);const i={},a=n.createContext(i);function o(e){const t=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),n.createElement(a.Provider,{value:t},e.children)}}}]);