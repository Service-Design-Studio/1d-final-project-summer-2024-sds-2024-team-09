"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7639],{65530:function(e,r,t){var n,a=t(41141),o=t(94521),s=t(19841),i=t(92379),l=t(74091),u=t(651);function c(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,n)}return t}function d(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?c(Object(t),!0).forEach(function(r){(0,o.Z)(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}r.Z=i.forwardRef(function(e,r){let{name:t,placeholder:n,type:a,list:o,displayName:l,onChange:c,onFocus:p,onBlur:m,value:b,saveOnBlur:g,icon:h,onInputIconClick:x,className:k,autoComplete:y,autoFocus:v,onPressEnter:w,disabled:j,maxLength:O,color:P="tertiary"}=e,{0:N,1:E}=(0,i.useState)(b),Z=(0,i.useCallback)(e=>{null==m||m(e),g&&E(e.target.value)},[m,g]),D=(0,i.useCallback)(e=>{null==c||c(e),g&&E(e.target.value)},[c,g]),C=(0,i.useCallback)(e=>{"Enter"===e.key&&w&&(e.preventDefault(),w(N))},[w,N]);(0,i.useEffect)(()=>{E(b)},[b]);let W=d(d({},g?{}:{value:b}),g?{value:N}:{});return(0,u.jsxs)("div",{className:(0,s.default)("rounded-md border shadow-none","neutral"===P&&"border-transparent px-3 py-2 focus-within:border-green-500 focus-within:bg-token-main-surface-tertiary focus-within:ring-1 focus-within:ring-transparent hover:bg-token-main-surface-tertiary","tertiary"===P&&"border-token-border-medium px-3 py-2 focus-within:border-token-border-xheavy focus-within:ring-1 focus-within:ring-token-text-secondary","search"===P&&"rounded-xl border-token-border-medium bg-token-main-surface-primary p-4 focus-within:border-token-border-xheavy focus-within:ring-0 dark:border-token-border-medium dark:focus-within:border-token-border-xheavy dark:focus-within:ring-0",k),children:[(0,u.jsx)("label",{htmlFor:t,className:"block text-xs font-semibold text-token-text-primary",children:l}),(0,u.jsxs)("div",{className:(0,s.default)(l&&"mt-1","relative"),children:[(0,u.jsx)("input",d({ref:r,type:a,name:t,id:t,list:o,className:(0,s.default)("block w-full border-0 p-0 placeholder-gray-500 shadow-none outline-none focus-within:shadow-none focus-within:outline-none focus-within:ring-0 focus:border-none focus:ring-0 sm:text-sm",null!=h&&"pr-6","neutral"===P||"search"===P?"bg-transparent":"bg-token-main-surface-primary text-token-text-primary"),placeholder:n,onBlur:Z,onFocus:p,onChange:D,onKeyDown:C,autoComplete:y,autoFocus:v,disabled:j,maxLength:O},W)),null!=h&&(0,u.jsx)(f,{onClick:x,children:(0,u.jsx)(h,{className:"icon-sm"})})]})]})});let f=l.Z.button(n||(n=(0,a.Z)(["absolute right-0 top-1/2 -translate-y-1/2"])))},55775:function(e,r,t){t.d(r,{$3:function(){return d},Ap:function(){return l},CV:function(){return f},GA:function(){return c},Gk:function(){return g},bE:function(){return h},cI:function(){return p},my:function(){return b},qH:function(){return u}});var n=t(21904),a=t(4702),o=t(24040),s=t(92379),i=t(75172);function l(){let e=(0,i.Z)(),r=e.formatMessage(x.adminRoleName),t=e.formatMessage(x.ownerRoleName),a=e.formatMessage(x.standardRoleName);return(0,s.useMemo)(()=>({[n.r3.OWNER]:t,[n.r3.ADMIN]:r,[n.r3.STANDARD]:a}),[t,r,a])}function u(e){let r=(0,i.Z)(),t=null==e?void 0:e.isTeam(),n=null==e?void 0:e.isEnterprise(),a=null==e?void 0:e.isEdu();if(e){if(t)return r.formatMessage(x.teamPlanName);if(n)return r.formatMessage(x.enterprisePlanName);if(a)return r.formatMessage(x.eduPlanName)}return r.formatMessage(x.personalPlanName)}function c(e){return f((0,i.Z)(),e)}function d(){let e=(0,a.t)();return f((0,i.Z)(),e)}function f(e,r){var t;return null==r||r.isPersonalAccount()?e.formatMessage(x.personalWorkspaceTitle):null!==(t=r.data.name)&&void 0!==t?t:e.formatMessage(x.defaultWorkspaceTitle)}function p(){var e,r;let t=(0,o.aF)();return null!==(e=null!==(r=null==t?void 0:t.name)&&void 0!==r?r:null==t?void 0:t.email)&&void 0!==e?e:null}function m(){return(0,o.ec)(e=>{let{workspaces:r}=e;return r})}function b(){var e;let{data:r}=(0,a.rk)();return null!==(e=null==r?void 0:r.accountItems.filter(e=>!e.isDeactivated()))&&void 0!==e?e:[]}function g(e){let r=m().find(r=>r.id===e);return(null==r?void 0:r.role)===n.r3.OWNER}function h(e){let r=m().find(r=>r.id===e);return(null==r?void 0:r.role)===n.r3.ADMIN}let x=(0,t(68306).vU)({defaultWorkspaceTitle:{id:"useWorkspaces.defaultWorkspaceTitle",defaultMessage:"Untitled Workspace"},personalWorkspaceTitle:{id:"useWorkspaces.personalWorkspaceTitle",defaultMessage:"Personal account"},personalPlanName:{id:"useWorkspaces.personalPlanName",defaultMessage:"Personal"},enterprisePlanName:{id:"useWorkspaces.enterprisePlanName",defaultMessage:"Enterprise"},eduPlanName:{id:"useWorkspaces.eduPlanName",defaultMessage:"Edu"},teamPlanName:{id:"useWorkspaces.teamPlanName",defaultMessage:"Team"},adminRoleName:{id:"useWorkspaces.adminRoleName",defaultMessage:"Admin"},ownerRoleName:{id:"useWorkspaces.ownerRoleName",defaultMessage:"Owner"},standardRoleName:{id:"useWorkspacews.standardRoleName",defaultMessage:"Member"}})},71840:function(e,r,t){t.d(r,{Z:function(){return o}});var n=t(19841),a=t(651);function o(e){let{id:r,label:t,checked:o,onChange:s,disabled:i,className:l,labelClassName:u,readOnly:c,labelSide:d="right"}=e,f=t&&(0,a.jsx)("label",{className:(0,n.default)("form-check-label text-token-text-primary",u),htmlFor:r,children:t});return(0,a.jsxs)("div",{className:"form-check flex items-center gap-2",children:["left"===d&&f,(0,a.jsx)("input",{className:(0,n.default)("form-check-input float-left h-4 w-4 appearance-none rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none",i?"cursor-not-allowed":"cursor-pointer",l),type:"checkbox",disabled:i,onChange:s,checked:o,readOnly:c,id:r}),"right"===d&&f]})}},23041:function(e,r,t){t.d(r,{Z:function(){return p}});var n,a,o=t(41141),s=t(19841),i=t(92379),l=t(74091),u=t(73746),c=t(73600),d=t(651);let f=l.Z.div(n||(n=(0,o.Z)(["text-sm rounded-xl p-4 text-token-text-secondary bg-token-main-surface-primary flex items-center gap-3 fruit:rounded-2xl"])));function p(e){let r,{type:t="info",children:n,isDismissible:a=!1,onDismiss:o,className:l,iconClassName:p,isElevated:b=!1}=e,g=(0,u.Q)(),{0:h,1:x}=(0,i.useState)(!1);return h?null:g?("none"!==t&&(r=c.szr),(0,d.jsxs)(m,{$type:t,className:(0,s.default)("flex w-full items-start gap-3 rounded-2xl border text-sm","warning"===t||"danger"===t?"bg-opacity-5":"bg-opacity-10",a?"py-2.5 pl-3 pr-2 md:py-3 md:pl-4 md:pr-3":"px-3 py-2.5 md:p-4",b&&"shadow-xxs",l),children:[r&&(0,d.jsx)(r,{className:(0,s.default)("icon-lg shrink-0",a&&"mt-[2px] md:mt-px",("info"===t||"none"===t)&&"text-token-text-secondary")}),(0,d.jsx)("div",{className:(0,s.default)("grow",a?"pt-[4px] md:pt-[3px]":"pt-[2px]",!r&&"pl-1"),children:n}),a&&(0,d.jsx)("button",{onClick:()=>{x(!0),null==o||o()},className:(0,s.default)("flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-transparent text-token-text-primary",("info"===t||"none"===t)&&"hover:bg-token-main-surface-secondary","danger"===t&&"hover:bg-token-surface-error/10","warning"===t&&"hover:bg-orange-400/10"),children:(0,d.jsx)(c.tPq,{className:"icon-md"})})]})):(0,d.jsxs)(f,{className:(0,s.default)({"border border-token-border-light":!0,"bg-red-100 text-red-700":"danger"===t,"bg-token-main-surface-primary":"danger"!==t},l),children:[(0,d.jsxs)(d.Fragment,{children:["danger"===t?(0,d.jsx)(c.ETw,{className:(0,s.default)("icon-md flex-shrink-0",p)}):(0,d.jsx)(c.szr,{className:(0,s.default)("icon-md flex-shrink-0",p)}),n]}),a&&(0,d.jsx)("button",{onClick:()=>x(!0),className:"ml-auto py-1 pl-1",children:(0,d.jsx)(c.tPq,{className:"icon-md"})})]})}let m=l.Z.div(a||(a=(0,o.Z)(["\n",""])),e=>{let{$type:r}=e;switch(r){case"danger":return"text-token-text-error border-token-surface-error/15 bg-token-surface-error bg-opacity-0";case"warning":return"text-orange-600 bg-orange-400 bg-opacity-0 border-orange-400/15";case"success":return"text-green-500 border-green-500 bg-green-500 bg-opacity-0";default:return"text-token-text-primary border-token-border-light bg-token-main-surface-primary bg-opacity-0"}})},62484:function(e,r,t){t.d(r,{E:function(){return p},u:function(){return m}});var n,a=t(41141),o=t(94521),s=t(17379),i=t(63584),l=t(19841);t(92379);var u=t(74091),c=t(651);let d=["disabled"];function f(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,n)}return t}let p=e=>{let{disabled:r}=e,t=(0,s.Z)(e,d);return r?(0,c.jsx)(c.Fragment,{children:t.children}):(0,c.jsx)(m,function(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?f(Object(t),!0).forEach(function(r){(0,o.Z)(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):f(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}({},t))},m=e=>{let r,t,{label:n,contentClassName:a,customPaddingClassName:o,theme:s="default",cornerRadius:u="lg",side:d="bottom",sideOffset:f=14,align:p="center",alignOffset:m=0,withArrow:g=!0,wide:h=!1,size:x="small",interactive:k=!1,usePortal:y=!0,className:v,children:w,delayDuration:j=300,closeOnOutsideClick:O=!0,open:P,onOpenChange:N}=e;if(!n)return(0,c.jsx)("span",{className:v,children:w});switch(s){case"blue":r="",t="bg-blue-selection";break;case"white":r="",t="bg-white";break;case"default":r="border-white/10 dark:border",t="bg-gray-950"}let E=(0,c.jsxs)(i.VY,{collisionPadding:8,onPointerDownOutside:O?void 0:e=>e.preventDefault(),side:d,sideOffset:f,alignOffset:m,align:p,className:(0,l.default)("relative shadow-xs transition-opacity",o||"px-3 py-2","rounded-".concat(u),r,t,h?"max-w-sm":"max-w-xs",a),children:[(0,c.jsx)("span",{className:(0,l.default)("flex items-center whitespace-pre-wrap text-center font-semibold normal-case text-gray-100",{"text-xs":"xsmall"===x,"text-sm":"small"===x}),children:n}),g&&(0,c.jsx)(i.Eh,{asChild:!0,children:(0,c.jsx)(b,{className:t})})]});return(0,c.jsxs)(i.fC,{delayDuration:j,disableHoverableContent:!k,open:P,onOpenChange:N,children:[(0,c.jsx)(i.xz,{asChild:!0,children:(0,c.jsx)("span",{className:v,children:w})}),y?(0,c.jsx)(i.h_,{children:E}):E]})},b=u.Z.div(n||(n=(0,a.Z)(["relative top-[-4px] h-2 w-2 rotate-45 transform shadow-xs dark:border-r dark:border-b border-white/10"])))},73965:function(e,r,t){t.d(r,{J7:function(){return c},M4:function(){return m},aF:function(){return d},w5:function(){return p},yy:function(){return f}});var n,a,o,s,i,l=t(41141),u=t(74091);let c=u.Z.button(n||(n=(0,l.Z)(["\ntext-token-text-primary border border-transparent inline-flex h-9 items-center justify-center gap-1 rounded-lg bg-white px-3 text-sm dark:transparent dark:bg-transparent\nleading-none outline-none cursor-pointer\nhover:bg-token-main-surface-secondary dark:hover:bg-token-main-surface-secondary\nfocus-visible:bg-token-main-surface-secondary\nradix-state-active:text-token-text-secondary\nradix-disabled:cursor-auto radix-disabled:bg-transparent radix-disabled:text-token-text-tertiary dark:radix-disabled:bg-transparent\n"]))),d=u.Z.div(a||(a=(0,l.Z)(["flex gap-2 items-center m-1.5 rounded p-2.5 text-sm cursor-pointer focus-visible:outline-0 hover:bg-token-main-surface-secondary focus-visible:bg-token-main-surface-secondary radix-disabled:pointer-events-none radix-disabled:opacity-50 group relative"]))),f=(0,u.Z)(d)(o||(o=(0,l.Z)(["hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] dark:hover:bg-token-main-surface-secondary dark:focus-visible:bg-token-main-surface-secondary rounded-md my-0 px-3 mx-2 radix-state-open:bg-[#f5f5f5] dark:radix-state-open:bg-token-main-surface-secondary gap-2.5 py-3"]))),p=u.Z.div(s||(s=(0,l.Z)(["\nmax-w-xs rounded-lg popover bg-token-main-surface-primary shadow-lg will-change-[opacity,transform] radix-side-bottom:animate-slideUpAndFade radix-side-left:animate-slideRightAndFade radix-side-right:animate-slideLeftAndFade radix-side-top:animate-slideDownAndFade\nborder border-token-border-light juice:rounded-2xl juice:py-2\n"]))),m=u.Z.div(i||(i=(0,l.Z)(["popover overflow-auto rounded-xl border border-token-border-light bg-token-main-surface-primary p-2 shadow-xl"])))},24040:function(e,r,t){t.d(r,{F_:function(){return g},aF:function(){return p},e2:function(){return x},ec:function(){return b},m0:function(){return h}});var n=t(94521),a=t(14718),o=t(14816),s=t(21904),i=t(93223),l=t(4702);function u(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,n)}return t}function c(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?u(Object(t),!0).forEach(function(r){(0,n.Z)(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):u(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}async function d(){let e=await i.Z.getMe();return{id:e.id,email:e.email,name:e.name,picture:e.picture,created:e.created}}let f=(0,a.C)({queryKey:["user"],queryFn:d,staleTime:1/0});function p(){return(0,o.a)(f).data}let m={currentWorkspace:null,subscriptionStatus:null,workspaces:[]};function b(e){var r;let t=null!==(r=(0,o.a)(c(c({},(0,l.KP)()),{},{select:e=>{var r,t;let n=(0,l.EI)(e);return{currentWorkspace:null!==(r=null==n?void 0:n.data)&&void 0!==r?r:null,subscriptionStatus:null!==(t=null==n?void 0:n.data.subscriptionStatus)&&void 0!==t?t:null,workspaces:e.accountItems.map(e=>e.data)}}})).data)&&void 0!==r?r:m;return e?e(t):t}let g={hasMultipleWorkspaces:e=>{let{workspaces:r}=e;return r.length>1},isPersonalWorkspace:e=>{let{currentWorkspace:r}=e;return(null==r?void 0:r.structure)===s.CZ.PERSONAL},isBusinessWorkspace:e=>{let{currentWorkspace:r}=e;return null!=r?r.structure===s.CZ.WORKSPACE:void 0},isEnterprisePlan:e=>{let{subscriptionStatus:r}=e;return(null==r?void 0:r.planType)===s.D8.ENTERPRISE},isEduPlan:e=>{let{subscriptionStatus:r}=e;return(null==r?void 0:r.planType)===s.D8.EDU},isEnterpriseOrEduPlan:e=>{let{subscriptionStatus:r}=e;return(null==r?void 0:r.planType)===s.D8.ENTERPRISE||(null==r?void 0:r.planType)===s.D8.EDU},isTeamPlan:e=>{let{subscriptionStatus:r}=e;return(null==r?void 0:r.planType)===s.D8.TEAM},isAdmin:e=>{let{currentWorkspace:r}=e;return null!=r&&r.role===s.r3.ADMIN},isOwner:e=>{let{currentWorkspace:r}=e;return null!=r&&r.role===s.r3.OWNER},workspaceId:e=>{let{currentWorkspace:r}=e;return null!=r?r.id:null},businessWorkspace:e=>{let{currentWorkspace:r}=e;return(null==r?void 0:r.structure)===s.CZ.WORKSPACE?r:void 0},businessWorkspaceId:e=>{let{currentWorkspace:r}=e;return(null==r?void 0:r.structure)===s.CZ.WORKSPACE?r.id:void 0},hasPaidSubscription:e=>{let{subscriptionStatus:r}=e;return null!=r&&r.hasPaidSubscription},wasPaidCustomer:e=>{let{subscriptionStatus:r}=e;return null!=r&&r.wasPaidCustomer},hasCustomerObject:e=>{let{subscriptionStatus:r}=e;return null!=r&&r.hasCustomerObject},hasUnclaimedFreeTrial:e=>{var r;let{currentWorkspace:t}=e;return null==t||null===(r=t.promoData)||void 0===r?void 0:r.has_claimed_free_trial},lastActiveSubscription:e=>{let{subscriptionStatus:r}=e;return null!=r?r.lastActiveSubscription:null},workspaces:e=>{let{workspaces:r}=e;return r},accountUserId:e=>{let{currentWorkspace:r}=e;return null==r?void 0:r.accountUserId}};function h(){let e=(0,l.t)();if(null!=e)return e.hasPlusFeatures()}function x(){var e;return null===(e=(0,l.t)())||void 0===e?void 0:e.data.subscriptionStatus.lastActiveSubscription}},37031:function(e,r,t){t.d(r,{b:function(){return n}});function n(e){let r=Object.values(e);return e=>r.includes(e)}}}]);
//# sourceMappingURL=7639-eb96b772a8d3e8bd.js.map