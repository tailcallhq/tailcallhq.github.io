"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9253,3338],{3338:(e,t,n)=>{n.r(t),n.d(t,{C:()=>o,c:()=>a});var r=n(90);function i(e,t){for(var n=0;n<t.length;n++){const r=t[n];if("string"!=typeof r&&!Array.isArray(r))for(const t in r)if("default"!==t&&!(t in e)){const n=Object.getOwnPropertyDescriptor(r,t);n&&Object.defineProperty(e,t,n.get?n:{enumerable:!0,get:()=>r[t]})}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(0,Object.defineProperty)(i,"name",{value:"_mergeNamespaces",configurable:!0});var l=(0,r.r)();const o=(0,r.g)(l),a=i({__proto__:null,default:o},[l])},7437:(e,t,n)=>{n.d(t,{f:()=>r});function r(e,t){const n=[];let r=e;for(;null!=r&&r.kind;)n.push(r),r=r.prevState;for(let i=n.length-1;i>=0;i--)t(n[i])}(0,Object.defineProperty)(r,"name",{value:"forEachState",configurable:!0})},9253:(e,t,n)=>{n.r(t);var r=n(3338),i=n(5994),l=n(3770),o=n(7437),a=(n(90),Object.defineProperty),s=(e,t)=>a(e,"name",{value:t,configurable:!0});function c(e,t,n){const r=f(n,p(t.string));if(!r)return;const i=null!==t.type&&/"|\w/.test(t.string[0])?t.start:t.end;return{list:r,from:{line:e.line,ch:i},to:{line:e.line,ch:t.end}}}function f(e,t){if(!t)return u(e,(e=>!e.isDeprecated));return u(u(e.map((e=>({proximity:y(p(e.text),t),entry:e}))),(e=>e.proximity<=2)),(e=>!e.entry.isDeprecated)).sort(((e,t)=>(e.entry.isDeprecated?1:0)-(t.entry.isDeprecated?1:0)||e.proximity-t.proximity||e.entry.text.length-t.entry.text.length)).map((e=>e.entry))}function u(e,t){const n=e.filter(t);return 0===n.length?e:n}function p(e){return e.toLowerCase().replaceAll(/\W/g,"")}function y(e,t){let n=d(t,e);return e.length>t.length&&(n-=e.length-t.length-1,n+=0===e.indexOf(t)?0:.5),n}function d(e,t){let n,r;const i=[],l=e.length,o=t.length;for(n=0;n<=l;n++)i[n]=[n];for(r=1;r<=o;r++)i[0][r]=r;for(n=1;n<=l;n++)for(r=1;r<=o;r++){const l=e[n-1]===t[r-1]?0:1;i[n][r]=Math.min(i[n-1][r]+1,i[n][r-1]+1,i[n-1][r-1]+l),n>1&&r>1&&e[n-1]===t[r-2]&&e[n-2]===t[r-1]&&(i[n][r]=Math.min(i[n][r],i[n-2][r-2]+l))}return i[l][o]}function g(e,t,n){const r="Invalid"===t.state.kind?t.state.prevState:t.state,{kind:o,step:a}=r;if("Document"===o&&0===a)return c(e,t,[{text:"{"}]);const{variableToType:s}=n;if(!s)return;const f=m(s,t.state);if("Document"===o||"Variable"===o&&0===a){return c(e,t,Object.keys(s).map((e=>({text:`"${e}": `,type:s[e]}))))}if(("ObjectValue"===o||"ObjectField"===o&&0===a)&&f.fields){return c(e,t,Object.keys(f.fields).map((e=>f.fields[e])).map((e=>({text:`"${e.name}": `,type:e.type,description:e.description}))))}if("StringValue"===o||"NumberValue"===o||"BooleanValue"===o||"NullValue"===o||"ListValue"===o&&1===a||"ObjectField"===o&&2===a||"Variable"===o&&2===a){const n=f.type?(0,i.MR)(f.type):void 0;if(n instanceof i.zP)return c(e,t,[{text:"{"}]);if(n instanceof i.Zb){return c(e,t,n.getValues().map((e=>({text:`"${e.name}"`,type:n,description:e.description}))))}if(n===l.kk)return c(e,t,[{text:"true",type:l.kk,description:"Not false."},{text:"false",type:l.kk,description:"Not true."}])}}function m(e,t){const n={type:null,fields:null};return(0,o.f)(t,(t=>{switch(t.kind){case"Variable":n.type=e[t.name];break;case"ListValue":{const e=n.type?(0,i.yl)(n.type):void 0;n.type=e instanceof i.KT?e.ofType:null;break}case"ObjectValue":{const e=n.type?(0,i.MR)(n.type):void 0;n.fields=e instanceof i.zP?e.getFields():null;break}case"ObjectField":{const e=t.name&&n.fields?n.fields[t.name]:null;n.type=null==e?void 0:e.type;break}}})),n}s(c,"hintList"),s(f,"filterAndSortList"),s(u,"filterNonEmpty"),s(p,"normalizeText"),s(y,"getProximity"),s(d,"lexicalDistance"),r.C.registerHelper("hint","graphql-variables",((e,t)=>{const n=e.getCursor(),i=e.getTokenAt(n),l=g(n,i,t);return null!=l&&l.list&&l.list.length>0&&(l.from=r.C.Pos(l.from.line,l.from.ch),l.to=r.C.Pos(l.to.line,l.to.ch),r.C.signal(e,"hasCompletion",e,l,i)),l})),s(g,"getVariablesHint"),s(m,"getTypeInfo")}}]);