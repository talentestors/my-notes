import u from"./FlipItem-BdXLCb_x.js";import{_ as p}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as a,o as f,c as _,d as n,a as c}from"./app-C3tAciGk.js";function m(t=new Date){const r=t.getHours(),i=t.getMinutes(),l=t.getSeconds();return[...s(r),...s(i),...s(l)]}function s(t){return t>=10?(""+t).split("").map(r=>Number(r)):[0,t]}const d={components:{FlipItem:u},data(){return{timeArr:m()}},mounted(){this.startTimer()},beforeDestroy(){this.stopTimer()},methods:{startTimer(){this.stopTimer(),this.timer=setTimeout(()=>{this.timeArr=m(),this.startTimer()},1e3)},stopTimer(){clearTimeout(this.timer)}}},A={class:"clock-container"};function T(t,r,i,l,e,h){const o=a("flip-item");return f(),_("div",A,[n(o,{total:2,current:e.timeArr[0]},null,8,["current"]),n(o,{total:9,current:e.timeArr[1]},null,8,["current"]),r[0]||(r[0]=c("div",{class:"colon"},null,-1)),n(o,{total:5,current:e.timeArr[2]},null,8,["current"]),n(o,{total:9,current:e.timeArr[3]},null,8,["current"]),r[1]||(r[1]=c("div",{class:"colon"},null,-1)),n(o,{total:5,current:e.timeArr[4]},null,8,["current"]),n(o,{total:9,current:e.timeArr[5]},null,8,["current"])])}const x=p(d,[["render",T],["__scopeId","data-v-60a1cdff"],["__file","FlipClock.vue"]]);export{x as default};
