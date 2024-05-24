"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6374],{2652:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>r,metadata:()=>a,toc:()=>c});var o=n(4848),i=n(8453);const r={title:"N + 1 in Tailcall",sidebar_position:3,description:"Learn how to compose APIs using Tailcall primitives. Understand the N + 1 problem from a Tailcall perspective and explore solutions to optimize performance and reduce server requests."},s=void 0,a={id:"n+1/tailcall-config",title:"N + 1 in Tailcall",description:"Learn how to compose APIs using Tailcall primitives. Understand the N + 1 problem from a Tailcall perspective and explore solutions to optimize performance and reduce server requests.",source:"@site/docs/n+1/tailcall-config.md",sourceDirName:"n+1",slug:"/n+1/tailcall-config",permalink:"/docs/n+1/tailcall-config",draft:!1,unlisted:!1,editUrl:"https://github.com/tailcallhq/tailcallhq.github.io/tree/develop/docs/n+1/tailcall-config.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{title:"N + 1 in Tailcall",sidebar_position:3,description:"Learn how to compose APIs using Tailcall primitives. Understand the N + 1 problem from a Tailcall perspective and explore solutions to optimize performance and reduce server requests."},sidebar:"tutorialSidebar",previous:{title:"Example",permalink:"/docs/n+1/example"},next:{title:"Deduplication",permalink:"/docs/n+1/dedupe"}},l={},c=[];function p(e){const t={a:"a",admonition:"admonition",code:"code",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.p,{children:"Before diving into solutions, let's observe the N+1 problem in the following Tailcall configuration:"}),"\n",(0,o.jsx)(t.admonition,{type:"tip",children:(0,o.jsxs)(t.p,{children:["If you are new here you might want to checkout our ",(0,o.jsx)(t.a,{href:"/docs/",children:"Getting Started"})," guide."]})}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-graphql",children:'schema\n  @upstream(\n    baseURL: "http://jsonplaceholder.typicode.com"\n  ) {\n  query: Query\n}\n\ntype Query {\n  posts: [Post] @http(path: "/posts")\n}\n\ntype Post {\n  id: Int!\n  userId: Int!\n  title: String!\n  body: String!\n  user: User @http(path: "/users/{{.value.userId}}")\n}\n\ntype User {\n  id: Int!\n  name: String!\n  username: String!\n  email: String!\n}\n'})}),"\n",(0,o.jsxs)(t.p,{children:["This configuration sets up a GraphQL schema for a Tailcall server utilizing ",(0,o.jsx)(t.a,{href:"https://jsonplaceholder.typicode.com/",children:"jsonplaceholder.typicode.com"})," as its data source. It allows direct querying of posts and, for each post, retrieves the associated author information. Similar to our curl requests above, when we query for posts and their authors we end up issuing multiple user calls upstream:"]}),"\n",(0,o.jsxs)(t.p,{children:["Let's examine the CLI output for this configuration with Tailcall's ",(0,o.jsx)(t.code,{children:"start"})," command:"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-text",metastring:"{6-9}",children:"\u276f tailcall start ./examples/jsonplaceholder.graphql\n  INFO File read: ./examples/jsonplaceholder.graphql ... ok\n  INFO N + 1 detected: 1\n  INFO \ud83d\ude80 Tailcall launched at [0.0.0.0:8000] over HTTP/1.1\n  INFO \ud83c\udf0d Playground: https://tailcall.run/playground/?u=http://127.0.0.1:8000/graphql\n  INFO GET http://jsonplaceholder.typicode.com/posts HTTP/1.1\n  INFO GET http://jsonplaceholder.typicode.com/users/8 HTTP/1.1\n  ...\n  INFO GET http://jsonplaceholder.typicode.com/users/8 HTTP/1.1\n  INFO GET http://jsonplaceholder.typicode.com/users/10 HTTP/1.1\n"})}),"\n",(0,o.jsx)(t.p,{children:"Tailcall logs a sequence of requests made to fetch posts and then their individual authors, highlighting the N+1 problem in real-time. Since there are 100 posts, so 100 requests are made to fetch the authors."})]})}function d(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>s,x:()=>a});var o=n(6540);const i={},r=o.createContext(i);function s(e){const t=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),o.createElement(r.Provider,{value:t},e.children)}}}]);