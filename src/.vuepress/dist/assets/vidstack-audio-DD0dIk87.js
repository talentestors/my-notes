var a=Object.defineProperty;var o=(i,t,e)=>t in i?a(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var r=(i,t,e)=>o(i,typeof t!="symbol"?t+"":t,e);import{at as p}from"./app-D9ywwhli.js";import{H as d,a as u}from"./vidstack-CGXAe0PE-C-HKVVyC.js";import"./vidstack-DSYpsFWk-GiZ8u0nT.js";class y extends d{constructor(e,s){super(e,s);r(this,"$$PROVIDER_TYPE","AUDIO");r(this,"airPlay");p(()=>{this.airPlay=new u(this.media,s)},this.scope)}get type(){return"audio"}setup(){super.setup(),this.type==="audio"&&this.ctx.notify("provider-setup",this)}get audio(){return this.media}}export{y as AudioProvider};