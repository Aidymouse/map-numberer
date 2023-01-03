(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const h of o)if(h.type==="childList")for(const f of h.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&i(f)}).observe(document,{childList:!0,subtree:!0});function n(o){const h={};return o.integrity&&(h.integrity=o.integrity),o.referrerpolicy&&(h.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?h.credentials="include":o.crossorigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function i(o){if(o.ep)return;o.ep=!0;const h=n(o);fetch(o.href,h)}})();function ne(){}function ot(e){return e()}function tt(){return Object.create(null)}function le(e){e.forEach(ot)}function ut(e){return typeof e=="function"}function rt(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}let Ce;function nt(e,t){return Ce||(Ce=document.createElement("a")),Ce.href=t,e===Ce.href}function pt(e){return Object.keys(e).length===0}function s(e,t){e.appendChild(t)}function pe(e,t,n){e.insertBefore(t,n||null)}function ue(e){e.parentNode&&e.parentNode.removeChild(e)}function c(e){return document.createElement(e)}function be(e){return document.createTextNode(e)}function y(){return be(" ")}function m(e,t,n,i){return e.addEventListener(t,n,i),()=>e.removeEventListener(t,n,i)}function At(e){return function(t){return t.preventDefault(),e.call(this,t)}}function l(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function de(e){return e===""?null:+e}function mt(e){return Array.from(e.childNodes)}function R(e,t){e.value=t==null?"":t}function E(e,t,n,i){n===null?e.style.removeProperty(t):e.style.setProperty(t,n,i?"important":"")}function lt(e,t){for(let n=0;n<e.options.length;n+=1){const i=e.options[n];if(i.__value===t){i.selected=!0;return}}e.selectedIndex=-1}function gt(e){const t=e.querySelector(":checked")||e.options[0];return t&&t.__value}function st(e,t,n){e.classList[n?"add":"remove"](t)}function yt(e,t,{bubbles:n=!1,cancelable:i=!1}={}){const o=document.createEvent("CustomEvent");return o.initCustomEvent(e,n,i,t),o}let ve;function _e(e){ve=e}function Ve(){if(!ve)throw new Error("Function called outside component initialization");return ve}function wt(e){Ve().$$.on_mount.push(e)}function bt(e){Ve().$$.after_update.push(e)}function _t(){const e=Ve();return(t,n,{cancelable:i=!1}={})=>{const o=e.$$.callbacks[t];if(o){const h=yt(t,n,{cancelable:i});return o.slice().forEach(f=>{f.call(e,h)}),!h.defaultPrevented}return!0}}function vt(e,t){const n=e.$$.callbacks[t.type];n&&n.slice().forEach(i=>i.call(this,t))}const we=[],ze=[],Le=[],Ue=[],zt=Promise.resolve();let He=!1;function kt(){He||(He=!0,zt.then(at))}function Ne(e){Le.push(e)}function Et(e){Ue.push(e)}const Be=new Set;let Re=0;function at(){const e=ve;do{for(;Re<we.length;){const t=we[Re];Re++,_e(t),xt(t.$$)}for(_e(null),we.length=0,Re=0;ze.length;)ze.pop()();for(let t=0;t<Le.length;t+=1){const n=Le[t];Be.has(n)||(Be.add(n),n())}Le.length=0}while(we.length);for(;Ue.length;)Ue.pop()();He=!1,Be.clear(),_e(e)}function xt(e){if(e.fragment!==null){e.update(),le(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(Ne)}}const De=new Set;let oe;function Mt(){oe={r:0,c:[],p:oe}}function Tt(){oe.r||le(oe.c),oe=oe.p}function Fe(e,t){e&&e.i&&(De.delete(e),e.i(t))}function Ze(e,t,n,i){if(e&&e.o){if(De.has(e))return;De.add(e),oe.c.push(()=>{De.delete(e),i&&(n&&e.d(1),i())}),e.o(t)}else i&&i()}const It=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function Ct(e,t,n,i){const o=e.$$.props[t];o!==void 0&&(e.$$.bound[o]=n,i===void 0&&n(e.$$.ctx[o]))}function Rt(e){e&&e.c()}function ct(e,t,n,i){const{fragment:o,after_update:h}=e.$$;o&&o.m(t,n),i||Ne(()=>{const f=e.$$.on_mount.map(ot).filter(ut);e.$$.on_destroy?e.$$.on_destroy.push(...f):le(f),e.$$.on_mount=[]}),h.forEach(Ne)}function ft(e,t){const n=e.$$;n.fragment!==null&&(le(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Yt(e,t){e.$$.dirty[0]===-1&&(we.push(e),kt(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function ht(e,t,n,i,o,h,f,r=[-1]){const A=ve;_e(e);const a=e.$$={fragment:null,ctx:[],props:h,update:ne,not_equal:o,bound:tt(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(A?A.$$.context:[])),callbacks:tt(),dirty:r,skip_bound:!1,root:t.target||A.$$.root};f&&f(a.root);let p=!1;if(a.ctx=n?n(e,t.props||{},(d,N,...Y)=>{const x=Y.length?Y[0]:N;return a.ctx&&o(a.ctx[d],a.ctx[d]=x)&&(!a.skip_bound&&a.bound[d]&&a.bound[d](x),p&&Yt(e,d)),N}):[],a.update(),p=!0,le(a.before_update),a.fragment=i?i(a.ctx):!1,t.target){if(t.hydrate){const d=mt(t.target);a.fragment&&a.fragment.l(d),d.forEach(ue)}else a.fragment&&a.fragment.c();t.intro&&Fe(e.$$.fragment),ct(e,t.target,t.anchor,t.customElement),at()}_e(A)}class dt{$destroy(){ft(this,1),this.$destroy=ne}$on(t,n){if(!ut(n))return ne;const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(n),()=>{const o=i.indexOf(n);o!==-1&&i.splice(o,1)}}$set(t){this.$$set&&!pt(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const Lt="data:image/png;base64,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",Dt="data:image/png;base64,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";function Nt(e){let t,n,i,o,h,f,r,A,a;return{c(){t=c("div"),n=c("p"),i=be("+"),h=y(),f=c("input"),l(n,"style",o=`font-size: ${e[1]}px`),l(n,"class","svelte-15xm0je"),l(f,"type","file"),l(f,"accept",e[3]),l(f,"class","svelte-15xm0je"),l(t,"id","plus-container"),l(t,"style",r=`width: ${e[1]}px; height: ${e[2]}px`),l(t,"class","svelte-15xm0je")},m(p,d){pe(p,t,d),s(t,n),s(n,i),s(t,h),s(t,f),A||(a=[m(f,"change",e[5]),m(f,"change",e[4])],A=!0)},p(p,[d]){d&2&&o!==(o=`font-size: ${p[1]}px`)&&l(n,"style",o),d&8&&l(f,"accept",p[3]),d&6&&r!==(r=`width: ${p[1]}px; height: ${p[2]}px`)&&l(t,"style",r)},i:ne,o:ne,d(p){p&&ue(t),A=!1,le(a)}}}function Ft(e,t,n){const i=_t();let{width:o=50}=t,{height:h=50}=t,{accept:f="*"}=t,{files:r}=t;function A(p){i("change",p)}function a(){r=this.files,n(0,r)}return e.$$set=p=>{"width"in p&&n(1,o=p.width),"height"in p&&n(2,h=p.height),"accept"in p&&n(3,f=p.accept),"files"in p&&n(0,r=p.files)},[r,o,h,f,A,a]}class Kt extends dt{constructor(t){super(),ht(this,t,Ft,Nt,rt,{width:1,height:2,accept:3,files:0})}}const{window:Ye}=It;function Pt(e){let t,n,i,o,h,f;function r(a){e[33](a)}let A={accept:"image/*"};return e[9]!==void 0&&(A.files=e[9]),n=new Kt({props:A}),ze.push(()=>Ct(n,"files",r,e[9])),n.$on("change",e[10]),{c(){t=c("div"),Rt(n.$$.fragment),o=y(),h=c("span"),h.innerHTML=`<p style="margin: 0;" class="svelte-1u8zmhh">Toggle controls with</p> 
          <div class="key-wrapper svelte-1u8zmhh"><span id="help-key" class="key down svelte-1u8zmhh">C</span></div>`,E(h,"display","flex"),E(h,"margin-top","1em"),E(t,"display","flex"),E(t,"flex-direction","column"),E(t,"align-items","center")},m(a,p){pe(a,t,p),ct(n,t,null),s(t,o),s(t,h),f=!0},p(a,p){const d={};!i&&p[0]&512&&(i=!0,d.files=a[9],Et(()=>i=!1)),n.$set(d)},i(a){f||(Fe(n.$$.fragment,a),f=!0)},o(a){Ze(n.$$.fragment,a),f=!1},d(a){a&&ue(t),ft(n)}}}function Bt(e){let t,n,i,o,h;return{c(){t=c("canvas"),n=y(),i=c("canvas"),l(t,"width","500"),l(t,"height","500"),l(i,"width","1"),l(i,"height","1"),E(i,"display","none")},m(f,r){pe(f,t,r),e[31](t),pe(f,n,r),pe(f,i,r),e[32](i),o||(h=[m(t,"pointerdown",e[13]),m(t,"pointermove",e[14]),m(t,"pointerenter",e[16]),m(t,"pointerleave",e[15]),m(t,"pointerup",e[17]),m(t,"contextmenu",At(e[21])),m(t,"wheel",e[18])],o=!0)},p:ne,i:ne,o:ne,d(f){f&&ue(t),e[31](null),f&&ue(n),f&&ue(i),e[32](null),o=!1,le(h)}}}function Ut(e){let t,n,i,o,h,f,r,A,a,p,d,N,Y,x,F,L,v,U,se,M,H,Ae,S,re,Z,O,j,ke,me,b,ae,Ee,K,ce,V,xe,P,Me,T,Te,I,X,W,J,q,u,g,k,_,fe,G,Ge,$,Qe,B,Se,ie,ee,Oe,je,Q,Xe,Ie,We,ge,C,D,Je,ye,he,Ke,qe;const $e=[Bt,Pt],te=[];function et(w,z){return w[8].src?0:1}return C=et(e),D=te[C]=$e[C](e),{c(){t=c("main"),n=c("aside"),i=c("button"),o=c("img"),f=y(),r=c("span"),A=be(`Auto-Increment
      `),a=c("input"),p=y(),d=c("p"),d.textContent="Automatically increases number on cursor when placed",N=y(),Y=c("hr"),x=y(),F=c("p"),F.textContent="Map Numberer version 1.0",L=y(),v=c("p"),v.innerHTML='By <a href="https://github.com/Aidymouse/map-numberer" class="svelte-1u8zmhh">Aidymouse</a>',U=y(),se=c("p"),se.innerHTML='Cog icon by <a href="https://www.flaticon.com/free-icons/cog" title="cog icons" class="svelte-1u8zmhh">Dave Gandy</a>',M=y(),H=c("p"),H.innerHTML='Arrow icon by <a href="https://www.flaticon.com/free-icons/play" title="next icons" class="svelte-1u8zmhh">Roundicons</a>',Ae=y(),S=c("p"),S.innerHTML='See also: <a href="https://www.hexfriend.net" class="svelte-1u8zmhh">Hexfriend</a>, <a href="https://dagloopy.blogspot.com/" class="svelte-1u8zmhh">DaGloopy</a>',re=y(),Z=c("aside"),O=c("button"),j=c("img"),me=y(),b=c("div"),ae=c("p"),ae.textContent="Text",Ee=y(),K=c("div"),ce=c("div"),V=c("input"),xe=y(),P=c("input"),Me=y(),T=c("input"),Te=y(),I=c("select"),X=c("option"),X.textContent="Segoe UI",W=c("option"),W.textContent="Arial",J=c("option"),J.textContent="Comic Sans",q=c("option"),q.textContent="Times New Roman",u=y(),g=c("p"),g.textContent="Outline",k=y(),_=c("div"),fe=c("div"),G=c("input"),Ge=y(),$=c("input"),Qe=y(),B=c("input"),Se=y(),ie=c("button"),ee=c("input"),Oe=be(`
        Load New Image`),je=y(),Q=c("button"),Xe=be("Export"),We=y(),ge=c("section"),D.c(),Je=y(),ye=c("span"),ye.innerHTML=`<p class="tiny-text svelte-1u8zmhh"><span style="color: #f2f2f2">Left Click:</span> Place Number</p> 
    <p class="tiny-text svelte-1u8zmhh"><span style="color: #f2f2f2">Right Click:</span> Pan</p> 
    <p class="tiny-text svelte-1u8zmhh"><span style="color: #f2f2f2">Scroll:</span> Zoom</p> 
    <p class="tiny-text svelte-1u8zmhh"><span style="color: #f2f2f2">Shift+Click:</span> Place without Incrementing</p> 
    <p class="tiny-text svelte-1u8zmhh"><span style="color: #f2f2f2">Shift+Scroll:</span> Manually adjust number</p> 
    <p class="tiny-text svelte-1u8zmhh"><span style="color: #f2f2f2">Ctrl+Z:</span> Undo</p> 
    <p class="tiny-text svelte-1u8zmhh"><span style="color: #f2f2f2">Ctrl+Shift+Z:</span> Redo</p>`,nt(o.src,h=Lt)||l(o,"src",h),l(o,"class","svelte-1u8zmhh"),l(i,"id","settings-button"),l(i,"class","svelte-1u8zmhh"),l(a,"type","checkbox"),l(d,"class","tiny-text svelte-1u8zmhh"),E(Y,"color","#bbbbbb"),l(F,"class","tiny-text svelte-1u8zmhh"),E(F,"margin-top","0.5em"),l(v,"class","tiny-text svelte-1u8zmhh"),l(se,"class","tiny-text svelte-1u8zmhh"),E(se,"margin-top","0.25em"),l(H,"class","tiny-text svelte-1u8zmhh"),l(S,"class","tiny-text svelte-1u8zmhh"),E(S,"margin-top","0.25em"),l(r,"id","settings"),l(r,"class","hidden svelte-1u8zmhh"),l(n,"id","settings-aside"),l(n,"class","svelte-1u8zmhh"),l(j,"id","aside-toggle-img"),nt(j.src,ke=Dt)||l(j,"src",ke),l(j,"class","right-facing svelte-1u8zmhh"),l(O,"id","aside-toggle"),l(O,"class","svelte-1u8zmhh"),l(ae,"class","svelte-1u8zmhh"),l(V,"type","color"),l(V,"class","svelte-1u8zmhh"),l(ce,"class","color-floater svelte-1u8zmhh"),l(P,"type","number"),l(P,"class","svelte-1u8zmhh"),l(T,"type","range"),l(T,"min","10"),l(T,"max","100"),l(T,"class","svelte-1u8zmhh"),l(K,"class","control-arranger svelte-1u8zmhh"),X.__value="Segoe UI",X.value=X.__value,W.__value="Arial",W.value=W.__value,J.__value="Comic Sans MS",J.value=J.__value,q.__value="Times New Roman",q.value=q.__value,e[3]===void 0&&Ne(()=>e[26].call(I)),E(g,"margin-top","0.5em"),l(g,"class","svelte-1u8zmhh"),l(G,"type","color"),l(G,"class","svelte-1u8zmhh"),l(fe,"class","color-floater svelte-1u8zmhh"),l($,"type","number"),l($,"class","svelte-1u8zmhh"),l(B,"type","range"),l(B,"min","0"),l(B,"max","20"),l(B,"class","svelte-1u8zmhh"),l(_,"class","control-arranger svelte-1u8zmhh"),l(ee,"id","controls-file-input"),l(ee,"type","file"),l(ee,"accept","image/*"),l(ee,"class","svelte-1u8zmhh"),l(ie,"class","light-button svelte-1u8zmhh"),E(ie,"margin-top","0.5em"),E(ie,"position","relative"),Q.disabled=Ie=e[8].src=="",l(Q,"class","svelte-1u8zmhh"),st(Q,"light-button",e[8].src),l(b,"id","controls"),l(b,"class","svelte-1u8zmhh"),l(Z,"id","floating-aside"),l(Z,"class","stowed svelte-1u8zmhh"),l(ge,"class","svelte-1u8zmhh"),l(ye,"id","help"),l(ye,"class","hidden svelte-1u8zmhh")},m(w,z){pe(w,t,z),s(t,n),s(n,i),s(i,o),s(n,f),s(n,r),s(r,A),s(r,a),a.checked=e[2],s(r,p),s(r,d),s(r,N),s(r,Y),s(r,x),s(r,F),s(r,L),s(r,v),s(r,U),s(r,se),s(r,M),s(r,H),s(r,Ae),s(r,S),s(t,re),s(t,Z),s(Z,O),s(O,j),s(Z,me),s(Z,b),s(b,ae),s(b,Ee),s(b,K),s(K,ce),s(ce,V),R(V,e[4]),s(K,xe),s(K,P),R(P,e[5]),s(K,Me),s(K,T),R(T,e[5]),s(b,Te),s(b,I),s(I,X),s(I,W),s(I,J),s(I,q),lt(I,e[3]),s(b,u),s(b,g),s(b,k),s(b,_),s(_,fe),s(fe,G),R(G,e[6]),s(_,Ge),s(_,$),R($,e[7]),s(_,Qe),s(_,B),R(B,e[7]),s(b,Se),s(b,ie),s(ie,ee),s(ie,Oe),s(b,je),s(b,Q),s(Q,Xe),s(t,We),s(t,ge),te[C].m(ge,null),s(t,Je),s(t,ye),he=!0,Ke||(qe=[m(Ye,"resize",e[11]),m(Ye,"load",e[11]),m(Ye,"keydown",e[19]),m(Ye,"keyup",e[20]),m(i,"click",Zt),m(a,"change",e[22]),m(O,"click",Ht),m(V,"input",e[23]),m(P,"input",e[24]),m(T,"change",e[25]),m(T,"input",e[25]),m(I,"change",e[26]),m(G,"input",e[27]),m($,"input",e[28]),m(B,"change",e[29]),m(B,"input",e[29]),m(ee,"change",e[30]),m(ee,"change",e[10]),m(Q,"click",e[12])],Ke=!0)},p(w,z){z[0]&4&&(a.checked=w[2]),z[0]&16&&R(V,w[4]),z[0]&32&&de(P.value)!==w[5]&&R(P,w[5]),z[0]&32&&R(T,w[5]),z[0]&8&&lt(I,w[3]),z[0]&64&&R(G,w[6]),z[0]&128&&de($.value)!==w[7]&&R($,w[7]),z[0]&128&&R(B,w[7]),(!he||z[0]&256&&Ie!==(Ie=w[8].src==""))&&(Q.disabled=Ie),(!he||z[0]&256)&&st(Q,"light-button",w[8].src);let Pe=C;C=et(w),C===Pe?te[C].p(w,z):(Mt(),Ze(te[Pe],1,1,()=>{te[Pe]=null}),Tt(),D=te[C],D?D.p(w,z):(D=te[C]=$e[C](w),D.c()),Fe(D,1),D.m(ge,null))},i(w){he||(Fe(D),he=!0)},o(w){Ze(D),he=!1},d(w){w&&ue(t),te[C].d(),Ke=!1,le(qe)}}}function it(e){let t=e.target.getBoundingClientRect();return{x:e.clientX-t.x,y:e.clientY-t.y}}function Ht(){let e=document.getElementById("floating-aside"),t=document.getElementById("aside-toggle-img");e.classList.toggle("stowed"),t.classList.toggle("right-facing")}function Zt(){let e=document.getElementById("settings");e.classList.contains("hidden")?e.classList.remove("hidden"):e.classList.add("hidden")}function Vt(e,t,n){let i,o,h=!0,f=!1,r=1,A={x:0,y:0,oldX:-1,oldY:-1,active:!1},a=[],p=-1,d={number:1,x:0,y:0,render:!0},N="Segoe UI",Y="#333333",x=20,F="#f2f2f2",L=5,v=new Image;v.onload=u=>{n(0,i.width=v.width,i),n(0,i.height=v.height,i),a=[],d.number=1,n(8,v),Ae()};let U;function se(){let u=new FileReader;u.onload=g=>{n(8,v.src=g.target.result,v)},u.readAsDataURL(U[0])}function M(){if(!v.src)return;const u=i.getContext("2d");u.drawImage(v,0,0),u.font=`${x}pt ${N}`,u.textAlign="center",u.textBaseline="middle",u.lineWidth=L,u.strokeStyle=F,u.fillStyle=Y,a.slice(0,p+1).forEach(_=>{L>0&&u.strokeText(_.number,_.x,_.y),u.fillText(_.number,_.x,_.y)}),d.render&&(L>0&&u.strokeText(d.number,d.x,d.y),u.fillText(d.number,d.x,d.y));const k=o.getContext("2d");k.clearRect(0,0,o.width,o.height),k.drawImage(i,A.x,A.y,v.width*r,v.height*r)}function H(u){let g=u.target.getBoundingClientRect();return{x:(u.clientX-g.x-A.x)/r,y:(u.clientY-g.y-A.y)/r}}function Ae(){!o||(n(1,o.width=window.innerWidth,o),n(1,o.height=window.innerHeight,o),M())}function S(){let u=document.createElement("a");u.href=i.toDataURL("image/png"),u.download="numbered-map.png",u.click()}function re(){let u=0;return a.slice(0,p+1).forEach(g=>{g.number>u&&(u=g.number)}),u}function Z(u){if(!!v.src){if(u.button==0){let g=H(u);a=a.slice(0,p+1),a.push({number:d.number,x:g.x,y:g.y}),p+=1,!f&&h&&(d.number=re()+1)}else if(u.button==2){A.active=!0;let g=it(u);A.oldX=g.x,A.oldY=g.y}M()}}function O(u){let g=H(u);if(d.x=g.x,d.y=g.y,A.active){let k=it(u);A.x+=k.x-A.oldX,A.y+=k.y-A.oldY,A.oldX=k.x,A.oldY=k.y}M()}function j(){me(),d.render=!1,M()}function ke(){d.render=!0,M()}function me(){A.active=!1,A.oldX=-1,A.oldY=-1}function b(u){let g=u.wheelDeltaY/Math.abs(u.wheelDeltaY);if(f)d.number+=1*g,d.number=Math.max(0,d.number);else{let k=H(u);r*=1+.2*g,r=Math.max(r,.1);let _=H(u),fe=(_.x-k.x)*r,G=(_.y-k.y)*r;A.x+=fe,A.y+=G}M()}function ae(u){if(u.ctrlKey)switch(u.key){case"z":{p>=0&&(p-=1,d.number=re()+1);break}case"Z":p<a.length&&(p+=1);case"s":u.preventDefault(),S()}else switch(u.key){case"Shift":{f=!0;break}case"c":{document.getElementById("help").classList.toggle("hidden"),document.getElementById("help-key").classList.add("down");break}}M()}function Ee(u){switch(u.key){case"Shift":{f=!1,h&&(d.number=re()+1),M();break}case"c":{document.getElementById("help-key").classList.remove("down");break}}}bt(()=>{M()}),wt(()=>{let u=document.getElementById("help-key");u&&u.classList.remove("down")});function K(u){vt.call(this,e,u)}function ce(){h=this.checked,n(2,h)}function V(){Y=this.value,n(4,Y)}function xe(){x=de(this.value),n(5,x)}function P(){x=de(this.value),n(5,x)}function Me(){N=gt(this),n(3,N)}function T(){F=this.value,n(6,F)}function Te(){L=de(this.value),n(7,L)}function I(){L=de(this.value),n(7,L)}function X(){U=this.files,n(9,U)}function W(u){ze[u?"unshift":"push"](()=>{o=u,n(1,o)})}function J(u){ze[u?"unshift":"push"](()=>{i=u,n(0,i)})}function q(u){U=u,n(9,U)}return[i,o,h,N,Y,x,F,L,v,U,se,Ae,S,Z,O,j,ke,me,b,ae,Ee,K,ce,V,xe,P,Me,T,Te,I,X,W,J,q]}class Gt extends dt{constructor(t){super(),ht(this,t,Vt,Ut,rt,{},null,[-1,-1])}}new Gt({target:document.getElementById("app")});
