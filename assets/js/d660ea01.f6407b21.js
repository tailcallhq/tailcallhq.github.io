/*! For license information please see d660ea01.f6407b21.js.LICENSE.txt */
"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2324],{92293:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>g,frontMatter:()=>o,metadata:()=>l,toc:()=>h});var i=n(74848),a=n(28453),s=n(28775);const o={title:"Design a GraphQL Schema So Good, It'll Make REST APIs Cry - Part 3",authors:[{name:"Amit Singh",title:"Head of Growth and Strategy @ Tailcall",url:"https://github.com/amitksingh1490",image_url:"https://avatars.githubusercontent.com/u/23661702?v=5"}],tags:["GraphQL","API","Schema","Design","Best Practices"],description:"Learn how to modify existing schema elements in GraphQL without causing disruptions.",image:"/images/graphql/graphql-schema-structure.png",hide_table_of_contents:!0,slug:"graphql-schema-part-2-2"},r=void 0,l={permalink:"/blog/graphql-schema-part-2-2",source:"@site/blog/graphql-schema-part-2-2-2024-07-22.mdx",title:"Design a GraphQL Schema So Good, It'll Make REST APIs Cry - Part 3",description:"Learn how to modify existing schema elements in GraphQL without causing disruptions.",date:"2024-07-22T00:00:00.000Z",tags:[{inline:!0,label:"GraphQL",permalink:"/blog/tags/graph-ql"},{inline:!0,label:"API",permalink:"/blog/tags/api"},{inline:!0,label:"Schema",permalink:"/blog/tags/schema"},{inline:!0,label:"Design",permalink:"/blog/tags/design"},{inline:!0,label:"Best Practices",permalink:"/blog/tags/best-practices"}],readingTime:4.625,hasTruncateMarker:!0,authors:[{name:"Amit Singh",title:"Head of Growth and Strategy @ Tailcall",url:"https://github.com/amitksingh1490",image_url:"https://avatars.githubusercontent.com/u/23661702?v=5",imageURL:"https://avatars.githubusercontent.com/u/23661702?v=5"}],frontMatter:{title:"Design a GraphQL Schema So Good, It'll Make REST APIs Cry - Part 3",authors:[{name:"Amit Singh",title:"Head of Growth and Strategy @ Tailcall",url:"https://github.com/amitksingh1490",image_url:"https://avatars.githubusercontent.com/u/23661702?v=5",imageURL:"https://avatars.githubusercontent.com/u/23661702?v=5"}],tags:["GraphQL","API","Schema","Design","Best Practices"],description:"Learn how to modify existing schema elements in GraphQL without causing disruptions.",image:"/images/graphql/graphql-schema-structure.png",hide_table_of_contents:!0,slug:"graphql-schema-part-2-2"},unlisted:!1,prevItem:{title:"Design a GraphQL Schema So Good, It'll Make REST APIs Cry - Part 4",permalink:"/blog/graphql-schema-part-2-3"},nextItem:{title:"Design a GraphQL Schema So Good, It'll Make REST APIs Cry - Part 2",permalink:"/blog/graphql-schema-part-2-1"}},c={authorsImageUrls:[void 0]},h=[{value:"What Do You Already Know? \ud83e\udde0\ud83d\udcab",id:"what-do-you-already-know-",level:2},{value:"Modifying Without Breaking: Navigating the Modification Minefield",id:"modifying-without-breaking-navigating-the-modification-minefield",level:2},{value:"Recap of Additive Changes",id:"recap-of-additive-changes",level:2},{value:"Safe, Dangerous, and Breaking Changes",id:"safe-dangerous-and-breaking-changes",level:3},{value:"The Modification Minefield",id:"the-modification-minefield",level:2},{value:"The Default Value Dilemma",id:"the-default-value-dilemma",level:3},{value:"The Non-Null to Null Transformation",id:"the-non-null-to-null-transformation",level:3},{value:"Changing a Field Type",id:"changing-a-field-type",level:3},{value:"Changing Description or Deprecation",id:"changing-description-or-deprecation",level:3},{value:"Conclusion",id:"conclusion",level:2}];function d(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{id:"what-do-you-already-know-",children:"What Do You Already Know? \ud83e\udde0\ud83d\udcab"}),"\n",(0,i.jsx)(s.A,{title:"GraphQL Schema Change",questions:[{id:1,text:"Changing the default value of an argument is considered a:",options:["Safe change","Dangerous change","Breaking change","Non-issue"],correctAnswer:1},{id:2,text:"When changing a field type from non-nullable to nullable, what should be considered to prevent client-side errors?",options:["Updating the field's description","Implementing a fallback value in resolvers","Notifying clients via email","Adding a deprecation notice"],correctAnswer:1},{id:3,text:"Which of the following changes is likely to cause the most disruption?",options:["Changing a field's default value","Deprecating a field","Changing a field's type from String to ID","Adding a new optional argument"],correctAnswer:2},{id:4,text:"Modifying an existing field to be non-null is generally considered a:",options:["Safe change","Dangerous change","Breaking change","Improvement"],correctAnswer:2},{id:5,text:"When changing a field's return type, what is the best approach to minimize client impact?",options:["Immediately update the schema","Provide a new field with the updated type and deprecate the old one","Change the field type and notify clients afterward","Modify the resolver logic to handle both types"],correctAnswer:1}]}),"\n",(0,i.jsx)(t.h2,{id:"modifying-without-breaking-navigating-the-modification-minefield",children:"Modifying Without Breaking: Navigating the Modification Minefield"}),"\n",(0,i.jsxs)(t.p,{children:["In our ",(0,i.jsx)(t.a,{href:"/blog/graphql-schema-part-2-1",children:"previous post"}),", we explored how to make additive changes to your GraphQL schema without causing disruptions. Now, we'll dive into the tricky territory of modifying existing schema elements."]}),"\n",(0,i.jsx)(t.h2,{id:"recap-of-additive-changes",children:"Recap of Additive Changes"}),"\n",(0,i.jsxs)(t.p,{children:["In ",(0,i.jsx)(t.a,{href:"/blog/graphql-schema-part-2-1",children:"Part 2"}),", we discussed the importance of making additive changes to your GraphQL schema to expand its capabilities while maintaining backward compatibility. By adding new fields, types, and arguments, you can enhance your API without causing disruptions to existing clients. We also emphasized the importance of providing transition paths to ensure a smooth adoption process."]}),"\n",(0,i.jsx)(t.h3,{id:"safe-dangerous-and-breaking-changes",children:"Safe, Dangerous, and Breaking Changes"}),"\n",(0,i.jsxs)(t.ol,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Safe Changes:"})," Additive changes such as adding new fields or types that do not affect existing queries or functionality."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Dangerous Changes:"})," Modifications that might not break the schema immediately but can cause subtle issues, such as changing default values or making non-nullable fields nullable."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Breaking Changes:"})," Changes that will definitely break existing queries and require clients to update their code, such as removing fields or changing field types."]}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"the-modification-minefield",children:"The Modification Minefield"}),"\n",(0,i.jsx)(t.p,{children:"Now, let's talk about modifying existing parts of your schema. This is where things can get really hairy. For example, changing a field\u2019s type or changing the name of a type is a big-breaking change."}),"\n",(0,i.jsx)(t.h3,{id:"the-default-value-dilemma",children:"The Default Value Dilemma"}),"\n",(0,i.jsx)(t.p,{children:"Changing default values might seem innocent, but it can cause some serious headaches. Consider this:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-diff",children:"type Query {\n-  products(category: String, showOutOfStock: Boolean = False): [Product!]!\n+  products(category: String, showOutOfStock: Boolean = True): [Product!]!\n}\n"})}),"\n",(0,i.jsx)(t.p,{children:"Changing the default value of an argument or input field is unlikely to be a breaking change in terms of the schema itself, but is very likely to cause issues at runtime if the default value affects the runtime behavior of the field."}),"\n",(0,i.jsx)(t.p,{children:"Avoid this change in general, but it may be possible to achieve if the behavior of the field does not change."}),"\n",(0,i.jsx)(t.h3,{id:"the-non-null-to-null-transformation",children:"The Non-Null to Null Transformation"}),"\n",(0,i.jsx)(t.p,{children:"This is one of the trickiest changes to make. You thought making a field non-null was a good idea, but now you need to change it back. Here's how to handle it:"}),"\n",(0,i.jsxs)(t.p,{children:["For scalar fields, you might be able to save your users from errors by returning the ",(0,i.jsx)(t.code,{children:"default value"})," instead of null."]}),"\n",(0,i.jsxs)(t.p,{children:["For object types, sometimes it\u2019s possible to use a ",(0,i.jsx)(t.code,{children:"Default Object"})," when the result is null."]}),"\n",(0,i.jsx)(t.p,{children:"This approach can help prevent null pointer exceptions on the client side."}),"\n",(0,i.jsx)(t.h3,{id:"changing-a-field-type",children:"Changing a Field Type"}),"\n",(0,i.jsx)(t.p,{children:"Changing a field\u2019s type is not a change we can make easily. Once again, approaching the change in an additive is often your best bet."}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-diff",children:"type User {\n  bestFriend: String! @deprecated(reason: \u201cUse `bestFriendObject` instead.\u201d)\n+ bestFriendObject: User!\n}\n"})}),"\n",(0,i.jsx)(t.p,{children:"As you might have noticed, the downside of additive changes is that often the best names are already taken. If wanted, you may remove the original field and reintroduce it under the new object at that point."}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-diff",children:"type User {\n- bestFriend: String! @deprecated(reason: \u201cUse `bestFriendObject` instead.\u201d)\n  bestFriendObject: User!\n+ bestFriend: User!\n}\n"})}),"\n",(0,i.jsx)(t.h3,{id:"changing-description-or-deprecation",children:"Changing Description or Deprecation"}),"\n",(0,i.jsx)(t.p,{children:"Changing the description of fields, types and any member is unlikely to cause any harm to clients. Clients should not depend on schema descriptions for runtime logic!"}),"\n",(0,i.jsx)(t.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,i.jsx)(t.p,{children:"Modifying existing schema elements requires careful planning and execution to avoid breaking changes. By following the principles and strategies outlined in this article, you can confidently make necessary modifications while minimizing disruption to your clients."}),"\n",(0,i.jsx)(t.p,{children:"Remember these key takeaways:"}),"\n",(0,i.jsxs)(t.ol,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Deprecate Cautiously"}),": Use deprecation notices, schema descriptions, and out-of-band communication to keep your clients informed about upcoming changes."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Provide Transition Paths"}),": When breaking changes are necessary, offer clear migration paths. This might involve introducing new fields alongside deprecated ones or providing new query structures that achieve the same results."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Leverage Schema Design Tools"}),": Use schema comparison tools like ",(0,i.jsx)(t.a,{href:"https://github.com/graphql-editor/graphql-editor",children:"GraphQL Editor"}),"."]}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"By treating your GraphQL schema as a product with its own lifecycle and evolution strategy, you can build APIs that are both powerful and adaptable. This approach allows you to innovate rapidly while providing a stable and reliable service to your clients."}),"\n",(0,i.jsxs)(t.p,{children:["Stay tuned for the ",(0,i.jsx)(t.a,{href:"/blog/graphql-schema-part-2-3",children:"next part"})," of this series, where we will dive into removing schema elements and handling breaking changes!"]})]})}function g(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},28775:(e,t,n)=>{n.d(t,{A:()=>d});var i=n(96540),a=n(84722);const s=(0,a.A)("Frown",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M16 16s-1.5-2-4-2-4 2-4 2",key:"epbg0q"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9",key:"yxxnd0"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9",key:"1p4y9e"}]]),o=(0,a.A)("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]),r=(0,a.A)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);var l=n(22375),c=n(74848);const h=()=>(0,c.jsx)("svg",{className:"w-5 h-5 inline-block mr-2",viewBox:"0 0 24 24",fill:"currentColor",children:(0,c.jsx)("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"})}),d=e=>{let{questions:t,title:n}=e;const[a,d]=(0,i.useState)(0),[g,u]=(0,i.useState)(0),[m,p]=(0,i.useState)(!1),[f,x]=(0,i.useState)(null);return(0,c.jsxs)("div",{className:"max-w-2xl mx-auto p-6 bg-gradient-to-r from-purple-100 to-blue-100 shadow-lg rounded-xl",children:[(0,c.jsxs)("h2",{className:"text-3xl font-bold mb-6 text-center text-gray-800",children:[n," Quiz!"]}),m?(0,c.jsxs)("div",{className:"text-center",children:[(0,c.jsxs)("p",{className:"text-2xl mb-4 font-semibold text-gray-700",children:["You scored ",g," out of ",t.length]}),g>3?(0,c.jsxs)("div",{className:"flex flex-col items-center",children:[(0,c.jsx)("p",{className:"text-5xl mb-4",children:"\ud83c\udf89"}),(0,c.jsx)("p",{className:"text-green-600 font-bold text-xl",children:"Congratulations! You're a GraphQL schema change expert!"})]}):(0,c.jsxs)("div",{className:"flex flex-col items-center",children:[(0,c.jsx)(s,{size:64,className:"text-red-500 mb-4"}),(0,c.jsx)("p",{className:"text-red-600 font-bold text-xl",children:"Keep learning about schema changes. You'll get there!"})]}),(0,c.jsx)("div",{className:"mt-6 space-y-3",children:(0,c.jsxs)("button",{onClick:()=>((e,t,n,i)=>{(0,l.p8)(i,"score","score shared");const a=`I scored ${t} out of ${n} on the ${i} Quiz! Test your knowledge too!`,s=document.location.href;let o="";"twitter"===e&&(o=`https://twitter.com/intent/tweet?text=${encodeURIComponent(a)}&url=${encodeURIComponent(s)}&via=tailcallhq`),window.open(o,"_blank")})("twitter",g,t.length,n),className:"w-full bg-black text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors duration-300 shadow-md flex items-center justify-center",children:[(0,c.jsx)(h,{})," Share on X (Twitter)"]})}),(0,c.jsx)("button",{onClick:()=>{(0,l.p8)(n,"Click","reset Clicked"),d(0),u(0),p(!1),x(null)},className:"mt-6 bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors duration-300 shadow-md w-full",children:"Retry Quiz"})]}):(0,c.jsxs)("div",{children:[(0,c.jsxs)("p",{className:"mb-4 text-lg font-semibold text-gray-600",children:["Question ",a+1,"/",t.length]}),(0,c.jsx)("p",{className:"text-xl font-bold mb-6 text-gray-800",children:t[a].text}),(0,c.jsx)("div",{className:"space-y-3",children:t[a].options.map(((e,i)=>(0,c.jsxs)("button",{onClick:()=>{return e=i,(0,l.p8)(n,"Click","Answer Clicked"),x(e),e===t[a].correctAnswer&&u(g+1),void setTimeout((()=>{x(null);const e=a+1;e<t.length?d(e):p(!0)}),1e3);var e},className:"w-full text-left p-4 rounded-lg transition-all duration-300 "+(null===f?"bg-white hover:bg-gray-100 shadow-md":f===i?i===t[a].correctAnswer?"bg-green-500 text-white":"bg-red-500 text-white":"bg-white"),disabled:null!==f,children:[(0,c.jsx)("span",{className:"text-lg font-medium",children:e}),f===i&&(0,c.jsx)("span",{className:"float-right",children:i===t[a].correctAnswer?(0,c.jsx)(o,{className:"inline text-white",size:24}):(0,c.jsx)(r,{className:"inline text-white",size:24})})]},i)))})]})]})}},84722:(e,t,n)=>{n.d(t,{A:()=>r});var i=n(96540);const a=(...e)=>e.filter(((e,t,n)=>Boolean(e)&&n.indexOf(e)===t)).join(" ");var s={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const o=(0,i.forwardRef)((({color:e="currentColor",size:t=24,strokeWidth:n=2,absoluteStrokeWidth:o,className:r="",children:l,iconNode:c,...h},d)=>(0,i.createElement)("svg",{ref:d,...s,width:t,height:t,stroke:e,strokeWidth:o?24*Number(n)/Number(t):n,className:a("lucide",r),...h},[...c.map((([e,t])=>(0,i.createElement)(e,t))),...Array.isArray(l)?l:[l]]))),r=(e,t)=>{const n=(0,i.forwardRef)((({className:n,...s},r)=>{return(0,i.createElement)(o,{ref:r,iconNode:t,className:a(`lucide-${l=e,l.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,n),...s});var l}));return n.displayName=`${e}`,n}},28453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>r});var i=n(96540);const a={},s=i.createContext(a);function o(e){const t=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),i.createElement(s.Provider,{value:t},e.children)}}}]);