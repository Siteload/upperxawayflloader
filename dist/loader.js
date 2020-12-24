var AwayLoader=function(e){"use strict";const t="DecompressionStream"in self,s=e=>new DataView(e.buffer).getUint32(4,!0);function i(e="",i=(e=>e)){let r,n=0;return fetch(e).then((e=>(n=+e.headers.get("Content-Length"),r=e.body.getReader(),r.read()))).then((e=>{const o=e.value;console.debug("[Loader] Header:",String.fromCharCode.apply(null,o.slice(0,3).reverse()));let a,h,c=0;if(t&&(67===(l=o)[0]&&87===l[1]&&83===l[2])){const e=s(o),i=o.slice(0,8);i[0]=70,console.debug("[Loader] SWC size:",s(o)),h=function(e,s=8){if(!t)throw"Your browser not support DecompressionStream =(";const i=new self.DecompressionStream("deflate"),r=i.writable.getWriter(),n=i.readable.getReader(),o=new Uint8Array(e);let a,h=!1,c=!1;function l(){n.read().then((function t(i){const r=i.done,h=i.value;return h&&(o.set(h,s),s+=h.length),r||s>=e?(c=!0,a&&a(),void console.debug("[Loader] Decoder closed:",s)):n.read().then(t)}))}return{get buffer(){return o},write(e){r.ready.then((()=>{r.write(e),h||(h=!0,l())}))},readAll:()=>c?Promise.resolve(o):new Promise((e=>{a=()=>{e(o)}}))}}(e,8),a=h.buffer,a.set(i),h.write(o.slice(8))}else a=new Uint8Array(n),a.set(o);var l;return c+=o.length,r.read().then((function e(t){const s=t.done,o=t.value;return i&&i(c/n),s?h?h.readAll():a:(h?h.write(o):a.set(o,c),c+=o.length,r.read().then(e))}))}))}function r(e,s=(e=>e)){const r=e.path.indexOf(".js")>-1;if(!r&&t)return i(e.path,s).then((t=>({meta:e.meta||{},name:e.name,path:e.path,resourceType:e.resourceType,data:t.buffer,type:"swf"})));const o=new XMLHttpRequest;return o.addEventListener("progress",(t=>{const i=t.total||+o.getResponseHeader("content-length")||e.size||0;s(i?Math.min(1,t.loaded/i):1)})),o.open("GET",e.path,!0),o.responseType=r?"text":"arraybuffer",new Promise(((t,i)=>{o.addEventListener("error",i),o.addEventListener("load",(()=>{if(s(1),r){const e=new Blob([o.response],{type:"text/javascript"});n(URL.createObjectURL(e)).then((()=>t(void 0)))}else t({meta:e.meta||{},name:e.name,path:e.path,resourceType:e.resourceType,data:o.response,type:r?"js":"swf"})})),o.send()}))}function n(e,t){const s=document.querySelector("head"),i=document.createElement("script");return new Promise(((r,n)=>{Object.assign(i,{type:"text/javascript",async:!0,src:"string"==typeof e?e:e.path,onload:()=>{t&&t(1),r(i)},onerror:n}),s.appendChild(i)}))}class o{constructor(e,t,s=1){var i;this.callback=e,this.childs=t,this.weight=s,this.value=0,this.childs=null===(i=this.childs)||void 0===i?void 0:i.slice(),this._report=this._report.bind(this)}_report(e){if(this.childs){let e=0,t=0;this.childs.forEach((s=>{e+=s.weight||1,t+=s.value||0})),this.value=t/e}else this.value=e*this.weight;this.callback&&this.callback(this.value)}get report(){return this._report}}class a{constructor(e){this.config=e}run(e,t,s=(e=>{}),i=!1){const a=e.length,h=t.length,c=e.concat(t),l=Array.from({length:a+h},(()=>new o));let d;return this.progress=new o(s,l),i?(d=t.map(((e,t)=>r(e,l[t].report))),d=d.concat(e.map(((e,t)=>n(e,l[t+h].report))))):d=c.map(((e,t)=>r(e,l[t].report))),Promise.all(d).then((e=>e.filter((e=>e&&"swf"===e.type))))}}const h=(e,t)=>"string"==typeof e?parseFloat(e.replace("%",""))/100*t:e;class c{constructor(e=document){this.root=e,this._isTransited=!1,this.onUpdate=this.onUpdate.bind(this),this.onProgress=this.onProgress.bind(this),window.addEventListener("resize",this.onUpdate)}build(){this.splash=this.root.querySelector("#splash__image"),this.prRoot=this.root.querySelector("#progress__root"),this.prLine=this.root.querySelector("#progress__line"),this.splash.addEventListener("transitionrun",(()=>this._isTransited=!0)),this.splash.addEventListener("transitionend",(()=>this._isTransited=!1))}init(){this.build();const e=this.config;Object.assign(this.splash.style,{backgroundImage:`url(${e.splash})`,visibility:"visible"});const t=e.progress;t.rect=t.rect||[0,.9,1,.2],Object.assign(this.prRoot.style,{background:t.back,left:100*t.rect[0]+"%",top:100*t.rect[1]+"%",width:100*t.rect[2]+"%",height:100*t.rect[3]+"%"}),Object.assign(this.prRoot.style,{background:t.line}),this.onUpdate()}onProgress(e){switch(this.config.progress.direction){case"tb":Object.assign(this.prLine.style,{height:100*e+"%",width:"100%"});break;case"lr":default:Object.assign(this.prLine.style,{height:"100%",width:100*e+"%"})}}onUpdate(){if(!this.splash)return;const e=this.config;let t=h(e.x,window.innerWidth)||0,s=h(e.y,window.innerHeight)||0,i=h(e.w,window.innerWidth)||window.innerWidth,r=h(e.h,window.innerHeight)||window.innerHeight;const n=Math.min(r/e.height,i/e.width),o=Math.ceil(e.width*n),a=Math.ceil(e.height*n),c=t+(i-o)/2,l=s+(r-a)/2;Object.assign(this.splash.style,{width:`${o}px`,height:`${a}px`,left:`${c}px`,top:`${l}px`})}ready(){this.config.start&&(this.splash.style.background=`url(${this.config.start})`),Object.assign(this.prRoot.style,{visibility:"hidden",opacity:0})}hide(e=!1){let t;return Object.assign(this.prRoot.style,{visibility:"hidden",opacity:0}),Object.assign(this.splash.style,{visibility:"hidden",opacity:0}),t=this._isTransited?new Promise((e=>{this.splash.addEventListener("transitionend",e,{once:!0})})):Promise.resolve(!0),e?t.then((()=>this.dispose())):t}dispose(){window.removeEventListener("resize",this.onUpdate),this.splash.remove(),this.prRoot.remove(),this.splash=null}}class l{constructor(e,t){this.loader=e,this.config=t}runGame(e=(e=>e)){const t=this.config,s=(Array.isArray(t.runtime)?t.runtime:[t.runtime]).map((e=>({path:e.path||e,size:e.size||0}))),i=this.config.binary,r=new o(null,null,4),n=new o((e=>{console.log("AVM Load",e)}),null,t.progressParserWeigth?t.progressParserWeigth:.001);return this.progress=new o(e,[r,n]),Object.assign(window,{updatePokiProgressBar:n.report}),this.loader.run(s,i,r.report,t.debug).then((e=>(t.files=e,e)))}}let d,p,u;const g={init(e){p=new a(e),d=new l(p,e),u=new c(document),u.init(),window.setStageDimensions=function(t,s,i,r){e.x=t,e.y=s,e.w=i,e.h=r,window.AVMPlayerPoki&&window.AVMPlayerPoki.setStageDimensions(t,s,i,r),u.onUpdate()}},runGame(e=(e=>e),t=(e=>e)){const s=d.config;return Object.assign(window,{pokiGameParseComplete:e=>{if(t(e),s.start){u.ready();const t=t=>{if(u.hide(!0),!e)throw"PokiPlayer did not send a callback for starting game";e()};window.addEventListener("click",t,{once:!0})}else u.hide(!0)}}),d.runGame((t=>{u.onProgress(t),e(t)})).then((e=>{const t=window.startPokiGame;if(!t)throw"Could not find a 'startPokiGame' method";t(d.config)}))}};return e.LegacyLoader=g,e.Loader=a,e.ProgressUI=c,e.Reporter=o,e.Runner=l,Object.defineProperty(e,"__esModule",{value:!0}),e}({});
//# sourceMappingURL=loader.js.map