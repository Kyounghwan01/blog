(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{456:function(t,e,a){"use strict";a.r(e);var v=a(21),s=Object(v.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"인터넷-강의-동영상-배속-빠르게-하는-방법"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#인터넷-강의-동영상-배속-빠르게-하는-방법"}},[t._v("#")]),t._v(" 인터넷 강의, 동영상 배속 빠르게 하는 방법")]),t._v(" "),a("p",[t._v("우리가 흔히 보는 넷플렉스는 배속이 있는데, 왓챠의 경우는 배속이 없어 1배속으로만 감상해야합니다. 또한 대학 인터넷 강의도 교수님의 천천히 느린 강의를 그대로 듣고 있어야하죠")]),t._v(" "),a("p",[t._v("하지만 이번 포스팅을 따라오시면 간단하게 동영상을 원하는 배속으로 바꿀 수 있습니다")]),t._v(" "),a("p",[t._v("원리는 html의 video tag와 개발자 도구의 console 기능을 이용하여 바꾸는 것입니다")]),t._v(" "),a("h2",{attrs:{id:"사용법"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#사용법"}},[t._v("#")]),t._v(" 사용법")]),t._v(" "),a("p",[t._v("결론만 말씀드리면 우리가 콘솔에 작성해야하는 코드는 단 한줄입니다")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementsByTagName")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"video"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("playbackRate "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("원리를 설명해드리면 대부분의 스트리밍 사이트 (youtube, netflix, watcha 등등)은 html의 video 태그를 이용하여 동영상을 재생시키고 있습니다")]),t._v(" "),a("p",[t._v("이 video에는 "),a("code",[t._v("playbackRate")]),t._v("라는 property를 가지고 있습니다 이 property는 배속을 담당하는 속성이구요")]),t._v(" "),a("p",[t._v("그래서 우리는 이 속성을 조작하여 배속 기능을 실행할 수 있는 것입니다")]),t._v(" "),a("h3",{attrs:{id:"사용방법은-간단합니다"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#사용방법은-간단합니다"}},[t._v("#")]),t._v(" 사용방법은 간단합니다")]),t._v(" "),a("ol",[a("li",[t._v("먼저 재생하는 동영상을 실행합니다")]),t._v(" "),a("li",[a("code",[t._v("F12")]),t._v(" 또는 "),a("code",[t._v("option + command + i")]),t._v("를 눌러서 개발자 도구를 띄웁니다")]),t._v(" "),a("li",[t._v("상단에 "),a("code",[t._v("Console")]),t._v("을 누르시고 나오는 커서에 "),a("code",[t._v('document.getElementsByTagName("video")[0].playbackRate = 2;')]),t._v("를 입력하고 enter를 누릅니다")]),t._v(" "),a("li",[t._v("위 과정을 정상적으로 따라오시면 영상이 2배속으로 재생됩니다")])]),t._v(" "),a("h3",{attrs:{id:"만약"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#만약"}},[t._v("#")]),t._v(" 만약")]),t._v(" "),a("p",[t._v("만약 영상이 제대로 배속되지 않는다면 video 태그가 문제가 있을 수 있습니다 아래와 같은 방법으로 재시도 해보세요")]),t._v(" "),a("ol",[a("li",[a("code",[t._v('document.getElementsByTagName("video")')]),t._v("를 콘솔에 입력하여 "),a("code",[t._v("HTMLCollection [video.video-stream.html5-main-video]")]),t._v("이 값에 "),a("code",[t._v("[]")]),t._v("내부 값이 몇개인지 확인해봅니다")]),t._v(" "),a("li",[t._v("만약 위 값이 없을 경우 해당 사이트는 video 태그를 사용하지 않기 때문에 이번 포스팅에서 말씀드린 방법으로 배속을 진행 할 수 없습니다.")]),t._v(" "),a("li",[t._v("1개 이상인 경우 html을 할 줄 아신다면 현재 재생되는 동영상의 video 태그를 찾아서 "),a("code",[t._v("playbackRate")]),t._v(" 값을 수정해주세요")]),t._v(" "),a("li",[t._v("만약 html을 모르신다면 "),a("code",[t._v('document.getElementsByTagName("video")[0].playbackRate = 2;')]),t._v(", "),a("code",[t._v('document.getElementsByTagName("video")[1].playbackRate = 2;')]),t._v(", "),a("code",[t._v('document.getElementsByTagName("video")[2].playbackRate = 2;')]),t._v(" 등 video 뒤의 "),a("code",[t._v("[0]")]),t._v("숫자를 하나씩 증가시켜서 차례로 실행시키시면 video 배속이 될것입니다!")])]),t._v(" "),a("TagLinks"),t._v(" "),a("Comment")],1)}),[],!1,null,null,null);e.default=s.exports}}]);