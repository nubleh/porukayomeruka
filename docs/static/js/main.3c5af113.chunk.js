(this.webpackJsonpporukayomeruka=this.webpackJsonpporukayomeruka||[]).push([[0],{21:function(n,t,e){},25:function(n,t,e){"use strict";e.r(t);var r,i,a,c,o,s,u,d,l,b,h,j,f,p,x,g,O,v,m,w,k,y,M,E,H,C,P,S,D,T,z,I,F=e(1),R=e.n(F),Y=e(13),A=e.n(Y),L=(e(21),e(2)),W=e(6),X=e(5),q=e(4),B=e(3),J=function(n){var t=n.split("\n"),e=t[1].split(","),r=[];return t.forEach((function(n){var t=n.split(","),i=t[0],a=parseInt(t[3],10)||0;if(i&&a){for(var c={name:i,url:t[1],img:t[2],total:a,points:{}},o=3;o<e.length;o++){var s=e[o],u=parseInt(t[o]||"",10);s&&"0"!==s&&u&&(c.points[s]=u)}r.push(c)}})),r},K=function(n){var t=n.split("\n"),e=(t[1].split(","),[]);return t.forEach((function(n){var t=n.split(","),r=t[0];if(r&&t[1]){var i=_(t[3]),a=_(t[4]),c=_(t[6]),o=_(t[8]),s={name:r,url:t[1],img:t[2],startHunter:i,startDog:a,startCat:c,end:o};e.push(s)}})),e},_=function(n){if(!n)return 0;for(var t=[1,60,3600],e=n.split(":").reverse(),r=0,i=0;i<e.length;i++)r+=(parseInt(e[i],10)||0)*t[i];return r},G=e(0),N="img/",Q=B.b.div(r||(r=Object(L.a)(["\n  margin: 20px;\n\n  > div {\n    margin: 4px;\n  }\n"]))),U=(B.b.div(i||(i=Object(L.a)(["\n  width: 100%;\n  font-size: 0.8em;\n  text-align: center;\n  margin-bottom: 50px;\n\n  > div {\n    padding: 2px;\n    box-sizing: border-box;\n    background: #000;\n    color: #fff;\n    vertical-align: bottom;\n    display: inline-block;\n  }\n"]))),B.b.div(a||(a=Object(L.a)(["\n  padding: 40px;\n  box-sizing: border-box;\n  width: 100vw;\n"])))),V=B.b.div(c||(c=Object(L.a)(["\n  text-align: center;\n  > div {\n    margin: 0 8px;\n  }\n  > div > div {\n    width: 12px;\n    height: 12px;\n    margin: 0 4px;\n    border-radius: 4px;\n  }\n  div, span {\n    vertical-align: middle;\n    display: inline-block;\n  }\n"]))),Z=B.b.div(o||(o=Object(L.a)(["\n"]))),$=B.b.div(s||(s=Object(L.a)(["\n  display: flex;\n  align-items: center;\n  margin: 14px 0;\n"]))),nn=B.b.div(u||(u=Object(L.a)(["\n  width: 50px;\n  height: 50px;\n  background-position: top center;\n  background-size: 150% auto;\n  display: inline-block;\n  flex: none;\n  border-radius: 50px;\n  box-sizing: border-box;\n  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.3);\n"]))),tn=B.b.div(d||(d=Object(L.a)(["\n  vertical-align: middle;\n  display: inline-block;\n  height: 20px;\n"]))),en=B.b.div(l||(l=Object(L.a)(["\n  flex: 1 1 auto;\n  box-sizing: border-box;\n  border: solid 10px transparent;\n  border-width: 0 10px;\n\n  ",":first-child {\n    border-radius: 4px 0 0 4px;\n  }\n  ",":last-child {\n    border-radius: 0 4px 4px 0;\n  }\n"])),tn,tn),rn=B.b.div(b||(b=Object(L.a)(["\n  white-space: nowrap;\n  vertical-align: middle;\n  display: inline-block;\n  padding: 2px 4px;\n  background: silver;\n  border-radius: 4px;\n  margin: 2px 4px;\n  font-size: 0.8em;\n"]))),an=B.b.div(h||(h=Object(L.a)(["\n  vertical-align: middle;\n  display: inline-block;\n"]))),cn=function(n){var t=Math.floor(n/3600),e=Math.floor(n%3600/60),r=Math.floor(n%60);return e?t?"".concat(t,"h ").concat(e,"m ").concat(r,"s"):"".concat(e,"m ").concat(r,"s"):"".concat(r,"s")},on=function(){var n,t=Object(F.useState)([]),e=Object(q.a)(t,2),r=e[0],i=e[1];Object(F.useEffect)((function(){(function(n){return new Promise((function(t){fetch(n).then((function(n){return n.text()})).then((function(n){t(K(n))}))}))})("tsukureruka.csv").then((function(n){i(n)}))}),[]);for(var a=Object(F.useState)("dur"),c=Object(q.a)(a,2),o=c[0],s=c[1],u=r.map((function(n){var t=n.startDog-n.startHunter,e=n.startCat-n.startDog,r=n.end-n.startCat,i=n.end-n.startHunter;return Object(X.a)(Object(X.a)({},n),{},{durHunter:t,durDog:e,durCat:r,dur:i})})).sort((function(n,t){return n.url===t.url?0:"offstream"===n.url?1:"offstream"===t.url?-1:n[o]===t[o]?0:n[o]<t[o]?1:-1})),d=u.filter((function(n){return"offstream"!==n.url})),l=u.filter((function(n){return"offstream"===n.url})),b=1|(null===(n=u[0])||void 0===n?void 0:n.dur),h=["#340042","#1f8179","#fce51e"],j=Object(F.useState)(5),f=Object(q.a)(j,2),p=f[0],x=(f[1],b/p),g=[],O=0;O<p;O++)g.push([]);d.forEach((function(n){var t=Math.floor(n.dur/x);g[t]||(g[t]=[]),g[t].push(n)}));Math.max.apply(Math,Object(W.a)(g.map((function(n){return n.length}))));return Object(G.jsxs)(U,{children:[Object(G.jsx)("div",{children:["dur","durHunter","durDog","durCat"].map((function(n){return Object(G.jsx)("div",{onClick:function(){s(n)},children:n})}))}),Object(G.jsx)("h1",{children:"How long do the HoloHunters take to create their characters?"}),Object(G.jsxs)(V,{children:[Object(G.jsxs)("div",{children:[Object(G.jsx)("div",{style:{backgroundColor:h[0]}}),Object(G.jsx)("span",{children:"Hunter"})]}),Object(G.jsxs)("div",{children:[Object(G.jsx)("div",{style:{backgroundColor:h[1]}}),Object(G.jsx)("span",{children:"Palamute"})]}),Object(G.jsxs)("div",{children:[Object(G.jsx)("div",{style:{backgroundColor:h[2]}}),Object(G.jsx)("span",{children:"Palico"})]})]}),Object(G.jsx)(Z,{children:d.map((function(n){var t="".concat(n.durHunter/b*100,"%"),e="".concat(n.durDog/b*100,"%"),r="".concat(n.durCat/b*100,"%"),i=[n.durHunter,n.durDog,n.durCat,n.dur].map((function(n){return cn(n)}));return Object(G.jsxs)($,{children:[Object(G.jsx)(nn,{style:{backgroundImage:"url(".concat(N).concat(n.img,")")}}),Object(G.jsxs)(en,{children:[Object(G.jsx)("div",{children:[t,e,r].map((function(n,t){return Object(G.jsx)(tn,{style:{backgroundColor:h[t],width:n}})}))}),Object(G.jsxs)("div",{children:[Object(G.jsx)(rn,{children:i[0]}),Object(G.jsx)(an,{children:"+"}),Object(G.jsx)(rn,{children:i[1]}),Object(G.jsx)(an,{children:"+"}),Object(G.jsx)(rn,{children:i[2]}),Object(G.jsx)(an,{children:"="}),Object(G.jsx)(rn,{children:i[3]})]})]})]})}))}),Object(G.jsxs)(Q,{children:[Object(G.jsx)("div",{children:"These hunters created their characters off-stream"}),l.map((function(n){return Object(G.jsx)(nn,{style:{backgroundImage:"url(".concat(N).concat(n.img,")")}})}))]})]})},sn=B.b.div(j||(j=Object(L.a)(["\n  font-family: sans-serif;\n  background: #fff;\n  max-width: 600px;\n  margin: 0 auto;\n"]))),un=B.b.div(f||(f=Object(L.a)(["\n  position: sticky;\n  top: 0;\n  z-index: 10;\n"]))),dn=B.b.div(p||(p=Object(L.a)(["\n  text-align: center;\n  padding: 16px;\n  img {\n    border-radius: 16px;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);\n    max-height: 25vw;\n  }\n"]))),ln=B.b.div(x||(x=Object(L.a)(["\n  margin: 8px 0;\n  position: relative;\n"]))),bn=B.b.div(g||(g=Object(L.a)(["\n  text-align: right;\n  transition: transform 0.5s;\n  padding: 0 8px;\n  font-weight: bold;\n  cursor: pointer;\n  &:hover {\n    opacity: 0.7;\n  }\n  ","\n"])),(function(n){var t=n.barHeight;return Object(B.a)(O||(O=Object(L.a)(["\n    height: ","px;\n    line-height: ","px;\n  "])),t,t)})),hn=B.b.div(v||(v=Object(L.a)(["\n  position: absolute;\n  top: 0;\n  background: #ddd;\n  width: 100%;\n  transition: transform 1s;\n  transform-origin: top left;\n"]))),jn=B.b.div(m||(m=Object(L.a)(["\n  background-size: 150% auto;\n  background-position: center top;\n  background-color: #fff;\n"]))),fn=B.b.div(w||(w=Object(L.a)(["\n  flex: none;\n  padding: 0 8px;\n"]))),pn=B.b.div(k||(k=Object(L.a)(["\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  transition: transform 0.5s;\n  cursor: pointer;\n  &:hover {\n    opacity: 0.9;\n  }\n  ","\n"])),(function(n){var t=n.barHeight;return Object(B.a)(y||(y=Object(L.a)(["\n    height: ","px;\n    line-height: ","px;\n    &:hover {\n      background-image: linear-gradient(\n        to bottom,\n        silver 0,\n        silver 1px,\n        transparent 1px,\n        transparent ","px,\n        silver ","px\n      );\n    }\n\n    "," {\n      left: ","px;\n      height: ","px;\n    }\n\n    "," {\n      width: ","px;\n      height: ","px;\n    }\n  "])),t,t,t-1,t-1,hn,t,t,jn,t,t)})),xn=B.b.div(M||(M=Object(L.a)(["\n  position: relative;\n  display: flex;\n  z-index: 5;\n"]))),gn=B.b.div(E||(E=Object(L.a)(["\n  flex: 1 1 auto;\n  padding: 0 8px;\n"]))),On=B.b.div(H||(H=Object(L.a)(["\n    height: 50vw;\n"]))),vn=["rgba(255, 0, 0, 0.5)","rgba(0, 0, 255, 0.5)","rgba(0, 255, 0, 0.5)"],mn=B.b.div(C||(C=Object(L.a)(["\n  position: absolute;\n  text-align: center;\n  width: 100%;\n  height: 0;\n\n  canvas {\n    pointer-events: none;\n    position: relative;\n  }\n  ","\n"])),(function(n){var t=n.height;return Object(B.a)(P||(P=Object(L.a)(["\n    canvas {\n      width: ","px;\n      height: ","px;\n    }\n  "])),t,t)})),wn=(B.b.img(S||(S=Object(L.a)(["\n  position: absolute;\n  max-width: 50vw;\n  max-height: 25vh;\n  top: 0;\n  background: #fff;\n  opacity: 0.5;\n  pointer-events: none;\n"]))),B.b.div(D||(D=Object(L.a)(["\n  display: inline-block;\n  vertical-align: middle;\n  width: 12px;\n  height: 12px;\n  margin: 0 4px;\n  border: solid 1px #fff;\n"])))),kn=B.b.div(T||(T=Object(L.a)(["\n  width: 1px;\n  height: 1px;\n  position: absolute;\n  left: 50%;\n  ","\n"])),(function(n){var t=n.top;return Object(B.a)(z||(z=Object(L.a)(["\n    top: ","px;\n  "])),t)})),yn=B.b.div(I||(I=Object(L.a)(["\n  position: absolute;\n  padding: 4px;\n  background: rgba(255, 255, 255, 0.8);\n  border-radius: 4px;\n  white-space: nowrap;\n  transform: translateX(-50%) translateY(-50%);\n  cursor: pointer;\n  font-size: 0.8em;\n\n  &:hover {\n    opacity: 0.9;\n  }\n\n  span {\n    vertical-align: middle;\n  }\n"]))),Mn=function(n){var t=n.map((function(n){return n.name.split(/\s+/).reverse()[0]}));return t},En=function(n){var t=n.height,e=n.data,r=n.cols,i=n.maxPoint,a=n.optionalSort,c=n.setOptionalSort,o=Object(F.useRef)({}),s=Object(F.useRef)(0),u=Object(F.useRef)(null),d=(e||[]).map((function(n){return n.name})).sort().join(","),l=(e||[]).map((function(n,t){return Object(X.a)(Object(X.a)({},n),{},{color:vn[t%vn.length]})})),b=function n(){var t=!0;Object.keys(o.current).forEach((function(n){o.current[n]=Math.min(o.current[n]+1,100),o.current[n]<100&&(t=!1)})),function(n){var t=n.cv,e=n.axes,r=n.data,i=n.step,a=n.animFrameCount,c=n.maxPoint,o=null===t||void 0===t?void 0:t.getContext("2d");if(t&&o){t.width=t.width+0;var s=.3*t.width,u=t.width/2,d=t.height/2;o.lineWidth=4;var l=[];e.forEach((function(n,t){var r=t/e.length*(2*Math.PI),i=u+Math.sin(r)*s,a=d-Math.cos(r)*s;l.push([i,a])}));var b=new Path2D;b.moveTo(l[0][0],l[0][1]),l.forEach((function(n,t){var e=l[t+1]||l[0];o.beginPath(),o.moveTo(n[0],n[1]),o.lineTo(e[0],e[1]),o.stroke(),b.lineTo(e[0],e[1])})),b.closePath(),o.fillStyle="rgba(255, 255, 255, 0.9)",o.fill(b,"evenodd"),l.forEach((function(n){var t=Object(q.a)(n,2),e=t[0],r=t[1];o.beginPath(),o.moveTo(u,d),o.lineTo(e,r),o.stroke()})),r.forEach((function(n,t){var r=n.name,l=n.color,b=i[r],h=a/e.length,j=[];e.forEach((function(t,r){var i=n.data[t];if(i){var a=h*r,o=i/c*s*(Math.min(h,Math.max(0,b-a))/h),l=r/e.length*(2*Math.PI),f=u+Math.sin(l)*o,p=d-Math.cos(l)*o;j.push([f,p])}else j.push([u,d])}));var f=new Path2D;f.moveTo(j[0][0],j[0][1]),j.forEach((function(n,t){var e=j[t+1]||j[0];f.lineTo(e[0],e[1])})),f.closePath(),o.fillStyle=l,o.fill(f,"evenodd")}))}}({cv:u.current,axes:r||[],data:l,step:o.current,animFrameCount:100,maxPoint:i}),t||(cancelAnimationFrame(s.current),s.current=requestAnimationFrame(n))};Object(F.useEffect)((function(){var n=Object.keys(o.current),t=(e||[]).map((function(n){return n.name}));n.forEach((function(n){-1===t.indexOf(n)&&delete o.current[n]})),t.forEach((function(n){"undefined"===typeof o.current[n]&&(o.current[n]=0)})),cancelAnimationFrame(s.current),s.current=requestAnimationFrame(b)}),[d,e]);var h=t/2.5,j=Mn(l);return Object(G.jsxs)(mn,{height:t,children:[Object(G.jsx)("canvas",{ref:u,width:2*t,height:2*t}),(r||[]).map((function(n,e,r){var i=e/r.length*(2*Math.PI),o=Math.sin(i)*h,s=-Math.cos(i)*h;return Object(G.jsx)(kn,{top:t/2,style:{transform:"translateX(".concat(o,"px) translateY(").concat(s,"px)")},onClick:function(){c&&c(n)},children:Object(G.jsxs)(yn,{style:{background:n===a?"rgba(0, 0, 0, 0.7)":"",color:n===a?"#fff":""},children:[Object(G.jsx)("div",{children:n}),Object(G.jsx)("div",{children:l.map((function(t,e){var r=j[e];return Object(G.jsxs)("div",{children:[Object(G.jsxs)("span",{children:[r," (",t.data[n],")"]}),Object(G.jsx)(wn,{style:{background:t.color}})]},t.name)}))})]})},n)}))]})},Hn={"\u77e5\u8b58":["\u5e38\u8b58\u529b","\u5c02\u9580\u77e5\u8b58"],"\u5f79\u5272\u7406\u89e3":["\u7a7a\u9593\u8a8d\u8b58","\u96c6\u56e3\u529b"],"\u5171\u611f":["\u4eba\u60c5\u529b","\u5927\u4eba\u529b"],"\u6d1e\u5bdf":["\u60c5\u5831\u7d71\u5408\u529b","\u77ac\u767a\u529b"],"\u30bf\u30a4\u30df\u30f3\u30b0":["\u30ea\u30ba\u30e0\u611f","\u9593\u5408\u3044"]},Cn={"\u77e5\u8b58":"Know-how","\u5f79\u5272\u7406\u89e3":"Role comprehension","\u5171\u611f":"Empathy","\u6d1e\u5bdf":"Insight","\u30bf\u30a4\u30df\u30f3\u30b0":"Timing"},Pn="img/",Sn=function(){var n=Object(F.useState)([]),t=Object(q.a)(n,2),e=t[0],r=t[1],i=Object(F.useState)([]),a=Object(q.a)(i,2),c=a[0],o=a[1],s=Object(F.useState)(window.innerHeight/20),u=Object(q.a)(s,2),d=u[0],l=u[1],b=Object(F.useState)(Math.min(window.innerHeight/2,window.innerWidth)),h=Object(q.a)(b,2),j=h[0],f=h[1],p=Object(F.useState)(!1),x=Object(q.a)(p,2),g=x[0],O=x[1],v=Object(F.useState)(Date.now()),m=Object(q.a)(v,2),w=m[0],k=m[1],y=Object(F.useRef)(window.innerHeight),M=Object(F.useState)(""),E=Object(q.a)(M,2),H=E[0],C=E[1];Object(F.useEffect)((function(){var n=function(){var n=Math.abs(y.current-window.innerHeight);y.current=window.innerHeight,n<100||(l(window.innerHeight/20),f(Math.min(window.innerHeight/2,window.innerWidth)),k(Date.now()))};return window.addEventListener("resize",n),function(){window.removeEventListener("resize",n)}}),[]),Object(F.useEffect)((function(){(function(n){return new Promise((function(t){fetch(n).then((function(n){return n.text()})).then((function(n){t(J(n))}))}))})("yomeruka.csv").then((function(n){r(n)}))}),[]),Object(F.useEffect)((function(){setTimeout((function(){O(!0)}),500)}),[]),Object(F.useEffect)((function(){0===c.length&&C("")}),[c]);var P=Object(W.a)(e).sort((function(n,t){var e=H?n.points[H]:n.total,r=H?t.points[H]:t.total;return e>r?-1:e<r?1:0})).map((function(n){return n.name})),S=c.length>0?j:0;return Object(G.jsxs)(sn,{children:[Object(G.jsx)(dn,{children:Object(G.jsx)("img",{src:"game.png",alt:"Kuuki Yomi 3"})}),c.length>0&&Object(G.jsx)(un,{children:Object(G.jsx)(En,{height:j,cols:Object.keys(Hn),optionalSort:H,setOptionalSort:function(n){C(n===H?"":n)},maxPoint:Math.max.apply(Math,Object(W.a)(e.map((function(n){return Math.max.apply(Math,Object(W.a)(Object.keys(Hn).map((function(t){return n.points[t]}))))})))),data:c.map((function(n){var t=e.find((function(t){return t.name===n}));return t?{name:n,data:Object(X.a)({},t.points),img:"".concat(Pn).concat(t.img)}:{name:"",data:{},img:""}})).filter((function(n){return!!n}))},w)}),Object(G.jsxs)(ln,{style:{height:"".concat(S+d*(e.length+1),"px")},children:[Object(G.jsx)(bn,{barHeight:d,style:{transform:"translateY(".concat(S,"px)"),transitionDelay:"".concat(c.length>0?.01*e.length:0,"s")},onClick:function(){var n=Object.keys(Hn),t=n.indexOf(H),e=n[t+1];C(e||"")},children:H?"".concat(H," (").concat(Cn[H],")"):"Total"}),e.map((function(n){var t=H?n.points[H]:n.total,r=H?t/200:n.total/1e3,i=P.indexOf(n.name),a=-1!==c.indexOf(n.name),s=c.length>0?.01*(e.length-i):.01*i;return Object(G.jsxs)(pn,{barHeight:d,style:{transform:"translateY(".concat(S+(i+1)*d,"px)"),transitionDelay:"".concat(s,"s")},onClick:function(){var t;t=n.name,o((function(n){return[].concat(Object(W.a)(n.filter((function(n){return n!==t}))),Object(W.a)(-1===n.indexOf(t)?[t]:[])).slice(0,2)}))},children:[Object(G.jsx)(hn,{style:{transform:"scaleX(".concat(g?r:0,")"),background:a?"#bbb":""}}),Object(G.jsxs)(xn,{children:[Object(G.jsx)(jn,{style:n.img?{backgroundImage:"url(".concat(Pn).concat(n.img,")")}:{}}),Object(G.jsxs)(gn,{children:[i+1,". ",n.name," (",Object(G.jsx)("a",{href:n.url,target:"_blank",rel:"noopener noreferrer",children:"stream"}),")"]}),Object(G.jsx)(fn,{children:t})]})]},n.name)}))]}),Object(G.jsx)(On,{})]})},Dn=function(){var n=window.location.hash;return Object(G.jsxs)("div",{children:[""===n&&Object(G.jsx)(Sn,{}),"#tsukureruka"===n&&Object(G.jsx)(on,{})]})},Tn=function(n){n&&n instanceof Function&&e.e(3).then(e.bind(null,26)).then((function(t){var e=t.getCLS,r=t.getFID,i=t.getFCP,a=t.getLCP,c=t.getTTFB;e(n),r(n),i(n),a(n),c(n)}))};A.a.render(Object(G.jsx)(R.a.StrictMode,{children:Object(G.jsx)(Dn,{})}),document.getElementById("root")),Tn()}},[[25,1,2]]]);
//# sourceMappingURL=main.3c5af113.chunk.js.map