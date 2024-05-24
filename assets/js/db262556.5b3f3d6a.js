"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[743],{7083:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>p,frontMatter:()=>i,metadata:()=>l,toc:()=>o});var n=s(4848),r=s(8453);const i={title:"@rest"},a=void 0,l={id:"directives/rest",title:"@rest",description:"API orchestration is essential, yet not all can adopt GraphQL despite its benefits. The Tailcall DSL feature leverages GraphQL at compile time to generate REST endpoints, aligning with traditional API infrastructure like CDNs and Gateways.",source:"@site/docs/directives/rest.md",sourceDirName:"directives",slug:"/directives/rest",permalink:"/docs/directives/rest",draft:!1,unlisted:!1,editUrl:"https://github.com/tailcallhq/tailcallhq.github.io/tree/develop/docs/directives/rest.md",tags:[],version:"current",frontMatter:{title:"@rest"},sidebar:"tutorialSidebar",previous:{title:"@protected",permalink:"/docs/directives/protected"},next:{title:"@server",permalink:"/docs/directives/server"}},c={},o=[{value:"Usage",id:"usage",level:2},{value:"Example",id:"example",level:2}];function d(e){const t={code:"code",h2:"h2",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.p,{children:"API orchestration is essential, yet not all can adopt GraphQL despite its benefits. The Tailcall DSL feature leverages GraphQL at compile time to generate REST endpoints, aligning with traditional API infrastructure like CDNs and Gateways."}),"\n",(0,n.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"method"}),": Specifies the HTTP method (GET, POST, etc.)."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"path"}),": Sets the endpoint URL, with support for dynamic values from query arguments."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"query"}),": Defines the query parameters as key-value pairs."]}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"example",children:"Example"}),"\n",(0,n.jsxs)(t.p,{children:["Define GraphQL types and queries, using the ",(0,n.jsx)(t.code,{children:"@rest"})," directive to map fields to REST API endpoints."]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.code,{children:"schema.graphql"})}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-graphql",children:'schema\n  @upstream(baseURL: "https://jsonplaceholder.typicode.com")\n  @link(type: Operation, src: "user-operation.graphql") {\n  query: Query\n}\n\ntype Query {\n  user(id: Int!): User\n    @rest(method: "GET", path: "/users/{{.args.id}}")\n}\n\ntype User {\n  id: Int!\n  name: String!\n  email: String!\n}\n'})}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.code,{children:"user-operation.graphql"})}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-graphql",children:'query ($id: Int!) @rest(method: GET, path: "/user/$id") {\n  user(id: $id) {\n    id\n    name\n  }\n}\n'})}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"REST Demo",src:s(1400).A+"",width:"2992",height:"1686"})}),"\n",(0,n.jsxs)(t.p,{children:["This example demonstrates how to define a simple query to fetch user data from a REST endpoint using the ",(0,n.jsx)(t.code,{children:"@rest"})," directive. By leveraging ",(0,n.jsx)(t.code,{children:"@rest"}),", GraphQL can serve as a layer over RESTful services, combining REST's simplicity with GraphQL's flexibility."]})]})}function p(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},1400:(e,t,s)=>{s.d(t,{A:()=>n});const n=s.p+"assets/images/rest-user-03cf9e415f57084d2cbfcaebac90df2b.png"},8453:(e,t,s)=>{s.d(t,{R:()=>a,x:()=>l});var n=s(6540);const r={},i=n.createContext(r);function a(e){const t=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);