(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[43,8086],{4171:function(e,t,n){"use strict";n.r(t),n.d(t,{GizmoChatWithRedirect:function(){return y},__N_SSP:function(){return z},default:function(){return b}});var r=n(94521),i=n(34678),s=n(40876),o=n(82823),l=n(46868),a=n(40806),c=n(80006),u=n(44254),d=n(73570),g=n(4702),f=n(43128),h=n.n(f),x=n(92379),p=n(62984),m=n(651);function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?j(Object(n),!0).forEach(function(t){(0,r.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var z=!0;function b(e){let t=(0,f.useRouter)().query.gizmoId;switch(e.kind){case"anon_gizmo":return(0,m.jsx)(s.X,{gizmo:e.gizmo},t);case"chat_page":return(0,x.createElement)(y,v(v({},e),{},{key:t,gizmoId:t}))}}function y(e){let{data:t,error:n}=(0,o.b9)(e.gizmoId),r=(0,g.t)(),s=null==r?void 0:r.canInteractWithGizmos();return((0,x.useEffect)(()=>{null==t&&null!=n&&h().push((0,d.M5)(d.LT.GIZMO_NOT_FOUND))},[t,n]),null!=n&&s)?(0,m.jsx)(w,{}):!1===s?(0,m.jsx)(O,{gizmo:t}):(0,x.createElement)(i.ZP,v(v({},e),{},{key:e.gizmoId}))}function w(){return(0,m.jsx)(a.Z,{children:(0,m.jsxs)("div",{className:"flex h-full w-full flex-col items-center justify-center",children:[(0,m.jsx)("div",{className:"font-bold",children:(0,m.jsx)(p.Z,{id:"gizmo.loadError",defaultMessage:"We're having trouble loading this GPT."})}),(0,m.jsx)(p.Z,{id:"gizmo.loadErrorRefresh",defaultMessage:"Please refresh the page, or try again later"})]})})}function O(e){let{gizmo:t}=e;return(0,m.jsx)(a.Z,{children:(0,m.jsx)(l.r,{gizmo:t,children:(0,m.jsxs)("div",{className:"mt-7 flex flex-col gap-4",children:[(0,m.jsx)(c.p,{onClick:()=>(0,u.MG)("Gizmo page upsell button"),children:(0,m.jsx)(p.Z,{id:"gizmo.upsell",defaultMessage:"Sign up to chat"})}),(0,m.jsx)("div",{className:"text-sm text-token-text-tertiary",children:(0,m.jsx)(p.Z,{id:"gizmo.loginUpsell",defaultMessage:"Sign up or Log in to chat"})})]})})})}},40876:function(e,t,n){"use strict";n.d(t,{S:function(){return v},X:function(){return j}});var r=n(55257),i=n(82823),s=n(2915),o=n(18454),l=n(48580),a=n(19841),c=n(40319),u=n.n(c),d=n(92379),g=n(62984),f=n(5443),h=n(46868),x=n(69817),p=n(80006),m=n(651);function j(e){var t;let{gizmo:n}=e,r=(0,i.i6)(n),{0:a,1:c}=(0,d.useState)(!1),u=null===(t=(0,l.sB)("chatgpt-dsa-reporting"))||void 0===t?void 0:t.value,f=(0,o.b)();return(0,m.jsxs)("div",{className:"flex h-full flex-col",children:[(0,m.jsx)(s.N,{gizmo:n}),(0,m.jsx)(v,{redirectUrl:r}),(0,m.jsxs)("div",{className:"flex grow flex-col items-center justify-center p-2",children:[(0,m.jsx)(h.r,{gizmo:n,isAnon:!0,children:(0,m.jsxs)("div",{className:"mt-7 flex flex-col items-center gap-4",children:[(0,m.jsx)(p.p,{onClick:()=>f({callbackUrl:r}),children:(0,m.jsx)(g.Z,{id:"gizmo.anonLandingPage.login",defaultMessage:"Sign up to chat"})}),(0,m.jsxs)("div",{className:"flex gap-2 whitespace-nowrap text-sm text-token-text-tertiary",children:[(0,m.jsx)("div",{children:(0,m.jsx)(g.Z,{id:"gizmo.anonLandingPage.loginSubtext",defaultMessage:"Sign up or Log in to chat"})}),u&&(0,m.jsxs)(m.Fragment,{children:["|",(0,m.jsx)("div",{onClick:()=>c(!0),className:"cursor-pointer",children:(0,m.jsx)(g.Z,{id:"gizmo.anonLandingPage.report",defaultMessage:"Report illegal content"})})]})]})]})}),a&&(0,m.jsx)(x.W,{onClose:()=>c(!1),gizmoId:n.gizmo.id})]})]})}function v(e){let{redirectUrl:t,className:n}=e,r=(0,o.b)();return(0,m.jsxs)("div",{className:(0,a.default)("flex items-center justify-between px-7 py-4",n),children:[(0,m.jsx)(z,{}),(0,m.jsx)(f.z,{color:"primary",onClick:()=>r({callbackUrl:t}),children:(0,m.jsx)(g.Z,{id:"gizmo.anonLandingPage.signup",defaultMessage:"Sign up"})})]})}function z(){return(0,m.jsx)(u(),{href:"/",children:(0,m.jsx)(r.nI,{className:"h-8 w-8"})})}},69817:function(e,t,n){"use strict";n.d(t,{W:function(){return x},i:function(){return p}});var r=n(21904),i=n(82823),s=n(86021),o=n(23653),l=n(48580),a=n(92379),c=n(75172),u=n(62984),d=n(49217),g=n(7050),f=n(70604),h=n(651);function x(e){let{gizmoId:t,onClose:n}=e,{data:s}=(0,i.b9)(t),{data:l}=(0,o.sQ)(r.CD.Gizmo),a=(0,c.Z)(),u=(0,o.gm)(a,t,r.CD.Gizmo);if(null==l)return null;let d=null!=s?"Report ".concat(s.gizmo.display.name):"Report";return(0,h.jsx)(f.UM,{reasons:l.reasons,submitReport:u,title:d,onClose:n,header:l.header,subHeader:l.header_explanation})}function p(e){var t,n,r;let{gizmoId:i,clientThreadId:o,onClose:p}=e,m=(0,c.Z)(),j=null===(t=(0,l.sB)("chatgpt-dsa-reporting"))||void 0===t?void 0:t.value,v=null===(n=(0,l.sB)("conversations_are_reportable"))||void 0===n?void 0:n.value,z=(0,s.XK)(o),b=null===(r=(0,l.sB)("chatgpt-conversation-report-flow"))||void 0===r?void 0:r.value,{0:y,1:w}=(0,a.useState)();return j&&v&&"gpt"!==y&&b&&null!=z?"conversation"===y?(0,h.jsx)(g.E,{serverThreadId:z,onClose:p}):(0,h.jsxs)(d.Z,{title:m.formatMessage({id:"gizmo.report.selectorModal.title",defaultMessage:"Report"}),onClose:p,isOpen:!0,showCloseButton:!0,type:"success",children:[(0,h.jsx)(f.Rh,{header:m.formatMessage({id:"gizmo.report.selectorModal.header",defaultMessage:"What would you like to report?"})}),(0,h.jsxs)(f._4,{children:[(0,h.jsx)(f.Ag,{onClick:e=>{e.preventDefault(),w("conversation")},children:(0,h.jsx)(u.Z,{id:"gizmo.report.selectorModal.conversation",defaultMessage:"The conversation"})}),(0,h.jsx)(f.Ag,{onClick:e=>{e.preventDefault(),w("gpt")},children:(0,h.jsx)(u.Z,{id:"gizmo.report.selectorModal.gpt",defaultMessage:"The GPT"})})]})]}):(0,h.jsx)(x,{gizmoId:i,onClose:p})}},40806:function(e,t,n){"use strict";n.d(t,{Z:function(){return f}});var r=n(2027),i=n(1e4),s=n(59585),o=n(43128),l=n.n(o),a=n(37968),c=n(65034),u=n(73746),d=n(9085),g=n(651);function f(e){let{children:t,header:n}=e,o=(0,u.Q)();return(0,g.jsxs)(i.Z,{mobileHeaderRightContent:null,sidebar:(0,g.jsxs)(s.ZP,{navHeader:o?(0,g.jsx)(a.$,{className:"flex h-14 items-center",onNewThread:()=>l().push("/"),historyDisabled:!1}):null,children:[(0,g.jsx)(d.Dy,{}),(0,g.jsx)(r.Z,{activeId:void 0})]}),children:[n,(0,g.jsx)(c.Z,{children:t})]})}},33493:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/g/[gizmoId]",function(){return n(4171)}])}},function(e){e.O(0,[3391,7349,9207,6271,4984,6441,8868,5257,7639,6797,5943,5815,5904,7647,2888,9774,179],function(){return e(e.s=33493)}),_N_E=e.O()}]);
//# sourceMappingURL=[gizmoId]-be21d205ee8edbaa.js.map