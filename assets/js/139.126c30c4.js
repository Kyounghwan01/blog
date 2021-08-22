(window.webpackJsonp=window.webpackJsonp||[]).push([[139],{580:function(a,t,s){"use strict";s.r(t);var n=s(28),e=Object(n.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"lazy-loading"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#lazy-loading"}},[a._v("#")]),a._v(" lazy-loading")]),a._v(" "),s("h2",{attrs:{id:"이것을-하는-이유"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#이것을-하는-이유"}},[a._v("#")]),a._v(" 이것을 하는 이유")]),a._v(" "),s("blockquote",[s("p",[a._v("spa의 단점 중 하나는 처음 웹에 진입시 번들해놓은 모든 리소스를 "),s("strong",[a._v("한번에")]),a._v(" 받습니다. 그렇기 때문에 초기 진입 속도가 느리다는 단점을 가지고 있죠.\n그래서 chunk라는 것을 이용해서 초기에 화면에 접근하였을때, 굳이 필요없는 리소스는 그때그때, 받아오자는 원리로 lazy-loading, code splitting을 하는 것입니다.")])]),a._v(" "),s("ul",[s("li",[a._v("lazy loading은 받고자 하는 리소스를 컴포넌트 단위로 분리 시키고, 컴포넌트 혹, 라우트 (vue-route에서 나누는 route) 단위로 해당 라우트, 컴포넌트에 사용자가 진입하면 리소스를 받도록 합니다.")])]),a._v(" "),s("h2",{attrs:{id:"lazy-loading-하기-전"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#lazy-loading-하기-전"}},[a._v("#")]),a._v(" lazy-loading 하기 전")]),a._v(" "),s("ul",[s("li",[a._v("lazy loading을 하기 전, 웹에 진입을 하면 개발자 도구 - Network 탭에 "),s("code",[a._v("chunk-vendors")]),a._v("라는 이름으로 request를 보내는 것이 있습니다.")]),a._v(" "),s("li",[a._v("이 "),s("code",[a._v("chunk-vendors")]),a._v("가 맨처음 리소스를 받는 것입니다.")]),a._v(" "),s("li",[a._v("프로젝트의 규모가 작다면 무시할 정도로 Size가 작지만, 규모가 커지게되면 몇 MB까지 오르게되어 굉장히 초기 로딩이 느리게 되는 거죠")]),a._v(" "),s("li",[a._v("그래서 우리는 이 "),s("code",[a._v("chunk-vendors")]),a._v(" 용량을 나누어 다른 화면에서 리소스를 받도록 할 것입니다.")])]),a._v(" "),s("h2",{attrs:{id:"vue에서-laze-loading"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue에서-laze-loading"}},[a._v("#")]),a._v(" vue에서 laze-loading")]),a._v(" "),s("ol",[s("li",[a._v("chunk를 분리하고자 하는 컴포넌트 혹은 라우트를 정한다")])]),a._v(" "),s("ul",[s("li",[a._v("첫화면에서 굳이 필요 없는 리소스를 파악합니다.")])]),a._v(" "),s("ol",{attrs:{start:"2"}},[s("li",[s("code",[a._v("dynamic import")]),a._v("를 이용하여 분리합니다.")])]),a._v(" "),s("ul",[s("li",[a._v("아래 코드와 같이 컴포넌트를 분리하면 "),s("code",[a._v("webpackChunkName")]),a._v("이 설정되며, 웹팩이 그 기준으로 리소스를 분리하여 빌드합니다.")])]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// routes.js")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[a._v("Sales")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=>")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("import")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v('/* webpackChunkName: "Sales" */')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("'@views/Sales'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" routes "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v(" path"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("'/'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" name"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("'home'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" component"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" Home "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("...")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v(" path"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("'/sales'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" name"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("'Sales'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" component"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" Sales "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("...")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),s("ol",{attrs:{start:"3"}},[s("li",[a._v("분리된 빌드 파일 확인")])]),a._v(" "),s("ul",[s("li",[a._v("위 예시에서는 저는 "),s("code",[a._v("sales")]),a._v("라는 라우트를 분리시켰습니다.")]),a._v(" "),s("li",[s("code",[a._v("yarn build")]),a._v("를 통하여 빌드된 파일을 확인해보면\n"),s("code",[a._v("chunk-vendors")]),a._v("와 더불어 "),s("code",[a._v("sales")]),a._v("라는 파일이 분리되어 빌드 된것을 확인 할 수 있으며, "),s("code",[a._v("chunk-vendors")]),a._v("의 용량이 이전보다 줄어든 것을 확인 할 수 있습니다.")])]),a._v(" "),s("h2",{attrs:{id:"lazy-loading-장점-및-유의점"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#lazy-loading-장점-및-유의점"}},[a._v("#")]),a._v(" lazy-loading 장점 및 유의점")]),a._v(" "),s("ul",[s("li",[a._v("여러개의 webpackChunkName으로 분리하면 그만큼 초기 렌더링 시간은 줄어들 것입니다, 그러나 화면 이동할때마다 리소스를 받기 때문에 사용자 ux적인 면은 좋지 않을 수 있으니, 프로젝트의 특성에 따라 적절하게 분리하는 것이 중요합니다.")]),a._v(" "),s("li",[a._v("리소스를 분리시킴으로 나오는 또다른 장점은 "),s("strong",[a._v("코드가 업데이트")]),a._v("되었을 때입니다.\n리소스가 분리되지 않았다면 코드가 한줄이라도 변하면 다시 용량 큰 청크파일을 받아야하지만, 분리되었다면, 변경된 파일만 다운 받게 되어 그만큼 효율이 좋아집니다.")])]),a._v(" "),s("h2",{attrs:{id:"참고"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#참고"}},[a._v("#")]),a._v(" 참고")]),a._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://router.vuejs.org/guide/advanced/lazy-loading.html",target:"_blank",rel:"noopener noreferrer"}},[a._v("Vue-router"),s("OutboundLink")],1)])]),a._v(" "),s("TagLinks"),a._v(" "),s("Comment")],1)}),[],!1,null,null,null);t.default=e.exports}}]);