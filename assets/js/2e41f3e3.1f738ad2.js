"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8684],{47538:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>h,contentTitle:()=>r,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var n=a(74848),i=a(28453);const o={title:"Writing a GraphQL Backend by Hand is Long Gone",subtitle:"Writing a GraphQL backend by hand doesn't scale beyond a point.",authors:[{name:"Tushar Mathur",title:"CEO @ Tailcall | Love to talk about programming, scale, distributed systems and building high performance systems.",url:"https://github.com/tusharmath",image_url:"https://avatars.githubusercontent.com/u/194482?v=4"}],tags:["GraphQL","Node.js","JavaScript"],description:"Writing a GraphQL backend by hand doesn't scale beyond a point.",image:"/images/blog/no-code-cover.png",hide_table_of_contents:!0,slug:"writing-a-graphql-backend-by-hand-is-long-gone",canonical_url:"https://tailcall.hashnode.dev/writing-a-graphql-backend-by-hand-is-long-gone"},r=void 0,s={permalink:"/blog/writing-a-graphql-backend-by-hand-is-long-gone",source:"@site/blog/no-code-graphql-2024-05-30.md",title:"Writing a GraphQL Backend by Hand is Long Gone",description:"Writing a GraphQL backend by hand doesn't scale beyond a point.",date:"2024-05-30T00:00:00.000Z",tags:[{inline:!0,label:"GraphQL",permalink:"/blog/tags/graph-ql"},{inline:!0,label:"Node.js",permalink:"/blog/tags/node-js"},{inline:!0,label:"JavaScript",permalink:"/blog/tags/java-script"}],readingTime:6.205,hasTruncateMarker:!0,authors:[{name:"Tushar Mathur",title:"CEO @ Tailcall | Love to talk about programming, scale, distributed systems and building high performance systems.",url:"https://github.com/tusharmath",image_url:"https://avatars.githubusercontent.com/u/194482?v=4",imageURL:"https://avatars.githubusercontent.com/u/194482?v=4"}],frontMatter:{title:"Writing a GraphQL Backend by Hand is Long Gone",subtitle:"Writing a GraphQL backend by hand doesn't scale beyond a point.",authors:[{name:"Tushar Mathur",title:"CEO @ Tailcall | Love to talk about programming, scale, distributed systems and building high performance systems.",url:"https://github.com/tusharmath",image_url:"https://avatars.githubusercontent.com/u/194482?v=4",imageURL:"https://avatars.githubusercontent.com/u/194482?v=4"}],tags:["GraphQL","Node.js","JavaScript"],description:"Writing a GraphQL backend by hand doesn't scale beyond a point.",image:"/images/blog/no-code-cover.png",hide_table_of_contents:!0,slug:"writing-a-graphql-backend-by-hand-is-long-gone",canonical_url:"https://tailcall.hashnode.dev/writing-a-graphql-backend-by-hand-is-long-gone"},unlisted:!1,prevItem:{title:"Design a GraphQL Schema So Good, It'll Make REST APIs Cry - Part 1",permalink:"/blog/graphql-schema"},nextItem:{title:"GraphQL vs REST vs gRPC - an unfair comparison",permalink:"/blog/graphql-vs-rest-vs-grpc"}},h={authorsImageUrls:[void 0]},l=[{value:"Complexity with GraphQL",id:"complexity-with-graphql",level:2},{value:"GraphQL is more like SQL and less like REST",id:"graphql-is-more-like-sql-and-less-like-rest",level:2},{value:"The future of GraphQL",id:"the-future-of-graphql",level:2}];function c(e){const t={a:"a",blockquote:"blockquote",h2:"h2",img:"img",li:"li",p:"p",ul:"ul",...(0,i.R)(),...e.components},{Head:o}=t;return o||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(t.p,{children:["Building a GraphQL backend by hand might seem like a noble pursuit, but the landscape of API development is evolving rapidly, and so are the challenges that come with it. Today, the process is often fraught with complexity, performance bottlenecks, security vulnerabilities, and reliability issues. Yet again, we had a developer expressing ",(0,n.jsx)(t.a,{href:"https://bessey.dev/blog/2024/05/24/why-im-over-graphql/",children:"frustration"})," about the issues with GraphQL and the reasons for leaving our mighty ship. I wish to dive deeper into these challenges and explore why the future points towards automated, high-performance solutions."]}),"\n",(0,n.jsxs)(o,{children:[(0,n.jsx)("link",{rel:"canonical",href:"https://tailcall.hashnode.dev/writing-a-graphql-backend-by-hand-is-long-gone"}),(0,n.jsx)("title",{children:"Writing a GraphQL Backend by Hand is Long Gone"})]}),"\n",(0,n.jsx)(t.h2,{id:"complexity-with-graphql",children:"Complexity with GraphQL"}),"\n",(0,n.jsx)(t.p,{children:"If you see, most of the concerns with GraphQL are around building a robust GraphQL backend. It's rarely about consuming GraphQL, because if you look closely at the GraphQL spec, you will find that it's focused on how to elegantly consume data. As long as the output of your backend matches what's expected in the query, the specification doesn't care about how the backend is implemented."}),"\n",(0,n.jsx)(t.p,{children:"Hence, the main complexity with GraphQL comes with how GraphQL is built. One of the major hurdles in hand-coding a GraphQL backend is managing performance. Issues like batching, incorrect usage of data loaders, caching, and the notorious N+1 problem can cripple your application."}),"\n",(0,n.jsxs)(t.p,{children:["Manually implementing batching mechanisms and data loaders can be incredibly tedious. While libraries like ",(0,n.jsx)(t.a,{href:"https://github.com/graphql/dataloader",children:"DataLoader"})," can assist, integrating them seamlessly into your system requires a deep understanding of both your data and the GraphQL query patterns. Overuse of data loaders is so common with most GraphQL implementations that ultimately it becomes the main culprit for high latency."]}),"\n",(0,n.jsx)(t.p,{children:"Secondly, traditional caching doesn't work with GraphQL, so you have to resort to all sorts of solutions, using persisted queries or some vendor-specific implementation of caching. Implementing effective caching strategies is essential for performance but it's tricky. Developers must decide what to cache, when to invalidate the cache, and how to manage cache consistency, which adds another layer of complexity."}),"\n",(0,n.jsx)(t.p,{children:"The N+1 issue, boy, that's perhaps everyone's favorite issue with GraphQL. It arises when executing multiple upstream requests that could have been combined into one, leading to massive performance degradation. Detecting and solving this requires meticulous analysis of query patterns and database access, which requires developers to have the context of the whole query at once, generate a query plan, translate it to appropriate upstream calls, and then execute! That's a lot of complex engineering effort; building a general-purpose query engine is not for the faint-hearted, and in the midst of all this complex yet interesting work, I need to ship features!"}),"\n",(0,n.jsxs)(t.blockquote,{children:["\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.a,{href:"https://grafast.org/grafast",children:"Grafast"})," is an upcoming generalized query planner that could make query-planning in JS a bit more tamed."]}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"GraphQL\u2019s flexibility can be a double-edged sword when it comes to security, necessitating robust mechanisms for authentication and authorization. Like caching, traditional route-based API access doesn't work with GraphQL. Implementing these security layers correctly involves ensuring that only authenticated users can access the GraphQL entity and that they can only access data or fields that they are authorized to see. This requires fine-grained control and often custom logic and the invention of a new standard that works just for you."}),"\n",(0,n.jsxs)(t.p,{children:["Lastly, but most importantly, ensuring your GraphQL API is reliable means tackling error handling, propagation, and telemetry. Proper error handling in GraphQL is crucial for providing meaningful feedback to clients and maintaining the integrity of your application. The GraphQL team recently started working on a ",(0,n.jsx)(t.a,{href:"https://graphql-http.com/",children:"standard"})," for serving GraphQL over HTTP, which won't be easy to integrate if you already have a GraphQL API running in production. Moreover, integrating telemetry within a GraphQL backend isn't easy either; it is a very involved process to integrate spans to trace GraphQL resolvers. And, if you have written your GraphQL layer by hand in JavaScript, be ready for some ",(0,n.jsx)(t.a,{href:"https://github.com/DataDog/dd-trace-js/issues/1095",children:"significant performance degradation"}),"."]}),"\n",(0,n.jsx)(t.h2,{id:"graphql-is-more-like-sql-and-less-like-rest",children:"GraphQL is more like SQL and less like REST"}),"\n",(0,n.jsxs)(t.p,{children:["We talked about it in our ",(0,n.jsx)(t.a,{href:"/blog/graphql-vs-rest-vs-grpc",children:"previous"})," blog why GraphQL isn't like REST or gRPC. I would argue that SQL is a closer elder sibling of GraphQL than REST or gRPC. Writing a GraphQL backend can be likened to building an SQL engine manually. Imagine if every time you wanted to interact with a database, you had to write the SQL engine from scratch. Every time you made a database change, you would need to rewrite your engine so that it can work with the new schema or indexes. It\u2019s inefficient and impractical; no one does that. Fortunately, modern databases come with embedded, high-performance SQL engines such as ",(0,n.jsx)(t.a,{href:"https://calcite.apache.org/",children:"Apache Calcite"})," that adhere to the SQL specification but abstract away the complexities around building it. These databases allow developers to focus on writing queries and managing data without worrying about the underlying mechanics, thanks to their sophisticated query engines."]}),"\n",(0,n.jsx)(t.p,{children:"GraphQL, much like SQL, is a query language designed to allow clients to request exactly the data they need. Unlike REST, which relies on fixed endpoints, or gRPC, which focuses on remote procedure calls, GraphQL provides a flexible, hierarchical way to fetch and manipulate data, making it a closer analog to SQL in terms of expressiveness and precision. And I believe the future of GraphQL is going to be like the journey of this elder sibling."}),"\n",(0,n.jsx)(t.h2,{id:"the-future-of-graphql",children:"The future of GraphQL"}),"\n",(0,n.jsx)(t.p,{children:"The future of GraphQL development is moving towards generalized automated solutions built on modern, low-level system stacks like Rust and Zig, and moving away from the prevalent hand-written Node.js-based solutions of today."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.a,{href:"https://hygraph.com/graphql-survey-2024#how-developers-build-graphql-apis",children:(0,n.jsx)(t.img,{alt:"Most common GraphQL implementations",src:a(70999).A+"",width:"1750",height:"1136"})})}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:["\n",(0,n.jsx)(t.p,{children:"These engines will connect to data sources of any type and build a GraphQL endpoint on top of them. They will find connections between other data sources, sometimes completely automatically and sometimes using hints given by the developer, creating a unified GraphQL experience."}),"\n"]}),"\n",(0,n.jsxs)(t.li,{children:["\n",(0,n.jsx)(t.p,{children:"Similar to SQL engines, which use JIT techniques to identify performance optimizations at runtime, GraphQL engines will become extremely smart about performance. My hope is that GraphQL will eventually move away from its dependency on the JSON protocol, into something more efficient such as protobuf."}),"\n"]}),"\n",(0,n.jsxs)(t.li,{children:["\n",(0,n.jsx)(t.p,{children:"There is definitely going to be a lot of work put into the standardization of the loose ends. GraphQL engines will eventually converge on error handling and error propagation strategies. GraphQL on HTTP is the first step in that direction. Authentication and Authorization too will very quickly become standard features of GraphQL, so you won't need to worry about inventing a new way of authentication. This will all be packed into a GraphQL standard. This might be a stretch, but if the standards team gets together, I think even GraphQL caching will be consistent across all GraphQL engines, and you will be able to switch from one caching solution to another without locking into a vendor-specific implementation."}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(t.p,{children:["You might have already seen a wave of open-source solutions that build GraphQL on top of existing data sources. One such solution paving the way is ",(0,n.jsx)(t.a,{href:"https://tailcall.run",children:"Tailcall"}),". Tailcall\u2019s platform is designed to automate the creation, validation, and optimization of GraphQL backends. Sticking to standards and ensuring developers don't ever have to pay the heavy tax of using GraphQL that they do today, do check it out!"]}),"\n",(0,n.jsx)(t.p,{children:"Lastly, if you are reading this today and thinking of writing a GraphQL server by hand, I urge you to reconsider and use something that does this for you. Before you know it, your handwritten solution will be deprecated in favor of something faster, easier, and more secure: an automatic GraphQL solution."})]})}function d(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(c,{...e})}):c(e)}},70999:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/graphql-stack-44b03452c850592b2fc28fb2acfbd409.png"},28453:(e,t,a)=>{a.d(t,{R:()=>r,x:()=>s});var n=a(96540);const i={},o=n.createContext(i);function r(e){const t=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);