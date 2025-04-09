import{bO as P,k as E,bP as j,bQ as C,bR as D,bS as M,bT as w,bU as G,bV as f,bW as c,bX as v,bY as l,bZ as A}from"./app-C3tAciGk.js";import{B as N}from"./mermaid.core-DfNaDT61.js";function V(r,e,t,s){var i=-1,n=r==null?0:r.length;for(s&&n&&(t=r[++i]);++i<n;)t=e(t,r[i],i,r);return t}function x(r){return typeof r=="function"?r:P}function a(r,e){var t=E(r)?j:C;return t(r,x(e))}function I(r,e){var t=[];return C(r,function(s,i,n){e(s,i,n)&&t.push(s)}),t}function p(r,e){var t=E(r)?M:I;return t(r,D(e))}var R=Object.prototype,T=R.hasOwnProperty;function S(r,e){return r!=null&&T.call(r,e)}function d(r,e){return r!=null&&w(r,e,S)}function U(r,e){return G(e,function(t){return r[t]})}function b(r){return r==null?[]:U(r,f(r))}function H(r,e,t,s,i){return i(r,function(n,h,u){t=s?(s=!1,n):e(t,n,h,u)}),t}function Y(r,e,t){var s=E(r)?V:H,i=arguments.length<3;return s(r,D(e),t,i,C)}var z="\0",o="\0",L="";class F{constructor(e={}){this._isDirected=d(e,"directed")?e.directed:!0,this._isMultigraph=d(e,"multigraph")?e.multigraph:!1,this._isCompound=d(e,"compound")?e.compound:!1,this._label=void 0,this._defaultNodeLabelFn=c(void 0),this._defaultEdgeLabelFn=c(void 0),this._nodes={},this._isCompound&&(this._parent={},this._children={},this._children[o]={}),this._in={},this._preds={},this._out={},this._sucs={},this._edgeObjs={},this._edgeLabels={}}isDirected(){return this._isDirected}isMultigraph(){return this._isMultigraph}isCompound(){return this._isCompound}setGraph(e){return this._label=e,this}graph(){return this._label}setDefaultNodeLabel(e){return v(e)||(e=c(e)),this._defaultNodeLabelFn=e,this}nodeCount(){return this._nodeCount}nodes(){return f(this._nodes)}sources(){var e=this;return p(this.nodes(),function(t){return N(e._in[t])})}sinks(){var e=this;return p(this.nodes(),function(t){return N(e._out[t])})}setNodes(e,t){var s=arguments,i=this;return a(e,function(n){s.length>1?i.setNode(n,t):i.setNode(n)}),this}setNode(e,t){return d(this._nodes,e)?(arguments.length>1&&(this._nodes[e]=t),this):(this._nodes[e]=arguments.length>1?t:this._defaultNodeLabelFn(e),this._isCompound&&(this._parent[e]=o,this._children[e]={},this._children[o][e]=!0),this._in[e]={},this._preds[e]={},this._out[e]={},this._sucs[e]={},++this._nodeCount,this)}node(e){return this._nodes[e]}hasNode(e){return d(this._nodes,e)}removeNode(e){var t=this;if(d(this._nodes,e)){var s=function(i){t.removeEdge(t._edgeObjs[i])};delete this._nodes[e],this._isCompound&&(this._removeFromParentsChildList(e),delete this._parent[e],a(this.children(e),function(i){t.setParent(i)}),delete this._children[e]),a(f(this._in[e]),s),delete this._in[e],delete this._preds[e],a(f(this._out[e]),s),delete this._out[e],delete this._sucs[e],--this._nodeCount}return this}setParent(e,t){if(!this._isCompound)throw new Error("Cannot set parent in a non-compound graph");if(l(t))t=o;else{t+="";for(var s=t;!l(s);s=this.parent(s))if(s===e)throw new Error("Setting "+t+" as parent of "+e+" would create a cycle");this.setNode(t)}return this.setNode(e),this._removeFromParentsChildList(e),this._parent[e]=t,this._children[t][e]=!0,this}_removeFromParentsChildList(e){delete this._children[this._parent[e]][e]}parent(e){if(this._isCompound){var t=this._parent[e];if(t!==o)return t}}children(e){if(l(e)&&(e=o),this._isCompound){var t=this._children[e];if(t)return f(t)}else{if(e===o)return this.nodes();if(this.hasNode(e))return[]}}predecessors(e){var t=this._preds[e];if(t)return f(t)}successors(e){var t=this._sucs[e];if(t)return f(t)}neighbors(e){var t=this.predecessors(e);if(t)return A(t,this.successors(e))}isLeaf(e){var t;return this.isDirected()?t=this.successors(e):t=this.neighbors(e),t.length===0}filterNodes(e){var t=new this.constructor({directed:this._isDirected,multigraph:this._isMultigraph,compound:this._isCompound});t.setGraph(this.graph());var s=this;a(this._nodes,function(h,u){e(u)&&t.setNode(u,h)}),a(this._edgeObjs,function(h){t.hasNode(h.v)&&t.hasNode(h.w)&&t.setEdge(h,s.edge(h))});var i={};function n(h){var u=s.parent(h);return u===void 0||t.hasNode(u)?(i[h]=u,u):u in i?i[u]:n(u)}return this._isCompound&&a(t.nodes(),function(h){t.setParent(h,n(h))}),t}setDefaultEdgeLabel(e){return v(e)||(e=c(e)),this._defaultEdgeLabelFn=e,this}edgeCount(){return this._edgeCount}edges(){return b(this._edgeObjs)}setPath(e,t){var s=this,i=arguments;return Y(e,function(n,h){return i.length>1?s.setEdge(n,h,t):s.setEdge(n,h),h}),this}setEdge(){var e,t,s,i,n=!1,h=arguments[0];typeof h=="object"&&h!==null&&"v"in h?(e=h.v,t=h.w,s=h.name,arguments.length===2&&(i=arguments[1],n=!0)):(e=h,t=arguments[1],s=arguments[3],arguments.length>2&&(i=arguments[2],n=!0)),e=""+e,t=""+t,l(s)||(s=""+s);var u=g(this._isDirected,e,t,s);if(d(this._edgeLabels,u))return n&&(this._edgeLabels[u]=i),this;if(!l(s)&&!this._isMultigraph)throw new Error("Cannot set a named edge when isMultigraph = false");this.setNode(e),this.setNode(t),this._edgeLabels[u]=n?i:this._defaultEdgeLabelFn(e,t,s);var _=B(this._isDirected,e,t,s);return e=_.v,t=_.w,Object.freeze(_),this._edgeObjs[u]=_,O(this._preds[t],e),O(this._sucs[e],t),this._in[t][u]=_,this._out[e][u]=_,this._edgeCount++,this}edge(e,t,s){var i=arguments.length===1?m(this._isDirected,arguments[0]):g(this._isDirected,e,t,s);return this._edgeLabels[i]}hasEdge(e,t,s){var i=arguments.length===1?m(this._isDirected,arguments[0]):g(this._isDirected,e,t,s);return d(this._edgeLabels,i)}removeEdge(e,t,s){var i=arguments.length===1?m(this._isDirected,arguments[0]):g(this._isDirected,e,t,s),n=this._edgeObjs[i];return n&&(e=n.v,t=n.w,delete this._edgeLabels[i],delete this._edgeObjs[i],y(this._preds[t],e),y(this._sucs[e],t),delete this._in[t][i],delete this._out[e][i],this._edgeCount--),this}inEdges(e,t){var s=this._in[e];if(s){var i=b(s);return t?p(i,function(n){return n.v===t}):i}}outEdges(e,t){var s=this._out[e];if(s){var i=b(s);return t?p(i,function(n){return n.w===t}):i}}nodeEdges(e,t){var s=this.inEdges(e,t);if(s)return s.concat(this.outEdges(e,t))}}F.prototype._nodeCount=0;F.prototype._edgeCount=0;function O(r,e){r[e]?r[e]++:r[e]=1}function y(r,e){--r[e]||delete r[e]}function g(r,e,t,s){var i=""+e,n=""+t;if(!r&&i>n){var h=i;i=n,n=h}return i+L+n+L+(l(s)?z:s)}function B(r,e,t,s){var i=""+e,n=""+t;if(!r&&i>n){var h=i;i=n,n=h}var u={v:i,w:n};return s&&(u.name=s),u}function m(r,e){return g(r,e.v,e.w,e.name)}export{F as G,p as a,x as c,a as f,d as h,Y as r,b as v};
