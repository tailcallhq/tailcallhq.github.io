"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1726],{4080:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>u,default:()=>p,frontMatter:()=>s,metadata:()=>i,toc:()=>d});var n=r(4848),a=r(8453),l=r(1470),o=r(9365);const s={title:"Launch",sidebar_position:3},u=void 0,i={id:"getting_started/launch",title:"Launch",description:"Now, run the following command to start the server with the full path to the file that you created earlier.",source:"@site/docs/getting_started/launch.mdx",sourceDirName:"getting_started",slug:"/getting_started/launch",permalink:"/docs/getting_started/launch",draft:!1,unlisted:!1,editUrl:"https://github.com/tailcallhq/tailcallhq.github.io/tree/develop/docs/getting_started/launch.mdx",tags:[],version:"current",sidebarPosition:3,frontMatter:{title:"Launch",sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Configuration",permalink:"/docs/getting_started/configuration"},next:{title:"Execute",permalink:"/docs/getting_started/execute"}},c={},d=[];function h(e){const t={code:"code",p:"p",pre:"pre",strong:"strong",...(0,a.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.p,{children:"Now, run the following command to start the server with the full path to the file that you created earlier."}),"\n",(0,n.jsxs)(l.A,{children:[(0,n.jsx)(o.A,{value:"graphql",label:"graphql",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"tailcall start ./jsonplaceholder.graphql\n"})})}),(0,n.jsx)(o.A,{value:"yml",label:"yml",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"tailcall start ./jsonplaceholder.yml\n"})})}),(0,n.jsx)(o.A,{value:"json",label:"json",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"tailcall start ./jsonplaceholder.json\n"})})})]}),"\n",(0,n.jsx)(t.p,{children:"If the command succeeds, you should see logs like the following below."}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"INFO File read: ./jsonplaceholder.graphql ... ok\nINFO N + 1 detected: 0\nINFO \ud83d\ude80 Tailcall launched at [0.0.0.0:8000] over HTTP/1.1\nINFO \ud83c\udf0d Playground: https://tailcall.run/playground/?u=http://127.0.0.1:8000/graphql\n"})}),"\n",(0,n.jsxs)(t.p,{children:["The server starts with the schema provided and prints out a load of meta information. We will cover those in detail in a bit. For now, open the ",(0,n.jsx)(t.strong,{children:"playground URL"})," in a new tab in your browser and try it out for yourself!"]})]})}function p(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},9365:(e,t,r)=>{r.d(t,{A:()=>o});r(6540);var n=r(4164);const a={tabItem:"tabItem_Ymn6"};var l=r(4848);function o(e){let{children:t,hidden:r,className:o}=e;return(0,l.jsx)("div",{role:"tabpanel",className:(0,n.A)(a.tabItem,o),hidden:r,children:t})}},1470:(e,t,r)=>{r.d(t,{A:()=>j});var n=r(6540),a=r(4164),l=r(3104),o=r(6347),s=r(205),u=r(7485),i=r(1682),c=r(9466);function d(e){return n.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,n.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:t,children:r}=e;return(0,n.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:r,attributes:n,default:a}}=e;return{value:t,label:r,attributes:n,default:a}}))}(r);return function(e){const t=(0,i.X)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,r])}function p(e){let{value:t,tabValues:r}=e;return r.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:r}=e;const a=(0,o.W6)(),l=function(e){let{queryString:t=!1,groupId:r}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:t,groupId:r});return[(0,u.aZ)(l),(0,n.useCallback)((e=>{if(!l)return;const t=new URLSearchParams(a.location.search);t.set(l,e),a.replace({...a.location,search:t.toString()})}),[l,a])]}function b(e){const{defaultValue:t,queryString:r=!1,groupId:a}=e,l=h(e),[o,u]=(0,n.useState)((()=>function(e){let{defaultValue:t,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!p({value:t,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=r.find((e=>e.default))??r[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:l}))),[i,d]=f({queryString:r,groupId:a}),[b,m]=function(e){let{groupId:t}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,l]=(0,c.Dv)(r);return[a,(0,n.useCallback)((e=>{r&&l.set(e)}),[r,l])]}({groupId:a}),g=(()=>{const e=i??b;return p({value:e,tabValues:l})?e:null})();(0,s.A)((()=>{g&&u(g)}),[g]);return{selectedValue:o,selectValue:(0,n.useCallback)((e=>{if(!p({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);u(e),d(e),m(e)}),[d,m,l]),tabValues:l}}var m=r(2303);const g={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var v=r(4848);function x(e){let{className:t,block:r,selectedValue:n,selectValue:o,tabValues:s}=e;const u=[],{blockElementScrollPositionUntilNextRender:i}=(0,l.a_)(),c=e=>{const t=e.currentTarget,r=u.indexOf(t),a=s[r].value;a!==n&&(i(t),o(a))},d=e=>{let t=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const r=u.indexOf(e.currentTarget)+1;t=u[r]??u[0];break}case"ArrowLeft":{const r=u.indexOf(e.currentTarget)-1;t=u[r]??u[u.length-1];break}}t?.focus()};return(0,v.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.A)("tabs",{"tabs--block":r},t),children:s.map((e=>{let{value:t,label:r,attributes:l}=e;return(0,v.jsx)("li",{role:"tab",tabIndex:n===t?0:-1,"aria-selected":n===t,ref:e=>u.push(e),onKeyDown:d,onClick:c,...l,className:(0,a.A)("tabs__item",g.tabItem,l?.className,{"tabs__item--active":n===t}),children:r??t},t)}))})}function y(e){let{lazy:t,children:r,selectedValue:a}=e;const l=(Array.isArray(r)?r:[r]).filter(Boolean);if(t){const e=l.find((e=>e.props.value===a));return e?(0,n.cloneElement)(e,{className:"margin-top--md"}):null}return(0,v.jsx)("div",{className:"margin-top--md",children:l.map(((e,t)=>(0,n.cloneElement)(e,{key:t,hidden:e.props.value!==a})))})}function w(e){const t=b(e);return(0,v.jsxs)("div",{className:(0,a.A)("tabs-container",g.tabList),children:[(0,v.jsx)(x,{...e,...t}),(0,v.jsx)(y,{...e,...t})]})}function j(e){const t=(0,m.A)();return(0,v.jsx)(w,{...e,children:d(e.children)},String(t))}},8453:(e,t,r)=>{r.d(t,{R:()=>o,x:()=>s});var n=r(6540);const a={},l=n.createContext(a);function o(e){const t=n.useContext(l);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),n.createElement(l.Provider,{value:t},e.children)}}}]);