(window.webpackJsonp=window.webpackJsonp||[]).push([[145],{604:function(t,s,e){"use strict";e.r(s);var a=e(21),r=Object(a.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"vue-property-decorator-세팅"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vue-property-decorator-세팅"}},[t._v("#")]),t._v(" vue-property-decorator 세팅")]),t._v(" "),e("ul",[e("li",[e("code",[t._v("vue-property-decorator")]),t._v("를 이용하여 vue + typescript로 토이프로젝트를 진행하였습니다.\n"),e("br"),t._v("배운점과 삽질하며 익힌점들을 정리합니다.")])]),t._v(" "),e("h2",{attrs:{id:"project-생성"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#project-생성"}},[t._v("#")]),t._v(" project 생성")]),t._v(" "),e("ul",[e("li",[t._v("vue-cli를 이용하여 만듭니다")])]),t._v(" "),e("ol",[e("li",[e("code",[t._v("vue create project-name")]),t._v("으로 프로젝트를 생성할 수 있습니다.")]),t._v(" "),e("li",[e("code",[t._v("Manually select features")]),t._v(" 선택")]),t._v(" "),e("li",[e("code",[t._v("typescript")]),t._v(" 선택, "),e("code",[t._v("Babel")]),t._v("선택 안함, 나머지는 개발 방향에 맞춰 선택")]),t._v(" "),e("li",[e("code",[t._v("Use class-style component syntax")]),t._v(" - Y를 눌러서 class 컴포넌트로 개발진행")]),t._v(" "),e("li",[t._v("나머지 default 값 선택")])]),t._v(" "),e("h2",{attrs:{id:"project-파일-설명"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#project-파일-설명"}},[t._v("#")]),t._v(" project 파일 설명")]),t._v(" "),e("h4",{attrs:{id:"tsconfig-json"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#tsconfig-json"}},[t._v("#")]),t._v(" tsconfig.json")]),t._v(" "),e("ul",[e("li",[t._v("typescript 언어로 코드를 작성하고, javascript로 재 빌드하여 기능을 구현하는 방식인데,\n이때 ts파일을 js로 어떻게 바꿀 것인지 설정하는 파일이다.")]),t._v(" "),e("li",[e("code",[t._v("compilerOptions")]),t._v(": 컴파일 하는 옵션")]),t._v(" "),e("li",[e("code",[t._v("target")]),t._v(": 빌드될 js 파일 버전")]),t._v(" "),e("li",[e("code",[t._v("experimentalDecorators")]),t._v(": @ 같은 데코레이터 쓰려면 "),e("code",[t._v("true")])]),t._v(" "),e("li",[e("code",[t._v("paths")]),t._v(": js로 말하면 "),e("code",[t._v("aliases.config.js")]),t._v("같은 느낌 (import shortcut)")]),t._v(" "),e("li",[e("code",[t._v("include")]),t._v(": 하위에 정의된 파일들을 js로 바꾼다 (src/*"),e("em",[t._v("/")]),t._v(".ts)")]),t._v(" "),e("li",[e("code",[t._v("exclude")]),t._v(": 빌드 예외 파일 (node_module)")])]),t._v(" "),e("h4",{attrs:{id:"tslint-json"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#tslint-json"}},[t._v("#")]),t._v(" tslint.json")]),t._v(" "),e("ul",[e("li",[t._v("eslint와 같이 코드 포맷을 일정하게 해주는 파일")]),t._v(" "),e("li",[t._v("설정이 많으니 오피셜 문서를 보면서 그때그때 적용하는게 학습하기 유리하다")])]),t._v(" "),e("h4",{attrs:{id:"데코레이터"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#데코레이터"}},[t._v("#")]),t._v(" 데코레이터")]),t._v(" "),e("ul",[e("li",[t._v("데코레이터도 하나의 함수이며 클래스 컴포넌트에서 사용한다.")]),t._v(" "),e("li",[t._v("vue + ts에서 사용될 아주 중요하고 기초 예제")])]),t._v(" "),e("div",{staticClass:"language-ts extra-class"},[e("pre",{pre:!0,attrs:{class:"language-ts"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" Components"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Vue "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'vue-property-decorator'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//class 스타일의 컴포넌트")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token decorator"}},[e("span",{pre:!0,attrs:{class:"token at operator"}},[t._v("@")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("Component")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Home")]),t._v(" extend Vue "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//class 선언 이후 vue를 상속받고 클래스를 컴포넌트로 사용하기위해 데코레이터 선언")]),t._v("\n")])])]),e("TagLinks"),t._v(" "),e("Comment")],1)}),[],!1,null,null,null);s.default=r.exports}}]);