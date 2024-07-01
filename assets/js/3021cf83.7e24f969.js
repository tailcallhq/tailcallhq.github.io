"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2857],{4530:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>g,contentTitle:()=>u,default:()=>x,frontMatter:()=>d,metadata:()=>p,toc:()=>m});var r=t(4848),l=t(8453),a=t(1432),i=t(6540);const s=()=>{const[e,n]=(0,i.useState)();return(0,i.useEffect)((()=>{(async()=>{const e=await fetch("https://api.github.com/repos/tailcallhq/tailcall/releases/latest"),t=await e.json();"string"==typeof t?.tag_name&&n(t.tag_name)})().catch(console.error)}),[]),(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("span",{children:(0,r.jsx)("b",{children:e})})})},o=()=>(0,r.jsx)("div",{children:(0,r.jsxs)(a.A,{children:["curl -sSL https://tailcall.run/install.sh | bash -s -- ",(0,r.jsx)(s,{})]})});var c=t(1470),h=t(9365);const d={title:"Getting Started with GraphQL",slug:"/",sidebar_position:2,description:"Discover how to efficiently get started with GraphQL using Tailcall, enhancing your data access capabilities through optimized execution strategies.",sidebar_label:"Getting Started"},u=void 0,p={id:"getting-started",title:"Getting Started with GraphQL",description:"Discover how to efficiently get started with GraphQL using Tailcall, enhancing your data access capabilities through optimized execution strategies.",source:"@site/docs/getting-started.mdx",sourceDirName:".",slug:"/",permalink:"/docs/",draft:!1,unlisted:!1,editUrl:"https://github.com/tailcallhq/tailcallhq.github.io/tree/develop/docs/getting-started.mdx",tags:[],version:"current",lastUpdatedAt:1719818949e3,sidebarPosition:2,frontMatter:{title:"Getting Started with GraphQL",slug:"/",sidebar_position:2,description:"Discover how to efficiently get started with GraphQL using Tailcall, enhancing your data access capabilities through optimized execution strategies.",sidebar_label:"Getting Started"},sidebar:"docs",next:{title:"Command Line",permalink:"/docs/tailcall-graphql-cli"}},g={},m=[{value:"Installing the Tailcall CLI",id:"installing-the-tailcall-cli",level:2},{value:"NPM",id:"npm",level:3},{value:"Yarn",id:"yarn",level:3},{value:"Homebrew",id:"homebrew",level:3},{value:"Curl",id:"curl",level:3},{value:"Docker",id:"docker",level:3},{value:"Initializing a GraphQL project",id:"initializing-a-graphql-project",level:2},{value:"Writing a GraphQL Configuration",id:"writing-a-graphql-configuration",level:2},{value:"Starting the GraphQL server",id:"starting-the-graphql-server",level:2},{value:"Making GraphQL requests to the server",id:"making-graphql-requests-to-the-server",level:2},{value:"Deploying GraphQL on Production",id:"deploying-graphql-on-production",level:2}];function j(e){const n={a:"a",admonition:"admonition",br:"br",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{id:"installing-the-tailcall-cli",children:"Installing the Tailcall CLI"}),"\n",(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("p",{children:(0,r.jsxs)(n.p,{children:[(0,r.jsx)("span",{children:"You can install the latest version - "}),"\n",(0,r.jsx)(s,{})," ",(0,r.jsx)("span",{children:"by using"})," ",(0,r.jsx)("b",{children:"NPM"}),"."]})})}),"\n",(0,r.jsx)(n.h3,{id:"npm",children:"NPM"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["If you don't already have ",(0,r.jsx)(n.strong,{children:"nodejs"})," installed, you can find the instructions ",(0,r.jsx)(n.a,{href:"https://nodejs.org/en/learn/getting-started/how-to-install-nodejs",children:"here"}),"."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Install Tailcall by running the following command in your terminal:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"npm i -g @tailcallhq/tailcall\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"To verify the correct installation of Tailcall, run:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"tailcall\n"})}),"\n",(0,r.jsx)(n.admonition,{type:"note",children:(0,r.jsxs)(n.p,{children:["Do not use the ",(0,r.jsx)(n.code,{children:"--force"})," flag during npm installations, as it ignores installing platform-specific builds."]})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"yarn",children:"Yarn"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Install Tailcall by running the following command in your terminal:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"yarn global add @tailcallhq/tailcall\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"To verify the correct installation of Tailcall, run:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"tailcall\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"homebrew",children:"Homebrew"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["If you don't already have Homebrew installed, you can find the instructions ",(0,r.jsx)(n.a,{href:"https://brew.sh/",children:"here"}),"."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Add the Tailcall repository to Homebrew by running the following command in your terminal:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"brew tap tailcallhq/tailcall\nbrew install tailcall\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"To verify the correct installation of Tailcall, run:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"tailcall\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["After completing the installation, perform ",(0,r.jsx)(n.strong,{children:"upgrades"})," with:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"brew update\nbrew upgrade tailcall\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"curl",children:"Curl"}),"\n",(0,r.jsx)(n.p,{children:"Follow the steps below to manually install the cli on your system:"}),"\n",(0,r.jsx)(o,{}),"\n",(0,r.jsxs)(n.p,{children:["This command fetches and executes the Tailcall installation script. The ",(0,r.jsx)(n.code,{children:"~/.tailcall"})," directory contains the installed files."]}),"\n",(0,r.jsxs)(n.p,{children:["Upon completion of the installation, extend your ",(0,r.jsx)(n.code,{children:"PATH"})," environment variable to include the ",(0,r.jsx)(n.code,{children:"~/.tailcall/bin"})," directory:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# export PATH=$PATH:~/.tailcall/bin\n"})}),"\n",(0,r.jsx)(n.h3,{id:"docker",children:"Docker"}),"\n",(0,r.jsxs)(n.p,{children:["To install Tailcall with Docker, follow the steps below. Please note that currently, this installation method only works on Linux/amd64 systems. Before starting, make sure you have Docker installed on your system. If not, download it from ",(0,r.jsx)(n.a,{href:"https://www.docker.com/products/docker-desktop",children:"here"}),"."]}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Pull the latest Tailcall Docker image using the following command:"}),"\n",(0,r.jsxs)(a.A,{language:"bash",children:[(0,r.jsx)(n.p,{children:"docker pull tailcall.docker.scarf.sh/tailcallhq/tailcall/tc-server:"}),(0,r.jsx)(s,{})]}),"\n",(0,r.jsx)(n.p,{children:"This command fetches the latest version of the Tailcall Docker image from the Docker registry."}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Run the Tailcall Docker container with the following command:"}),"\n",(0,r.jsx)(a.A,{language:"bash",children:(0,r.jsxs)(n.p,{children:['docker run -d --name graphql-server -p 8000:8000 \\ -v /path/to/your/configs:/etc/tailcall \\ --entrypoint "/bin/sh" ',(0,r.jsx)(n.br,{}),"\n","ghcr.io/tailcallhq/tailcall/tc-server:\n",(0,r.jsx)(s,{}),' \\ -c "export PATH=$PATH:~/.tailcall/bin && tailcall start /etc/tailcall/config.graphql"']})}),"\n",(0,r.jsx)(n.p,{children:"This command launches the GraphQL server in a Docker container, exposing the GraphQL endpoint on port 8080."}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"initializing-a-graphql-project",children:"Initializing a GraphQL project"}),"\n",(0,r.jsxs)(n.p,{children:["Once you have installed the Tailcall binaries, you can simply use the ",(0,r.jsx)(n.a,{href:"/docs/tailcall-graphql-cli#init",children:"init"})," command to initialize your GraphQL project."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"tailcall init <directory>\n"})}),"\n",(0,r.jsx)(n.p,{children:"The command will ask you a few questions and based on your input bootstrap a new GraphQL project with a few files:"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:".tailcallrc.schema.json"}),": Provides autocomplete in your editor when the configuration is written in ",(0,r.jsx)(n.code,{children:"json"})," or ",(0,r.jsx)(n.code,{children:"yml"})," format."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:".graphqlrc.yml"}),": An IDE configuration that references your GraphQL configuration (if it's in ",(0,r.jsx)(n.code,{children:".graphql"})," format) and the following ",(0,r.jsx)(n.code,{children:".tailcallrc.graphql"}),"."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:".tailcallrc.graphql"}),": Contains Tailcall specific auto-completions for ",(0,r.jsx)(n.code,{children:".graphql"})," format."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"main.graphql"}),": This is your root configuration that contains"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"writing-a-graphql-configuration",children:"Writing a GraphQL Configuration"}),"\n",(0,r.jsxs)(n.p,{children:["For our first example, we are going to compose a GraphQL schema from the REST APIs at ",(0,r.jsx)("a",{href:"https://jsonplaceholder.typicode.com",target:"_blank",children:(0,r.jsx)(n.a,{href:"https://jsonplaceholder.typicode.com",children:"https://jsonplaceholder.typicode.com"})}),", a free online REST API with some fake data.\nWe will use the API at ",(0,r.jsx)(n.code,{children:"/users"})," to get a list of users, and ",(0,r.jsx)(n.code,{children:"/users/:id/posts"})," to get the posts for each user, and compose them into a single GraphQL schema."]}),"\n",(0,r.jsxs)(n.p,{children:["We can use the following formats to define our GraphQL schema: ",(0,r.jsx)(n.code,{children:".graphql"}),", ",(0,r.jsx)(n.code,{children:".yml"}),", ",(0,r.jsx)(n.code,{children:".json"}),"."]}),"\n",(0,r.jsx)(n.p,{children:"Create one of the following files and paste the contents into it."}),"\n",(0,r.jsxs)(c.A,{children:[(0,r.jsx)(h.A,{value:"graphql",label:"graphql",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-graphql",metastring:"showLineNumbers",children:'schema\n  # Specify server configuration: Start GraphQL server at 0.0.0.0:8000\n  @server(port: 8000)\n  # Specify a base url for all http requests\n\n  @upstream(baseURL: "http://jsonplaceholder.typicode.com") {\n  query: Query\n}\n\ntype Query {\n  # Specify the http path for the users query\n  users: [User] @http(path: "/users")\n}\n\n# Create a user type with the fields returned by the users api\n\ntype User {\n  id: Int!\n  name: String!\n  username: String!\n  email: String!\n\n  # Extend the user type with the posts field\n  # Use the current user\'s id to construct the path\n  posts: [Post] @http(path: "/users/{{.value.id}}/posts")\n}\n\n# Create a post type with the fields returned by the posts api\ntype Post {\n  id: Int!\n  title: String!\n  body: String!\n}\n'})})}),(0,r.jsx)(h.A,{value:"yml",label:"yml",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yml",metastring:"showLineNumbers",children:'server:\n  port: 8000\n  queryValidation: false\n  hostname: "0.0.0.0"\nupstream:\n  baseURL: "http://jsonplaceholder.typicode.com"\n  httpCache: 42\nschema:\n  query: Query\ntypes:\n  Post:\n    fields:\n      body:\n        type: String\n        required: true\n      id:\n        type: Int\n        required: true\n      title:\n        type: String\n        required: true\n      user:\n        type: User\n        http:\n          path: /users/{{.value.userId}}\n      userId:\n        type: Int\n        required: true\n  Query:\n    fields:\n      posts:\n        type: Post\n        list: true\n        http:\n          path: /posts\n  User:\n    fields:\n      email:\n        type: String\n        required: true\n      id:\n        type: Int\n        required: true\n      name:\n        type: String\n        required: true\n      phone:\n        type: String\n      username:\n        type: String\n        required: true\n      website:\n        type: String\n'})})}),(0,r.jsx)(h.A,{value:"json",label:"json",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",metastring:"showLineNumbers",children:'{\n  "server": {\n    "port": 8000,\n    "queryValidation": false,\n    "hostname": "0.0.0.0"\n  },\n  "upstream": {\n    "baseURL": "http://jsonplaceholder.typicode.com",\n    "httpCache": 42\n  },\n  "schema": {\n    "query": "Query"\n  },\n  "types": {\n    "Post": {\n      "fields": {\n        "body": {\n          "type": "String",\n          "required": true\n        },\n        "id": {\n          "type": "Int",\n          "required": true\n        },\n        "title": {\n          "type": "String",\n          "required": true\n        },\n        "user": {\n          "type": "User",\n          "http": {\n            "path": "/users/{{.value.userId}}"\n          }\n        },\n        "userId": {\n          "type": "Int",\n          "required": true\n        }\n      }\n    },\n    "Query": {\n      "fields": {\n        "posts": {\n          "type": "Post",\n          "list": true,\n          "http": {\n            "path": "/posts"\n          }\n        }\n      }\n    },\n    "User": {\n      "fields": {\n        "email": {\n          "type": "String",\n          "required": true\n        },\n        "id": {\n          "type": "Int",\n          "required": true\n        },\n        "name": {\n          "type": "String",\n          "required": true\n        },\n        "phone": {\n          "type": "String"\n        },\n        "username": {\n          "type": "String",\n          "required": true\n        },\n        "website": {\n          "type": "String"\n        }\n      }\n    }\n  }\n}\n'})})})]}),"\n",(0,r.jsxs)(n.p,{children:["The above file is a standard ",(0,r.jsx)(n.code,{children:".graphQL"})," file, with some minor additions such as ",(0,r.jsx)(n.code,{children:"@upstream"})," and ",(0,r.jsx)(n.code,{children:"@http"})," directives. Basically we specify the GraphQL schema and how to resolve that GraphQL schema in the same file, without having to write any code!"]}),"\n",(0,r.jsx)(n.h2,{id:"starting-the-graphql-server",children:"Starting the GraphQL server"}),"\n",(0,r.jsx)(n.p,{children:"Now, run the following command to start the server with the full path to the file that you created earlier."}),"\n",(0,r.jsxs)(c.A,{children:[(0,r.jsx)(h.A,{value:"graphql",label:"graphql",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"tailcall start ./jsonplaceholder.graphql\n"})})}),(0,r.jsx)(h.A,{value:"yml",label:"yml",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"tailcall start ./jsonplaceholder.yml\n"})})}),(0,r.jsx)(h.A,{value:"json",label:"json",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"tailcall start ./jsonplaceholder.json\n"})})})]}),"\n",(0,r.jsx)(n.p,{children:"If the command succeeds, you should see logs like the following below."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"INFO File read: ./jsonplaceholder.graphql ... ok\nINFO N + 1 detected: 0\nINFO \ud83d\ude80 Tailcall launched at [0.0.0.0:8000] over HTTP/1.1\nINFO \ud83c\udf0d Playground: https://tailcall.run/playground/?u=http://127.0.0.1:8000/graphql\n"})}),"\n",(0,r.jsxs)(n.p,{children:["The server starts with the schema provided and prints out a load of meta information. We will cover those in detail in a bit. For now, open the ",(0,r.jsx)(n.strong,{children:"playground URL"})," in a new tab in your browser and try it out for yourself!"]}),"\n",(0,r.jsx)(n.h2,{id:"making-graphql-requests-to-the-server",children:"Making GraphQL requests to the server"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["Open a web browser and go to ",(0,r.jsx)(n.a,{href:"https://tailcall.run/playground/?u=http://127.0.0.1:8000/graphql",children:"https://tailcall.run/playground/?u=http://127.0.0.1:8000/graphql"}),". This should load the GraphiQL interface."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"In the query editor of GraphiQL, enter the following query"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-graphql",metastring:"showLineNumbers",children:"query {\n  users {\n    id\n    name\n    posts {\n      title\n    }\n  }\n}\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"After running the query in GraphiQL, expect to see a JSON response structured like this:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",metastring:"showLineNumbers",children:'{\n  "data": {\n    "users": [\n      {\n        "id": 1,\n        "name": "Leanne Graham",\n        "posts": [\n          {\n            "title": "sunt aut facere repellat provident occaecati excepturi option reprehenderit"\n          }\n          // Posts truncated for brevity\n        ]\n      },\n      {\n        "id": 2,\n        "name": "Ervin Howell",\n        "posts": [\n          {\n            "title": "et ea vero quia laudantium autem"\n          },\n          {\n            "title": "in quibusdam tempore odit est dolorem"\n          }\n          // Posts truncated for brevity\n        ]\n      }\n      // Users truncated for brevity\n    ]\n  }\n}\n'})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"deploying-graphql-on-production",children:"Deploying GraphQL on Production"}),"\n",(0,r.jsxs)(n.p,{children:["Now that you have a running GraphQL server, you can follow our ",(0,r.jsx)(n.a,{href:"/docs/deploy-graphql-github-actions",children:"Github Actions Guide"})," to deploy the application on one of the following cloud providers."]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/docs/tailcall-on-aws",children:"AWS Lambda"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/docs/deploy-tailcall-graphql-fly-actions",children:"Fly.io"})}),"\n"]})]})}function x(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(j,{...e})}):j(e)}},9365:(e,n,t)=>{t.d(n,{A:()=>i});t(6540);var r=t(4164);const l={tabItem:"tabItem_Ymn6"};var a=t(4848);function i(e){let{children:n,hidden:t,className:i}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,r.A)(l.tabItem,i),hidden:t,children:n})}},1470:(e,n,t)=>{t.d(n,{A:()=>w});var r=t(6540),l=t(4164),a=t(3104),i=t(6347),s=t(205),o=t(7485),c=t(1682),h=t(679);function d(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function u(e){const{values:n,children:t}=e;return(0,r.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:t,attributes:r,default:l}}=e;return{value:n,label:t,attributes:r,default:l}}))}(t);return function(e){const n=(0,c.X)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function p(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function g(e){let{queryString:n=!1,groupId:t}=e;const l=(0,i.W6)(),a=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,o.aZ)(a),(0,r.useCallback)((e=>{if(!a)return;const n=new URLSearchParams(l.location.search);n.set(a,e),l.replace({...l.location,search:n.toString()})}),[a,l])]}function m(e){const{defaultValue:n,queryString:t=!1,groupId:l}=e,a=u(e),[i,o]=(0,r.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const r=t.find((e=>e.default))??t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:a}))),[c,d]=g({queryString:t,groupId:l}),[m,j]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[l,a]=(0,h.Dv)(t);return[l,(0,r.useCallback)((e=>{t&&a.set(e)}),[t,a])]}({groupId:l}),x=(()=>{const e=c??m;return p({value:e,tabValues:a})?e:null})();(0,s.A)((()=>{x&&o(x)}),[x]);return{selectedValue:i,selectValue:(0,r.useCallback)((e=>{if(!p({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);o(e),d(e),j(e)}),[d,j,a]),tabValues:a}}var j=t(2303);const x={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var f=t(4848);function y(e){let{className:n,block:t,selectedValue:r,selectValue:i,tabValues:s}=e;const o=[],{blockElementScrollPositionUntilNextRender:c}=(0,a.a_)(),h=e=>{const n=e.currentTarget,t=o.indexOf(n),l=s[t].value;l!==r&&(c(n),i(l))},d=e=>{let n=null;switch(e.key){case"Enter":h(e);break;case"ArrowRight":{const t=o.indexOf(e.currentTarget)+1;n=o[t]??o[0];break}case"ArrowLeft":{const t=o.indexOf(e.currentTarget)-1;n=o[t]??o[o.length-1];break}}n?.focus()};return(0,f.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.A)("tabs",{"tabs--block":t},n),children:s.map((e=>{let{value:n,label:t,attributes:a}=e;return(0,f.jsx)("li",{role:"tab",tabIndex:r===n?0:-1,"aria-selected":r===n,ref:e=>o.push(e),onKeyDown:d,onClick:h,...a,className:(0,l.A)("tabs__item",x.tabItem,a?.className,{"tabs__item--active":r===n}),children:t??n},n)}))})}function b(e){let{lazy:n,children:t,selectedValue:l}=e;const a=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=a.find((e=>e.props.value===l));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return(0,f.jsx)("div",{className:"margin-top--md",children:a.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==l})))})}function v(e){const n=m(e);return(0,f.jsxs)("div",{className:(0,l.A)("tabs-container",x.tabList),children:[(0,f.jsx)(y,{...n,...e}),(0,f.jsx)(b,{...n,...e})]})}function w(e){const n=(0,j.A)();return(0,f.jsx)(v,{...e,children:d(e.children)},String(n))}}}]);