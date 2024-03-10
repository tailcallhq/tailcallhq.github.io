"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8637],{5429:(e,s,r)=>{r.r(s),r.d(s,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>i,metadata:()=>o,toc:()=>l});var t=r(5893),n=r(1151);const i={title:"@grpc"},a=void 0,o={id:"operators/grpc",title:"@grpc",description:"The @grpc directive enables the resolution of GraphQL fields via gRPC services. Below is an illustrative example of how to apply this directive within a GraphQL schema:",source:"@site/docs/operators/grpc.md",sourceDirName:"operators",slug:"/operators/grpc",permalink:"/docs/operators/grpc",draft:!1,unlisted:!1,editUrl:"https://github.com/tailcallhq/tailcallhq.github.io/tree/develop/docs/operators/grpc.md",tags:[],version:"current",frontMatter:{title:"@grpc"},sidebar:"tutorialSidebar",previous:{title:"@graphQL",permalink:"/docs/operators/graphql"},next:{title:"@http",permalink:"/docs/operators/http"}},c={},l=[{value:"method",id:"method",level:2},{value:"baseURL",id:"baseurl",level:2},{value:"body",id:"body",level:2},{value:"headers",id:"headers",level:2},{value:"batchKey",id:"batchkey",level:2}];function d(e){const s={a:"a",admonition:"admonition",code:"code",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,n.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(s.p,{children:["The ",(0,t.jsx)(s.code,{children:"@grpc"})," directive enables the resolution of GraphQL fields via gRPC services. Below is an illustrative example of how to apply this directive within a GraphQL schema:"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-graphql",children:'schema @link(src: "./users.proto", type: Protobuf) {\n  query: Query\n}\n\ntype Query {\n  users: [User] @grpc(method: "users.UserService.ListUsers")\n}\n'})}),"\n",(0,t.jsxs)(s.p,{children:["This schema snippet demonstrates the directive's application, where a query for ",(0,t.jsx)(s.code,{children:"users"})," triggers a gRPC request to the ",(0,t.jsx)(s.code,{children:"UserService"}),"'s ",(0,t.jsx)(s.code,{children:"ListUsers"})," method, thereby fetching the user data."]}),"\n",(0,t.jsxs)(s.p,{children:["The ",(0,t.jsx)(s.code,{children:".proto"})," file delineates the structure and methods of the gRPC service. A simplified example of such a file is as follows:"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-proto",children:'syntax = "proto3";\n\npackage users;\n\nservice UserService {\n  rpc ListUsers (UserListRequest) returns (UserListReply) {}\n  rpc GetUser (UserGetRequest) returns (UserGetReply) {}\n}\n\nmessage UserListRequest {\n  // Definitions of request parameters\n}\n\nmessage UserListReply {\n  // Structure of the reply\n}\n\nmessage UserGetRequest {\n  // Definitions of request parameters\n}\n\nmessage UserGetReply {\n  // Structure of the reply\n}\n'})}),"\n",(0,t.jsx)(s.admonition,{type:"important",children:(0,t.jsx)(s.p,{children:"It is mandatory to have a package name in a protobuf file."})}),"\n",(0,t.jsxs)(s.p,{children:["Linking this file within a GraphQL schema is facilitated by the ",(0,t.jsx)(s.code,{children:"@link"})," directive, as shown below:"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-graphql",children:'schema @link(src: "./users.proto", type: Protobuf) {\n  query: Query\n}\n'})}),"\n",(0,t.jsxs)(s.p,{children:["Tailcall automatically resolves the protobuf file for any methods referenced in the ",(0,t.jsx)(s.code,{children:"@grpc"})," directive."]}),"\n",(0,t.jsx)(s.h2,{id:"method",children:"method"}),"\n",(0,t.jsxs)(s.p,{children:["This parameter specifies the gRPC service and method to be invoked, formatted as ",(0,t.jsx)(s.code,{children:"<package>.<service>.<method>"}),":"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-graphql",children:'type Query {\n  users: [User] @grpc(method: "proto.users.UserService.ListUsers")\n}\n'})}),"\n",(0,t.jsx)(s.h2,{id:"baseurl",children:"baseURL"}),"\n",(0,t.jsxs)(s.p,{children:["Defines the base URL for the gRPC API. If not specified, the URL set in the ",(0,t.jsx)(s.code,{children:"@upstream"})," directive is used by default:"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-graphql",children:'type Query {\n  users: [User] @grpc(baseURL: "https://grpc-server.example.com", method: "proto.users.UserService.ListUsers")\n}\n'})}),"\n",(0,t.jsx)(s.h2,{id:"body",children:"body"}),"\n",(0,t.jsx)(s.p,{children:"This parameter outlines the arguments for the gRPC call, allowing for both static and dynamic inputs:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-graphql",children:'type UserInput {\n  id: ID\n}\n\ntype Query {\n  user(id: UserInput!): User @grpc(body: "{{args.id}}", method: "proto.users.UserService.GetUser")\n}\n'})}),"\n",(0,t.jsx)(s.h2,{id:"headers",children:"headers"}),"\n",(0,t.jsx)(s.p,{children:"Custom headers for the gRPC request can be defined, facilitating the transmission of authentication tokens or other contextual data:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-graphql",children:'type Query {\n  users: [User]\n    @grpc(headers: [{key: "X-CUSTOM-HEADER", value: "custom-value"}], method: "proto.users.UserService.ListUsers")\n}\n'})}),"\n",(0,t.jsx)(s.h2,{id:"batchkey",children:"batchKey"}),"\n",(0,t.jsx)(s.p,{children:"This argument is employed to optimize batch requests by grouping them based on specified response keys, enhancing performance in scenarios requiring multiple, similar requests:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-graphql",children:'type Query {\n  users(id: UserInput!): [User]\n    @grpc(batchKey: ["id"], method: "proto.users.UserService.ListUsers", baseURL: "https://grpc-server.example.com")\n}\n'})}),"\n",(0,t.jsx)(s.admonition,{type:"info",children:(0,t.jsxs)(s.p,{children:["Read about ",(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.a,{href:"/docs/guides/n+1/",children:"n + 1"})})," to learn how to use the ",(0,t.jsx)(s.code,{children:"batchKey"})," setting."]})})]})}function h(e={}){const{wrapper:s}={...(0,n.a)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},1151:(e,s,r)=>{r.d(s,{Z:()=>o,a:()=>a});var t=r(7294);const n={},i=t.createContext(n);function a(e){const s=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:a(e.components),t.createElement(i.Provider,{value:s},e.children)}}}]);