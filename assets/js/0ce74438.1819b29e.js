"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[3365],{9148:(e,t,r)=>{r.d(t,{K:()=>a,s:()=>s});const n="GraphQL Platform",s={HOME:n,ABOUT:`About | ${n}`,ENTERPRISE:`Enterprise | ${n}`,CONTACT:`Contact | ${n}`,PLAYGROUND:`Playground | ${n}`},a={HOME:"GraphQL platform engineered for scale.",ABOUT:"GraphQL platform engineered for scale.",ENTERPRISE:"GraphQL platform engineered for scale.",CONTACT:"GraphQL platform engineered for scale.",PLAYGROUND:"Explore, test, and interact with your GraphQL APIs effortlessly"}},9414:(e,t,r)=>{r.r(t),r.d(t,{default:()=>f});var n=r(6540),s=r(9970),a=r(7407),o=r(5940),i=r(2375),l=r(4848);const c=()=>{const e="undefined"!=typeof window&&new URLSearchParams(window.location.search).get("u"),t="string"==typeof e&&(0,i.Gz)(e)&&new URL(e)||"",[r,s]=(0,n.useState)(""!==t?new URL(t):""),[a,c]=(0,n.useState)(t.toString()),d=((e,t)=>{const[r,s]=(0,n.useState)(e);return(0,n.useEffect)((()=>{const r=setTimeout((()=>{s(e)}),t);return()=>{clearTimeout(r)}}),[e,t]),r})(a,500);(0,n.useEffect)((()=>{(0,i.Gz)(d)&&s(new URL(d))}),[d]);return(0,l.jsx)("div",{className:"min-h-[90vh]",children:"undefined"!=typeof window&&(0,l.jsxs)("div",{className:"mt-SPACE_06",children:[(0,l.jsx)("div",{className:"flex px-SPACE_04",children:(0,l.jsx)("input",{name:"api-endpoint",type:"url",value:a,onChange:e=>c(e.target.value),className:"border border-solid border-tailCall-border-light-500 rounded-lg font-space-grotesk h-11 w-[100%]\n    p-SPACE_04 text-content-small outline-none focus:border-x-tailCall-light-700",placeholder:"API Endpoint"})}),(0,l.jsx)("div",{className:"flex my-SPACE_03",children:(0,l.jsx)(o.Jd,{fetcher:async(e,t)=>{if(""===r.toString().trim())return Promise.resolve({});(0,i.p8)("GraphQL","tc_fetch_query",r.toString());const n=await fetch(r.toString(),{method:"post",headers:{"Content-Type":"application/json",...t?.headers},body:JSON.stringify(e)});return await n.json()},children:(0,l.jsx)(o.Jd.Logo,{children:(0,l.jsx)(l.Fragment,{})})})})]})})},d=()=>(0,l.jsx)(c,{});var p=r(6347),h=r(9148);const f=()=>{const e=(0,p.zy)();return(0,n.useEffect)((()=>{s.Ay.send({hitType:"pageview",page:e.pathname,title:"Playground Page"})}),[]),(0,l.jsx)(a.A,{title:h.s.PLAYGROUND,description:h.K.PLAYGROUND,children:(0,l.jsx)(d,{})})}}}]);