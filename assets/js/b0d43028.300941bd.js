"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4946],{7239:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var n=t(4848),i=t(8453);const r={title:"Leverage Javascript for Modifying requests and responses",description:"Automate your API tasks with scripting using Tailcall. Follow our comprehensive scripting guides for enhanced efficiency.",slug:"graphql-javascript-customization"},a=void 0,o={id:"scripting",title:"Leverage Javascript for Modifying requests and responses",description:"Automate your API tasks with scripting using Tailcall. Follow our comprehensive scripting guides for enhanced efficiency.",source:"@site/docs/scripting.md",sourceDirName:".",slug:"/graphql-javascript-customization",permalink:"/docs/graphql-javascript-customization",draft:!1,unlisted:!1,editUrl:"https://github.com/tailcallhq/tailcallhq.github.io/tree/develop/docs/scripting.md",tags:[],version:"current",frontMatter:{title:"Leverage Javascript for Modifying requests and responses",description:"Automate your API tasks with scripting using Tailcall. Follow our comprehensive scripting guides for enhanced efficiency.",slug:"graphql-javascript-customization"},sidebar:"tutorialSidebar",previous:{title:"GraphQL Scalars",permalink:"/docs/graphql-scalars-guide"},next:{title:"Deploying Tailcall on AWS",permalink:"/docs/graphql-aws-deployment-tailcall"}},l={},c=[{value:"Getting Started",id:"getting-started",level:2},{value:"Modify Request",id:"modify-request",level:2},{value:"Create Response",id:"create-response",level:2},{value:"Response Redirect",id:"response-redirect",level:2},{value:"Schema",id:"schema",level:2},{value:"Request",id:"request",level:3},{value:"Response",id:"response",level:3}];function d(e){const s={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,i.R)(),...e.components},{Head:t}=s;return t||function(e,s){throw new Error("Expected "+(s?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t,{children:(0,n.jsx)("title",{children:"Tailcall Scripting: Modify Requests and Customize Responses | Tailcall Guides"})}),"\n",(0,n.jsx)(s.p,{children:"Tailcall provides a light-weight JS runtime to modify requests and resolve with custom responses.\nThe runtime is not a full-fledged Node.js environment and has no access to the file system or the network. It is designed to be used for simple request/response modifications."}),"\n",(0,n.jsx)(s.h2,{id:"getting-started",children:"Getting Started"}),"\n",(0,n.jsxs)(s.p,{children:["To leverage this functionality, a JavaScript function named ",(0,n.jsx)(s.code,{children:"onRequest"})," must be created in a ",(0,n.jsx)(s.code,{children:"worker.js"})," file. This function serves as middleware, allowing for the interception and modification of the request. Here is a simple example of a ",(0,n.jsx)(s.code,{children:"worker.js"})," file that logs the request and returns the original request without any modifications."]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-javascript",children:"function onRequest({request}) {\n  console.log(`${request.method} ${request.uri.path}`)\n\n  return {request}\n}\n"})}),"\n",(0,n.jsxs)(s.p,{children:["Once you have a worker file ready, you link that file to the tailcall configuration using the ",(0,n.jsx)(s.a,{href:"/docs/tailcall-dsl-graphql-custom-directives#link-directive",children:(0,n.jsx)(s.code,{children:"@link"})})," directive."]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-graphql",children:'schema @link(type: Script, src: "./worker.js") {\n  query: Query\n}\n'})}),"\n",(0,n.jsxs)(s.p,{children:["Once the worker is linked, you can start the server using the usual ",(0,n.jsx)(s.a,{href:"/docs/tailcall-graphql-cli/#start",children:"start"})," command. Making requests to tailcall will now be intercepted by the worker and logged to the console."]}),"\n",(0,n.jsx)(s.h2,{id:"modify-request",children:"Modify Request"}),"\n",(0,n.jsxs)(s.p,{children:["You can modify the request by returning a ",(0,n.jsx)(s.code,{children:"request"})," object from the ",(0,n.jsx)(s.code,{children:"onRequest"})," function. Below is an example where we are modifying the request to add a custom header."]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-javascript",children:'function onRequest({request}) {\n  request.headers["x-custom-header"] = "Hello, Tailcall!"\n\n  return {request}\n}\n'})}),"\n",(0,n.jsx)(s.h2,{id:"create-response",children:"Create Response"}),"\n",(0,n.jsxs)(s.p,{children:["You can respond with custom responses by returning a ",(0,n.jsx)(s.code,{children:"response"})," object from the ",(0,n.jsx)(s.code,{children:"onRequest"})," function. Below is an example where we are responding with a custom response for all requests that start with ",(0,n.jsx)(s.code,{children:"https://api.example.com"}),"."]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-javascript",children:'function onRequest({request}) {\n  if (request.uri.path.startsWith("https://api.example.com")) {\n    return {\n      response: {\n        status: 200,\n        headers: {\n          "content-type": "application/json"\n        },\n        body: JSON.stringify({message: "Hello, Tailcall!"})\n      }\n    }\n  }\n  else {\n    return {request}\n  }\n'})}),"\n",(0,n.jsx)(s.h2,{id:"response-redirect",children:"Response Redirect"}),"\n",(0,n.jsxs)(s.p,{children:["Sometimes you might want to redirect the request to a different URL. You can do this by returning a ",(0,n.jsx)(s.code,{children:"response"})," object with a ",(0,n.jsx)(s.code,{children:"status"})," of ",(0,n.jsx)(s.code,{children:"301"})," or ",(0,n.jsx)(s.code,{children:"302"})," and a ",(0,n.jsx)(s.code,{children:"Location"})," header. The following example redirects all requests to ",(0,n.jsx)(s.code,{children:"https://example.com"})," to ",(0,n.jsx)(s.code,{children:"https://tailcall.com"}),"."]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-javascript",children:'function onRequest({request}) {\n  if (request.uri.path.startsWith("https://example.com")) {\n    return {\n      response: {\n        status: 301,\n        headers: {\n          Location: "https://tailcall.com",\n        },\n      },\n    }\n  } else {\n    return {request}\n  }\n}\n'})}),"\n",(0,n.jsx)(s.admonition,{type:"important",children:(0,n.jsx)(s.p,{children:"The new request that's created as a result of the redirect will not be intercepted by the worker."})}),"\n",(0,n.jsx)(s.h2,{id:"schema",children:"Schema"}),"\n",(0,n.jsxs)(s.p,{children:["The ",(0,n.jsx)(s.code,{children:"onRequest"})," function takes a single argument that contains the request object. The return value of the ",(0,n.jsx)(s.code,{children:"onRequest"})," function can be a ",(0,n.jsx)(s.code,{children:"request"})," object, or a ",(0,n.jsx)(s.code,{children:"response"})," object. It can not be null or undefined."]}),"\n",(0,n.jsx)(s.h3,{id:"request",children:"Request"}),"\n",(0,n.jsx)(s.p,{children:"The request object has the following shape:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-typescript",children:'type Request = {\n  method: string\n  uri: {\n    path: string\n    query?: {[key: string]: string}\n    scheme: "Http" | "Https"\n    host?: string\n    port?: number\n  }\n  headers: {[key: string]: string}\n  body?: string\n}\n'})}),"\n",(0,n.jsxs)(s.p,{children:["By default the headers field will be empty in most cases, unless headers are whitelisted via the ",(0,n.jsx)(s.a,{href:"/docs/tailcall-dsl-graphql-custom-directives#allowedheaders",children:"allowedHeaders"})," setting in ",(0,n.jsx)(s.a,{href:"/docs/tailcall-dsl-graphql-custom-directives#upstream-directive",children:(0,n.jsx)(s.code,{children:"@upstream"})}),"."]}),"\n",(0,n.jsx)(s.p,{children:"The http filter doesn't have access to the request's body, hence you can't directly modify the body of an outgoing request. This is more of a design choice than a limitation we have made to ensure that developers don't misuse this API to write all kind of business logic in Tailcall."}),"\n",(0,n.jsx)(s.admonition,{type:"tip",children:(0,n.jsx)(s.p,{children:"As an escape hatch you can pass the request body as a query param instead of an actual request body and read in the JS."})}),"\n",(0,n.jsxs)(s.p,{children:["The modified request that's returned from the above ",(0,n.jsx)(s.code,{children:"onRequest"})," function can optionally provide the body. This body is used by Tailcall as the request body while making the upstream request."]}),"\n",(0,n.jsx)(s.h3,{id:"response",children:"Response"}),"\n",(0,n.jsx)(s.p,{children:"The response object has the following shape:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-typescript",children:"type Response = {\n  status: number\n  headers: {[key: string]: string}\n  body?: string\n}\n"})})]})}function h(e={}){const{wrapper:s}={...(0,i.R)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}}}]);