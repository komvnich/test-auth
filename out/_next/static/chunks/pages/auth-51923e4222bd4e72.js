(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[473],{8020:function(e,s,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/auth",function(){return a(8451)}])},6946:function(e,s,a){"use strict";a.d(s,{ni:function(){return c},y1:function(){return l},zB:function(){return r}});var n=a(4076),t=a(1259);function l(e,s){return(0,t.Xb)(n.I8,e,s)}function r(e,s){return(0,t.e5)(n.I8,e,s)}function c(){return(0,t.w7)(n.I8)}},8451:function(e,s,a){"use strict";a.r(s),a.d(s,{default:function(){return Z}});var n=a(5893),t=a(5813),l=a(6981),r=a(3009),c=a(3856),i=a(6738),o=a(1577),d=a(6946);let u=()=>{let[e,s]=r.Z.useNotification(),a=(s,a,n)=>{e[s]({message:"".concat(a),description:"".concat(n)})},t=async e=>{await (0,d.zB)(e.email,e.password).then(e=>a("success","Успіх!","Ви успішно авторизувалися")).catch(e=>{"auth/user-not-found"===e.code?a("error","Помилка!","Цей користувач не знайдено в базі даних"):"auth/wrong-password"===e.code?a("error","Помилка!","Ви ввели неправильно пароль від цього облікового запису"):"auth/too-many-requests"===e.code&&a("error","Помилка!","Занадто багато запитів, cпробуй пізніше")})},l=e=>{console.log("Failed:",e)};return(0,n.jsxs)(n.Fragment,{children:[s,(0,n.jsxs)(c.Z,{name:"basic",className:"h-full",onFinish:t,onFinishFailed:l,autoComplete:"on",children:[(0,n.jsx)("label",{children:"Введіть Вашу електронну пошту"}),(0,n.jsx)(c.Z.Item,{name:"email",rules:[{required:!0,message:"Введіть Вашу електронну пошту"}],children:(0,n.jsx)(i.Z,{type:"email"})}),(0,n.jsx)("label",{children:"Введіть свій пароль"}),(0,n.jsx)(c.Z.Item,{className:"w-[100%]",name:"password",rules:[{required:!0,message:"Введіть свій пароль від особистого кабінету"}],children:(0,n.jsx)(i.Z.Password,{})}),(0,n.jsx)(c.Z.Item,{className:"mt-[50%]",children:(0,n.jsx)(o.ZP,{className:"w-[100%]",type:"dashed",htmlType:"submit",children:"Увiйти"})})]})]})};var h=a(7294),m=a(2783),x=a(1693),f=a(6845),j=a(4076);let p=()=>{let[e,s]=r.Z.useNotification(),[a,t]=h.useState(""),[l,u]=h.useState(),[p,w]=h.useState("Юридична особа"),[b,y]=h.useState([]),N=async e=>{if(!e)return;let s=(0,f.iH)(j.tO,"/files/".concat(e.name));t(e.name);let a=(0,f.B0)(s,e);try{await a.on("state_changed",e=>{},e=>console.log(e),()=>(0,f.Jt)(a.snapshot.ref).then(e=>u(e)))}catch(e){console.log(e)}},Z=(s,a,n)=>{e[s]({message:"".concat(a),description:"".concat(n)})},g=async e=>{await (0,d.y1)(e.email,e.password).then(s=>(Z("success","Успіх!","Ви успішно зареєстрували свій обліковий запис"),(0,j.ul)("users",{...e,password:null,file:l?{href:l,name:a}:{href:"",name:""},idPost:""}).then(e=>e).catch(e=>console.log(e)),s)).catch(e=>{"auth/email-already-in-use"===e.code?Z("error","Помилка!","Цей користувач вже зареєстрований"):"auth/weak-password"===e.code&&Z("error","Помилка!","Ведений пароль вами дуже слабкий! Ваш пароль має містити щонайменше 5 символів")})},_=e=>{console.log("Failed:",e),Z("error","Помилка!","Перевірте наведені вами дані")};return(0,n.jsxs)(n.Fragment,{children:[s,(0,n.jsx)("section",{className:"mb-4",children:(0,n.jsx)(m.Z,{onChange:e=>w(e),defaultValue:"Юридична особа",block:!0,options:[{label:"Фізична особа",value:"Фізична особа",disabled:!0},{label:"Юридична особа",value:"Юридична особа",disabled:!1}]})}),(0,n.jsxs)(c.Z,{name:"basic",className:"h-full",onFinish:g,onFinishFailed:_,autoComplete:"on",children:[(0,n.jsx)("label",{children:"Введіть Вашу електронну пошту"}),(0,n.jsx)(c.Z.Item,{name:"email",rules:[{required:!0,message:"Введіть Вашу електронну пошту"}],children:(0,n.jsx)(i.Z,{type:"email"})}),(0,n.jsx)("label",{children:"Введіть свій пароль"}),(0,n.jsx)(c.Z.Item,{className:"w-[100%]",name:"password",rules:[{required:!0,message:"Введіть свій пароль від особистого кабінету"}],children:(0,n.jsx)(i.Z.Password,{})}),"Юридична особа"===p&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("label",{children:"Введіть назву вашої компанії"}),(0,n.jsx)("hr",{}),(0,n.jsx)(c.Z.Item,{className:"w-[100%]",name:"companyName",rules:[{required:!0,message:"Введіть назву вашої компанії"}],children:(0,n.jsx)(i.Z,{maxLength:25,showCount:!0})}),(0,n.jsxs)("div",{className:"my-4",children:[(0,n.jsxs)("span",{children:["Формат файлів, що підтримується:",(0,n.jsx)("span",{className:"font-bold",children:".doc, .pdf"})]}),(0,n.jsx)(x.Z,{maxCount:1,accept:".doc, .pdf",listType:"picture-card",onRemove:e=>{let s=b.indexOf(e),a=b.slice();a.splice(s,1),y(a)},beforeUpload:async e=>(y([e]),await N(e),!1),fileList:b,children:(0,n.jsxs)("span",{children:["виберіть ",(0,n.jsx)("br",{})," файл"]})})]})]}),(0,n.jsx)(c.Z.Item,{children:(0,n.jsx)(o.ZP,{className:"w-[100%]",type:"dashed",htmlType:"submit",children:"Зареєструватися"})})]})]})},w=[{key:"1",label:"Увiйти",children:(0,n.jsx)(u,{})},{key:"2",label:"Реєстрація",children:(0,n.jsx)(p,{})}];var b=a(3478),y=a(1163),N=a.n(y),Z=function(){let{user:e,loading:s,error:a}=(0,b.SE)();return(0,h.useEffect)(()=>{!s&&e&&N().push("/dashboard/users")},[e,s]),(0,n.jsx)("main",{className:"bg-[#00b96b] min-h-[100vh] flex items-center justify-center",children:(0,n.jsx)("span",{className:"flex items-center justify-center h-[100%] w-[100%]",children:(0,n.jsx)(t.Z,{hoverable:!0,className:"max-w-[500px] w-[100%] min-h-[550px]",children:(0,n.jsx)("section",{className:"bg-[#fff] shadow-black h-[100%] h-[100%] p-4 max-w-[500px] w-[100%]",children:(0,n.jsx)(l.Z,{className:"h-[100%]",type:"card",defaultActiveKey:"1",items:w})})})})})}}},function(e){e.O(0,[918,436,774,888,179],function(){return e(e.s=8020)}),_N_E=e.O()}]);