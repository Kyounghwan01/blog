(window.webpackJsonp=window.webpackJsonp||[]).push([[191],{666:function(t,s,a){"use strict";a.r(s);var n=a(21),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"vuepress-utterances-블로그에-github-댓글-추가하기"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vuepress-utterances-블로그에-github-댓글-추가하기"}},[t._v("#")]),t._v(" vuepress + utterances (블로그에 github 댓글 추가하기)")]),t._v(" "),a("p",[t._v("이 글을 오신 분들은 대부분 블로그를 가지고 계시고 댓글을 어떤 앱으로 구현할지 고민하시는 분일 것입니다")]),t._v(" "),a("p",[t._v("저는 2가지 방법 (utterances, disqus)로 구현을 했었는데요 그중 이번 글에서는 utterances로 댓글 시스템을 구현하는 방법에 대해 알아보겠습니다")]),t._v(" "),a("p",[t._v("disqus로 댓글 구현이 궁금하시면 "),a("a",{attrs:{href:"https://kyounghwan01.github.io/blog/Vue/vuepress/vuepress-content",target:"_blank",rel:"noopener noreferrer"}},[t._v("vuePress 댓글 기능 Disqus로 추가하기"),a("OutboundLink")],1),t._v("이 포스팅을 방문해주시면 좋을 것 같습니다 난이도는 utterances, disqus 둘다 쉬우니 취향에 따라서 구현하시면 될꺼 같습니다")]),t._v(" "),a("p",[t._v("utterances의 장점은 github과 연동이 되어 있기 때문에 여러분의 폰에 깃헙 어플을 까시고 issue 알림을 on 하셨다면, 댓글이 달릴 때 마다 알림을 받을 수 있다는 점과 여러분들의 블로그가 개발 블로그라면 방문자들도 개발자일 확률이 매우 높고, 대부분 깃헙 아이디가 있을 테니 댓글이 달릴 가능성이 높다는 점으로 볼 수 있을 것 같습니다")]),t._v(" "),a("h2",{attrs:{id:"utterances-링크-걸-깃헙-리포-생성"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#utterances-링크-걸-깃헙-리포-생성"}},[t._v("#")]),t._v(" utterances 링크 걸 깃헙 리포 생성")]),t._v(" "),a("p",[t._v("먼저 우리의 블로그의 댓글 모음이 될 깃헙 리포를 생성해줍니다 저는 간단히 "),a("code",[t._v("blog-comment")]),t._v("로 새로운 리포를 만들었습니다 (무슨 말인지 모르겠다면 "),a("a",{attrs:{href:"https://github.com/Kyounghwan01/blog-comment",target:"_blank",rel:"noopener noreferrer"}},[t._v("여기"),a("OutboundLink")],1),t._v("를 참조해주세요)")]),t._v(" "),a("p",[t._v("그 다음 Utterances 설치를 위해 "),a("a",{attrs:{href:"https://github.com/apps/utterances",target:"_blank",rel:"noopener noreferrer"}},[t._v("여기"),a("OutboundLink")],1),t._v("에 들어가셔서 여러분 깃헙 계정으로 로그인 하시고 "),a("code",[t._v("install")]),t._v(" 버튼을 눌러주세요")]),t._v(" "),a("h2",{attrs:{id:"댓글-컴포넌트-추가"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#댓글-컴포넌트-추가"}},[t._v("#")]),t._v(" 댓글 컴포넌트 추가")]),t._v(" "),a("p",[t._v("이제 여러분의 vuepress 소스로 이동합니다")]),t._v(" "),a("h3",{attrs:{id:"vuepress-components-comment-vue"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vuepress-components-comment-vue"}},[t._v("#")]),t._v(" .vuepress/components/Comment.vue")]),t._v(" "),a("p",[a("code",[t._v(".vuepress/components/Comment.vue")]),t._v(" 이 경로로 "),a("code",[t._v("Comment.vue")]),t._v(" 파일을 만들어주시고 아래 코드를 복사 붙여넣기 해주세요")]),t._v(" "),a("p",[t._v("이때 주의할 점은 "),a("strong",[a("code",[t._v("repo")]),t._v(" 어트리뷰트에 여러분의 깃헙 이름, 댓글 깃헙 주소가 들어가야 합니다")])]),t._v(" "),a("div",{staticClass:"language-vue extra-class"},[a("pre",{pre:!0,attrs:{class:"language-vue"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("template")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("ref")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("comment"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("template")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script"}},[a("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("mounted")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// script tag 생성")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" utterances "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("createElement")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"script"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    utterances"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("type "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"text/javascript"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    utterances"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("async "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    utterances"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("crossorigin "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"anonymous"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    utterances"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("src "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://utteranc.es/client.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    utterances"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setAttribute")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"issue-term"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"pathname"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// pathname|url|title|og:title 중 택 1")]),t._v("\n    utterances"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setAttribute")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"theme"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"github-light"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// theme 설정 (github-light, github-dark, preferred-color-scheme, github-dark-orange, icy-dark, dark-blue, photon-dark, boxy-light) 중 하나 선택")]),t._v("\n    utterances"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setAttribute")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"repo"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("Kyounghwan01/blog-comment")]),a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 주의!! 사용할 repository")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$refs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("comment"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("appendChild")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("utterances"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("h2",{attrs:{id:"vuepress에-댓글-넣기"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vuepress에-댓글-넣기"}},[t._v("#")]),t._v(" vuepress에 댓글 넣기")]),t._v(" "),a("h3",{attrs:{id:"theme이-없는-경우"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#theme이-없는-경우"}},[t._v("#")]),t._v(" theme이 없는 경우")]),t._v(" "),a("p",[t._v("vuepress에 아무런 theme 작업을 한 적이 없다면 여러분의 "),a("code",[t._v("README.md")]),t._v("에 "),a("code",[t._v("<Comment />")]),t._v("를 원하는 위치에 끼워 넣습니다")]),t._v(" "),a("p",[t._v("아래는 사용 예시입니다")]),t._v(" "),a("div",{staticClass:"language-md extra-class"},[a("pre",{pre:!0,attrs:{class:"language-md"}},[a("code",[a("span",{pre:!0,attrs:{class:"token title important"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("#")]),t._v(" react로 다크모드 만들기")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token title important"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("###")]),t._v(" 블라블라")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token title important"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("####")]),t._v(" 블라블라블라")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("Comment")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n")])])]),a("p",[t._v("이 말은 즉, 모든 포스팅에 "),a("code",[t._v("<Comment />")]),t._v(" 이것을 넣어줘야한다는 뜻입니다")]),t._v(" "),a("p",[t._v("하지만 원하지 않는 곳에는 댓글을 뺄 수 있다는 장점이 있습니다")]),t._v(" "),a("h3",{attrs:{id:"모든-곳에-댓글을-넣고-싶을-때"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#모든-곳에-댓글을-넣고-싶을-때"}},[t._v("#")]),t._v(" 모든 곳에 댓글을 넣고 싶을 때")]),t._v(" "),a("p",[t._v("'아 나는 그냥 매번 "),a("code",[t._v("<Comment />")]),t._v(" 넣기 귀찮으니까 한번에 다 넣어줘' 라고 생각하시면 아래와 같이 따라하시면 됩니다")]),t._v(" "),a("h4",{attrs:{id:"vuepress-theme-layout-vue"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vuepress-theme-layout-vue"}},[t._v("#")]),t._v(" .vuepress/theme/Layout.vue")]),t._v(" "),a("div",{staticClass:"language-vue extra-class"},[a("pre",{pre:!0,attrs:{class:"language-vue"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("template")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("ParentLayout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("Comment")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("ParentLayout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("template")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script"}},[a("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" ParentLayout "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"@parent-theme/layouts/Layout.vue"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Comment "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"../components/Comment"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  components"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    ParentLayout"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    Comment\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("h2",{attrs:{id:"마무리"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#마무리"}},[t._v("#")]),t._v(" 마무리")]),t._v(" "),a("p",[t._v("utterances 셋팅은 정말 간단합니다. 이제 사용자는 깃헙 로그인을 통해 댓글을 남길 수 있고, 댓글을 남기면 우리가 만든 "),a("code",[t._v("blog-comment")]),t._v(" 리포의 "),a("code",[t._v("issue")]),t._v(" 탭에 사용자가 남긴 댓글을 한번에 볼 수 도 있습니다. 또한 필요하다면 특정 포스팅의 댓글 알림도 같이 받을 수 있습니다.")]),t._v(" "),a("p",[t._v("댓글 기능이 정말 잘 진행되는지 확인해보고 싶다면 깃헙 로그인을 통해 아래에 테스트 댓글을 하나 남기고 "),a("a",{attrs:{href:"https://github.com/Kyounghwan01/blog-comment/issues",target:"_blank",rel:"noopener noreferrer"}},[t._v("blog-comment issue"),a("OutboundLink")],1),t._v(" 이곳에 방문하셔서 여러분이 남기신 댓글을 확인해보시면 좋을 것 같습니다!!")]),t._v(" "),a("TagLinks"),t._v(" "),a("Comment")],1)}),[],!1,null,null,null);s.default=e.exports}}]);