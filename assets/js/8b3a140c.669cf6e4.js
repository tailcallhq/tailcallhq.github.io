"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6101],{25981:(e,t,a)=>{a.d(t,{A:()=>o});var s=a(14783),r=a(47010),l=(a(96540),a(74848));const o=e=>{let{title:t,Icon:a,theme:o,onClick:i,href:n,width:d="auto",disabled:c}=e;return(0,l.jsxs)(s.A,{to:n,onClick:i,className:`\n      group relative disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center gap-x-SPACE_03 hover:no-underline rounded-lg sm:rounded-xl h-12 sm:h-16 text-content-small font-bold sm:text-title-small cursor-pointer px-SPACE_06 py-SPACE_03 sm:px-SPACE_08 lg:px-SPACE_10 sm:py-SPACE_04 lg:py-SPACE_05\n      ${(()=>{switch(d){case"small":return"w-[228px]";case"medium":return"w-[300px]";case"large":return"w-[500px]";default:return"w-fit"}})()} \n      ${({[r.Sx.Light]:{classes:"border border-solid border-tailCall-border-dark-100 text-tailCall-dark-500 bg-transparent hover:text-tailCall-dark-500",gridClasses:""},[r.Sx.Dark]:{classes:"border-2 border-solid border-tailCall-border-dark-100 text-tailCall-light-100 bg-white hover:text-tailCall-light-100",gridClasses:""},[r.Sx.Gray]:{classes:"border-2 border-solid border-tailCall-light-100 text-tailCall-light-100 bg-transparent hover:text-tailCall-light-100",gridClasses:"hidden"},[r.Sx.Tailcall]:{classes:"bg-yellow-300 border border-solid text-tailCall-dark-500 bg-transparent hover:text-tailCall-dark-500",gridClasses:""}}[o]||{classes:"",styles:"",gridClasses:""}).classes??""} \n      ${c?"cursor-not-allowed opacity-20":""} `,children:[(u=o,u===r.Sx.Dark||u===r.Sx.Gray?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("div",{className:"lg:block rounded-md lg:rounded-lg absolute inset-0 w-full bg-tailCall-dark-500 group-hover:lg:scale-x-[0.98] group-hover:lg:scale-y-[0.95] transform transition-all ease-out duration-250"}),!c&&(0,l.jsx)("div",{className:"hidden lg:block button-grid-bg-section h-full w-full scale-90 opacity-0 group-hover:scale-[0.98] group-hover:opacity-100 transform transition-all ease-out duration-250"})]}):u!==r.Sx.Light||c?null:(0,l.jsx)("div",{className:"hidden lg:block button-grid-bg-section-dark h-full w-full scale-90 opacity-0 group-hover:scale-[1] group-hover:opacity-100 transform transition-all ease-out duration-250"})),a&&(0,l.jsx)(a,{className:"w-6 h-6 sm:w-7 sm:h-7 lg:h-8 lg:w-8 text-white z-[1]"}),t&&(0,l.jsxs)("span",{className:"z-20",children:[" ",t]})]});var u}},55011:(e,t,a)=>{a.d(t,{K:()=>l,s:()=>r});const s="The modern GraphQL runtime",r={HOME:s,ABOUT:`About | ${s}`,ENTERPRISE:`Enterprise | ${s}`,CONTACT:`Contact | ${s}`,PLAYGROUND:`Playground | ${s}`},l={HOME:"Tailcall gives you instant GraphQL on new and existing REST, Grpc and GraphQL APIs. Connect Tailcall to your API & get GraphQL in under a minute.",ABOUT:"Know more about Tailcall and how it can help you build better, faster, and more scalable GraphQL APIs.",ENTERPRISE:"Tailcall is the GraphQL platform engineered for scale. Learn how Tailcall can help your enterprise.",CONTACT:"Get in touch with us for any queries, feedback, or support. We are here to help you.",PLAYGROUND:"Play around with Tailcall's GraphQL playground to see how you can build and deploy GraphQL APIs in minutes."}},51636:(e,t,a)=>{a.r(t),a.d(t,{default:()=>be});var s=a(96540),r=a(29970),l=a(1136),o=a(56347),i=a(85225);let n={data:""},d=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,u=/\/\*[^]*?\*\/|  +/g,p=/\n+/g,m=(e,t)=>{let a="",s="",r="";for(let l in e){let o=e[l];"@"==l[0]?"i"==l[1]?a=l+" "+o+";":s+="f"==l[1]?m(o,l):l+"{"+m(o,"k"==l[1]?"":t)+"}":"object"==typeof o?s+=m(o,t?t.replace(/([^,])+/g,(e=>l.replace(/(^:.*)|([^,])+/g,(t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)))):l):null!=o&&(l=/^--/.test(l)?l:l.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=m.p?m.p(l,o):l+":"+o+";")}return a+(t&&r?t+"{"+r+"}":r)+s},h={},f=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+f(e[a]);return t}return e},g=(e,t,a,s,r)=>{let l=f(e),o=h[l]||(h[l]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(l));if(!h[o]){let t=l!==e?e:(e=>{let t,a,s=[{}];for(;t=c.exec(e.replace(u,""));)t[4]?s.shift():t[3]?(a=t[3].replace(p," ").trim(),s.unshift(s[0][a]=s[0][a]||{})):s[0][t[1]]=t[2].replace(p," ").trim();return s[0]})(e);h[o]=m(r?{["@keyframes "+o]:t}:t,a?"":"."+o)}let i=a&&h.g?h.g:null;return a&&(h.g=h[o]),((e,t,a,s)=>{s?t.data=t.data.replace(s,e):-1===t.data.indexOf(e)&&(t.data=a?e+t.data:t.data+e)})(h[o],t,s,i),o},x=(e,t,a)=>e.reduce(((e,s,r)=>{let l=t[r];if(l&&l.call){let e=l(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;l=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+s+(null==l?"":l)}),"");function y(e){let t=this||{},a=e.call?e(t.p):e;return g(a.unshift?a.raw?x(a,[].slice.call(arguments,1),t.p):a.reduce(((e,a)=>Object.assign(e,a&&a.call?a(t.p):a)),{}):a,d(t.target),t.g,t.o,t.k)}y.bind({g:1});let b,v,w,C=y.bind({k:1});function E(e,t){let a=this||{};return function(){let s=arguments;function r(l,o){let i=Object.assign({},l),n=i.className||r.className;a.p=Object.assign({theme:v&&v()},i),a.o=/ *go\d+/.test(n),i.className=y.apply(a,s)+(n?" "+n:""),t&&(i.ref=o);let d=e;return e[0]&&(d=i.as||e,delete i.as),w&&d[0]&&w(i),b(d,i)}return t?t(r):r}}var M=(e,t)=>(e=>"function"==typeof e)(e)?e(t):e,j=(()=>{let e=0;return()=>(++e).toString()})(),A=(()=>{let e;return()=>{if(void 0===e&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),k=new Map,N=e=>{if(k.has(e))return;let t=setTimeout((()=>{k.delete(e),H({type:4,toastId:e})}),1e3);k.set(e,t)},P=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return t.toast.id&&(e=>{let t=k.get(e);t&&clearTimeout(t)})(t.toast.id),{...e,toasts:e.toasts.map((e=>e.id===t.toast.id?{...e,...t.toast}:e))};case 2:let{toast:a}=t;return e.toasts.find((e=>e.id===a.id))?P(e,{type:1,toast:a}):P(e,{type:0,toast:a});case 3:let{toastId:s}=t;return s?N(s):e.toasts.forEach((e=>{N(e.id)})),{...e,toasts:e.toasts.map((e=>e.id===s||void 0===s?{...e,visible:!1}:e))};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter((e=>e.id!==t.toastId))};case 5:return{...e,pausedAt:t.time};case 6:let r=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map((e=>({...e,pauseDuration:e.pauseDuration+r})))}}},S=[],T={toasts:[],pausedAt:void 0},H=e=>{T=P(T,e),S.forEach((e=>{e(T)}))},O={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},V=e=>(t,a)=>{let s=((e,t="blank",a)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||j()}))(t,e,a);return H({type:2,toast:s}),s.id},$=(e,t)=>V("blank")(e,t);$.error=V("error"),$.success=V("success"),$.loading=V("loading"),$.custom=V("custom"),$.dismiss=e=>{H({type:3,toastId:e})},$.remove=e=>H({type:4,toastId:e}),$.promise=(e,t,a)=>{let s=$.loading(t.loading,{...a,...null==a?void 0:a.loading});return e.then((e=>($.success(M(t.success,e),{id:s,...a,...null==a?void 0:a.success}),e))).catch((e=>{$.error(M(t.error,e),{id:s,...a,...null==a?void 0:a.error})})),e};var _=(e,t)=>{H({type:1,toast:{id:e,height:t}})},L=()=>{H({type:5,time:Date.now()})},D=e=>{let{toasts:t,pausedAt:a}=((e={})=>{let[t,a]=(0,s.useState)(T);(0,s.useEffect)((()=>(S.push(a),()=>{let e=S.indexOf(a);e>-1&&S.splice(e,1)})),[t]);let r=t.toasts.map((t=>{var a,s;return{...e,...e[t.type],...t,duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||O[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}}));return{...t,toasts:r}})(e);(0,s.useEffect)((()=>{if(a)return;let e=Date.now(),s=t.map((t=>{if(t.duration===1/0)return;let a=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(!(a<0))return setTimeout((()=>$.dismiss(t.id)),a);t.visible&&$.dismiss(t.id)}));return()=>{s.forEach((e=>e&&clearTimeout(e)))}}),[t,a]);let r=(0,s.useCallback)((()=>{a&&H({type:6,time:Date.now()})}),[a]),l=(0,s.useCallback)(((e,a)=>{let{reverseOrder:s=!1,gutter:r=8,defaultPosition:l}=a||{},o=t.filter((t=>(t.position||l)===(e.position||l)&&t.height)),i=o.findIndex((t=>t.id===e.id)),n=o.filter(((e,t)=>t<i&&e.visible)).length;return o.filter((e=>e.visible)).slice(...s?[n+1]:[0,n]).reduce(((e,t)=>e+(t.height||0)+r),0)}),[t]);return{toasts:t,handlers:{updateHeight:_,startPause:L,endPause:r,calculateOffset:l}}},G=C`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,I=C`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,z=C`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Q=E("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${G} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${I} 0.15s ease-out forwards;
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
    animation: ${z} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,F=C`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,R=E("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${F} 1s linear infinite;
`,U=C`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,B=C`
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
}`,K=E("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${U} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${B} 0.2s ease-out forwards;
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
`,W=E("div")`
  position: absolute;
`,Y=E("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,q=C`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,J=E("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${q} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Z=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return void 0!==t?"string"==typeof t?s.createElement(J,null,t):t:"blank"===a?null:s.createElement(Y,null,s.createElement(R,{...r}),"loading"!==a&&s.createElement(W,null,"error"===a?s.createElement(Q,{...r}):s.createElement(K,{...r})))},X=e=>`\n0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,ee=e=>`\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}\n`,te=E("div")`
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
`,ae=E("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,se=s.memo((({toast:e,position:t,style:a,children:r})=>{let l=e.height?((e,t)=>{let a=e.includes("top")?1:-1,[s,r]=A()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[X(a),ee(a)];return{animation:t?`${C(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${C(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=s.createElement(Z,{toast:e}),i=s.createElement(ae,{...e.ariaProps},M(e.message,e));return s.createElement(te,{className:e.className,style:{...l,...a,...e.style}},"function"==typeof r?r({icon:o,message:i}):s.createElement(s.Fragment,null,o,i))}));!function(e,t,a,s){m.p=t,b=e,v=a,w=s}(s.createElement);var re,le,oe=({id:e,className:t,style:a,onHeightUpdate:r,children:l})=>{let o=s.useCallback((t=>{if(t){let a=()=>{let a=t.getBoundingClientRect().height;r(e,a)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}}),[e,r]);return s.createElement("div",{ref:o,className:t,style:a},l)},ie=y`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ne=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:r,children:l,containerStyle:o,containerClassName:i})=>{let{toasts:n,handlers:d}=D(a);return s.createElement("div",{style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:i,onMouseEnter:d.startPause,onMouseLeave:d.endPause},n.map((a=>{let o=a.position||t,i=((e,t)=>{let a=e.includes("top"),s=a?{top:0}:{bottom:0},r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:A()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...s,...r}})(o,d.calculateOffset(a,{reverseOrder:e,gutter:r,defaultPosition:t}));return s.createElement(oe,{id:a.id,key:a.id,onHeightUpdate:d.updateHeight,className:a.visible?ie:"",style:i},"custom"===a.type?M(a.message,a):l?l(a):s.createElement(se,{toast:a,position:o}))})))},de=$;function ce(){return ce=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var s in a)({}).hasOwnProperty.call(a,s)&&(e[s]=a[s])}return e},ce.apply(null,arguments)}const ue=e=>{let{title:t,titleId:a,...r}=e;return s.createElement("svg",ce({xmlns:"http://www.w3.org/2000/svg",width:1469,height:1079,fill:"none",viewBox:"0 0 1469 1079","aria-labelledby":a},r),t?s.createElement("title",{id:a},t):null,re||(re=s.createElement("g",{stroke:"#E7E7E7",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:.5,clipPath:"url(#a)"},s.createElement("path",{d:"M1446.61.675V1079M1393.61.675V1079M1340.61.675V1079M1287.61.675V1079M1234.61.675V1079M1181.61.675V1079M1128.61.675V1079M1075.61.675V1079M1022.61.675V1079M969.611.675V1079M916.611.675V1079M863.611.675V1079M810.611.675V1079M757.611.675V1079M704.611.675V1079M651.611.675V1079M598.611.675V1079M545.611.675V1079M492.611.675V1079M439.611.675V1079M386.611.675V1079M333.611.675V1079M280.611.675V1079M227.611.675V1079M174.611.675V1079M121.611.675V1079M68.611.675V1079M15.611.675V1079M1.049 11.88H1727.6M1.049 65.695H1727.6M1.049 119.509H1727.6M1.049 173.325H1727.6M1.049 227.138H1727.6M1.049 280.954H1727.6M1.049 334.767H1727.6M1.049 388.583H1727.6M1.049 442.396H1727.6M1.049 496.212H1727.6M1.049 550.028H1727.6M1.049 603.841H1727.6m-1726.551 54H1727.6M1.049 712.583H1727.6M1.049 766.396H1727.6M1.049 820.212H1727.6m-1726.551 54H1727.6m-1726.551 54H1727.6m-1726.551 56H1727.6M1.049 1040.21H1727.6"}))),le||(le=s.createElement("defs",null,s.createElement("clipPath",{id:"a"},s.createElement("path",{fill:"#fff",d:"M0 0h1469v1079H0z"})))))};var pe=a(25981),me=a(6222),he=a(47010),fe=a(74848);const ge=()=>{const[e,t]=(0,s.useState)(""),[a,r]=(0,s.useState)(""),[l,o]=(0,s.useState)(""),[n,d]=(0,s.useState)(!0),[c,u]=(0,s.useState)(!0),p=(0,s.useCallback)((async()=>{if(!e||!l)return u(Boolean(l)),void d((0,me.DT)(e));if(!(0,me.DT)(e))return void d(!1);const s=await fetch(he.ue,{method:"POST",body:JSON.stringify({email:e,stage:l,message:a})});"success"===(await s.json()).status&&(de.success("Thank you for contacting us.",{duration:3e3}),(0,me.p8)("Contact Page","Click","Send message"),t(""),r(""),o(""),d(!0),u(!0))}),[e,a,l]);return(0,fe.jsxs)("section",{className:"relative h-auto",children:[(0,fe.jsx)(ne,{}),(0,fe.jsx)(ue,{className:"absolute inset-0 -z-10 h-[540px] w-full"}),(0,fe.jsxs)("div",{className:"p-SPACE_06 sm:py-SPACE_10 lg:py-SPACE_20 flex flex-col lg:flex-row items-center lg:items-start justify-center lg:space-x-40",children:[(0,fe.jsxs)(i.A,{as:"h2",className:"text-title-large text-center sm:text-left sm:text-display-medium lg:text-display-large lg:max-w-md",children:["Say ",(0,fe.jsx)("span",{className:"bg-tailCall-yellow rounded sm:rounded-2xl px-SPACE_01 sm:px-SPACE_02",children:"hello"})," to us!"]}),(0,fe.jsxs)("div",{className:"flex flex-col justify-between space-y-SPACE_07 w-full sm:w-fit",children:[(0,fe.jsxs)("div",{className:"flex flex-col space-y-SPACE_02",children:[(0,fe.jsx)("label",{id:"email",className:"text-content-tiny sm:text-content-small font-medium",children:"Email"}),(0,fe.jsx)("input",{name:"email",type:"email",value:e,onChange:e=>{t(e.target.value),n||d(!1)},className:"border border-solid border-tailCall-border-light-500 rounded-lg font-space-grotesk h-11 w-[95%] sm:w-[480px] \n              p-SPACE_03 text-content-small outline-none focus:border-x-tailCall-light-700  "+(n?"is-valid":"is-invalid"),placeholder:"you@company.com"}),!n&&(0,fe.jsx)("div",{className:"text-red-400",children:"Please enter a valid email."})]}),(0,fe.jsxs)("div",{className:"flex flex-col space-y-SPACE_02",children:[(0,fe.jsx)("p",{className:"text-content-tiny sm:text-content-small font-medium mb-0",children:"What stage of GraphQL are you in?"}),(0,fe.jsx)("div",{className:"space-y-SPACE_03 radio-group",children:he.sA.map((e=>(0,fe.jsxs)("div",{className:"flex items-center space-x-SPACE_02 ",children:[(0,fe.jsx)("input",{type:"radio",name:e.name,id:e.id,value:e.value,checked:l===e.value,onChange:()=>o(e.value),className:"radio-button"}),(0,fe.jsx)("label",{htmlFor:e.id,className:"text-content-small radio-label cursor-pointer",children:e.name})]},e.id)))}),!c&&(0,fe.jsx)("div",{className:"text-red-400",children:"Please select your stage of GraphQL."})]}),(0,fe.jsxs)("div",{className:"flex flex-col space-y-SPACE_02",children:[(0,fe.jsx)("label",{id:"company",htmlFor:"",className:"text-content-tiny sm:text-content-small font-medium",children:"Tell us about your company"}),(0,fe.jsx)("textarea",{name:"company",value:a,onChange:e=>r(e.target.value),className:"rounded-lg font-space-grotesk h-32 w-[95%] sm:w-[480px] border border-tailCall-light-400 p-SPACE_03 text-content-small outline-none focus:border-x-tailCall-light-700",placeholder:"Leave us a message..."})]}),(0,fe.jsx)(pe.A,{theme:he.Sx.Dark,onClick:p,title:"Send message",disabled:!(e&&l)})]})]})]})},xe=()=>(0,fe.jsx)(fe.Fragment,{children:(0,fe.jsx)(ge,{})});var ye=a(55011);const be=()=>{const e=(0,o.zy)();return(0,s.useEffect)((()=>{r.Ay.send({hitType:"pageview",page:e.pathname,title:"Contact Page"})}),[]),(0,fe.jsx)(l.A,{title:ye.s.CONTACT,description:ye.K.CONTACT,children:(0,fe.jsx)(xe,{})})}}}]);