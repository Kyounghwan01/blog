(window.webpackJsonp=window.webpackJsonp||[]).push([[122],{553:function(t,s,a){"use strict";a.r(s);var n=a(28),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"타입-호환"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#타입-호환"}},[t._v("#")]),t._v(" 타입 호환")]),t._v(" "),a("p",[t._v("타입 호환은 ts 코드에서 특정 타입이 다른 타입과 잘 맞는지를 의미합니다.\n타입에 정의된 속성의 타입을 가지고 타입이 호환되는지를 확인합니다.")]),t._v(" "),a("p",[t._v("구조적 타이핑이라고도 부릅니다.")]),t._v(" "),a("h2",{attrs:{id:"인터페이스에서-타입-호환"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#인터페이스에서-타입-호환"}},[t._v("#")]),t._v(" 인터페이스에서 타입 호환")]),t._v(" "),a("div",{staticClass:"language-tsx extra-class"},[a("pre",{pre:!0,attrs:{class:"language-tsx"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Dev")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  name"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  skill"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Person")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  name"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" developer"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Dev"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" person"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Person"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ndeveloper "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" person"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Property 'skill' is missing in type '{ name: string; age: number; }' but required in type 'Dev'.ts(2741)")]),t._v("\n")])])]),a("p",[t._v("기본적으로 타입 호환은 오른쪽에 있는 타입이 더 많은 속성 및 구조적으로 더 크면 왼쪽과 호환이 됩니다. (부분집합이어야 가능)")]),t._v(" "),a("div",{staticClass:"language-tsx extra-class"},[a("pre",{pre:!0,attrs:{class:"language-tsx"}},[a("code",[t._v("person "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" developer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// developer는 person 타입을 포함함으로 ok")]),t._v("\n")])])]),a("h2",{attrs:{id:"클래스에서-타입-호환"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#클래스에서-타입-호환"}},[t._v("#")]),t._v(" 클래스에서 타입 호환")]),t._v(" "),a("p",[t._v("클래스를 썻을 때도 동일하게 오른쪽에 있는 타입이 왼쪽을 포함하여야 합니다.")]),t._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Dev")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  name"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  skill"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Person")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  name"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"name"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" developer"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Dev"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ndeveloper "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Person")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Property 'skill' is missing in type 'Person' but required in type 'Dev'.ts(2741)")]),t._v("\n")])])]),a("p",[t._v("타입이 맞지 않다록 말하는 것이 "),a("code",[t._v("구조적")]),t._v("이다 라고 부름\ninterface, class 이름에 의해 "),a("code",[t._v("구조")]),t._v("를 판단하는 것이 아니라, 내부의 속성값과 속성값에 대한 타입에 대한 정의에 의해 "),a("code",[t._v("구조")]),t._v("를 판단합니다.")]),t._v(" "),a("h2",{attrs:{id:"함수에서-타입-호환"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#함수에서-타입-호환"}},[t._v("#")]),t._v(" 함수에서 타입 호환")]),t._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("add")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("sum")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" b"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1번과 2번의 차이는 sum 함수 구조 > add 함수 구조")]),t._v("\nadd "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" sum"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Type '(a: number, b: number) => number' is not assignable to type '(a: number) => void'.ts(2322)")]),t._v("\nsum "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" add"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ok")]),t._v("\n")])])]),a("h2",{attrs:{id:"제네릭에서-타입-호환"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#제네릭에서-타입-호환"}},[t._v("#")]),t._v(" 제네릭에서 타입 호환")]),t._v(" "),a("p",[t._v("위와 동일하게 정의된 타입이 더 큰곳이 할당 받을 수 있습니다."),a("br"),t._v("\n두 타입이 다를 경우, 포함하지 않을 경우 할당 불가능합니다.")]),t._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Empty"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("T")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" empty1"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Empty"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" empty2"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Empty"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nempty2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" empty1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nempty1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" empty2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("NotEmpty"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("T")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  data"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("T")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" notempty1"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" NotEmpty"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" notempty2"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" NotEmpty"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nnotempty2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" notempty1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Type 'NotEmpty<string>' is not assignable to type 'NotEmpty<number>'. Type 'string' is not assignable to type 'number'.")]),t._v("\n")])])]),a("TagLinks"),t._v(" "),a("Comment")],1)}),[],!1,null,null,null);s.default=e.exports}}]);