"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([["1051"],{99991:function(e,t,a){a.d(t,{Z:()=>l});var r=a("67294");let s=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),i=(...e)=>e.filter((e,t,a)=>!!e&&a.indexOf(e)===t).join(" ");var o={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let n=(0,r.forwardRef)(({color:e="currentColor",size:t=24,strokeWidth:a=2,absoluteStrokeWidth:s,className:n="",children:l,iconNode:c,...d},u)=>(0,r.createElement)("svg",{ref:u,...o,width:t,height:t,stroke:e,strokeWidth:s?24*Number(a)/Number(t):a,className:i("lucide",n),...d},[...c.map(([e,t])=>(0,r.createElement)(e,t)),...Array.isArray(l)?l:[l]])),l=(e,t)=>{let a=(0,r.forwardRef)(({className:a,...o},l)=>(0,r.createElement)(n,{ref:l,iconNode:t,className:i(`lucide-${s(e)}`,a),...o}));return a.displayName=`${e}`,a}},76158:function(e,t,a){a.d(t,{H:function(){return i},V:function(){return s}});let r="The modern GraphQL runtime",s={HOME:r,ABOUT:`About | ${r}`,ENTERPRISE:`Enterprise | ${r}`,CONTACT:`Contact | ${r}`,PLAYGROUND:`Playground | ${r}`},i={HOME:"Tailcall gives you instant GraphQL on new and existing REST, Grpc and GraphQL APIs. Connect Tailcall to your API & get GraphQL in under a minute.",ABOUT:"Know more about Tailcall and how it can help you build better, faster, and more scalable GraphQL APIs.",ENTERPRISE:"Tailcall is the GraphQL platform engineered for scale. Learn how Tailcall can help your enterprise.",CONTACT:"Get in touch with us for any queries, feedback, or support. We are here to help you.",PLAYGROUND:"Play around with Tailcall's GraphQL playground to see how you can build and deploy GraphQL APIs in minutes."}},79093:function(e,t,a){let r,s;a.r(t),a.d(t,{default:()=>eP});var i,o,n,l,c,d,u=a("85893"),p=a("67294"),m=a("49089"),f=a("11647"),h=a("16550"),g=a("34403");let y={data:""},b=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||y,x=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,w=/\/\*[^]*?\*\/|  +/g,v=/\n+/g,E=(e,t)=>{let a="",r="",s="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+o+";":r+="f"==i[1]?E(o,i):i+"{"+E(o,"k"==i[1]?"":t)+"}":"object"==typeof o?r+=E(o,t?t.replace(/([^,])+/g,e=>i.replace(/(^:.*)|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=E.p?E.p(i,o):i+":"+o+";")}return a+(t&&s?t+"{"+s+"}":s)+r},M={},C=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+C(e[a]);return t}return e},k=(e,t,a,r,s)=>{var i,o,n,l;let c=C(e),d=M[c]||(M[c]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(c));if(!M[d]){let t=c!==e?e:(e=>{let t,a,r=[{}];for(;t=x.exec(e.replace(w,""));)t[4]?r.shift():t[3]?(a=t[3].replace(v," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(v," ").trim();return r[0]})(e);M[d]=E(s?{["@keyframes "+d]:t}:t,a?"":"."+d)}let u=a&&M.g?M.g:null;return a&&(M.g=M[d]),i=M[d],o=t,n=r,(l=u)?o.data=o.data.replace(l,i):-1===o.data.indexOf(i)&&(o.data=n?i+o.data:o.data+i),d},j=(e,t,a)=>e.reduce((e,r,s)=>{let i=t[s];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":E(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"");function N(e){let t=this||{},a=e.call?e(t.p):e;return k(a.unshift?a.raw?j(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,b(t.target),t.g,t.o,t.k)}N.bind({g:1});let H,A,P,T=N.bind({k:1});function V(e,t){let a=this||{};return function(){let r=arguments;function s(i,o){let n=Object.assign({},i),l=n.className||s.className;a.p=Object.assign({theme:A&&A()},n),a.o=/ *go\d+/.test(l),n.className=N.apply(a,r)+(l?" "+l:""),t&&(n.ref=o);let c=e;return e[0]&&(c=n.as||e,delete n.as),P&&c[0]&&P(n),H(c,n)}return t?t(s):s}}var O=e=>"function"==typeof e,$=(e,t)=>O(e)?e(t):e;var S=(r=0,()=>(++r).toString()),L=()=>{if(void 0===s&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");s=!e||e.matches}return s},I=new Map,z=e=>{if(I.has(e))return;let t=setTimeout(()=>{I.delete(e),R({type:4,toastId:e})},1e3);I.set(e,t)},G=e=>{let t=I.get(e);t&&clearTimeout(t)},_=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return t.toast.id&&G(t.toast.id),{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return e.toasts.find(e=>e.id===a.id)?_(e,{type:1,toast:a}):_(e,{type:0,toast:a});case 3:let{toastId:r}=t;return r?z(r):e.toasts.forEach(e=>{z(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+s}))}}},D=[],Q={toasts:[],pausedAt:void 0},R=e=>{Q=_(Q,e),D.forEach(e=>{e(Q)})},Z={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},F=(e={})=>{let[t,a]=(0,p.useState)(Q);(0,p.useEffect)(()=>(D.push(a),()=>{let e=D.indexOf(a);e>-1&&D.splice(e,1)}),[t]);let r=t.toasts.map(t=>{var a,r;return{...e,...e[t.type],...t,duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||Z[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...t,toasts:r}},B=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||S()}),U=e=>(t,a)=>{let r=B(t,e,a);return R({type:2,toast:r}),r.id},W=(e,t)=>U("blank")(e,t);W.error=U("error"),W.success=U("success"),W.loading=U("loading"),W.custom=U("custom"),W.dismiss=e=>{R({type:3,toastId:e})},W.remove=e=>R({type:4,toastId:e}),W.promise=(e,t,a)=>{let r=W.loading(t.loading,{...a,...null==a?void 0:a.loading});return e.then(e=>(W.success($(t.success,e),{id:r,...a,...null==a?void 0:a.success}),e)).catch(e=>{W.error($(t.error,e),{id:r,...a,...null==a?void 0:a.error})}),e};var Y=(e,t)=>{R({type:1,toast:{id:e,height:t}})},q=()=>{R({type:5,time:Date.now()})},J=e=>{let{toasts:t,pausedAt:a}=F(e);(0,p.useEffect)(()=>{if(a)return;let e=Date.now(),r=t.map(t=>{if(t.duration===1/0)return;let a=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(a<0){t.visible&&W.dismiss(t.id);return}return setTimeout(()=>W.dismiss(t.id),a)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[t,a]);let r=(0,p.useCallback)(()=>{a&&R({type:6,time:Date.now()})},[a]),s=(0,p.useCallback)((e,a)=>{let{reverseOrder:r=!1,gutter:s=8,defaultPosition:i}=a||{},o=t.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...r?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[t]);return{toasts:t,handlers:{updateHeight:Y,startPause:q,endPause:r,calculateOffset:s}}},K=T`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,X=T`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ee=T`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,et=V("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${K} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${X} 0.15s ease-out forwards;
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
    animation: ${ee} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,ea=T`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,er=V("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${ea} 1s linear infinite;
`,es=T`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,ei=T`
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
}`,eo=V("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${es} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${ei} 0.2s ease-out forwards;
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
`,en=V("div")`
  position: absolute;
`,el=V("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ec=T`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ed=V("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ec} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,eu=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return void 0!==t?"string"==typeof t?p.createElement(ed,null,t):t:"blank"===a?null:p.createElement(el,null,p.createElement(er,{...r}),"loading"!==a&&p.createElement(en,null,"error"===a?p.createElement(et,{...r}):p.createElement(eo,{...r})))},ep=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,em=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ef=V("div")`
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
`,eh=V("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,eg=(e,t)=>{let a=e.includes("top")?1:-1,[r,s]=L()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ep(a),em(a)];return{animation:t?`${T(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${T(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ey=p.memo(({toast:e,position:t,style:a,children:r})=>{let s=e.height?eg(e.position||t||"top-center",e.visible):{opacity:0},i=p.createElement(eu,{toast:e}),o=p.createElement(eh,{...e.ariaProps},$(e.message,e));return p.createElement(ef,{className:e.className,style:{...s,...a,...e.style}},"function"==typeof r?r({icon:i,message:o}):p.createElement(p.Fragment,null,i,o))});i=p.createElement,E.p=void 0,H=i,A=void 0,P=void 0;var eb=({id:e,className:t,style:a,onHeightUpdate:r,children:s})=>{let i=p.useCallback(t=>{if(t){let a=()=>{r(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return p.createElement("div",{ref:i,className:t,style:a},s)},ex=(e,t)=>{let a=e.includes("top"),r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:L()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...r}},ew=N`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ev=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:r,children:s,containerStyle:i,containerClassName:o})=>{let{toasts:n,handlers:l}=J(a);return p.createElement("div",{style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...i},className:o,onMouseEnter:l.startPause,onMouseLeave:l.endPause},n.map(a=>{let i=a.position||t,o=ex(i,l.calculateOffset(a,{reverseOrder:e,gutter:r,defaultPosition:t}));return p.createElement(eb,{id:a.id,key:a.id,onHeightUpdate:l.updateHeight,className:a.visible?ew:"",style:o},"custom"===a.type?$(a.message,a):s?s(a):p.createElement(ey,{toast:a,position:i}))}))};function eE(){return(eE=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)({}).hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(null,arguments)}let eM=e=>{let{title:t,titleId:a,...r}=e;return p.createElement("svg",eE({xmlns:"http://www.w3.org/2000/svg",width:1469,height:1079,fill:"none",viewBox:"0 0 1469 1079","aria-labelledby":a},r),t?p.createElement("title",{id:a},t):null,c||(c=p.createElement("g",{stroke:"#E7E7E7",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:.5,clipPath:"url(#a)"},p.createElement("path",{d:"M1446.61.675V1079M1393.61.675V1079M1340.61.675V1079M1287.61.675V1079M1234.61.675V1079M1181.61.675V1079M1128.61.675V1079M1075.61.675V1079M1022.61.675V1079M969.611.675V1079M916.611.675V1079M863.611.675V1079M810.611.675V1079M757.611.675V1079M704.611.675V1079M651.611.675V1079M598.611.675V1079M545.611.675V1079M492.611.675V1079M439.611.675V1079M386.611.675V1079M333.611.675V1079M280.611.675V1079M227.611.675V1079M174.611.675V1079M121.611.675V1079M68.611.675V1079M15.611.675V1079M1.049 11.88H1727.6M1.049 65.695H1727.6M1.049 119.509H1727.6M1.049 173.325H1727.6M1.049 227.138H1727.6M1.049 280.954H1727.6M1.049 334.767H1727.6M1.049 388.583H1727.6M1.049 442.396H1727.6M1.049 496.212H1727.6M1.049 550.028H1727.6M1.049 603.841H1727.6m-1726.551 54H1727.6M1.049 712.583H1727.6M1.049 766.396H1727.6M1.049 820.212H1727.6m-1726.551 54H1727.6m-1726.551 54H1727.6m-1726.551 56H1727.6M1.049 1040.21H1727.6"}))),d||(d=p.createElement("defs",null,p.createElement("clipPath",{id:"a"},p.createElement("path",{fill:"#fff",d:"M0 0h1469v1079H0z"})))))};var eC=a("9030"),ek=a("90163");let ej=(0,a("99991").Z)("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]),eN=()=>{let[e,t]=(0,p.useState)(""),[a,r]=(0,p.useState)(""),[s,i]=(0,p.useState)(""),[o,n]=(0,p.useState)(!0),[l,c]=(0,p.useState)(!0),[d,m]=(0,p.useState)(!0);return(0,p.useCallback)(async()=>{if(!e||!s){c(!!s),n((0,eC.oH)(e));return}if(!(0,eC.oH)(e)){n(!1);return}let o=await fetch(ek.nc,{method:"POST",body:JSON.stringify({email:e,stage:s,message:a})});"success"===(await o.json()).status&&(W.success("Thank you for contacting us.",{duration:3e3}),(0,eC.IC)("Contact Page","Click","Send message"),t(""),r(""),i(""),n(!0),c(!0))},[e,a,s]),(0,u.jsxs)("section",{className:"relative h-auto",children:[(0,u.jsx)(ev,{}),(0,u.jsx)(eM,{className:"absolute inset-0 -z-10 h-[540px] w-full"}),(0,u.jsxs)("div",{className:"p-SPACE_06 sm:py-SPACE_10 lg:py-SPACE_20 flex flex-col lg:flex-row items-center lg:items-start justify-center lg:space-x-40",children:[(0,u.jsxs)(g.Z,{as:"h2",className:"text-title-large text-center sm:text-left sm:text-display-medium lg:text-display-large lg:max-w-md",children:["Say ",(0,u.jsx)("span",{className:"bg-tailCall-yellow rounded sm:rounded-2xl px-SPACE_01 sm:px-SPACE_02",children:"hello"})," to us!"]}),(0,u.jsxs)("div",{className:"flex flex-col justify-between space-y-SPACE_07 w-full md:w-fit",children:[d&&(0,u.jsx)("div",{className:"w-full md:w-[640px] h-[80vh] flex justify-center items-center",children:(0,u.jsx)(ej,{className:"animate-spin",size:40})}),(0,u.jsx)("iframe",{src:"https://docs.google.com/forms/d/e/1FAIpQLSfn6qZlC7ST_LyKmGYPrZEBckQyQm2WNhME9CPJktvR--1mow/viewform?embedded=true",className:"w-full md:w-[640px]",height:"1000",onLoad:()=>{m(!1)}})]})]})]})},eH=()=>(0,u.jsx)(u.Fragment,{children:(0,u.jsx)(eN,{})});var eA=a("76158");let eP=()=>{let e=(0,h.TH)();return(0,p.useEffect)(()=>{m.default.send({hitType:"pageview",page:e.pathname,title:"Contact Page"})},[]),(0,u.jsx)(f.Z,{title:eA.V.CONTACT,description:eA.H.CONTACT,children:(0,u.jsx)(eH,{})})}}}]);