(window.webpackJsonp=window.webpackJsonp||[]).push([[137],{591:function(t,s,a){"use strict";a.r(s);var n=a(21),r=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"production-환경에서-console-제거하기"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#production-환경에서-console-제거하기"}},[t._v("#")]),t._v(" production 환경에서 console 제거하기")]),t._v(" "),a("p",[t._v("이번 포스팅에서는 svelte의 production 환경에서 console 제거하는 방법에 대해 알아보겠습니다")]),t._v(" "),a("p",[t._v("운영환경에서는 불필요한 콘솔은 무조건 제거를 해야겠죠 그렇다고 배포전에 프로젝트의 모든 콘솔을 다 제거하는 것도 무리입니다. 다음 개발에서 해당 콘솔이 또 쓰일 수 있기 때문이죠.")]),t._v(" "),a("p",[t._v("그래서 env를 통해 현재 환경에 dev인지 production인지 파악하고 production이면 콘솔 및 warn을 제거하는 방법에 대해 알아보겠습니다")]),t._v(" "),a("p",[t._v("그전에 package를 설치합니다")]),t._v(" "),a("h2",{attrs:{id:"rollup-plugin-alias-설치"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rollup-plugin-alias-설치"}},[t._v("#")]),t._v(" @rollup/plugin-alias 설치")]),t._v(" "),a("p",[t._v("svelte는 devDependencies에 패키지를 설치한다는 점을 유의하시기 바랍니다")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("yarn add -D @rollup/plugin-strip\n")])])]),a("h2",{attrs:{id:"rollup-config-js-수정"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rollup-config-js-수정"}},[t._v("#")]),t._v(" rollup.config.js 수정")]),t._v(" "),a("p",[t._v("위와 같이 설치했다면 "),a("code",[t._v("plugins")]),t._v(" 배열에 설치한 plugin-strip를 실행해줍니다")]),t._v(" "),a("p",[t._v("아래 코드와 같이 작성해주세요")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" strip "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"@rollup/plugin-strip"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// production 환경이면 true, dev 환경이면 false")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" production "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("process"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("env"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ROLLUP_WATCH")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("\n  plugins"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// production 일때 svelte 또는 js 파일내에 쓰이는 console, assert는 모두 제거한다")]),t._v("\n    production "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("strip")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        include"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"**/*.(svelte|js)"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"console.*"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"assert.*"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("TagLinks"),t._v(" "),a("Comment")],1)}),[],!1,null,null,null);s.default=r.exports}}]);