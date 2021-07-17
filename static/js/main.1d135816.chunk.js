(this["webpackJsonpfirebase-app"]=this["webpackJsonpfirebase-app"]||[]).push([[0],{25:function(e,t,a){},35:function(e,t,a){},45:function(e,t,a){},46:function(e,t,a){},50:function(e,t,a){},51:function(e,t,a){},52:function(e,t,a){},53:function(e,t,a){},54:function(e,t,a){},55:function(e,t,a){},56:function(e,t,a){"use strict";a.r(t);var n,c,r=a(2),s=a(29),l=a.n(s),i=a(7),o=a(8),u="/",b="/login",d="/signup",j="/upload",m=(a(25),Object(r.createContext)(null)),p=Object(r.createContext)(null),O=(a.p,a(35),a(1)),f=function(){Object(r.useContext)(p).firebase;var e=Object(r.useContext)(m);return Object(O.jsx)("header",{className:"header",children:Object(O.jsxs)("div",{className:"header__container",children:[Object(O.jsxs)("div",{className:"header__container-search",children:[Object(O.jsx)(i.b,{to:u,"aria-label":"Home",className:"header__link",children:Object(O.jsx)("p",{className:"header__logo",children:"MusicDB"})}),Object(O.jsx)("form",{className:"header__form-search",onSubmit:function(){return console.log("search")},children:Object(O.jsx)("input",{className:"header__input-search",type:"text",name:"query",placeholder:"search"})})]}),Object(O.jsx)("div",{className:"header__container-buttons",children:e?Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)(i.b,{to:"/profile/".concat(e.displayName)}),Object(O.jsx)(i.b,{to:j}),Object(O.jsx)("button",{className:"header__btn",children:"Account"})]}):Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)(i.b,{to:b,children:Object(O.jsx)("button",{type:"button",className:"container-buttons__button-login",children:"Log In"})}),Object(O.jsx)(i.b,{to:d,children:Object(O.jsx)("button",{type:"button",className:"container-buttons__button-signup",children:"Sign Up"})})]})})]})})},h=a(5),x=a.n(h),v=a(17),g=a(9),y=a(6),N=(a(45),function(){var e=Object(r.useState)([]),t=Object(y.a)(e,2),a=t[0],n=t[1],c=Object(r.useContext)(p).firebase.firestore();Object(r.useEffect)((function(){(function(){var e=Object(g.a)(x.a.mark((function e(){var t;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.collection("albums").get();case 2:t=e.sent,n(t.docs.map((function(e){return Object(v.a)(Object(v.a)({},e.data()),{},{albumId:e.id})})));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),console.log(a);var s=a.map((function(e){return Object(O.jsx)(i.b,{to:"/albums/".concat(e.albumId),className:"container-albums__link",children:Object(O.jsx)("div",{className:"container-albums__album",children:Object(O.jsxs)("div",{children:[Object(O.jsx)("img",{className:"album__cover",src:e.albumCover,alt:e.albumTitle}),Object(O.jsx)("p",{className:"album__album-title",children:e.albumTitle}),Object(O.jsx)("p",{className:"album__album-artist",children:e.artist})]})})},e.albumId)}));return Object(O.jsx)("div",{className:"container-uploaded-albums-main",children:Object(O.jsxs)("div",{className:"container-uploaded-albums",children:[Object(O.jsx)("h2",{className:"heading-recently-added-albums",children:"Recently added albums"}),Object(O.jsx)("div",{className:"container-albums",children:s})]})})});function _(){return(_=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function w(e,t){if(null==e)return{};var a,n,c=function(e,t){if(null==e)return{};var a,n,c={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(c[a]=e[a]);return c}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(c[a]=e[a])}return c}function C(e,t){var a=e.title,s=e.titleId,l=w(e,["title","titleId"]);return r.createElement("svg",_({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 22 22",ref:t,"aria-labelledby":s},l),a?r.createElement("title",{id:s},a):null,n||(n=r.createElement("defs",null,r.createElement("clipPath",null,r.createElement("path",{fill:"#00f",fillOpacity:.514,d:"m-7 1024.36h34v34h-34z"})),r.createElement("clipPath",null,r.createElement("path",{fill:"#aade87",fillOpacity:.472,d:"m-6 1028.36h32v32h-32z"})))),c||(c=r.createElement("path",{d:"m345.44 248.29l-194.29 194.28c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744l171.91-171.91-171.91-171.9c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.29 194.28c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373",transform:"matrix(.03541-.00013.00013.03541 2.98 3.02)",fill:"#4d4d4d"})))}var S=r.forwardRef(C),k=(a.p,a(46),function(){var e=Object(r.useState)([]),t=Object(y.a)(e,2),a=t[0],n=t[1],c=Object(r.useContext)(p).firebase.firestore();Object(r.useEffect)((function(){(function(){var e=Object(g.a)(x.a.mark((function e(){var t;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.collection("albums").get();case 2:t=e.sent,n(t.docs.map((function(e){return Object(v.a)(Object(v.a)({},e.data()),{},{albumId:e.id})})));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);var s=a.slice(12).map((function(e,t){return Object(O.jsx)(i.b,{to:"/albums/".concat(e.albumId),className:"container-albums__link",children:Object(O.jsxs)("div",{className:"album-featured",children:[Object(O.jsx)("img",{className:"album__cover album__cover--featured ".concat(1===t&&"album__cover--central-album"),src:e.albumCover,alt:e.albumTitle}),Object(O.jsxs)("p",{className:"album-featured__artist ".concat(1===t&&"album-featured__artist--central"),children:[Object(O.jsx)("span",{className:"album-featured__title",children:e.albumTitle})," ",Object(O.jsxs)("span",{className:"album-featured__artist",children:["- ",e.artist]})]})]})},e.albumId)}));return Object(O.jsxs)("div",{className:"container-featured-albums",children:[Object(O.jsx)(S,{className:"arrow flip-horizontally"}),Object(O.jsx)("div",{className:"featured-albums",children:s}),Object(O.jsx)(S,{className:"arrow"})]})}),E=function(){return Object(O.jsxs)("div",{children:[Object(O.jsx)(f,{}),Object(O.jsx)(k,{}),Object(O.jsx)(N,{})]})},I=a(26);a(47),a(57),a(58);I.a.initializeApp({apiKey:"AIzaSyDuEwmT2cV58YFWHEuXbTijl-skMkP-eWY",authDomain:"fir-app-da0cd.firebaseapp.com",projectId:"fir-app-da0cd",storageBucket:"fir-app-da0cd.appspot.com",messagingSenderId:"587114597583",appId:"1:587114597583:web:85879109373d8dfc92fbba"});a(50);var U=function(){Object(r.useEffect)((function(){document.title="Login"}),[]);var e=Object(o.f)(),t=Object(r.useState)(""),a=Object(y.a)(t,2),n=a[0],c=a[1],s=Object(r.useState)(""),l=Object(y.a)(s,2),b=l[0],j=l[1],m=Object(r.useState)(""),p=Object(y.a)(m,2),h=p[0],v=p[1],N=""===b||b.length<6||""===n,_=function(){var t=Object(g.a)(x.a.mark((function t(a){return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.preventDefault(),t.prev=1,t.next=4,I.a.auth().signInWithEmailAndPassword(n,b);case 4:e.push(u),t.next=12;break;case 7:t.prev=7,t.t0=t.catch(1),c(""),j(""),v(t.t0.message);case 12:case"end":return t.stop()}}),t,null,[[1,7]])})));return function(e){return t.apply(this,arguments)}}();return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)(f,{}),Object(O.jsxs)("div",{className:"container",children:[Object(O.jsxs)("div",{className:"container-login",children:[h&&Object(O.jsxs)("p",{className:"paragraph-error",children:[h,Object(O.jsx)("br",{}),Object(O.jsx)("br",{}),"Please try again."]}),Object(O.jsxs)("form",{method:"POST",className:"container-form",onSubmit:_,children:[Object(O.jsx)("input",{"aria-label":"Enter your email address",className:"input-login",type:"text",placeholder:"Email address",value:n,onChange:function(e){return c(e.target.value)}}),Object(O.jsx)("input",{"aria-label":"Enter your password",className:"input-login",type:"password",placeholder:"Password",value:b,onChange:function(e){return j(e.target.value)}}),Object(O.jsx)("button",{type:"submit",className:"button-login font-bold ".concat(N&&"button-disabled"),disabled:N,children:"Log In"})]})]}),Object(O.jsx)("div",{className:"container-login container-signup",children:Object(O.jsxs)("p",{children:["Don't have an account?"," ",Object(O.jsx)(i.b,{to:d,className:"font-bold link link-signup",children:"Sign up"})]})})]})]})},T=(a(51),function(){Object(r.useEffect)((function(){document.title="Sign up"}),[]);var e=Object(o.f)(),t=Object(r.useContext)(p).firebase,a=t.firestore(),n=Object(r.useState)(""),c=Object(y.a)(n,2),s=c[0],l=c[1],d=Object(r.useState)(""),j=Object(y.a)(d,2),m=j[0],f=j[1],h=Object(r.useState)(""),v=Object(y.a)(h,2),N=v[0],_=v[1],w=Object(r.useState)(""),C=Object(y.a)(w,2),S=C[0],k=C[1],E=""===s||""===m||""===N||N.length<6,I=function(){var n=Object(g.a)(x.a.mark((function n(c){var r;return x.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return c.preventDefault(),n.prev=1,n.next=4,t.auth().createUserWithEmailAndPassword(m,N);case 4:return r=n.sent,console.log(r.user),n.next=8,r.user.updateProfile({displayName:s});case 8:return n.next=10,a.collection("users").doc(r.user.uid).set({userId:r.user.uid,username:s.toLowerCase(),email:m.toLowerCase(),dateCreated:Date.now()});case 10:e.push(u),n.next=19;break;case 13:n.prev=13,n.t0=n.catch(1),l(""),f(""),_(""),k(n.t0.message);case 19:case"end":return n.stop()}}),n,null,[[1,13]])})));return function(e){return n.apply(this,arguments)}}();return Object(O.jsxs)("div",{className:"container",children:[Object(O.jsxs)("div",{className:"container-signup",children:[S&&Object(O.jsxs)("p",{className:"paragraph-error",children:[S,Object(O.jsx)("br",{}),Object(O.jsx)("br",{}),"Please try again."]}),Object(O.jsxs)("form",{method:"POST",className:"container-form",onSubmit:I,children:[Object(O.jsx)("input",{"aria-label":"Enter your username",className:"container-signup__input",type:"text",placeholder:"Username",value:s,onChange:function(e){null!=e.target.value.match("^[a-z0-9]*$")&&l(e.target.value.toLowerCase())}}),Object(O.jsx)("input",{"aria-label":"Enter your email address",className:"container-signup__input",type:"text",placeholder:"Email address",value:m,onChange:function(e){return f(e.target.value.toLowerCase())}}),Object(O.jsx)("input",{"aria-label":"Enter your password",className:"container-signup__input",type:"password",placeholder:"Password, at least 6 characters",value:N,onChange:function(e){return _(e.target.value)}}),Object(O.jsx)("button",{type:"submit",className:"button-login font-bold ".concat(E&&"button-disabled"),disabled:E,children:"Sign up"})]})]}),Object(O.jsx)("div",{className:"container-login container-signup",children:Object(O.jsxs)("p",{children:["Have an account?"," ",Object(O.jsx)(i.b,{to:b,className:"font-bold link link-signup",children:"Log in"})]})})]})}),P=function(){var e=Object(r.useState)(null),t=Object(y.a)(e,2),a=t[0],n=t[1],c=function(){var e=Object(g.a)(x.a.mark((function e(t){var a,c,r,s,l;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.target.files[0],c=I.a.storage(),r=c.ref(),s=r.child(a.name),e.next=6,s.put(a);case 6:return e.next=8,s.getDownloadURL();case 8:l=e.sent,n(l);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();console.log(a);return Object(O.jsxs)("div",{className:"App",children:[Object(O.jsx)("p",{children:"this is basic file upload to Firebase example"}),Object(O.jsxs)("form",{onSubmit:function(e){e.preventDefault();var t=I.a.firestore(),n=e.target.username.value;n&&console.log(n),n&&t.collection("users").doc(n).set({name:n,avatar:a})},children:[Object(O.jsx)("input",{type:"file",onChange:c}),Object(O.jsx)("input",{type:"text",name:"username",placeholder:"type in your username"}),Object(O.jsx)("button",{type:"submit",children:"Submit"})]})]})},A=a(21),D=(a(52),function(){var e=Object(r.useContext)(p).firebase,t=Object(r.useState)(null),a=Object(y.a)(t,2),n=a[0],c=a[1],s=Object(r.useState)([]),l=Object(y.a)(s,2),i=(l[0],l[1]),o=Object(r.useState)(!1),u=Object(y.a)(o,2),b=u[0],d=u[1],j=Object(r.useState)({albumTitle:"",artist:"",year:"",addToUserCollection:!1}),h=Object(y.a)(j,2),N=h[0],_=h[1],w=N.albumTitle,C=N.artist,S=N.year,k=N.addToUserCollection,E=e.firestore(),I=Object(r.useContext)(m),U=""===w||""===C||""===S||null===n,T=function(){var t=Object(g.a)(x.a.mark((function t(a){var n,r,s,l,i;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=a.target.files[0],r=e.storage(),s=r.ref(),l=s.child(n.name),t.next=6,l.put(n);case 6:return t.next=8,l.getDownloadURL();case 8:i=t.sent,c(i);case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();console.log(n);var P=function(){var t=Object(g.a)(x.a.mark((function t(a){var r,s;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a.preventDefault(),r=E.collection("albums").doc(),s=function(){var t=Object(g.a)(x.a.mark((function t(){var a;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.set({albumId:r.id,albumTitle:w,artist:C,year:S,albumCover:n,uploadedBy:I.uid,dateCreated:Date.now(),albumUsers:[]});case 2:return console.log(r.id),t.next=5,E.collection("albums").doc(r.id);case 5:a=t.sent,k&&a.update({albumUsers:e.firestore.FieldValue.arrayUnion(I.uid)});case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),w&&s(),_({albumTitle:"",artist:"",year:"",addToUserCollection:!1}),c(null),w&&d(!0),n&&console.log("file uploaded");case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();Object(r.useEffect)((function(){(function(){var e=Object(g.a)(x.a.mark((function e(){var t;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.collection("albums").get();case 2:t=e.sent,i(t.docs.map((function(e){return e.data()})));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()(),d(!1)}),[b]),console.log(b);var D=function(e){var t=e.target,a=t.name,n=t.value,c=t.type,r=t.checked;_("checkbox"===c?Object(v.a)(Object(v.a)({},N),{},Object(A.a)({},a,r)):Object(v.a)(Object(v.a)({},N),{},Object(A.a)({},a,n)))};return Object(O.jsxs)("div",{children:[Object(O.jsx)(f,{}),Object(O.jsx)("div",{className:"container-upload-main",children:Object(O.jsxs)("div",{className:"container-upload",children:[Object(O.jsx)("h2",{className:"heading-upload-album",children:"Upload album to the database"}),Object(O.jsxs)("form",{onSubmit:P,className:"form-upload",children:[Object(O.jsxs)("label",{children:["Album title",Object(O.jsx)("input",{type:"text",name:"albumTitle",placeholder:"Album title",value:w,onChange:D})]}),Object(O.jsxs)("label",{children:["Artist",Object(O.jsx)("input",{type:"text",name:"artist",placeholder:"Artist",value:C,onChange:D})]}),Object(O.jsxs)("label",{children:["Released",Object(O.jsx)("input",{type:"number",name:"year",className:"form-upload__input-year",placeholder:"Year",value:S,onChange:D})]}),Object(O.jsxs)("label",{className:"form-upload__label-upload-album-image",children:["Upload album image",Object(O.jsx)("input",{type:"file",onChange:T,className:"form-upload__input-file-upload"})]}),n&&Object(O.jsx)("img",{className:"form-upload__image-uploaded-album",src:n,alt:"uploaded album"}),Object(O.jsxs)("label",{className:"form-upload__label-add-to-my-collection",children:[Object(O.jsx)("input",{type:"checkbox",name:"addToUserCollection",checked:N.addToUserCollection,onChange:D,className:"form-upload__input-checkbox"}),"add this album to my collection"]}),Object(O.jsx)("button",{type:"submit",className:"form-upload__btn-upload ".concat(U&&"btn-disabled"),disabled:U,children:"Upload album to database"})]})]})})]})}),L=(a(53),function(){var e=Object(r.useContext)(m),t=Object(o.g)();console.log(t);var a=Object(o.g)().albumId;console.log(a);var n=Object(r.useContext)(p).firebase,c=n.firestore(),s=Object(r.useState)([]),l=Object(y.a)(s,2),i=l[0],u=l[1],b=i.albumCover,d=i.artist,j=i.year,h=i.albumTitle,v=i.albumUsers,N=Object(r.useState)(!1),_=Object(y.a)(N,2),w=_[0],C=_[1];Object(r.useEffect)((function(){(function(){var t=Object(g.a)(x.a.mark((function t(){var n;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.collection("albums").doc(a).get();case 2:n=t.sent,u(n.data()),e&&C(n.data().albumUsers.includes(e.uid));case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}})()()}),[]),console.log(v),console.log("album is in collection: ".concat(w));var S=function(){var t=Object(g.a)(x.a.mark((function t(){return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.collection("albums").doc(a);case 2:t.sent.update({albumUsers:n.firestore.FieldValue.arrayRemove(e.uid)}),C(!1);case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),k=function(){var t=Object(g.a)(x.a.mark((function t(){return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.collection("albums").doc(a);case 2:t.sent.update({albumUsers:n.firestore.FieldValue.arrayUnion(e.uid)}),C(!0);case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),E=e?w?Object(O.jsx)("button",{type:"button",onClick:S,children:"Remove from collection"}):Object(O.jsx)("button",{type:"button",onClick:k,children:"Add to collection"}):Object(O.jsx)("p",{children:"Login to add this album to your collection"});return Object(O.jsxs)("div",{children:[Object(O.jsx)(f,{}),Object(O.jsxs)("div",{className:"container-album",children:[Object(O.jsx)("img",{src:b,alt:h,className:"container-album__album-cover"}),Object(O.jsxs)("div",{children:[Object(O.jsxs)("p",{children:["Album: ",h]}),Object(O.jsxs)("p",{children:["Artist: ",d]}),Object(O.jsxs)("p",{children:["Year: ",j]}),E]})]})]})}),F=function(){var e=Object(r.useContext)(m);return Object(O.jsxs)("div",{children:[Object(O.jsx)(f,{}),Object(O.jsx)("div",{children:"this is profile page"}),Object(O.jsx)(i.b,{to:"/collection/".concat(e.displayName),children:Object(O.jsx)("button",{type:"button",className:"",children:"My collection"})})]})},R=(a(54),function(){var e=Object(r.useContext)(p).firebase,t=Object(r.useContext)(m),a=e.firestore(),n=Object(r.useState)([]),c=Object(y.a)(n,2),s=c[0],l=c[1];Object(r.useEffect)((function(){(function(){var e=Object(g.a)(x.a.mark((function e(){var n,c;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.collection("albums"),e.next=3,n.where("albumUsers","array-contains",t.uid).get();case 3:c=e.sent,l(c.docs.map((function(e){return e.data()})));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),console.log(s);var o=s.map((function(e){return Object(O.jsx)(i.b,{to:"/albums/".concat(e.albumId),className:"container-albums__link",children:Object(O.jsx)("div",{className:"container-albums__album",children:Object(O.jsxs)("div",{children:[Object(O.jsx)("img",{className:"album__cover",src:e.albumCover,alt:e.albumTitle}),Object(O.jsx)("p",{className:"album__album-title",children:e.albumTitle}),Object(O.jsx)("p",{className:"album__album-artist",children:e.artist})]})})},e.albumId)}));return Object(O.jsxs)("div",{children:[Object(O.jsx)(f,{}),Object(O.jsxs)("div",{children:["this is collection of ",t.displayName]}),Object(O.jsx)("div",{className:"container-uploaded-albums-main",children:Object(O.jsxs)("div",{className:"container-uploaded-albums",children:[Object(O.jsx)("h2",{className:"heading-recently-added-albums",children:"Collection"}),Object(O.jsx)("div",{className:"container-albums",children:o})]})})]})}),z=function(){return Object(O.jsx)("div",{children:"This is Not Found page."})},B=function(){var e=Object(r.useState)(JSON.parse(localStorage.getItem("authUser"))),t=Object(y.a)(e,2),a=t[0],n=t[1],c=Object(r.useContext)(p).firebase;return Object(r.useEffect)((function(){var e=c.auth().onAuthStateChanged((function(e){e?(localStorage.setItem("authUser",JSON.stringify(e)),n(e)):(localStorage.removeItem("authUser"),n(null))}));return function(){return e}}),[c]),a},J=function(){var e=B();return Object(O.jsx)(m.Provider,{value:e,children:Object(O.jsx)(i.a,{children:Object(O.jsxs)(o.c,{children:[Object(O.jsx)(o.a,{path:u,component:E,exact:!0}),Object(O.jsx)(o.a,{path:b,component:U}),Object(O.jsx)(o.a,{path:d,component:T}),Object(O.jsx)(o.a,{path:"/basic-file-upload",component:P}),Object(O.jsx)(o.a,{path:j,component:D}),Object(O.jsx)(o.a,{path:"/albums/:albumId",component:L}),Object(O.jsx)(o.a,{path:"/profile/:username",component:F}),Object(O.jsx)(o.a,{path:"/collection/:username",component:R}),Object(O.jsx)(o.a,{component:z})]})})})};a(55);l.a.render(Object(O.jsx)(p.Provider,{value:{firebase:I.a},children:Object(O.jsx)(J,{})}),document.getElementById("root"))}},[[56,1,2]]]);
//# sourceMappingURL=main.1d135816.chunk.js.map