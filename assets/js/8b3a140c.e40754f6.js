/*! For license information please see 8b3a140c.e40754f6.js.LICENSE.txt */
"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6101],{39148:(e,t,a)=>{a.d(t,{K:()=>o,s:()=>s});const r="The modern GraphQL runtime",s={HOME:r,ABOUT:`About | ${r}`,ENTERPRISE:`Enterprise | ${r}`,CONTACT:`Contact | ${r}`,PLAYGROUND:`Playground | ${r}`},o={HOME:"Tailcall gives you instant GraphQL on new and existing REST, Grpc and GraphQL APIs. Connect Tailcall to your API & get GraphQL in under a minute.",ABOUT:"Know more about Tailcall and how it can help you build better, faster, and more scalable GraphQL APIs.",ENTERPRISE:"Tailcall is the GraphQL platform engineered for scale. Learn how Tailcall can help your enterprise.",CONTACT:"Get in touch with us for any queries, feedback, or support. We are here to help you.",PLAYGROUND:"Play around with Tailcall's GraphQL playground to see how you can build and deploy GraphQL APIs in minutes."}},80965:(e,t,a)=>{a.r(t),a.d(t,{default:()=>xe});var r=a(96540),s=a(29970),o=a(48415),i=a(56347),n=a(51107);let l={data:""},c=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||l,d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,u=/\/\*[^]*?\*\/|  +/g,p=/\n+/g,m=(e,t)=>{let a="",r="",s="";for(let o in e){let i=e[o];"@"==o[0]?"i"==o[1]?a=o+" "+i+";":r+="f"==o[1]?m(i,o):o+"{"+m(i,"k"==o[1]?"":t)+"}":"object"==typeof i?r+=m(i,t?t.replace(/([^,])+/g,(e=>o.replace(/(^:.*)|([^,])+/g,(t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)))):o):null!=i&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=m.p?m.p(o,i):o+":"+i+";")}return a+(t&&s?t+"{"+s+"}":s)+r},f={},h=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+h(e[a]);return t}return e},g=(e,t,a,r,s)=>{let o=h(e),i=f[o]||(f[o]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(o));if(!f[i]){let t=o!==e?e:(e=>{let t,a,r=[{}];for(;t=d.exec(e.replace(u,""));)t[4]?r.shift():t[3]?(a=t[3].replace(p," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(p," ").trim();return r[0]})(e);f[i]=m(s?{["@keyframes "+i]:t}:t,a?"":"."+i)}let n=a&&f.g?f.g:null;return a&&(f.g=f[i]),((e,t,a,r)=>{r?t.data=t.data.replace(r,e):-1===t.data.indexOf(e)&&(t.data=a?e+t.data:t.data+e)})(f[i],t,r,n),i},y=(e,t,a)=>e.reduce(((e,r,s)=>{let o=t[s];if(o&&o.call){let e=o(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+r+(null==o?"":o)}),"");function b(e){let t=this||{},a=e.call?e(t.p):e;return g(a.unshift?a.raw?y(a,[].slice.call(arguments,1),t.p):a.reduce(((e,a)=>Object.assign(e,a&&a.call?a(t.p):a)),{}):a,c(t.target),t.g,t.o,t.k)}b.bind({g:1});let x,w,v,E=b.bind({k:1});function M(e,t){let a=this||{};return function(){let r=arguments;function s(o,i){let n=Object.assign({},o),l=n.className||s.className;a.p=Object.assign({theme:w&&w()},n),a.o=/ *go\d+/.test(l),n.className=b.apply(a,r)+(l?" "+l:""),t&&(n.ref=i);let c=e;return e[0]&&(c=n.as||e,delete n.as),v&&c[0]&&v(n),x(c,n)}return t?t(s):s}}var C=(e,t)=>(e=>"function"==typeof e)(e)?e(t):e,k=(()=>{let e=0;return()=>(++e).toString()})(),N=(()=>{let e;return()=>{if(void 0===e&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),A=new Map,j=e=>{if(A.has(e))return;let t=setTimeout((()=>{A.delete(e),H({type:4,toastId:e})}),1e3);A.set(e,t)},P=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return t.toast.id&&(e=>{let t=A.get(e);t&&clearTimeout(t)})(t.toast.id),{...e,toasts:e.toasts.map((e=>e.id===t.toast.id?{...e,...t.toast}:e))};case 2:let{toast:a}=t;return e.toasts.find((e=>e.id===a.id))?P(e,{type:1,toast:a}):P(e,{type:0,toast:a});case 3:let{toastId:r}=t;return r?j(r):e.toasts.forEach((e=>{j(e.id)})),{...e,toasts:e.toasts.map((e=>e.id===r||void 0===r?{...e,visible:!1}:e))};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter((e=>e.id!==t.toastId))};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map((e=>({...e,pauseDuration:e.pauseDuration+s})))}}},T=[],O={toasts:[],pausedAt:void 0},H=e=>{O=P(O,e),T.forEach((e=>{e(O)}))},V={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},$=e=>(t,a)=>{let r=((e,t="blank",a)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||k()}))(t,e,a);return H({type:2,toast:r}),r.id},S=(e,t)=>$("blank")(e,t);S.error=$("error"),S.success=$("success"),S.loading=$("loading"),S.custom=$("custom"),S.dismiss=e=>{H({type:3,toastId:e})},S.remove=e=>H({type:4,toastId:e}),S.promise=(e,t,a)=>{let r=S.loading(t.loading,{...a,...null==a?void 0:a.loading});return e.then((e=>(S.success(C(t.success,e),{id:r,...a,...null==a?void 0:a.success}),e))).catch((e=>{S.error(C(t.error,e),{id:r,...a,...null==a?void 0:a.error})})),e};var L=(e,t)=>{H({type:1,toast:{id:e,height:t}})},z=()=>{H({type:5,time:Date.now()})},I=e=>{let{toasts:t,pausedAt:a}=((e={})=>{let[t,a]=(0,r.useState)(O);(0,r.useEffect)((()=>(T.push(a),()=>{let e=T.indexOf(a);e>-1&&T.splice(e,1)})),[t]);let s=t.toasts.map((t=>{var a,r;return{...e,...e[t.type],...t,duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||V[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}}));return{...t,toasts:s}})(e);(0,r.useEffect)((()=>{if(a)return;let e=Date.now(),r=t.map((t=>{if(t.duration===1/0)return;let a=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(!(a<0))return setTimeout((()=>S.dismiss(t.id)),a);t.visible&&S.dismiss(t.id)}));return()=>{r.forEach((e=>e&&clearTimeout(e)))}}),[t,a]);let s=(0,r.useCallback)((()=>{a&&H({type:6,time:Date.now()})}),[a]),o=(0,r.useCallback)(((e,a)=>{let{reverseOrder:r=!1,gutter:s=8,defaultPosition:o}=a||{},i=t.filter((t=>(t.position||o)===(e.position||o)&&t.height)),n=i.findIndex((t=>t.id===e.id)),l=i.filter(((e,t)=>t<n&&e.visible)).length;return i.filter((e=>e.visible)).slice(...r?[l+1]:[0,l]).reduce(((e,t)=>e+(t.height||0)+s),0)}),[t]);return{toasts:t,handlers:{updateHeight:L,startPause:z,endPause:s,calculateOffset:o}}},D=E`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,G=E`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,_=E`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Q=M("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${D} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${G} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${_} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,R=E`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,B=M("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${R} 1s linear infinite;
`,F=E`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,W=E`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,U=M("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${F} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${W} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,K=M("div")`
  position: absolute;
`,Y=M("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Z=E`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,q=M("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Z} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,J=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return void 0!==t?"string"==typeof t?r.createElement(q,null,t):t:"blank"===a?null:r.createElement(Y,null,r.createElement(B,{...s}),"loading"!==a&&r.createElement(K,null,"error"===a?r.createElement(Q,{...s}):r.createElement(U,{...s})))},X=e=>`\n0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,ee=e=>`\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}\n`,te=M("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,ae=M("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,re=r.memo((({toast:e,position:t,style:a,children:s})=>{let o=e.height?((e,t)=>{let a=e.includes("top")?1:-1,[r,s]=N()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[X(a),ee(a)];return{animation:t?`${E(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${E(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},i=r.createElement(J,{toast:e}),n=r.createElement(ae,{...e.ariaProps},C(e.message,e));return r.createElement(te,{className:e.className,style:{...o,...a,...e.style}},"function"==typeof s?s({icon:i,message:n}):r.createElement(r.Fragment,null,i,n))}));!function(e,t,a,r){m.p=t,x=e,w=a,v=r}(r.createElement);var se,oe,ie=({id:e,className:t,style:a,onHeightUpdate:s,children:o})=>{let i=r.useCallback((t=>{if(t){let a=()=>{let a=t.getBoundingClientRect().height;s(e,a)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}}),[e,s]);return r.createElement("div",{ref:i,className:t,style:a},o)},ne=b`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,le=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:o,containerStyle:i,containerClassName:n})=>{let{toasts:l,handlers:c}=I(a);return r.createElement("div",{style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...i},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map((a=>{let i=a.position||t,n=((e,t)=>{let a=e.includes("top"),r=a?{top:0}:{bottom:0},s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:N()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...r,...s}})(i,c.calculateOffset(a,{reverseOrder:e,gutter:s,defaultPosition:t}));return r.createElement(ie,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?ne:"",style:n},"custom"===a.type?C(a.message,a):o?o(a):r.createElement(re,{toast:a,position:i}))})))},ce=S;function de(){return de=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)({}).hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},de.apply(null,arguments)}const ue=e=>{let{title:t,titleId:a,...s}=e;return r.createElement("svg",de({xmlns:"http://www.w3.org/2000/svg",width:1469,height:1079,fill:"none",viewBox:"0 0 1469 1079","aria-labelledby":a},s),t?r.createElement("title",{id:a},t):null,se||(se=r.createElement("g",{stroke:"#E7E7E7",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:.5,clipPath:"url(#a)"},r.createElement("path",{d:"M1446.61.675V1079M1393.61.675V1079M1340.61.675V1079M1287.61.675V1079M1234.61.675V1079M1181.61.675V1079M1128.61.675V1079M1075.61.675V1079M1022.61.675V1079M969.611.675V1079M916.611.675V1079M863.611.675V1079M810.611.675V1079M757.611.675V1079M704.611.675V1079M651.611.675V1079M598.611.675V1079M545.611.675V1079M492.611.675V1079M439.611.675V1079M386.611.675V1079M333.611.675V1079M280.611.675V1079M227.611.675V1079M174.611.675V1079M121.611.675V1079M68.611.675V1079M15.611.675V1079M1.049 11.88H1727.6M1.049 65.695H1727.6M1.049 119.509H1727.6M1.049 173.325H1727.6M1.049 227.138H1727.6M1.049 280.954H1727.6M1.049 334.767H1727.6M1.049 388.583H1727.6M1.049 442.396H1727.6M1.049 496.212H1727.6M1.049 550.028H1727.6M1.049 603.841H1727.6m-1726.551 54H1727.6M1.049 712.583H1727.6M1.049 766.396H1727.6M1.049 820.212H1727.6m-1726.551 54H1727.6m-1726.551 54H1727.6m-1726.551 56H1727.6M1.049 1040.21H1727.6"}))),oe||(oe=r.createElement("defs",null,r.createElement("clipPath",{id:"a"},r.createElement("path",{fill:"#fff",d:"M0 0h1469v1079H0z"})))))};var pe=a(22375),me=a(75957);const fe=(0,a(84722).A)("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);var he=a(74848);const ge=()=>{const[e,t]=(0,r.useState)(""),[a,s]=(0,r.useState)(""),[o,i]=(0,r.useState)(""),[l,c]=(0,r.useState)(!0),[d,u]=(0,r.useState)(!0),[p,m]=(0,r.useState)(!0);(0,r.useCallback)((async()=>{if(!e||!o)return u(Boolean(o)),void c((0,pe.DT)(e));if(!(0,pe.DT)(e))return void c(!1);const r=await fetch(me.ue,{method:"POST",body:JSON.stringify({email:e,stage:o,message:a})});"success"===(await r.json()).status&&(ce.success("Thank you for contacting us.",{duration:3e3}),(0,pe.p8)("Contact Page","Click","Send message"),t(""),s(""),i(""),c(!0),u(!0))}),[e,a,o]);return(0,he.jsxs)("section",{className:"relative h-auto",children:[(0,he.jsx)(le,{}),(0,he.jsx)(ue,{className:"absolute inset-0 -z-10 h-[540px] w-full"}),(0,he.jsxs)("div",{className:"p-SPACE_06 sm:py-SPACE_10 lg:py-SPACE_20 flex flex-col lg:flex-row items-center lg:items-start justify-center lg:space-x-40",children:[(0,he.jsxs)(n.A,{as:"h2",className:"text-title-large text-center sm:text-left sm:text-display-medium lg:text-display-large lg:max-w-md",children:["Say ",(0,he.jsx)("span",{className:"bg-tailCall-yellow rounded sm:rounded-2xl px-SPACE_01 sm:px-SPACE_02",children:"hello"})," to us!"]}),(0,he.jsxs)("div",{className:"flex flex-col justify-between space-y-SPACE_07 w-full md:w-fit",children:[p&&(0,he.jsx)("div",{className:"w-full md:w-[640px] h-[80vh] flex justify-center items-center",children:(0,he.jsx)(fe,{className:"animate-spin",size:40})}),(0,he.jsx)("iframe",{src:"https://docs.google.com/forms/d/e/1FAIpQLSfn6qZlC7ST_LyKmGYPrZEBckQyQm2WNhME9CPJktvR--1mow/viewform?embedded=true",className:"w-full md:w-[640px]",height:"1000",onLoad:()=>{m(!1)}})]})]})]})},ye=()=>(0,he.jsx)(he.Fragment,{children:(0,he.jsx)(ge,{})});var be=a(39148);const xe=()=>{const e=(0,i.zy)();return(0,r.useEffect)((()=>{s.Ay.send({hitType:"pageview",page:e.pathname,title:"Contact Page"})}),[]),(0,he.jsx)(o.A,{title:be.s.CONTACT,description:be.K.CONTACT,children:(0,he.jsx)(ye,{})})}},84722:(e,t,a)=>{a.d(t,{A:()=>n});var r=a(96540);const s=(...e)=>e.filter(((e,t,a)=>Boolean(e)&&a.indexOf(e)===t)).join(" ");var o={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const i=(0,r.forwardRef)((({color:e="currentColor",size:t=24,strokeWidth:a=2,absoluteStrokeWidth:i,className:n="",children:l,iconNode:c,...d},u)=>(0,r.createElement)("svg",{ref:u,...o,width:t,height:t,stroke:e,strokeWidth:i?24*Number(a)/Number(t):a,className:s("lucide",n),...d},[...c.map((([e,t])=>(0,r.createElement)(e,t))),...Array.isArray(l)?l:[l]]))),n=(e,t)=>{const a=(0,r.forwardRef)((({className:a,...o},n)=>{return(0,r.createElement)(i,{ref:n,iconNode:t,className:s(`lucide-${l=e,l.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,a),...o});var l}));return a.displayName=`${e}`,a}}}]);