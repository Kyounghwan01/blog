(window.webpackJsonp=window.webpackJsonp||[]).push([[215],{525:function(t,s,a){"use strict";a.r(s);var n=a(28),r=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"클린코드-작성-팁"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#클린코드-작성-팁"}},[t._v("#")]),t._v(" 클린코드 작성 팁")]),t._v(" "),a("h2",{attrs:{id:"클린코드란"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#클린코드란"}},[t._v("#")]),t._v(" 클린코드란?")]),t._v(" "),a("ul",[a("li",[t._v("타인이 볼때는 내가 이 회사를 나갔을 때, 다음 개발자가 코드를 알아보고 나에게 물어보지 않고 작업에 들어갈 수 있는 코드들")]),t._v(" "),a("li",[t._v("6개월 전에 내가 고민하고 작업한 결과가 아직도 버그 없이 작동되면서, 6개월 후 내가 고민했던 과정이 모두 떠오르는 코드")])]),t._v(" "),a("h2",{attrs:{id:"검색-가능-한-값으로-만들라"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#검색-가능-한-값으로-만들라"}},[t._v("#")]),t._v(" 검색 가능 한 값으로 만들라")]),t._v(" "),a("ul",[a("li",[t._v("상수가 그 값으로 뜻하는 바를 모를때는 변수에 감싸라")]),t._v(" "),a("li",[t._v("상수는 검색이 안되므로 변수로 감싸서 검색 가능한 값으로 만들라")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ONE_DAY_TIME")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("60")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("60")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("24")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Hello"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ONE_DAY_TIME")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"함수명은-동사로-만들라"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#함수명은-동사로-만들라"}},[t._v("#")]),t._v(" 함수명은 동사로 만들라")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("userData")]),t._v(" (x) -> "),a("code",[t._v("loadUserData")]),t._v(" (o)")]),t._v(" "),a("li",[t._v("동사로 함수를 만들면 해당 함수가 해야하는 일을 개발자가 정확히 알 수 있다.\n"),a("ul",[a("li",[t._v("흔히 하나의 함수안에 많은 기능을 하는 로직을 만드는데, 기본적으로 함수 1개에는 1개의 액션만 수행해야한다.")]),t._v(" "),a("li",[t._v("그러므로, 함수명을 동사로 만들면 2가지 이상 액션을 취한 함수 로직을 수행할경우 함수명과 일치하지 않기 때문에, 매우 이상한 형태가 되어 개발자가 알아서 함수내 로직을 분리하게 될 것이다.")])])]),t._v(" "),a("li",[t._v("중요한 것은 "),a("strong",[t._v("함수는 1개의 기능만 사용")]),t._v("해야 읽기가 쉽다는 것이다.")])]),t._v(" "),a("h2",{attrs:{id:"함수의-인자-argument-는-몇-개가-적당한가"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#함수의-인자-argument-는-몇-개가-적당한가"}},[t._v("#")]),t._v(" 함수의 인자 (argument)는 몇 개가 적당한가?")]),t._v(" "),a("ul",[a("li",[t._v("가장 좋은 숫자는 3개 또는 그 이하의 인자를 넘기는 것이 좋다")]),t._v(" "),a("li",[t._v("인자가 3개를 넘을 경우 "),a("code",[t._v("configuration object")]),t._v("를 만들어 객체를 인자로 보내라")]),t._v(" "),a("li",[t._v("3개 이하 인자가 함수의 역할 파악에 좋고, 총 몇개의 인자가 이 함수에 필요한지 알기 쉬운 갯수다")]),t._v(" "),a("li",[t._v("example")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" params "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" id"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" name"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"nkh"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" money"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("buyProduct")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("userData"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" count"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" product")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("userData"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" count"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" product"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("buyProduct")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("params"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"껌"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"불리언-값은-인자로-넘기지-않는다"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#불리언-값은-인자로-넘기지-않는다"}},[t._v("#")]),t._v(" 불리언 값은 인자로 넘기지 않는다.")]),t._v(" "),a("ul",[a("li",[t._v("불리언 값을 보낸다는 의미는 함수 내에서 if, else문을 사용한다는 의미를 가진다")]),t._v(" "),a("li",[t._v("위에서 말한듯, 함수는 1개의 액션만 하는 것이 좋으므로, if 로직 함수, else 로직 함수를 분리하는 것이 좋다.")])]),t._v(" "),a("h2",{attrs:{id:"짧은-변수명이나-축약어는-피해라"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#짧은-변수명이나-축약어는-피해라"}},[t._v("#")]),t._v(" 짧은 변수명이나 축약어는 피해라")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("u")]),t._v(", "),a("code",[t._v("i")]),t._v(" 같은 나만 알아보는 변수명은 쓰지마라")])]),t._v(" "),a("TagLinks"),t._v(" "),a("Comment")],1)}),[],!1,null,null,null);s.default=r.exports}}]);