"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5235],{336:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>u,contentTitle:()=>s,default:()=>p,frontMatter:()=>i,metadata:()=>c,toc:()=>d});var t=r(4848),a=r(8453),l=r(1470),o=r(9365);const i={title:"GraphQL Configuration Formats",description:"Explore the format conversion capabilities of the Tailcall CLI, supporting GraphQL, YAML, and JSON for configuration files. This documentation shows developers how to effortlessly convert and manage configurations, leveraging GraphQL for clear type definitions, and YAML and JSON for their ubiquity in tools and API integration. Enhance your development and deployment workflows today.",slug:"tailcall-graphql-configuration-format-conversion",sidebar_label:"Configuration Formats"},s=void 0,c={id:"configuration",title:"GraphQL Configuration Formats",description:"Explore the format conversion capabilities of the Tailcall CLI, supporting GraphQL, YAML, and JSON for configuration files. This documentation shows developers how to effortlessly convert and manage configurations, leveraging GraphQL for clear type definitions, and YAML and JSON for their ubiquity in tools and API integration. Enhance your development and deployment workflows today.",source:"@site/docs/configuration.mdx",sourceDirName:".",slug:"/tailcall-graphql-configuration-format-conversion",permalink:"/docs/tailcall-graphql-configuration-format-conversion",draft:!1,unlisted:!1,editUrl:"https://github.com/tailcallhq/tailcallhq.github.io/tree/develop/docs/configuration.mdx",tags:[],version:"current",frontMatter:{title:"GraphQL Configuration Formats",description:"Explore the format conversion capabilities of the Tailcall CLI, supporting GraphQL, YAML, and JSON for configuration files. This documentation shows developers how to effortlessly convert and manage configurations, leveraging GraphQL for clear type definitions, and YAML and JSON for their ubiquity in tools and API integration. Enhance your development and deployment workflows today.",slug:"tailcall-graphql-configuration-format-conversion",sidebar_label:"Configuration Formats"},sidebar:"docs",previous:{title:"Environment Variables",permalink:"/docs/graphql-environment-variables"},next:{title:"Apollo Studio",permalink:"/docs/integrate-apollo-studio-graphql-tailcall"}},u={},d=[{value:"Converting Formats",id:"converting-formats",level:2},{value:"Format Conversions",id:"format-conversions",level:2},{value:"Editor Support",id:"editor-support",level:2},{value:"GraphQL",id:"graphql",level:3},{value:"JSON &amp; YAML",id:"json--yaml",level:3}];function h(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.p,{children:["The Tailcall CLI's ",(0,t.jsx)(n.a,{href:"/docs/tailcall-graphql-cli#check",children:"check"})," command enables the conversion of configuration files between three supported formats: gql or graphql, yml or yaml, and json, with ",(0,t.jsx)(n.code,{children:"graphql"})," set as the default format."]}),"\n",(0,t.jsxs)(n.p,{children:["The three formats, ",(0,t.jsx)(n.code,{children:"GraphQL"}),", ",(0,t.jsx)(n.code,{children:"YAML"}),", and ",(0,t.jsx)(n.code,{children:"JSON"}),", are supported due to their distinct advantages. ",(0,t.jsx)(n.code,{children:"GraphQL"})," is chosen for its ability to clearly define types and their relationships. ",(0,t.jsx)(n.code,{children:"YAML"})," and ",(0,t.jsx)(n.code,{children:"JSON"})," are included for their widespread use in platform tools, with ",(0,t.jsx)(n.code,{children:"JSON"})," also favored for its role as a transport format, allowing configurations to be auto generated and exposed as APIs for consumption by the GraphQL server."]}),"\n",(0,t.jsx)(n.h2,{id:"converting-formats",children:"Converting Formats"}),"\n",(0,t.jsx)(n.p,{children:"To convert files between different formats, use the following command:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"tailcall check format_type < input_files > --format\n"})}),"\n",(0,t.jsx)(n.p,{children:"Let's try to convert a Tailcall graphql file to json and then back to graphql"}),"\n",(0,t.jsx)(n.p,{children:"To convert graphql to json"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'tailcall check examples/jsonplaceholder.graphql --format json > "examples/jsonplaceholder.json"\n'})}),"\n",(0,t.jsx)(n.p,{children:"Now to convert back to graphql"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'tailcall check examples/jsonplaceholder.json --format graphql > "examples/jsonplaceholder2.graphql"\n'})}),"\n",(0,t.jsxs)(n.p,{children:["To learn more about writing configuration to leverage the full power of Tailcall, explore the ",(0,t.jsx)(n.a,{href:"/docs/tailcall-dsl-graphql-custom-directives",children:"Directives"})," documentation."]}),"\n",(0,t.jsx)(n.h2,{id:"format-conversions",children:"Format Conversions"}),"\n",(0,t.jsxs)(l.A,{children:[(0,t.jsx)(o.A,{value:"graphql",label:"graphql",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-graphql",metastring:"showLineNumbers",children:'schema\n  @server(port: 8000, hostname: "0.0.0.0")\n  @upstream(baseURL: "http://jsonplaceholder.typicode.com", httpCache: 42, batch: {delay: 100}) {\n  query: Query\n}\n\ntype Query {\n  posts: [Post] @http(path: "/posts")\n  users: [User] @http(path: "/users")\n  user(id: Int!): User @http(path: "/users/{{.args.id}}")\n}\n\ntype User {\n  id: Int!\n  name: String!\n  username: String!\n  email: String!\n  phone: String\n  website: String\n}\n\ntype Post {\n  id: Int!\n  userId: Int!\n  title: String!\n  body: String!\n  user: User @call(query: "user", args: {id: "{{.value.userId}}"})\n}\n'})})}),(0,t.jsx)(o.A,{value:"yml",label:"yml",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yml",metastring:"showLineNumbers",children:"server:\n  hostname: 0.0.0.0\n  port: 8000\nupstream:\n  baseURL: http://jsonplaceholder.typicode.com\n  httpCache: 42\n  batch:\n    maxSize: 100\n    delay: 100\n    headers: []\nschema:\n  query: Query\ntypes:\n  Post:\n    fields:\n      body:\n        type: String\n        required: true\n        cache: null\n      id:\n        type: Int\n        required: true\n        cache: null\n      title:\n        type: String\n        required: true\n        cache: null\n      user:\n        type: User\n        cache: null\n      userId:\n        type: Int\n        required: true\n        cache: null\n    cache: null\n  Query:\n    fields:\n      posts:\n        type: Post\n        list: true\n        http:\n          path: /posts\n        cache: null\n      user:\n        type: User\n        args:\n          id:\n            type: Int\n            required: true\n        http:\n          path: /users/{{.args.id}}\n        cache: null\n      users:\n        type: User\n        list: true\n        http:\n          path: /users\n        cache: null\n    cache: null\n  User:\n    fields:\n      email:\n        type: String\n        required: true\n        cache: null\n      id:\n        type: Int\n        required: true\n        cache: null\n      name:\n        type: String\n        required: true\n        cache: null\n      phone:\n        type: String\n        cache: null\n      username:\n        type: String\n        required: true\n        cache: null\n      website:\n        type: String\n        cache: null\n    cache: null\n"})})}),(0,t.jsx)(o.A,{value:"json",label:"json",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",metastring:"showLineNumbers",children:'{\n  "server": {\n    "hostname": "0.0.0.0",\n    "port": 8000\n  },\n  "upstream": {\n    "baseURL": "http://jsonplaceholder.typicode.com",\n    "httpCache": 42,\n    "batch": {\n      "maxSize": 100,\n      "delay": 100,\n      "headers": []\n    }\n  },\n  "schema": {\n    "query": "Query"\n  },\n  "types": {\n    "Post": {\n      "fields": {\n        "body": {\n          "type": "String",\n          "required": true,\n          "cache": null\n        },\n        "id": {\n          "type": "Int",\n          "required": true,\n          "cache": null\n        },\n        "title": {\n          "type": "String",\n          "required": true,\n          "cache": null\n        },\n        "user": {\n          "type": "User",\n          "cache": null\n        },\n        "userId": {\n          "type": "Int",\n          "required": true,\n          "cache": null\n        }\n      },\n      "cache": null\n    },\n    "Query": {\n      "fields": {\n        "posts": {\n          "type": "Post",\n          "list": true,\n          "http": {\n            "path": "/posts"\n          },\n          "cache": null\n        },\n        "user": {\n          "type": "User",\n          "args": {\n            "id": {\n              "type": "Int",\n              "required": true\n            }\n          },\n          "http": {\n            "path": "/users/{{.args.id}}"\n          },\n          "cache": null\n        },\n        "users": {\n          "type": "User",\n          "list": true,\n          "http": {\n            "path": "/users"\n          },\n          "cache": null\n        }\n      },\n      "cache": null\n    },\n    "User": {\n      "fields": {\n        "email": {\n          "type": "String",\n          "required": true,\n          "cache": null\n        },\n        "id": {\n          "type": "Int",\n          "required": true,\n          "cache": null\n        },\n        "name": {\n          "type": "String",\n          "required": true,\n          "cache": null\n        },\n        "phone": {\n          "type": "String",\n          "cache": null\n        },\n        "username": {\n          "type": "String",\n          "required": true,\n          "cache": null\n        },\n        "website": {\n          "type": "String",\n          "cache": null\n        }\n      },\n      "cache": null\n    }\n  }\n}\n'})})})]}),"\n",(0,t.jsx)(n.h2,{id:"editor-support",children:"Editor Support"}),"\n",(0,t.jsxs)(n.p,{children:["To leverage autocomplete and validation for GraphQL configurations, the ",(0,t.jsx)(n.a,{href:"/docs/tailcall-graphql-cli#init",children:"init"})," command can be used to automatically create ",(0,t.jsx)(n.code,{children:".tailcallrc.graphql"})," for GraphQL configurations and ",(0,t.jsx)(n.code,{children:".tailcallrc.schema.json"})," for JSON and YAML configurations. These files enhance editor support by providing schema definitions, facilitating faster and error-free configuration."]}),"\n",(0,t.jsx)(n.h3,{id:"graphql",children:"GraphQL"}),"\n",(0,t.jsxs)(n.p,{children:["When you run ",(0,t.jsx)(n.code,{children:"tailcall init"}),", it creates a ",(0,t.jsx)(n.code,{children:".tailcallrc.graphql"})," file containing your GraphQL schema definitions and a ",(0,t.jsx)(n.code,{children:".graphqlrc.yml"})," file configured to use this schema. The ",(0,t.jsx)(n.code,{children:".graphqlrc.yml"})," file is set up as follows:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yml",children:'schema:\n  - "./.tailcallrc.graphql"\n  - "./app.graphql"\n'})}),"\n",(0,t.jsxs)(n.p,{children:["This file contains the path to the ",(0,t.jsx)(n.code,{children:".tailcallrc.graphql"})," file and the path to the main GraphQL configuration file which is ",(0,t.jsx)(n.code,{children:"app.graphql"}),". This setup allows GraphQL IDE plugins and Language Server Protocols (LSP) to automatically pick up the schema for autocomplete and validation, enhancing your development experience with real-time feedback and suggestions."]}),"\n",(0,t.jsx)(n.h3,{id:"json--yaml",children:"JSON & YAML"}),"\n",(0,t.jsxs)(n.p,{children:["For JSON or YAML configurations, ",(0,t.jsx)(n.code,{children:"tailcall init"})," also creates a ",(0,t.jsx)(n.code,{children:".tailcallrc.schema.json"})," file. To enable validation and autocomplete in your JSON files, reference the ",(0,t.jsx)(n.code,{children:".tailcallrc.schema.json"})," in the ",(0,t.jsx)(n.code,{children:"$schema"})," attribute at the beginning of your JSON file:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",children:'{\n  "$schema": "./.tailcallrc.schema.json"\n}\n'})}),"\n",(0,t.jsx)(n.p,{children:"This reference enables your IDE to validate and autocomplete using the JSON schema, offering a streamlined configuration process with instant error and typo detection."})]})}function p(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},9365:(e,n,r)=>{r.d(n,{A:()=>o});r(6540);var t=r(4164);const a={tabItem:"tabItem_Ymn6"};var l=r(4848);function o(e){let{children:n,hidden:r,className:o}=e;return(0,l.jsx)("div",{role:"tabpanel",className:(0,t.A)(a.tabItem,o),hidden:r,children:n})}},1470:(e,n,r)=>{r.d(n,{A:()=>q});var t=r(6540),a=r(4164),l=r(3104),o=r(6347),i=r(205),s=r(7485),c=r(1682),u=r(9466);function d(e){return t.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,t.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:r}=e;return(0,t.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:r,attributes:t,default:a}}=e;return{value:n,label:r,attributes:t,default:a}}))}(r);return function(e){const n=(0,c.X)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,r])}function p(e){let{value:n,tabValues:r}=e;return r.some((e=>e.value===n))}function f(e){let{queryString:n=!1,groupId:r}=e;const a=(0,o.W6)(),l=function(e){let{queryString:n=!1,groupId:r}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:n,groupId:r});return[(0,s.aZ)(l),(0,t.useCallback)((e=>{if(!l)return;const n=new URLSearchParams(a.location.search);n.set(l,e),a.replace({...a.location,search:n.toString()})}),[l,a])]}function m(e){const{defaultValue:n,queryString:r=!1,groupId:a}=e,l=h(e),[o,s]=(0,t.useState)((()=>function(e){let{defaultValue:n,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const t=r.find((e=>e.default))??r[0];if(!t)throw new Error("Unexpected error: 0 tabValues");return t.value}({defaultValue:n,tabValues:l}))),[c,d]=f({queryString:r,groupId:a}),[m,g]=function(e){let{groupId:n}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(n),[a,l]=(0,u.Dv)(r);return[a,(0,t.useCallback)((e=>{r&&l.set(e)}),[r,l])]}({groupId:a}),y=(()=>{const e=c??m;return p({value:e,tabValues:l})?e:null})();(0,i.A)((()=>{y&&s(y)}),[y]);return{selectedValue:o,selectValue:(0,t.useCallback)((e=>{if(!p({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);s(e),d(e),g(e)}),[d,g,l]),tabValues:l}}var g=r(2303);const y={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var b=r(4848);function v(e){let{className:n,block:r,selectedValue:t,selectValue:o,tabValues:i}=e;const s=[],{blockElementScrollPositionUntilNextRender:c}=(0,l.a_)(),u=e=>{const n=e.currentTarget,r=s.indexOf(n),a=i[r].value;a!==t&&(c(n),o(a))},d=e=>{let n=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const r=s.indexOf(e.currentTarget)+1;n=s[r]??s[0];break}case"ArrowLeft":{const r=s.indexOf(e.currentTarget)-1;n=s[r]??s[s.length-1];break}}n?.focus()};return(0,b.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.A)("tabs",{"tabs--block":r},n),children:i.map((e=>{let{value:n,label:r,attributes:l}=e;return(0,b.jsx)("li",{role:"tab",tabIndex:t===n?0:-1,"aria-selected":t===n,ref:e=>s.push(e),onKeyDown:d,onClick:u,...l,className:(0,a.A)("tabs__item",y.tabItem,l?.className,{"tabs__item--active":t===n}),children:r??n},n)}))})}function j(e){let{lazy:n,children:r,selectedValue:a}=e;const l=(Array.isArray(r)?r:[r]).filter(Boolean);if(n){const e=l.find((e=>e.props.value===a));return e?(0,t.cloneElement)(e,{className:"margin-top--md"}):null}return(0,b.jsx)("div",{className:"margin-top--md",children:l.map(((e,n)=>(0,t.cloneElement)(e,{key:n,hidden:e.props.value!==a})))})}function x(e){const n=m(e);return(0,b.jsxs)("div",{className:(0,a.A)("tabs-container",y.tabList),children:[(0,b.jsx)(v,{...e,...n}),(0,b.jsx)(j,{...e,...n})]})}function q(e){const n=(0,g.A)();return(0,b.jsx)(x,{...e,children:d(e.children)},String(n))}}}]);