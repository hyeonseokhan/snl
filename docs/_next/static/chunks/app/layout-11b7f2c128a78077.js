(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[177],{9817:(e,a,t)=>{Promise.resolve().then(t.t.bind(t,5760,23)),Promise.resolve().then(t.t.bind(t,347,23)),Promise.resolve().then(t.bind(t,5069)),Promise.resolve().then(t.bind(t,7743))},5069:(e,a,t)=>{"use strict";t.d(a,{Navigation:()=>E});var r=t(5155),n=t(2980),c=t(8173),o=t.n(c),l=t(6046),s=t(7061);let i=()=>(0,r.jsx)(s.S,{label:"HamburgerMenuIcon",children:(0,r.jsx)(d,{})}),d=()=>(0,r.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"h-8 w-8 fill-[var(--gray-10)] stroke-[var(--gray-10)]",children:[(0,r.jsx)("line",{x1:"4",x2:"20",y1:"12",y2:"12"}),(0,r.jsx)("line",{x1:"4",x2:"20",y1:"6",y2:"6"}),(0,r.jsx)("line",{x1:"4",x2:"20",y1:"18",y2:"18"})]}),u={name:"SNL"},h=()=>(0,r.jsx)("span",{className:"font-sans text-xl font-bold text-[var(--gray-12)]",children:u.name}),m=()=>(0,r.jsx)("div",{className:"mx-3 select-none",children:(0,r.jsx)(o(),{href:"/",children:(0,r.jsx)(h,{})})});var g=t(7113),x=t(7365);function f(){let{theme:e,systemTheme:a,setTheme:t}=(0,g.D)(),r="dark"===e||"system"===e&&"dark"===a,n=r?x.gLX:x.rRK;return{isDarkMode:r,toggleTheme:()=>{let r="dark"===("system"===e?a:e)?"light":"dark";t(r===a?"system":r)},Icon:n,label:r?"라이트모드 전환":"다크모드 전환"}}var v=t(2115);let p=(0,v.createContext)(null),j={Root:e=>{let{children:a}=e,[t,n]=(0,v.useState)(!1);return(0,r.jsx)(p.Provider,{value:{isOpen:t,toggleSideBar:()=>n(e=>!e)},children:(0,r.jsx)("div",{className:"relative",children:a})})},Button:e=>{let{children:a}=e,t=(0,v.useContext)(p);if(!t)throw Error("SideBarButton must be used within SideBarRoot");let{toggleSideBar:n}=t;return(0,r.jsx)("div",{onClick:n,className:"flex cursor-pointer items-center justify-center py-2 text-[var(--gray-12)]",children:a})},Content:e=>{let{children:a,position:t}=e,[n,c]=(0,v.useState)("w-64"),o=(0,v.useContext)(p);if(!o)throw Error("SideBarContent must be used within SideBarRoot");let{isOpen:l,toggleSideBar:s}=o,i=(0,v.useRef)(null);return(0,v.useEffect)(()=>{window.innerWidth<=768&&c("w-3/4")},[]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"fixed inset-0 bg-black transition-opacity duration-300 ".concat(l?"opacity-30":"pointer-events-none opacity-0"," z-40"),onClick:()=>s()}),(0,r.jsx)("div",{ref:i,className:"fixed ".concat("left"===t?"left-0":"right-0"," top-0 z-50 h-full ").concat(n," transform bg-[var(--color-background)] p-5 shadow-lg transition-all duration-300 ").concat(l?"opacity-100":"".concat("left"===t?"-translate-x-full":"translate-x-full"," opacity-0")),children:a})]})}};var w=t(4158);let y=()=>{let e=(0,l.usePathname)(),{Icon:a,toggleTheme:t}=f(),c=(0,w.Fo)(["todo","community","home","tools"]);return(0,r.jsx)("div",{className:"fixed bottom-0 left-0 right-0 z-10 flex h-16 items-center justify-center md:hidden",children:(0,r.jsxs)(n.xA,{columns:"5",rows:"1",width:"100%",align:"center",height:"100%",px:"2",className:"bg-[var(--color-background)]",children:[c.map(a=>{let t=a.icon;return(0,r.jsx)(n.so,{align:"center",py:"2",justify:"center",children:(0,r.jsx)(o(),{href:a.href,children:t?(0,r.jsx)(t,{viewPage:e,target:a.href}):null})},a.en)}),(0,r.jsxs)(j.Root,{children:[(0,r.jsx)(j.Button,{children:(0,r.jsx)(i,{})}),(0,r.jsx)(j.Content,{position:"right",children:(0,r.jsx)(n.so,{direction:"column",width:"100%",children:(0,r.jsxs)(n.so,{direction:"column",gap:"2",width:"100%",children:[(0,r.jsxs)(n.so,{direction:"row",justify:"between",align:"center",children:[(0,r.jsx)(m,{}),(0,r.jsx)(n.K0,{size:"2",color:"gray",variant:"surface",onClick:t,children:(0,r.jsx)(a,{})})]}),(0,r.jsx)("hr",{className:"border-t-[0.5px] border-gray-400 px-1 opacity-30"})]})})})]})]})})},C=()=>(0,r.jsx)(s.S,{label:"SideBarIcon",children:(0,r.jsx)(k,{})}),k=()=>(0,r.jsx)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"icon-xl-heavy max-md:hidden",children:(0,r.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M8.85719 3H15.1428C16.2266 2.99999 17.1007 2.99998 17.8086 3.05782C18.5375 3.11737 19.1777 3.24318 19.77 3.54497C20.7108 4.02433 21.4757 4.78924 21.955 5.73005C22.2568 6.32234 22.3826 6.96253 22.4422 7.69138C22.5 8.39925 22.5 9.27339 22.5 10.3572V13.6428C22.5 14.7266 22.5 15.6008 22.4422 16.3086C22.3826 17.0375 22.2568 17.6777 21.955 18.27C21.4757 19.2108 20.7108 19.9757 19.77 20.455C19.1777 20.7568 18.5375 20.8826 17.8086 20.9422C17.1008 21 16.2266 21 15.1428 21H8.85717C7.77339 21 6.89925 21 6.19138 20.9422C5.46253 20.8826 4.82234 20.7568 4.23005 20.455C3.28924 19.9757 2.52433 19.2108 2.04497 18.27C1.74318 17.6777 1.61737 17.0375 1.55782 16.3086C1.49998 15.6007 1.49999 14.7266 1.5 13.6428V10.3572C1.49999 9.27341 1.49998 8.39926 1.55782 7.69138C1.61737 6.96253 1.74318 6.32234 2.04497 5.73005C2.52433 4.78924 3.28924 4.02433 4.23005 3.54497C4.82234 3.24318 5.46253 3.11737 6.19138 3.05782C6.89926 2.99998 7.77341 2.99999 8.85719 3ZM6.35424 5.05118C5.74907 5.10062 5.40138 5.19279 5.13803 5.32698C4.57354 5.6146 4.1146 6.07354 3.82698 6.63803C3.69279 6.90138 3.60062 7.24907 3.55118 7.85424C3.50078 8.47108 3.5 9.26339 3.5 10.4V13.6C3.5 14.7366 3.50078 15.5289 3.55118 16.1458C3.60062 16.7509 3.69279 17.0986 3.82698 17.362C4.1146 17.9265 4.57354 18.3854 5.13803 18.673C5.40138 18.8072 5.74907 18.8994 6.35424 18.9488C6.97108 18.9992 7.76339 19 8.9 19H9.5V5H8.9C7.76339 5 6.97108 5.00078 6.35424 5.05118ZM11.5 5V19H15.1C16.2366 19 17.0289 18.9992 17.6458 18.9488C18.2509 18.8994 18.5986 18.8072 18.862 18.673C19.4265 18.3854 19.8854 17.9265 20.173 17.362C20.3072 17.0986 20.3994 16.7509 20.4488 16.1458C20.4992 15.5289 20.5 14.7366 20.5 13.6V10.4C20.5 9.26339 20.4992 8.47108 20.4488 7.85424C20.3994 7.24907 20.3072 6.90138 20.173 6.63803C19.8854 6.07354 19.4265 5.6146 18.862 5.32698C18.5986 5.19279 18.2509 5.10062 17.6458 5.05118C17.0289 5.00078 16.2366 5 15.1 5H11.5ZM5 8.5C5 7.94772 5.44772 7.5 6 7.5H7C7.55229 7.5 8 7.94772 8 8.5C8 9.05229 7.55229 9.5 7 9.5H6C5.44772 9.5 5 9.05229 5 8.5ZM5 12C5 11.4477 5.44772 11 6 11H7C7.55229 11 8 11.4477 8 12C8 12.5523 7.55229 13 7 13H6C5.44772 13 5 12.5523 5 12Z",fill:"currentColor"})}),b=()=>(0,r.jsx)(s.S,{label:"DiscordIcon",children:(0,r.jsx)(S,{})}),S=()=>(0,r.jsx)("svg",{width:"24",height:"24",viewBox:"0 -28.5 256 256",version:"1.1",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"xMidYMid",children:(0,r.jsx)("g",{children:(0,r.jsx)("path",{d:"M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z",className:"fill-[var(--gray-11)]",fillRule:"nonzero"})})}),M=()=>(0,r.jsx)(s.S,{label:"TreeDotVerticalIcon",children:(0,r.jsx)(A,{})}),A=()=>(0,r.jsxs)("svg",{viewBox:"0 0 16 16",xmlns:"http://www.w3.org/2000/svg",fill:"none",className:"bi bi-three-dots-vertical h-6 w-6 shrink-0",children:[(0,r.jsx)("g",{id:"SVGRepo_bgCarrier",strokeWidth:"0"}),(0,r.jsx)("g",{id:"SVGRepo_tracerCarrier",strokeLinecap:"round",strokeLinejoin:"round"}),(0,r.jsx)("g",{id:"SVGRepo_iconCarrier",children:(0,r.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z",fill:"currentColor"})})]}),N=()=>{let e=(0,l.usePathname)(),a=(0,w.Fo)(["todo","community","tools"]),{toggleTheme:t,Icon:c,label:s}=f();return(0,r.jsxs)("div",{className:"hidden h-14 flex-wrap items-center justify-between pl-4 pr-5 md:flex",children:[(0,r.jsxs)(n.so,{align:"center",gap:"1",children:[(0,r.jsxs)(j.Root,{children:[(0,r.jsx)(j.Button,{children:(0,r.jsx)(C,{})}),(0,r.jsx)(j.Content,{position:"left",children:(0,r.jsx)("div",{children:"Hello World"})})]}),(0,r.jsx)(m,{}),(0,r.jsx)(n.so,{direction:"row",children:a.map(a=>(0,r.jsx)(n.az,{asChild:!0,className:"rounded-md px-3 py-2 hover:bg-[var(--gray-5)] hover:bg-opacity-10 hover:text-[var(--gray-12)] hover:transition-all hover:duration-200 ".concat(e.includes(a.href)?"text-[var(--gray-12)]":"text-[var(--gray-10)]"),children:(0,r.jsx)(o(),{href:a.href,className:"font-bold",children:a.ko})},a.en))})]}),(0,r.jsxs)(n.so,{align:"center",gap:"3",children:[(0,r.jsxs)(n.$n,{size:"2",variant:"soft",color:"gray",radius:"full",children:[(0,r.jsx)(b,{}),(0,r.jsx)("span",{className:"font-bold",children:"디스코드 로그인"})]}),(0,r.jsxs)(n.rI.bL,{children:[(0,r.jsx)(n.rI.l9,{children:(0,r.jsx)(n.$n,{size:"1",variant:"ghost",color:"gray",radius:"full",children:(0,r.jsx)(M,{})})}),(0,r.jsx)(n.rI.UC,{size:"2",className:"w-60",color:"gray",variant:"soft",children:(0,r.jsx)(n.rI.q7,{onClick:t,children:(0,r.jsxs)("div",{className:"flex items-center gap-x-2 py-1",children:[(0,r.jsx)(c,{}),s]})})})]})]})]})};function E(e){let{children:a}=e;return(0,r.jsxs)(n.so,{direction:"column",width:"100%",className:"pb-16 md:mb-0",children:[(0,r.jsx)(N,{}),a,(0,r.jsx)(y,{})]})}},7743:(e,a,t)=>{"use strict";t.d(a,{NextThemeProvider:()=>E});var r=t(5155);t(2115);var n=t(7113),c=t(2980),o=t(7434),l=t(1676),s=t(6483),i=t(7187),d=t.n(i);let u=[0,1,2,3,4,5,6,7,8,9,10,11],h=["gray","mauve","slate","sage","olive","sand"],m=[...h,"tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","brown","orange","sky","mint","lime","yellow","amber"],g=Object.fromEntries(m.map(e=>[e,Object.values(l["".concat(e,"P3")]).map(e=>new s.A(e).to("oklch"))])),x=Object.fromEntries(m.map(e=>[e,Object.values(l["".concat(e,"DarkP3")]).map(e=>new s.A(e).to("oklch"))])),f=Object.fromEntries(h.map(e=>[e,Object.values(l["".concat(e,"P3")]).map(e=>new s.A(e).to("oklch"))])),v=Object.fromEntries(h.map(e=>[e,Object.values(l["".concat(e,"DarkP3")]).map(e=>new s.A(e).to("oklch"))])),p=e=>{let{appearance:a,...t}=e,r=new s.A(t.background).to("oklch"),n=j(new s.A(t.gray).to("oklch"),"light"===a?f:v,r),c=new s.A(t.accent).to("oklch"),o=j(c,"light"===a?g:x,r),l=r.to("srgb").toString({format:"hex"}),i=c.to("srgb").toString({format:"hex"});("#000"===i||"#fff"===i)&&(o=n.map(e=>e.clone()));let[d,u]=function(e,a){let t=e[0];return 100*a.deltaEOK(t)<25?[e[8],w(e[8])]:[a,w(a)]}(o,c);o[8]=d,o[9]=function(e,a){let[t,r,n]=e.coords,c=t>.4&&!isNaN(n)?.93*r+0:r,o=new s.A("oklch",[t>.4?t-.03/(t+.1):t+.03/(t+.1),c,n]),l=o,i=1/0;return a.forEach(e=>{for(let a of e){let e=o.deltaEOK(a);e<i&&(i=e,l=a)}}),o.coords[1]=l.coords[1],o.coords[2]=l.coords[2],o}(d,[o]),o[10].coords[1]=Math.min(Math.max(o[8].coords[1],o[7].coords[1]),o[10].coords[1]),o[11].coords[1]=Math.min(Math.max(o[8].coords[1],o[7].coords[1]),o[11].coords[1]);let h=o.map(e=>e.to("srgb").toString({format:"hex"})),m=o.map(N),p=h.map(e=>k(e,l)),y=h.map(e=>b(e,l)),C=u.to("srgb").toString({format:"hex"}),S=n.map(e=>e.to("srgb").toString({format:"hex"})),M=n.map(N),A=S.map(e=>k(e,l)),E=S.map(e=>b(e,l)),W="light"===a?k(h[1],l,.8):k(h[1],l,.5),G="light"===a?b(m[1],l,.8):b(m[1],l,.5);return{accentScale:h,accentScaleAlpha:p,accentScaleWideGamut:m,accentScaleAlphaWideGamut:y,accentContrast:C,grayScale:S,grayScaleAlpha:A,grayScaleWideGamut:M,grayScaleAlphaWideGamut:E,graySurface:"light"===a?"#ffffffcc":"rgba(0, 0, 0, 0.05)",graySurfaceWideGamut:"light"===a?"color(display-p3 1 1 1 / 80%)":"color(display-p3 0 0 0 / 5%)",accentSurface:W,accentSurfaceWideGamut:G,background:l}};function j(e,a,t){let r=[];Object.entries(a).forEach(a=>{let[t,n]=a;for(let a of n){let n=e.deltaEOK(a);r.push({scale:t,distance:n,color:a})}}),r.sort((e,a)=>e.distance-a.distance);let n=r.filter((e,a,t)=>a===t.findIndex(a=>a.scale===e.scale));if(!n.every(e=>h.includes(e.scale))&&h.includes(n[0].scale))for(;h.includes(n[1].scale);)n.splice(1,1);let c=n[0],o=n[1],l=o.distance,i=c.distance,d=c.color.deltaEOK(o.color),m=(i**2+d**2-l**2)/(2*i*d),g=Math.sin(Math.acos(m)),x=(l**2+d**2-i**2)/(2*l*d),f=Math.sin(Math.acos(x)),v=.5*Math.max(0,m/g/(x/f)),p=a[c.scale],j=a[o.scale],w=u.map(e=>new s.A(s.A.mix(p[e],j[e],v)).to("oklch")),y=w.slice().sort((a,t)=>e.deltaEOK(a)-e.deltaEOK(t))[0],C=e.coords[1]/y.coords[1];if(w.forEach(a=>{a.coords[1]=Math.min(1.5*e.coords[1],a.coords[1]*C),a.coords[2]=e.coords[2]}),w[0].coords[0]>.5){let e=w.map(e=>{let{coords:a}=e;return a[0]}),a=A(Math.max(0,Math.min(1,t.coords[0])),[1,...e],M);return a.shift(),a.forEach((e,a)=>{w[a].coords[0]=e}),w}let k=[...S],b=w[0].coords[0],N=Math.max(0,Math.min(1,t.coords[0]))/b;if(N>1)for(let e=0;e<k.length;e++){let a=3*(N-1);k[e]=N>1.5?0:Math.max(0,k[e]*(1-a))}let E=w.map(e=>{let{coords:a}=e;return a[0]});return A(t.coords[0],E,k).forEach((e,a)=>{w[a].coords[0]=e}),w}function w(e){let a=new s.A("oklch",[1,0,0]);if(40>Math.abs(a.contrastAPCA(e))){let[a,t,r]=e.coords;return new s.A("oklch",[.25,Math.max(.08*t,.04),r])}return a}function y(e,a,t,r,n){let c;let[o,l,s]=e.map(e=>Math.round(e*t)),[i,d,u]=a.map(e=>Math.round(e*t));if(void 0===o||void 0===l||void 0===s||void 0===i||void 0===d||void 0===u)throw Error("Color is undefined");let h=0;o>i?h=t:l>d?h=t:s>u&&(h=t);let m=(o-i)/(h-i),g=(l-d)/(h-d),x=(s-u)/(h-u),f=[m,g,x].every(e=>e===m);if(!n&&f){let e=h/t;return[e,e,e,m]}let v=e=>isNaN(e)?0:Math.min(t,Math.max(0,e)),p=(isNaN(c=Math.ceil((null!=n?n:Math.max(m,g,x))*r))?0:Math.min(r,Math.max(0,c)))/r,j=v(-((i*(1-p)-o)/p*1)),w=v(-((d*(1-p)-l)/p*1)),y=v(-((u*(1-p)-s)/p*1));j=Math.ceil(j),w=Math.ceil(w),y=Math.ceil(y);let k=C(j,p,i),b=C(w,p,d),S=C(y,p,u);return 0===h&&(o<=i&&o!==k&&(j=o>k?j+1:j-1),l<=d&&l!==b&&(w=l>b?w+1:w-1),s<=u&&s!==S&&(y=s>S?y+1:y-1)),h===t&&(o>=i&&o!==k&&(j=o>k?j+1:j-1),l>=d&&l!==b&&(w=l>b?w+1:w-1),s>=u&&s!==S&&(y=s>S?y+1:y-1)),[j/=t,w/=t,y/=t,p]}function C(e,a,t){let r=!(arguments.length>3)||void 0===arguments[3]||arguments[3];return r?Math.round(t*(1-a))+Math.round(e*a):t*(1-a)+e*a}function k(e,a,t){let[r,n,c,o]=y(new s.A(e).to("srgb").coords,new s.A(a).to("srgb").coords,255,255,t);return function(e){if(!e.startsWith("#"))return e;if(4===e.length){let a=e.charAt(0),t=e.charAt(1),r=e.charAt(2),n=e.charAt(3);return a+t+t+r+r+n+n}if(5===e.length){let a=e.charAt(0),t=e.charAt(1),r=e.charAt(2),n=e.charAt(3),c=e.charAt(4);return a+t+t+r+r+n+n+c+c}return e}(new s.A("srgb",[r,n,c],o).toString({format:"hex"}))}function b(e,a,t){let[r,n,c,o]=y(new s.A(e).to("p3").coords,new s.A(a).to("p3").coords,255,1e3,t);return new s.A("p3",[r,n,c],o).toString({precision:4}).replace("color(p3 ","color(display-p3 ")}let S=[1,0,1,0],M=[0,2,0,2];function A(e,a,t){return a.map((a,r,n)=>{let c=n.length-1;return a-(n[0]-e)*d()(...t)(1-r/c)})}function N(e){let a=+(100*e.coords[0]).toFixed(1);return e.to("oklch").toString({precision:4}).replace(/(\S+)(.+)/,"oklch(".concat(a,"%$2"))}function E(e){let{children:a}=e,{resolvedTheme:t,setTheme:l}=(0,n.D)(),[s,i]=(0,o.M)("colors/light/accent","#eb9100"),[d,u]=(0,o.M)("colors/light/gray","#393b44"),[h,m]=(0,o.M)("colors/light/background","#fafafa"),[g,x]=(0,o.M)("colors/dark/accent","#f59e0b"),[f,v]=(0,o.M)("colors/dark/gray","#6b7280"),[j,w]=(0,o.M)("colors/dark/background","#141517"),y=p({appearance:"light",accent:s,gray:d,background:h}),C=p({appearance:"dark",accent:g,gray:f,background:j}),k=G(("dark"===t?C:y).accentScale[8]);return(0,r.jsxs)(n.N,{attribute:"class",children:[(0,r.jsx)("style",{dangerouslySetInnerHTML:{__html:W({lightColors:y,darkColors:C})}}),(0,r.jsx)(c.Sx,{accentColor:k,radius:"medium",children:a})]})}let W=e=>{let{lightColors:a,darkColors:t}=e,r=z({isDarkMode:!1,name:G(a.accentScale[8]),contrast:a.accentContrast,scale:a.accentScale,scaleWideGamut:a.accentScaleWideGamut,scaleAlpha:a.accentScaleAlpha,scaleAlphaWideGamut:a.accentScaleAlphaWideGamut,surface:a.accentSurface,surfaceWideGamut:a.accentSurfaceWideGamut}),n=z({isDarkMode:!1,name:"gray",contrast:"#fff",scale:a.grayScale,scaleWideGamut:a.grayScaleWideGamut,scaleAlpha:a.grayScaleAlpha,scaleAlphaWideGamut:a.grayScaleAlphaWideGamut,surface:a.graySurface,surfaceWideGamut:a.graySurfaceWideGamut}),c=z({isDarkMode:!0,name:G(t.accentScale[8]),contrast:t.accentContrast,scale:t.accentScale,scaleWideGamut:t.accentScaleWideGamut,scaleAlpha:t.accentScaleAlpha,scaleAlphaWideGamut:t.accentScaleAlphaWideGamut,surface:t.accentSurface,surfaceWideGamut:t.accentSurfaceWideGamut}),o=z({isDarkMode:!0,name:"gray",contrast:"#fff",scale:t.grayScale,scaleWideGamut:t.grayScaleWideGamut,scaleAlpha:t.grayScaleAlpha,scaleAlphaWideGamut:t.grayScaleAlphaWideGamut,surface:t.graySurface,surfaceWideGamut:t.graySurfaceWideGamut}),l=O({isDarkMode:!1,background:a.background}),s=O({isDarkMode:!0,background:t.background});return"\n[data-accent-color='custom'] {\n  --accent-1: var(--custom-1);\n  --accent-2: var(--custom-2);\n  --accent-3: var(--custom-3);\n  --accent-4: var(--custom-4);\n  --accent-5: var(--custom-5);\n  --accent-6: var(--custom-6);\n  --accent-7: var(--custom-7);\n  --accent-8: var(--custom-8);\n  --accent-9: var(--custom-9);\n  --accent-10: var(--custom-10);\n  --accent-11: var(--custom-11);\n  --accent-12: var(--custom-12);\n\n  --accent-a1: var(--custom-a1);\n  --accent-a2: var(--custom-a2);\n  --accent-a3: var(--custom-a3);\n  --accent-a4: var(--custom-a4);\n  --accent-a5: var(--custom-a5);\n  --accent-a6: var(--custom-a6);\n  --accent-a7: var(--custom-a7);\n  --accent-a8: var(--custom-a8);\n  --accent-a9: var(--custom-a9);\n  --accent-a10: var(--custom-a10);\n  --accent-a11: var(--custom-a11);\n  --accent-a12: var(--custom-a12);\n\n  --accent-contrast: var(--custom-contrast);\n  --accent-surface: var(--custom-surface);\n  --accent-indicator: var(--custom-indicator);\n  --accent-track: var(--custom-track);\n}\n\n".concat(l,"\n").concat(r,"\n").concat(n,"\n").concat(s,"\n").concat(c,"\n").concat(o,"\n  ").trim()},G=e=>{let a=new s.A(e).to("hsl");return a.coords[1]<25?"custom":a.coords[0]>=0&&a.coords[0]<20?"red":a.coords[0]>=20&&a.coords[0]<40?"orange":a.coords[0]>=40&&a.coords[0]<65?"yellow":a.coords[0]>=65&&a.coords[0]<100?"lime":a.coords[0]>=100&&a.coords[0]<165?"green":a.coords[0]>=165&&a.coords[0]<190?"teal":a.coords[0]>=190&&a.coords[0]<240?"blue":a.coords[0]>=240&&a.coords[0]<270?"violet":a.coords[0]>=270&&a.coords[0]<320?"purple":a.coords[0]>=320&&a.coords[0]<340?"pink":"red"},z=e=>{let{isDarkMode:a,name:t,scale:r,scaleWideGamut:n,scaleAlpha:c,scaleAlphaWideGamut:o,contrast:l,surface:s,surfaceWideGamut:i}=e,d=a?".dark, .dark-theme":":root, .light, .light-theme";return"\n".concat(d," {\n  ").concat(r.map((e,a)=>"--".concat(t,"-").concat(a+1,": ").concat(e,";")).join("\n  "),"\n\n  ").concat(c.map((e,a)=>"--".concat(t,"-a").concat(a+1,": ").concat(e,";")).join("\n  "),"\n\n  --").concat(t,"-contrast: ").concat(l,";\n  --").concat(t,"-surface: ").concat(s,";\n  --").concat(t,"-indicator: ").concat(r[8],";\n  --").concat(t,"-track: ").concat(r[8],";\n}\n\n@supports (color: color(display-p3 1 1 1)) {\n  @media (color-gamut: p3) {\n    ").concat(d," {\n      ").concat(n.map((e,a)=>"--".concat(t,"-").concat(a+1,": ").concat(e,";")).join("\n      "),"\n\n      ").concat(o.map((e,a)=>"--".concat(t,"-a").concat(a+1,": ").concat(e,";")).join("\n      "),"\n\n      --").concat(t,"-contrast: ").concat(l,";\n      --").concat(t,"-surface: ").concat(i,";\n      --").concat(t,"-indicator: ").concat(n[8],";\n      --").concat(t,"-track: ").concat(n[8],";\n    }\n  }\n}\n  ").trim()},O=e=>{let{isDarkMode:a,background:t}=e;return a?"\n.dark, .dark-theme, :is(.dark, .dark-theme) :where(.radix-themes:not(.light, .light-theme)) {\n  --color-background: ".concat(t,";\n}\nhtml, body {\n  background-color: ").concat(t,";\n}\n    ").trim():"\n:root, .light, .light-theme, .radix-themes {\n  --color-background: ".concat(t,";\n}\nhtml, body {\n  background-color: ").concat(t,";\n}\n  ").trim()}},4158:(e,a,t)=>{"use strict";t.d(a,{Fo:()=>d}),t(2115);var r=t(5155),n=t(7061);let c=e=>{let{isActive:a}=e;return(0,r.jsx)("svg",{viewBox:"0 0 26 26",className:"".concat(a?"fill-[var(--gray-12)]":"fill-[var(--gray-10)]"," h-8 w-8 transition-all duration-150"),children:(0,r.jsx)("path",{d:"M2.25 12.8855V20.7497C2.25 21.8543 3.14543 22.7497 4.25 22.7497H8.25C8.52614 22.7497 8.75 22.5259 8.75 22.2497V17.6822V17.4997C8.75 15.1525 10.6528 13.2497 13 13.2497C15.3472 13.2497 17.25 15.1525 17.25 17.4997V17.6822V22.2497C17.25 22.5259 17.4739 22.7497 17.75 22.7497H21.75C22.8546 22.7497 23.75 21.8543 23.75 20.7497V12.8855C23.75 11.3765 23.0685 9.94815 21.8954 8.99883L16.1454 4.3454C14.3112 2.86095 11.6888 2.86095 9.85455 4.3454L4.10455 8.99883C2.93153 9.94815 2.25 11.3765 2.25 12.8855Z",strokeLinecap:"round",strokeWidth:"2.5"})})},o=e=>{let{isActive:a}=e;return(0,r.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"".concat(a?"fill-[var(--gray-12)] stroke-[var(--gray-12)]":"fill-[var(--gray-10)] stroke-[var(--gray-10)]"," h-8 w-8 transition-all duration-150"),children:[(0,r.jsx)("polyline",{points:"14.5 17.5 3 6 3 3 6 3 17.5 14.5"}),(0,r.jsx)("line",{x1:"13",x2:"19",y1:"19",y2:"13"}),(0,r.jsx)("line",{x1:"16",x2:"20",y1:"16",y2:"20"}),(0,r.jsx)("line",{x1:"19",x2:"21",y1:"21",y2:"19"}),(0,r.jsx)("polyline",{points:"14.5 6.5 18 3 21 3 21 6 17.5 9.5"}),(0,r.jsx)("line",{x1:"5",x2:"9",y1:"14",y2:"18"}),(0,r.jsx)("line",{x1:"7",x2:"4",y1:"17",y2:"20"}),(0,r.jsx)("line",{x1:"3",x2:"5",y1:"19",y2:"21"})]})},l=e=>{let{isActive:a}=e;return(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",className:"".concat(a?"fill-[var(--gray-12)]":"fill-[var(--gray-10)]"," h-8 w-8 transition-all duration-150"),children:(0,r.jsx)("path",{d:"M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"})})},s=e=>{let{isActive:a}=e;return(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",className:"".concat(a?"fill-[var(--gray-12)]":"fill-[var(--gray-10)]"," h-7 w-7 transition-all duration-150"),children:(0,r.jsx)("path",{d:"M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm2 .5v2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5m0 4v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5M4.5 9a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 12.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5M7.5 6a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM7 9.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5m.5 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM10 6.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5m.5 2.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5z"})})},i={home:{ko:"홈",en:"home",href:"/",icon:e=>{let{viewPage:a,target:t}=e;return(0,r.jsx)(n.S,{label:"HouseIcon",children:(0,r.jsx)(c,{isActive:a===t})})}},todo:{ko:"내 숙제",en:"todo",href:"/todo",icon:e=>{let{viewPage:a,target:t}=e;return(0,r.jsx)(n.S,{label:"RaidIcon",children:(0,r.jsx)(o,{isActive:a.includes(t)})})}},community:{ko:"커뮤니티",en:"community",href:"/community",icon:e=>{let{viewPage:a,target:t}=e;return(0,r.jsx)(n.S,{label:"PeopleIcon",children:(0,r.jsx)(l,{isActive:a.includes(t)})})}},tools:{ko:"도구모음",en:"tools",href:"/tools/gold-calc",icon:e=>{let{viewPage:a,target:t}=e;return(0,r.jsx)(n.S,{label:"CalculatorIcon",children:(0,r.jsx)(s,{isActive:a.includes(t)})})}},goldCalc:{ko:"골드 구매 계산기",en:"gold-calc",href:"/tools/gold-calc",description:"골드 구매시 시세와 거래 수수료를 계산해 주는 도구",isNew:!1},raidAuction:{ko:"레이드 경매 계산기",en:"raid-auction",description:"레이드 경매 보상에 대한 적절한 입찰금 계산 도구",href:"/tools/raid-auction",isNew:!0}};function d(e){return e.filter(e=>e in i).map(e=>i[e])}},7434:(e,a,t)=>{"use strict";t.d(a,{M:()=>o});var r=t(2115);function n(e){let a=r.useRef(()=>{throw Error("Cannot call an event handler while rendering.")});return r.useInsertionEffect(()=>{a.current=e},[e]),r.useCallback(function(){for(var e,t=arguments.length,r=Array(t),n=0;n<t;n++)r[n]=arguments[n];return null===(e=a.current)||void 0===e?void 0:e.call(a,...r)},[a])}let c=!!window.document&&!!window.document.createElement;function o(e,a){let t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},{initializeWithValue:o=!1}=t,l=r.useCallback(e=>t.serializer?t.serializer(e):JSON.stringify(e),[t]),s=r.useCallback(e=>{let r;if(t.deserializer)return t.deserializer(e);if("undefined"===e)return;let n=a instanceof Function?a():a;try{r=JSON.parse(e)}catch(e){return console.error("Error parsing JSON:",e),n}return r},[t,a]),i=r.useCallback(()=>{let t=a instanceof Function?a():a;if(!c)return t;try{let a=window.localStorage.getItem(e);return a?s(a):t}catch(a){return console.warn("Error reading localStorage key “".concat(e,"”:"),a),t}},[a,e,s]),[d,u]=r.useState(()=>o?i():a instanceof Function?a():a),h=n(a=>{if(!c){console.warn("Tried setting localStorage key “".concat(e,"” even though environment is not a client"));return}try{let t=a instanceof Function?a(i()):a;window.localStorage.setItem(e,l(t)),u(t),window.dispatchEvent(new StorageEvent("local-storage",{key:e}))}catch(a){console.warn("Error setting localStorage key “".concat(e,"”:"),a)}}),m=n(()=>{if(!c){console.warn("Tried removing localStorage key “".concat(e,"” even though environment is not a client"));return}let t=a instanceof Function?a():a;window.localStorage.removeItem(e),u(t),window.dispatchEvent(new StorageEvent("local-storage",{key:e}))});r.useEffect(()=>{u(i())},[e]);let g=r.useCallback(a=>{a.key&&a.key!==e||u(i())},[e,i]);return r.useEffect(()=>(window.addEventListener("storage",g),window.addEventListener("local-storage",g),()=>{window.removeEventListener("storage",g),window.removeEventListener("local-storage",g)}),[g]),[d,h,m]}},347:()=>{}},e=>{var a=a=>e(e.s=a);e.O(0,[193,690,105,308,132,441,517,358],()=>a(9817)),_N_E=e.O()}]);