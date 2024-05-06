"use strict";(self.webpackChunkawg_app=self.webpackChunkawg_app||[]).push([[977],{6530:(dt,K,z)=>{z.d(K,{W:()=>P});class P{constructor(k,$,C,N,X){this.initial=k,this.min=$,this.max=C,this.stepSize=N,this.value=X}}},152:(dt,K,z)=>{z.d(K,{B:()=>$});var P=z(8839),D=z(9974),k=z(4360);function $(C,N=P.E){return(0,D.N)((X,d)=>{let w=null,_=null,y=null;const A=()=>{if(w){w.unsubscribe(),w=null;const V=_;_=null,d.next(V)}};function F(){const V=y+C,st=N.now();if(st<V)return w=this.schedule(void 0,V-st),void d.add(w);A()}X.subscribe((0,k._)(d,V=>{_=V,y=N.now(),w||(w=N.schedule(F,C),d.add(w))},()=>{A(),d.complete()},void 0,()=>{_=w=null}))})}},8542:(dt,K,z)=>{z.d(K,{A:()=>X});var P={value:()=>{}};function D(){for(var y,d=0,w=arguments.length,_={};d<w;++d){if(!(y=arguments[d]+"")||y in _||/[\s.]/.test(y))throw new Error("illegal type: "+y);_[y]=[]}return new k(_)}function k(d){this._=d}function C(d,w){for(var A,_=0,y=d.length;_<y;++_)if((A=d[_]).name===w)return A.value}function N(d,w,_){for(var y=0,A=d.length;y<A;++y)if(d[y].name===w){d[y]=P,d=d.slice(0,y).concat(d.slice(y+1));break}return null!=_&&d.push({name:w,value:_}),d}k.prototype=D.prototype={constructor:k,on:function(d,w){var A,_=this._,y=function $(d,w){return d.trim().split(/^|\s+/).map(function(_){var y="",A=_.indexOf(".");if(A>=0&&(y=_.slice(A+1),_=_.slice(0,A)),_&&!w.hasOwnProperty(_))throw new Error("unknown type: "+_);return{type:_,name:y}})}(d+"",_),F=-1,V=y.length;if(!(arguments.length<2)){if(null!=w&&"function"!=typeof w)throw new Error("invalid callback: "+w);for(;++F<V;)if(A=(d=y[F]).type)_[A]=N(_[A],d.name,w);else if(null==w)for(A in _)_[A]=N(_[A],d.name,null);return this}for(;++F<V;)if((A=(d=y[F]).type)&&(A=C(_[A],d.name)))return A},copy:function(){var d={},w=this._;for(var _ in w)d[_]=w[_].slice();return new k(d)},call:function(d,w){if((A=arguments.length-2)>0)for(var A,F,_=new Array(A),y=0;y<A;++y)_[y]=arguments[y+2];if(!this._.hasOwnProperty(d))throw new Error("unknown type: "+d);for(y=0,A=(F=this._[d]).length;y<A;++y)F[y].value.apply(w,_)},apply:function(d,w,_){if(!this._.hasOwnProperty(d))throw new Error("unknown type: "+d);for(var y=this._[d],A=0,F=y.length;A<F;++A)y[A].value.apply(w,_)}};const X=D},7041:(dt,K,z)=>{z.d(K,{A:()=>k,y:()=>$});var P=z(8690),D=z(5219);function k(C){var N=C.document.documentElement,X=(0,P.A)(C).on("dragstart.drag",D.Ay,D.Rw);"onselectstart"in N?X.on("selectstart.drag",D.Ay,D.Rw):(N.__noselect=N.style.MozUserSelect,N.style.MozUserSelect="none")}function $(C,N){var X=C.document.documentElement,d=(0,P.A)(C).on("dragstart.drag",null);N&&(d.on("click.drag",D.Ay,D.Rw),setTimeout(function(){d.on("click.drag",null)},0)),"onselectstart"in X?d.on("selectstart.drag",null):(X.style.MozUserSelect=X.__noselect,delete X.__noselect)}},5219:(dt,K,z)=>{z.d(K,{Ay:()=>$,GK:()=>k,Rw:()=>D,vr:()=>P});const P={passive:!1},D={capture:!0,passive:!1};function k(C){C.stopImmediatePropagation()}function $(C){C.preventDefault(),C.stopImmediatePropagation()}},7690:(dt,K,z)=>{function D(k,$){if(k=function P(k){let $;for(;$=k.sourceEvent;)k=$;return k}(k),void 0===$&&($=k.currentTarget),$){var C=$.ownerSVGElement||$;if(C.createSVGPoint){var N=C.createSVGPoint();return N.x=k.clientX,N.y=k.clientY,[(N=N.matrixTransform($.getScreenCTM().inverse())).x,N.y]}if($.getBoundingClientRect){var X=$.getBoundingClientRect();return[k.clientX-X.left-$.clientLeft,k.clientY-X.top-$.clientTop]}}return[k.pageX,k.pageY]}z.d(K,{A:()=>D})},9462:(dt,K,z)=>{z.d(K,{M4:()=>V,O1:()=>st,tB:()=>A});var C,N,P=0,D=0,k=0,$=1e3,X=0,d=0,w=0,_="object"==typeof performance&&performance.now?performance:Date,y="object"==typeof window&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(R){setTimeout(R,17)};function A(){return d||(y(F),d=_.now()+w)}function F(){d=0}function V(){this._call=this._time=this._next=null}function st(R,S,W){var Y=new V;return Y.restart(R,S,W),Y}function _t(){d=(X=_.now())+w,P=D=0;try{!function kt(){A(),++P;for(var S,R=C;R;)(S=d-R._time)>=0&&R._call.call(void 0,S),R=R._next;--P}()}finally{P=0,function zt(){for(var R,W,S=C,Y=1/0;S;)S._call?(Y>S._time&&(Y=S._time),R=S,S=S._next):(W=S._next,S._next=null,S=R?R._next=W:C=W);N=R,gt(Y)}(),d=0}}function wt(){var R=_.now(),S=R-X;S>$&&(w-=S,X=R)}function gt(R){P||(D&&(D=clearTimeout(D)),R-d>24?(R<1/0&&(D=setTimeout(_t,R-_.now()-w)),k&&(k=clearInterval(k))):(k||(X=_.now(),k=setInterval(wt,$)),P=1,y(_t)))}V.prototype=st.prototype={constructor:V,restart:function(R,S,W){if("function"!=typeof R)throw new TypeError("callback is not a function");W=(null==W?A():+W)+(null==S?0:+S),!this._next&&N!==this&&(N?N._next=this:C=this,N=this),this._call=R,this._time=W,gt()},stop:function(){this._call&&(this._call=null,this._time=1/0,gt())}}},5825:(dt,K,z)=>{z.d(K,{s_:()=>or});var P=z(8542),D=z(7041);function $(t){return((t=Math.exp(t))+1/t)/2}const X=function t(n,e,r){function o(a,i){var G,b,s=a[0],f=a[1],c=a[2],h=i[0],m=i[1],p=i[2],v=h-s,U=m-f,O=v*v+U*U;if(O<1e-12)b=Math.log(p/c)/n,G=function(ht){return[s+ht*v,f+ht*U,c*Math.exp(n*ht*b)]};else{var ct=Math.sqrt(O),ot=(p*p-c*c+r*O)/(2*c*e*ct),xt=(p*p-c*c-r*O)/(2*p*e*ct),lt=Math.log(Math.sqrt(ot*ot+1)-ot),Z=Math.log(Math.sqrt(xt*xt+1)-xt);b=(Z-lt)/n,G=function(ht){var Xt=ht*b,Ot=$(lt),Ht=c/(e*ct)*(Ot*function N(t){return((t=Math.exp(2*t))-1)/(t+1)}(n*Xt+lt)-function C(t){return((t=Math.exp(t))-1/t)/2}(lt));return[s+Ht*v,f+Ht*U,c*Ot/$(n*Xt+lt)]}}return G.duration=1e3*b*n/Math.SQRT2,G}return o.rho=function(a){var i=Math.max(.001,+a),s=i*i;return t(i,s,s*s)},o}(Math.SQRT2,2,4);var d=z(8690),w=z(7690),_=z(725),y=z(9462);function A(t,n,e){var r=new y.M4;return n=null==n?0:+n,r.restart(o=>{r.stop(),t(o+n)},n,e),r}var F=(0,P.A)("start","end","cancel","interrupt"),V=[],st=0,kt=1,_t=2,wt=3,zt=4,gt=5,R=6;function S(t,n,e,r,o,a){var i=t.__transition;if(i){if(e in i)return}else t.__transition={};!function yn(t,n,e){var o,r=t.__transition;function a(c){e.state=kt,e.timer.restart(i,e.delay,e.time),e.delay<=c&&i(c-e.delay)}function i(c){var h,m,p,v;if(e.state!==kt)return f();for(h in r)if((v=r[h]).name===e.name){if(v.state===wt)return A(i);v.state===zt?(v.state=R,v.timer.stop(),v.on.call("interrupt",t,t.__data__,v.index,v.group),delete r[h]):+h<n&&(v.state=R,v.timer.stop(),v.on.call("cancel",t,t.__data__,v.index,v.group),delete r[h])}if(A(function(){e.state===wt&&(e.state=zt,e.timer.restart(s,e.delay,e.time),s(c))}),e.state=_t,e.on.call("start",t,t.__data__,e.index,e.group),e.state===_t){for(e.state=wt,o=new Array(p=e.tween.length),h=0,m=-1;h<p;++h)(v=e.tween[h].value.call(t,t.__data__,e.index,e.group))&&(o[++m]=v);o.length=m+1}}function s(c){for(var h=c<e.duration?e.ease.call(null,c/e.duration):(e.timer.restart(f),e.state=gt,1),m=-1,p=o.length;++m<p;)o[m].call(t,h);e.state===gt&&(e.on.call("end",t,t.__data__,e.index,e.group),f())}function f(){for(var c in e.state=R,e.timer.stop(),delete r[n],r)return;delete t.__transition}r[n]=e,e.timer=(0,y.O1)(a,0,e.time)}(t,e,{name:n,index:r,group:o,on:F,tween:V,time:a.time,delay:a.delay,duration:a.duration,ease:a.ease,timer:null,state:st})}function W(t,n){var e=q(t,n);if(e.state>st)throw new Error("too late; already scheduled");return e}function Y(t,n){var e=q(t,n);if(e.state>wt)throw new Error("too late; already running");return e}function q(t,n){var e=t.__transition;if(!e||!(e=e[n]))throw new Error("transition not found");return e}function Nt(t,n){var r,o,i,e=t.__transition,a=!0;if(e){for(i in n=null==n?null:n+"",e)(r=e[i]).name===n?(o=r.state>_t&&r.state<gt,r.state=R,r.timer.stop(),r.on.call(o?"interrupt":"cancel",t,t.__data__,r.index,r.group),delete e[i]):a=!1;a&&delete t.__transition}}function ft(t,n){return t=+t,n=+n,function(e){return t*(1-e)+n*e}}var $t,qt=180/Math.PI,Yt={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Qt(t,n,e,r,o,a){var i,s,f;return(i=Math.sqrt(t*t+n*n))&&(t/=i,n/=i),(f=t*e+n*r)&&(e-=t*f,r-=n*f),(s=Math.sqrt(e*e+r*r))&&(e/=s,r/=s,f/=s),t*r<n*e&&(t=-t,n=-n,f=-f,i=-i),{translateX:o,translateY:a,rotate:Math.atan2(n,t)*qt,skewX:Math.atan(f)*qt,scaleX:i,scaleY:s}}function Zt(t,n,e,r){function o(c){return c.length?c.pop()+" ":""}return function(c,h){var m=[],p=[];return c=t(c),h=t(h),function a(c,h,m,p,v,U){if(c!==m||h!==p){var O=v.push("translate(",null,n,null,e);U.push({i:O-4,x:ft(c,m)},{i:O-2,x:ft(h,p)})}else(m||p)&&v.push("translate("+m+n+p+e)}(c.translateX,c.translateY,h.translateX,h.translateY,m,p),function i(c,h,m,p){c!==h?(c-h>180?h+=360:h-c>180&&(c+=360),p.push({i:m.push(o(m)+"rotate(",null,r)-2,x:ft(c,h)})):h&&m.push(o(m)+"rotate("+h+r)}(c.rotate,h.rotate,m,p),function s(c,h,m,p){c!==h?p.push({i:m.push(o(m)+"skewX(",null,r)-2,x:ft(c,h)}):h&&m.push(o(m)+"skewX("+h+r)}(c.skewX,h.skewX,m,p),function f(c,h,m,p,v,U){if(c!==m||h!==p){var O=v.push(o(v)+"scale(",null,",",null,")");U.push({i:O-4,x:ft(c,m)},{i:O-2,x:ft(h,p)})}else(1!==m||1!==p)&&v.push(o(v)+"scale("+m+","+p+")")}(c.scaleX,c.scaleY,h.scaleX,h.scaleY,m,p),c=h=null,function(v){for(var G,U=-1,O=p.length;++U<O;)m[(G=p[U]).i]=G.x(v);return m.join("")}}}var An=Zt(function bn(t){const n=new("function"==typeof DOMMatrix?DOMMatrix:WebKitCSSMatrix)(t+"");return n.isIdentity?Yt:Qt(n.a,n.b,n.c,n.d,n.e,n.f)},"px, ","px)","deg)"),Mn=Zt(function En(t){return null!=t&&($t||($t=document.createElementNS("http://www.w3.org/2000/svg","g")),$t.setAttribute("transform",t),t=$t.transform.baseVal.consolidate())?Qt((t=t.matrix).a,t.b,t.c,t.d,t.e,t.f):Yt},", ",")",")"),Jt=z(6531);function Tn(t,n){var e,r;return function(){var o=Y(this,t),a=o.tween;if(a!==e)for(var i=0,s=(r=e=a).length;i<s;++i)if(r[i].name===n){(r=r.slice()).splice(i,1);break}o.tween=r}}function kn(t,n,e){var r,o;if("function"!=typeof e)throw new Error;return function(){var a=Y(this,t),i=a.tween;if(i!==r){o=(r=i).slice();for(var s={name:n,value:e},f=0,c=o.length;f<c;++f)if(o[f].name===n){o[f]=s;break}f===c&&o.push(s)}a.tween=o}}function Bt(t,n,e){var r=t._id;return t.each(function(){var o=Y(this,r);(o.value||(o.value={}))[n]=e.apply(this,arguments)}),function(o){return q(o,r).value[n]}}function Ft(t,n,e){t.prototype=n.prototype=e,e.constructor=t}function jt(t,n){var e=Object.create(t.prototype);for(var r in n)e[r]=n[r];return e}function vt(){}var Rt=1/.7,yt="\\s*([+-]?\\d+)\\s*",Et="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",tt="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",Nn=/^#([0-9a-f]{3,8})$/,$n=new RegExp(`^rgb\\(${yt},${yt},${yt}\\)$`),Rn=new RegExp(`^rgb\\(${tt},${tt},${tt}\\)$`),Sn=new RegExp(`^rgba\\(${yt},${yt},${yt},${Et}\\)$`),Cn=new RegExp(`^rgba\\(${tt},${tt},${tt},${Et}\\)$`),In=new RegExp(`^hsl\\(${Et},${tt},${tt}\\)$`),Dn=new RegExp(`^hsla\\(${Et},${tt},${tt},${Et}\\)$`),tn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function nn(){return this.rgb().formatHex()}function en(){return this.rgb().formatRgb()}function At(t){var n,e;return t=(t+"").trim().toLowerCase(),(n=Nn.exec(t))?(e=n[1].length,n=parseInt(n[1],16),6===e?rn(n):3===e?new L(n>>8&15|n>>4&240,n>>4&15|240&n,(15&n)<<4|15&n,1):8===e?St(n>>24&255,n>>16&255,n>>8&255,(255&n)/255):4===e?St(n>>12&15|n>>8&240,n>>8&15|n>>4&240,n>>4&15|240&n,((15&n)<<4|15&n)/255):null):(n=$n.exec(t))?new L(n[1],n[2],n[3],1):(n=Rn.exec(t))?new L(255*n[1]/100,255*n[2]/100,255*n[3]/100,1):(n=Sn.exec(t))?St(n[1],n[2],n[3],n[4]):(n=Cn.exec(t))?St(255*n[1]/100,255*n[2]/100,255*n[3]/100,n[4]):(n=In.exec(t))?un(n[1],n[2]/100,n[3]/100,1):(n=Dn.exec(t))?un(n[1],n[2]/100,n[3]/100,n[4]):tn.hasOwnProperty(t)?rn(tn[t]):"transparent"===t?new L(NaN,NaN,NaN,0):null}function rn(t){return new L(t>>16&255,t>>8&255,255&t,1)}function St(t,n,e,r){return r<=0&&(t=n=e=NaN),new L(t,n,e,r)}function Ct(t,n,e,r){return 1===arguments.length?function On(t){return t instanceof vt||(t=At(t)),t?new L((t=t.rgb()).r,t.g,t.b,t.opacity):new L}(t):new L(t,n,e,r??1)}function L(t,n,e,r){this.r=+t,this.g=+n,this.b=+e,this.opacity=+r}function on(){return`#${mt(this.r)}${mt(this.g)}${mt(this.b)}`}function an(){const t=It(this.opacity);return`${1===t?"rgb(":"rgba("}${pt(this.r)}, ${pt(this.g)}, ${pt(this.b)}${1===t?")":`, ${t})`}`}function It(t){return isNaN(t)?1:Math.max(0,Math.min(1,t))}function pt(t){return Math.max(0,Math.min(255,Math.round(t)||0))}function mt(t){return((t=pt(t))<16?"0":"")+t.toString(16)}function un(t,n,e,r){return r<=0?t=n=e=NaN:e<=0||e>=1?t=n=NaN:n<=0&&(t=NaN),new Q(t,n,e,r)}function sn(t){if(t instanceof Q)return new Q(t.h,t.s,t.l,t.opacity);if(t instanceof vt||(t=At(t)),!t)return new Q;if(t instanceof Q)return t;var n=(t=t.rgb()).r/255,e=t.g/255,r=t.b/255,o=Math.min(n,e,r),a=Math.max(n,e,r),i=NaN,s=a-o,f=(a+o)/2;return s?(i=n===a?(e-r)/s+6*(e<r):e===a?(r-n)/s+2:(n-e)/s+4,s/=f<.5?a+o:2-a-o,i*=60):s=f>0&&f<1?0:i,new Q(i,s,f,t.opacity)}function Q(t,n,e,r){this.h=+t,this.s=+n,this.l=+e,this.opacity=+r}function fn(t){return(t=(t||0)%360)<0?t+360:t}function Dt(t){return Math.max(0,Math.min(1,t||0))}function Vt(t,n,e){return 255*(t<60?n+(e-n)*t/60:t<180?e:t<240?n+(e-n)*(240-t)/60:n)}function cn(t,n,e,r,o){var a=t*t,i=a*t;return((1-3*t+3*a-i)*n+(4-6*a+3*i)*e+(1+3*t+3*a-3*i)*r+i*o)/6}Ft(vt,At,{copy(t){return Object.assign(new this.constructor,this,t)},displayable(){return this.rgb().displayable()},hex:nn,formatHex:nn,formatHex8:function Pn(){return this.rgb().formatHex8()},formatHsl:function Xn(){return sn(this).formatHsl()},formatRgb:en,toString:en}),Ft(L,Ct,jt(vt,{brighter(t){return t=null==t?Rt:Math.pow(Rt,t),new L(this.r*t,this.g*t,this.b*t,this.opacity)},darker(t){return t=null==t?.7:Math.pow(.7,t),new L(this.r*t,this.g*t,this.b*t,this.opacity)},rgb(){return this},clamp(){return new L(pt(this.r),pt(this.g),pt(this.b),It(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:on,formatHex:on,formatHex8:function Hn(){return`#${mt(this.r)}${mt(this.g)}${mt(this.b)}${mt(255*(isNaN(this.opacity)?1:this.opacity))}`},formatRgb:an,toString:an})),Ft(Q,function Yn(t,n,e,r){return 1===arguments.length?sn(t):new Q(t,n,e,r??1)},jt(vt,{brighter(t){return t=null==t?Rt:Math.pow(Rt,t),new Q(this.h,this.s,this.l*t,this.opacity)},darker(t){return t=null==t?.7:Math.pow(.7,t),new Q(this.h,this.s,this.l*t,this.opacity)},rgb(){var t=this.h%360+360*(this.h<0),n=isNaN(t)||isNaN(this.s)?0:this.s,e=this.l,r=e+(e<.5?e:1-e)*n,o=2*e-r;return new L(Vt(t>=240?t-240:t+120,o,r),Vt(t,o,r),Vt(t<120?t+240:t-120,o,r),this.opacity)},clamp(){return new Q(fn(this.h),Dt(this.s),Dt(this.l),It(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const t=It(this.opacity);return`${1===t?"hsl(":"hsla("}${fn(this.h)}, ${100*Dt(this.s)}%, ${100*Dt(this.l)}%${1===t?")":`, ${t})`}`}}));const ln=t=>()=>t;function hn(t,n){return function(e){return t+e*n}}function Kn(t){return 1==(t=+t)?dn:function(n,e){return e-n?function Vn(t,n,e){return t=Math.pow(t,e),n=Math.pow(n,e)-t,e=1/e,function(r){return Math.pow(t+r*n,e)}}(n,e,t):ln(isNaN(n)?e:n)}}function dn(t,n){var e=n-t;return e?hn(t,e):ln(isNaN(t)?n:t)}const gn=function t(n){var e=Kn(n);function r(o,a){var i=e((o=Ct(o)).r,(a=Ct(a)).r),s=e(o.g,a.g),f=e(o.b,a.b),c=dn(o.opacity,a.opacity);return function(h){return o.r=i(h),o.g=s(h),o.b=f(h),o.opacity=c(h),o+""}}return r.gamma=t,r}(1);function pn(t){return function(n){var i,s,e=n.length,r=new Array(e),o=new Array(e),a=new Array(e);for(i=0;i<e;++i)s=Ct(n[i]),r[i]=s.r||0,o[i]=s.g||0,a[i]=s.b||0;return r=t(r),o=t(o),a=t(a),s.opacity=1,function(f){return s.r=r(f),s.g=o(f),s.b=a(f),s+""}}}pn(function Bn(t){var n=t.length-1;return function(e){var r=e<=0?e=0:e>=1?(e=1,n-1):Math.floor(e*n),o=t[r],a=t[r+1],i=r>0?t[r-1]:2*o-a,s=r<n-1?t[r+2]:2*a-o;return cn((e-r/n)*n,i,o,a,s)}}),pn(function Fn(t){var n=t.length;return function(e){var r=Math.floor(((e%=1)<0?++e:e)*n),o=t[(r+n-1)%n],a=t[r%n],i=t[(r+1)%n],s=t[(r+2)%n];return cn((e-r/n)*n,o,a,i,s)}});var Kt=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Ut=new RegExp(Kt.source,"g");function Ln(t,n){var r,o,a,e=Kt.lastIndex=Ut.lastIndex=0,i=-1,s=[],f=[];for(t+="",n+="";(r=Kt.exec(t))&&(o=Ut.exec(n));)(a=o.index)>e&&(a=n.slice(e,a),s[i]?s[i]+=a:s[++i]=a),(r=r[0])===(o=o[0])?s[i]?s[i]+=o:s[++i]=o:(s[++i]=null,f.push({i,x:ft(r,o)})),e=Ut.lastIndex;return e<n.length&&(a=n.slice(e),s[i]?s[i]+=a:s[++i]=a),s.length<2?f[0]?function Wn(t){return function(n){return t(n)+""}}(f[0].x):function Un(t){return function(){return t}}(n):(n=f.length,function(c){for(var m,h=0;h<n;++h)s[(m=f[h]).i]=m.x(c);return s.join("")})}function mn(t,n){var e;return("number"==typeof n?ft:n instanceof At?gn:(e=At(n))?(n=e,gn):Ln)(t,n)}function Gn(t){return function(){this.removeAttribute(t)}}function qn(t){return function(){this.removeAttributeNS(t.space,t.local)}}function Qn(t,n,e){var r,a,o=e+"";return function(){var i=this.getAttribute(t);return i===o?null:i===r?a:a=n(r=i,e)}}function Zn(t,n,e){var r,a,o=e+"";return function(){var i=this.getAttributeNS(t.space,t.local);return i===o?null:i===r?a:a=n(r=i,e)}}function Jn(t,n,e){var r,o,a;return function(){var i,f,s=e(this);return null==s?void this.removeAttribute(t):(i=this.getAttribute(t))===(f=s+"")?null:i===r&&f===o?a:(o=f,a=n(r=i,s))}}function jn(t,n,e){var r,o,a;return function(){var i,f,s=e(this);return null==s?void this.removeAttributeNS(t.space,t.local):(i=this.getAttributeNS(t.space,t.local))===(f=s+"")?null:i===r&&f===o?a:(o=f,a=n(r=i,s))}}function re(t,n){var e,r;function o(){var a=n.apply(this,arguments);return a!==r&&(e=(r=a)&&function ee(t,n){return function(e){this.setAttributeNS(t.space,t.local,n.call(this,e))}}(t,a)),e}return o._value=n,o}function ie(t,n){var e,r;function o(){var a=n.apply(this,arguments);return a!==r&&(e=(r=a)&&function ne(t,n){return function(e){this.setAttribute(t,n.call(this,e))}}(t,a)),e}return o._value=n,o}function ae(t,n){return function(){W(this,t).delay=+n.apply(this,arguments)}}function ue(t,n){return n=+n,function(){W(this,t).delay=n}}function fe(t,n){return function(){Y(this,t).duration=+n.apply(this,arguments)}}function ce(t,n){return n=+n,function(){Y(this,t).duration=n}}var me=z(574);var Ae=z(5911);var Te=z(6568);var ze=_.Ay.prototype.constructor;var Mt=z(2316);function xn(t){return function(){this.style.removeProperty(t)}}var We=0;function et(t,n,e,r){this._groups=t,this._parents=n,this._name=e,this._id=r}function _n(){return++We}var rt=_.Ay.prototype;et.prototype=function Le(t){return(0,_.Ay)().transition(t)}.prototype={constructor:et,select:function Me(t){var n=this._name,e=this._id;"function"!=typeof t&&(t=(0,Ae.A)(t));for(var r=this._groups,o=r.length,a=new Array(o),i=0;i<o;++i)for(var h,m,s=r[i],f=s.length,c=a[i]=new Array(f),p=0;p<f;++p)(h=s[p])&&(m=t.call(h,h.__data__,p,s))&&("__data__"in h&&(m.__data__=h.__data__),c[p]=m,S(c[p],n,e,p,c,q(h,e)));return new et(a,this._parents,n,e)},selectAll:function ke(t){var n=this._name,e=this._id;"function"!=typeof t&&(t=(0,Te.A)(t));for(var r=this._groups,o=r.length,a=[],i=[],s=0;s<o;++s)for(var h,f=r[s],c=f.length,m=0;m<c;++m)if(h=f[m]){for(var v,p=t.call(h,h.__data__,m,f),U=q(h,e),O=0,G=p.length;O<G;++O)(v=p[O])&&S(v,n,e,O,p,U);a.push(p),i.push(h)}return new et(a,i,n,e)},selectChild:rt.selectChild,selectChildren:rt.selectChildren,filter:function xe(t){"function"!=typeof t&&(t=(0,me.A)(t));for(var n=this._groups,e=n.length,r=new Array(e),o=0;o<e;++o)for(var f,a=n[o],i=a.length,s=r[o]=[],c=0;c<i;++c)(f=a[c])&&t.call(f,f.__data__,c,a)&&s.push(f);return new et(r,this._parents,this._name,this._id)},merge:function _e(t){if(t._id!==this._id)throw new Error;for(var n=this._groups,e=t._groups,r=n.length,o=e.length,a=Math.min(r,o),i=new Array(r),s=0;s<a;++s)for(var p,f=n[s],c=e[s],h=f.length,m=i[s]=new Array(h),v=0;v<h;++v)(p=f[v]||c[v])&&(m[v]=p);for(;s<r;++s)i[s]=n[s];return new et(i,this._parents,this._name,this._id)},selection:function Ne(){return new ze(this._groups,this._parents)},transition:function Ke(){for(var t=this._name,n=this._id,e=_n(),r=this._groups,o=r.length,a=0;a<o;++a)for(var f,i=r[a],s=i.length,c=0;c<s;++c)if(f=i[c]){var h=q(f,n);S(f,t,e,c,i,{time:h.time+h.delay+h.duration,delay:0,duration:h.duration,ease:h.ease})}return new et(r,this._parents,t,e)},call:rt.call,nodes:rt.nodes,node:rt.node,size:rt.size,empty:rt.empty,each:rt.each,on:function ve(t,n){var e=this._id;return arguments.length<2?q(this.node(),e).on.on(t):this.each(function ye(t,n,e){var r,o,a=function we(t){return(t+"").trim().split(/^|\s+/).every(function(n){var e=n.indexOf(".");return e>=0&&(n=n.slice(0,e)),!n||"start"===n})}(n)?W:Y;return function(){var i=a(this,t),s=i.on;s!==r&&(o=(r=s).copy()).on(n,e),i.on=o}}(e,t,n))},attr:function te(t,n){var e=(0,Jt.A)(t),r="transform"===e?Mn:mn;return this.attrTween(t,"function"==typeof n?(e.local?jn:Jn)(e,r,Bt(this,"attr."+t,n)):null==n?(e.local?qn:Gn)(e):(e.local?Zn:Qn)(e,r,n))},attrTween:function oe(t,n){var e="attr."+t;if(arguments.length<2)return(e=this.tween(e))&&e._value;if(null==n)return this.tween(e,null);if("function"!=typeof n)throw new Error;var r=(0,Jt.A)(t);return this.tween(e,(r.local?re:ie)(r,n))},style:function Ie(t,n,e){var r="transform"==(t+="")?An:mn;return null==n?this.styleTween(t,function $e(t,n){var e,r,o;return function(){var a=(0,Mt.j)(this,t),i=(this.style.removeProperty(t),(0,Mt.j)(this,t));return a===i?null:a===e&&i===r?o:o=n(e=a,r=i)}}(t,r)).on("end.style."+t,xn(t)):"function"==typeof n?this.styleTween(t,function Se(t,n,e){var r,o,a;return function(){var i=(0,Mt.j)(this,t),s=e(this),f=s+"";return null==s&&(this.style.removeProperty(t),f=s=(0,Mt.j)(this,t)),i===f?null:i===r&&f===o?a:(o=f,a=n(r=i,s))}}(t,r,Bt(this,"style."+t,n))).each(function Ce(t,n){var e,r,o,s,a="style."+n,i="end."+a;return function(){var f=Y(this,t),c=f.on,h=null==f.value[a]?s||(s=xn(n)):void 0;(c!==e||o!==h)&&(r=(e=c).copy()).on(i,o=h),f.on=r}}(this._id,t)):this.styleTween(t,function Re(t,n,e){var r,a,o=e+"";return function(){var i=(0,Mt.j)(this,t);return i===o?null:i===r?a:a=n(r=i,e)}}(t,r,n),e).on("end.style."+t,null)},styleTween:function Xe(t,n,e){var r="style."+(t+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(null==n)return this.tween(r,null);if("function"!=typeof n)throw new Error;return this.tween(r,function Pe(t,n,e){var r,o;function a(){var i=n.apply(this,arguments);return i!==o&&(r=(o=i)&&function De(t,n,e){return function(r){this.style.setProperty(t,n.call(this,r),e)}}(t,i,e)),r}return a._value=n,a}(t,n,e??""))},text:function Ye(t){return this.tween("text","function"==typeof t?function He(t){return function(){var n=t(this);this.textContent=n??""}}(Bt(this,"text",t)):function Oe(t){return function(){this.textContent=t}}(null==t?"":t+""))},textTween:function Ve(t){var n="text";if(arguments.length<1)return(n=this.tween(n))&&n._value;if(null==t)return this.tween(n,null);if("function"!=typeof t)throw new Error;return this.tween(n,function Fe(t){var n,e;function r(){var o=t.apply(this,arguments);return o!==e&&(n=(e=o)&&function Be(t){return function(n){this.textContent=t.call(this,n)}}(o)),n}return r._value=t,r}(t))},remove:function Ee(){return this.on("end.remove",function be(t){return function(){var n=this.parentNode;for(var e in this.__transition)if(+e!==t)return;n&&n.removeChild(this)}}(this._id))},tween:function zn(t,n){var e=this._id;if(t+="",arguments.length<2){for(var i,r=q(this.node(),e).tween,o=0,a=r.length;o<a;++o)if((i=r[o]).name===t)return i.value;return null}return this.each((null==n?Tn:kn)(e,t,n))},delay:function se(t){var n=this._id;return arguments.length?this.each(("function"==typeof t?ae:ue)(n,t)):q(this.node(),n).delay},duration:function le(t){var n=this._id;return arguments.length?this.each(("function"==typeof t?fe:ce)(n,t)):q(this.node(),n).duration},ease:function de(t){var n=this._id;return arguments.length?this.each(function he(t,n){if("function"!=typeof n)throw new Error;return function(){Y(this,t).ease=n}}(n,t)):q(this.node(),n).ease},easeVarying:function pe(t){if("function"!=typeof t)throw new Error;return this.each(function ge(t,n){return function(){var e=n.apply(this,arguments);if("function"!=typeof e)throw new Error;Y(this,t).ease=e}}(this._id,t))},end:function Ue(){var t,n,e=this,r=e._id,o=e.size();return new Promise(function(a,i){var s={value:i},f={value:function(){0==--o&&a()}};e.each(function(){var c=Y(this,r),h=c.on;h!==t&&((n=(t=h).copy())._.cancel.push(s),n._.interrupt.push(s),n._.end.push(f)),c.on=n}),0===o&&a()})},[Symbol.iterator]:rt[Symbol.iterator]};var qe={time:null,delay:0,duration:250,ease:function Ge(t){return((t*=2)<=1?t*t*t:(t-=2)*t*t+2)/2}};function Qe(t,n){for(var e;!(e=t.__transition)||!(e=e[n]);)if(!(t=t.parentNode))throw new Error(`transition ${n} not found`);return e}_.Ay.prototype.interrupt=function vn(t){return this.each(function(){Nt(this,t)})},_.Ay.prototype.transition=function Ze(t){var n,e;t instanceof et?(n=t._id,t=t._name):(n=_n(),(e=qe).time=(0,y.tB)(),t=null==t?null:t+"");for(var r=this._groups,o=r.length,a=0;a<o;++a)for(var f,i=r[a],s=i.length,c=0;c<s;++c)(f=i[c])&&S(f,t,n,c,i,e||Qe(f,n));return new et(r,this._parents,t,n)};const Pt=t=>()=>t;function Je(t,{sourceEvent:n,target:e,transform:r,dispatch:o}){Object.defineProperties(this,{type:{value:t,enumerable:!0,configurable:!0},sourceEvent:{value:n,enumerable:!0,configurable:!0},target:{value:e,enumerable:!0,configurable:!0},transform:{value:r,enumerable:!0,configurable:!0},_:{value:o}})}function it(t,n,e){this.k=t,this.x=n,this.y=e}it.prototype={constructor:it,scale:function(t){return 1===t?this:new it(this.k*t,this.x,this.y)},translate:function(t,n){return 0===t&0===n?this:new it(this.k,this.x+this.k*t,this.y+this.k*n)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var Wt=new it(1,0,0);function Lt(t){t.stopImmediatePropagation()}function Tt(t){t.preventDefault(),t.stopImmediatePropagation()}function tr(t){return!(t.ctrlKey&&"wheel"!==t.type||t.button)}function nr(){var t=this;return t instanceof SVGElement?(t=t.ownerSVGElement||t).hasAttribute("viewBox")?[[(t=t.viewBox.baseVal).x,t.y],[t.x+t.width,t.y+t.height]]:[[0,0],[t.width.baseVal.value,t.height.baseVal.value]]:[[0,0],[t.clientWidth,t.clientHeight]]}function wn(){return this.__zoom||Wt}function er(t){return-t.deltaY*(1===t.deltaMode?.05:t.deltaMode?1:.002)*(t.ctrlKey?10:1)}function rr(){return navigator.maxTouchPoints||"ontouchstart"in this}function ir(t,n,e){var r=t.invertX(n[0][0])-e[0][0],o=t.invertX(n[1][0])-e[1][0],a=t.invertY(n[0][1])-e[0][1],i=t.invertY(n[1][1])-e[1][1];return t.translate(o>r?(r+o)/2:Math.min(0,r)||Math.max(0,o),i>a?(a+i)/2:Math.min(0,a)||Math.max(0,i))}function or(){var h,m,p,t=tr,n=nr,e=ir,r=er,o=rr,a=[0,1/0],i=[[-1/0,-1/0],[1/0,1/0]],s=250,f=X,c=(0,P.A)("start","zoom","end"),v=500,U=150,O=0,G=10;function b(u){u.property("__zoom",wn).on("wheel.zoom",Xt,{passive:!1}).on("mousedown.zoom",Ot).on("dblclick.zoom",Ht).filter(o).on("touchstart.zoom",ar).on("touchmove.zoom",ur).on("touchend.zoom touchcancel.zoom",sr).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function ct(u,g){return(g=Math.max(a[0],Math.min(a[1],g)))===u.k?u:new it(g,u.x,u.y)}function ot(u,g,l){var x=g[0]-l[0]*u.k,E=g[1]-l[1]*u.k;return x===u.x&&E===u.y?u:new it(u.k,x,E)}function xt(u){return[(+u[0][0]+ +u[1][0])/2,(+u[0][1]+ +u[1][1])/2]}function lt(u,g,l,x){u.on("start.zoom",function(){Z(this,arguments).event(x).start()}).on("interrupt.zoom end.zoom",function(){Z(this,arguments).event(x).end()}).tween("zoom",function(){var E=this,M=arguments,T=Z(E,M).event(x),I=n.apply(E,M),H=null==l?xt(I):"function"==typeof l?l.apply(E,M):l,nt=Math.max(I[1][0]-I[0][0],I[1][1]-I[0][1]),B=E.__zoom,J="function"==typeof g?g.apply(E,M):g,at=f(B.invert(H).concat(nt/B.k),J.invert(H).concat(nt/J.k));return function(j){if(1===j)j=J;else{var ut=at(j),Gt=nt/ut[2];j=new it(Gt,H[0]-ut[0]*Gt,H[1]-ut[1]*Gt)}T.zoom(null,j)}})}function Z(u,g,l){return!l&&u.__zooming||new ht(u,g)}function ht(u,g){this.that=u,this.args=g,this.active=0,this.sourceEvent=null,this.extent=n.apply(u,g),this.taps=0}function Xt(u,...g){if(t.apply(this,arguments)){var l=Z(this,g).event(u),x=this.__zoom,E=Math.max(a[0],Math.min(a[1],x.k*Math.pow(2,r.apply(this,arguments)))),M=(0,w.A)(u);if(l.wheel)(l.mouse[0][0]!==M[0]||l.mouse[0][1]!==M[1])&&(l.mouse[1]=x.invert(l.mouse[0]=M)),clearTimeout(l.wheel);else{if(x.k===E)return;l.mouse=[M,x.invert(M)],Nt(this),l.start()}Tt(u),l.wheel=setTimeout(function T(){l.wheel=null,l.end()},U),l.zoom("mouse",e(ot(ct(x,E),l.mouse[0],l.mouse[1]),l.extent,i))}}function Ot(u,...g){if(!p&&t.apply(this,arguments)){var l=u.currentTarget,x=Z(this,g,!0).event(u),E=(0,d.A)(u.view).on("mousemove.zoom",function H(B){if(Tt(B),!x.moved){var J=B.clientX-T,at=B.clientY-I;x.moved=J*J+at*at>O}x.event(B).zoom("mouse",e(ot(x.that.__zoom,x.mouse[0]=(0,w.A)(B,l),x.mouse[1]),x.extent,i))},!0).on("mouseup.zoom",function nt(B){E.on("mousemove.zoom mouseup.zoom",null),(0,D.y)(B.view,x.moved),Tt(B),x.event(B).end()},!0),M=(0,w.A)(u,l),T=u.clientX,I=u.clientY;(0,D.A)(u.view),Lt(u),x.mouse=[M,this.__zoom.invert(M)],Nt(this),x.start()}}function Ht(u,...g){if(t.apply(this,arguments)){var l=this.__zoom,x=(0,w.A)(u.changedTouches?u.changedTouches[0]:u,this),E=l.invert(x),M=l.k*(u.shiftKey?.5:2),T=e(ot(ct(l,M),x,E),n.apply(this,g),i);Tt(u),s>0?(0,d.A)(this).transition().duration(s).call(lt,T,x,u):(0,d.A)(this).call(b.transform,T,x,u)}}function ar(u,...g){if(t.apply(this,arguments)){var M,T,I,H,l=u.touches,x=l.length,E=Z(this,g,u.changedTouches.length===x).event(u);for(Lt(u),T=0;T<x;++T)I=l[T],H=[H=(0,w.A)(I,this),this.__zoom.invert(H),I.identifier],E.touch0?!E.touch1&&E.touch0[2]!==H[2]&&(E.touch1=H,E.taps=0):(E.touch0=H,M=!0,E.taps=1+!!h);h&&(h=clearTimeout(h)),M&&(E.taps<2&&(m=H[0],h=setTimeout(function(){h=null},v)),Nt(this),E.start())}}function ur(u,...g){if(this.__zooming){var M,T,I,H,l=Z(this,g).event(u),x=u.changedTouches,E=x.length;for(Tt(u),M=0;M<E;++M)T=x[M],I=(0,w.A)(T,this),l.touch0&&l.touch0[2]===T.identifier?l.touch0[0]=I:l.touch1&&l.touch1[2]===T.identifier&&(l.touch1[0]=I);if(T=l.that.__zoom,l.touch1){var nt=l.touch0[0],B=l.touch0[1],J=l.touch1[0],at=l.touch1[1],j=(j=J[0]-nt[0])*j+(j=J[1]-nt[1])*j,ut=(ut=at[0]-B[0])*ut+(ut=at[1]-B[1])*ut;T=ct(T,Math.sqrt(j/ut)),I=[(nt[0]+J[0])/2,(nt[1]+J[1])/2],H=[(B[0]+at[0])/2,(B[1]+at[1])/2]}else{if(!l.touch0)return;I=l.touch0[0],H=l.touch0[1]}l.zoom("touch",e(ot(T,I,H),l.extent,i))}}function sr(u,...g){if(this.__zooming){var M,T,l=Z(this,g).event(u),x=u.changedTouches,E=x.length;for(Lt(u),p&&clearTimeout(p),p=setTimeout(function(){p=null},v),M=0;M<E;++M)T=x[M],l.touch0&&l.touch0[2]===T.identifier?delete l.touch0:l.touch1&&l.touch1[2]===T.identifier&&delete l.touch1;if(l.touch1&&!l.touch0&&(l.touch0=l.touch1,delete l.touch1),l.touch0)l.touch0[1]=this.__zoom.invert(l.touch0[0]);else if(l.end(),2===l.taps&&(T=(0,w.A)(T,this),Math.hypot(m[0]-T[0],m[1]-T[1])<G)){var I=(0,d.A)(this).on("dblclick.zoom");I&&I.apply(this,arguments)}}}return b.transform=function(u,g,l,x){var E=u.selection?u.selection():u;E.property("__zoom",wn),u!==E?lt(u,g,l,x):E.interrupt().each(function(){Z(this,arguments).event(x).start().zoom(null,"function"==typeof g?g.apply(this,arguments):g).end()})},b.scaleBy=function(u,g,l,x){b.scaleTo(u,function(){return this.__zoom.k*("function"==typeof g?g.apply(this,arguments):g)},l,x)},b.scaleTo=function(u,g,l,x){b.transform(u,function(){var E=n.apply(this,arguments),M=this.__zoom,T=null==l?xt(E):"function"==typeof l?l.apply(this,arguments):l,I=M.invert(T),H="function"==typeof g?g.apply(this,arguments):g;return e(ot(ct(M,H),T,I),E,i)},l,x)},b.translateBy=function(u,g,l,x){b.transform(u,function(){return e(this.__zoom.translate("function"==typeof g?g.apply(this,arguments):g,"function"==typeof l?l.apply(this,arguments):l),n.apply(this,arguments),i)},null,x)},b.translateTo=function(u,g,l,x,E){b.transform(u,function(){var M=n.apply(this,arguments),T=this.__zoom,I=null==x?xt(M):"function"==typeof x?x.apply(this,arguments):x;return e(Wt.translate(I[0],I[1]).scale(T.k).translate("function"==typeof g?-g.apply(this,arguments):-g,"function"==typeof l?-l.apply(this,arguments):-l),M,i)},x,E)},ht.prototype={event:function(u){return u&&(this.sourceEvent=u),this},start:function(){return 1==++this.active&&(this.that.__zooming=this,this.emit("start")),this},zoom:function(u,g){return this.mouse&&"mouse"!==u&&(this.mouse[1]=g.invert(this.mouse[0])),this.touch0&&"touch"!==u&&(this.touch0[1]=g.invert(this.touch0[0])),this.touch1&&"touch"!==u&&(this.touch1[1]=g.invert(this.touch1[0])),this.that.__zoom=g,this.emit("zoom"),this},end:function(){return 0==--this.active&&(delete this.that.__zooming,this.emit("end")),this},emit:function(u){var g=(0,d.A)(this.that).datum();c.call(u,this.that,new Je(u,{sourceEvent:this.sourceEvent,target:b,type:u,transform:this.that.__zoom,dispatch:c}),g)}},b.wheelDelta=function(u){return arguments.length?(r="function"==typeof u?u:Pt(+u),b):r},b.filter=function(u){return arguments.length?(t="function"==typeof u?u:Pt(!!u),b):t},b.touchable=function(u){return arguments.length?(o="function"==typeof u?u:Pt(!!u),b):o},b.extent=function(u){return arguments.length?(n="function"==typeof u?u:Pt([[+u[0][0],+u[0][1]],[+u[1][0],+u[1][1]]]),b):n},b.scaleExtent=function(u){return arguments.length?(a[0]=+u[0],a[1]=+u[1],b):[a[0],a[1]]},b.translateExtent=function(u){return arguments.length?(i[0][0]=+u[0][0],i[1][0]=+u[1][0],i[0][1]=+u[0][1],i[1][1]=+u[1][1],b):[[i[0][0],i[0][1]],[i[1][0],i[1][1]]]},b.constrain=function(u){return arguments.length?(e=u,b):e},b.duration=function(u){return arguments.length?(s=+u,b):s},b.interpolate=function(u){return arguments.length?(f=u,b):f},b.on=function(){var u=c.on.apply(c,arguments);return u===c?b:u},b.clickDistance=function(u){return arguments.length?(O=(u=+u)*u,b):Math.sqrt(O)},b.tapDistance=function(u){return arguments.length?(G=+u,b):G},b}(function je(t){for(;!t.__zoom;)if(!(t=t.parentNode))return Wt;return t.__zoom}).prototype=it.prototype}}]);