"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4088],{3930:(e,i,t)=>{t.r(i),t.d(i,{assets:()=>l,contentTitle:()=>s,default:()=>c,frontMatter:()=>a,metadata:()=>o,toc:()=>h});var n=t(4848),r=t(8453);const a={title:"GraphQL REST Integration",description:"Exposing REST endpoints on top of GraphQL via the @rest directive.",slug:"graphql-rest-integration",sidebar_label:"REST Integration"},s=void 0,o={id:"rest",title:"GraphQL REST Integration",description:"Exposing REST endpoints on top of GraphQL via the @rest directive.",source:"@site/docs/rest.md",sourceDirName:".",slug:"/graphql-rest-integration",permalink:"/docs/graphql-rest-integration",draft:!1,unlisted:!1,editUrl:"https://github.com/tailcallhq/tailcallhq.github.io/tree/develop/docs/rest.md",tags:[],version:"current",frontMatter:{title:"GraphQL REST Integration",description:"Exposing REST endpoints on top of GraphQL via the @rest directive.",slug:"graphql-rest-integration",sidebar_label:"REST Integration"},sidebar:"tutorialSidebar",previous:{title:"GraphQL Playground",permalink:"/docs/graphql-playground-guide"},next:{title:"GraphQL Scalars",permalink:"/docs/graphql-scalars-guide"}},l={},h=[{value:"How it works",id:"how-it-works",level:2},{value:"Example",id:"example",level:2},{value:"Step 1: Define your Tailcall GraphQL configuration",id:"step-1-define-your-tailcall-graphql-configuration",level:3},{value:"Step 2: Define an operation using <code>@rest</code> directive",id:"step-2-define-an-operation-using-rest-directive",level:3},{value:"Step 3: Link the operation to the main config file",id:"step-3-link-the-operation-to-the-main-config-file",level:3},{value:"Response",id:"response",level:4}];function d(e){const i={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.p,{children:"In order to handle complicated business problems, modern systems frequently need to work with hundreds or even thousands of APIs. Because of its powerful API composition capabilities, GraphQL has been adopted by numerous organisations. But switching to GraphQL can be difficult. It involves a lot of team training as well as major adjustments to frontend and backend architectures."}),"\n",(0,n.jsxs)(i.p,{children:["That's why Tailcall has developed a directive called ",(0,n.jsx)(i.code,{children:"@rest"})," to streamline this transition and take advantage of GraphQL's power without requiring a complete overhaul. With the help of this directive, Tailcall GraphQL queries and mutations may be made available as REST endpoints."]}),"\n",(0,n.jsx)(i.h2,{id:"how-it-works",children:"How it works"}),"\n",(0,n.jsx)(i.p,{children:(0,n.jsx)(i.img,{alt:"Diagram",src:t(4009).A+"",width:"1234",height:"673"})}),"\n",(0,n.jsx)("h4",{align:"center",children:"Diagram showcasing how it works under hood"}),"\n",(0,n.jsx)(i.p,{children:"This guide show you how to expose REST endpoints for your GraphQL operations by using the @rest directive like follows:"}),"\n",(0,n.jsx)(i.p,{children:"There are three main steps to this process:"}),"\n",(0,n.jsxs)(i.ol,{children:["\n",(0,n.jsx)(i.li,{children:"Define your Tailcall GraphQL configuration file."}),"\n",(0,n.jsxs)(i.li,{children:["Define an operation using ",(0,n.jsx)(i.code,{children:"@rest"})," directive in a separate file."]}),"\n",(0,n.jsx)(i.li,{children:"Link the operation to the main config file."}),"\n"]}),"\n",(0,n.jsx)(i.h2,{id:"example",children:"Example"}),"\n",(0,n.jsx)(i.h3,{id:"step-1-define-your-tailcall-graphql-configuration",children:"Step 1: Define your Tailcall GraphQL configuration"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-graphql",children:'schema\n  @upstream(\n    baseURL: "https://jsonplaceholder.typicode.com"\n  ) {\n  query: Query\n}\n\ntype Query {\n  post(id: Int!): Post @http(path: "/posts/{{.args.id}}")\n}\n\ntype Post {\n  userId: Int!\n  id: Int\n  title: String\n  body: String\n  user: User @http(path: "/users/{{.value.userId}}")\n}\n\ntype User {\n  id: Int!\n  name: String!\n  username: String!\n  email: String!\n  phone: String\n  website: String\n}\n'})}),"\n",(0,n.jsxs)(i.p,{children:["for more information on how to define your Tailcall GraphQL configuration file, please refer to the ",(0,n.jsx)(i.a,{href:"/docs/getting-started-with-graphql/#configuration",children:"Tailcall GraphQL Configuration"}),"."]}),"\n",(0,n.jsxs)(i.h3,{id:"step-2-define-an-operation-using-rest-directive",children:["Step 2: Define an operation using ",(0,n.jsx)(i.code,{children:"@rest"})," directive"]}),"\n",(0,n.jsxs)(i.p,{children:["We will define an operation and use the ",(0,n.jsx)(i.code,{children:"@rest"})," directive to define a REST endpoint for the operation. We will create a new file and add the following content to it. Save the file with the\nfilename: ",(0,n.jsx)(i.code,{children:"user-operation.graphql"}),". You can name the file anything you want, but make sure to link it to the main config file in the next step."]}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-graphql",children:'query ($id: Int!) @rest(method: GET, path: "/post/$id") {\n  post(id: $id) {\n    id\n    title\n    body\n    user {\n      id\n      name\n    }\n  }\n}\n'})}),"\n",(0,n.jsxs)(i.p,{children:["to know more about the ",(0,n.jsx)(i.code,{children:"@rest"})," directive, please refer to the ",(0,n.jsx)(i.a,{href:"/docs/tailcall-dsl-graphql-custom-directives/#rest-directive",children:"Tailcall GraphQL Directives"}),"."]}),"\n",(0,n.jsx)(i.h3,{id:"step-3-link-the-operation-to-the-main-config-file",children:"Step 3: Link the operation to the main config file"}),"\n",(0,n.jsxs)(i.p,{children:["checkout the ",(0,n.jsx)(i.code,{children:"@link"})," directive in the config snippet below to link the operation file. This step is crucial to make the REST endpoint available."]}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-graphql",children:'schema\n  @upstream(baseURL: "https://jsonplaceholder.typicode.com")\n  #highlight-start\n  @link(type: Operation, src: "user-operation.graphql") {\n  #highlight-end\n  query: Query\n}\n'})}),"\n",(0,n.jsxs)(i.p,{children:["To know more about the ",(0,n.jsx)(i.code,{children:"@link"})," directive, please refer to the ",(0,n.jsx)(i.a,{href:"/docs/tailcall-dsl-graphql-custom-directives/#link-directive",children:"Tailcall GraphQL Directives"}),"."]}),"\n",(0,n.jsx)(i.h4,{id:"response",children:"Response"}),"\n",(0,n.jsx)(i.p,{children:(0,n.jsx)(i.img,{alt:"REST Demo",src:t(4246).A+"",width:"2992",height:"1688"})}),"\n",(0,n.jsxs)(i.p,{children:["In summary, by utilizing the ",(0,n.jsx)(i.code,{children:"@rest"})," directive, we've seamlessly exposed RESTful services over Tailcall's GraphQL, enhancing the traditional posts API to offer richer functionality without additional code. This approach combines the simplicity and ubiquity of REST with the modularity and flexibility of GraphQL, allowing for easy consumption from any HTTP client while leveraging GraphQL's powerful data querying capabilities."]})]})}function c(e={}){const{wrapper:i}={...(0,r.R)(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},4009:(e,i,t)=>{t.d(i,{A:()=>n});const n=t.p+"assets/images/rest-diagram-c86d6e8e36ae5a949ea987d8e83d9a48.svg"},4246:(e,i,t)=>{t.d(i,{A:()=>n});const n=t.p+"assets/images/rest-a52c465c2068d2934afcdf32f01461b7.png"}}]);