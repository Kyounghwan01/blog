---
title: react-native fastlane ios 인증서 갱신
meta:
  - name: description
    content: react-native fastlane ios 인증서 갱신, react-native, ios, fastlane, certs, profile, appstore
  - property: og:title
    content: react-native fastlane ios 인증서 갱신, react-native, ios, fastlane, certs, profile, appstore
  - property: og:description
    content: react-native, ios, fastlane, certs, profile, appstore
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/react-native/ios-cert/
tags: ["react-native", "react"]
---

# ios 인증서 갱신
- fastlane은 ios 인증서를 자동 갱신하는 기능이 있긴하다. 그러나 나의 경우 앱 1개만 관리하고 있어서 1년에 한번만 갱신하면 되기에 굳이.... 자동갱신을 알아보려고 하지 않았다. 그래서 아래와 같은 방법을 이용하면 쉽게 갱신 할 수 있다.
- certificates가 만료된 경우라면 `bundle exec fastlane match nuke` 명령어를 이용해 해당 cert를 갱신해주도록 하자
- 아래는 fastlane으로 배포를 한다고 가정하고, cert는 git에 올라가 있다고 가정한 상태이다. (간단히 말하면 만료된 인증서를 삭제하고 재발급한다)

## 1. profile 지우기
- 먼저 애플 디벨로퍼에 들어가서 만료된 profile을 지워준다.

<img width="400" alt="image" src="https://github.com/user-attachments/assets/750d445c-fe52-4d93-a736-0e6ef27a7b3d" />

## 2. fastlane의 cert파일이 올라가있는 git주소로 들어가서 certs 폴더를 삭제한다.
- fastlane ios 배포 코드가 아래와 같은데 이때 적은 깃리포로 들어간다.
- fastlane match를 이용해 만든경우 certs 폴더가 있다. 그 폴더를 지워준다 (어짜피 만료된 인증서라 필요없다)
```
desc "Push a new beta build to the TestFlight"
  lane :beta do
    match(type: "appstore", git_url: "https://github.com/xxx/ios-cert")
    build_app(
      workspace: "aaa.xcworkspace",
      scheme: "aaa",
      export_method: "app-store",
      configuration: 'Release'
    )
  end
```

## 3. react-native 프로젝트에서 인증서 다시 만든다
- react-native 프로젝트의 ios 폴더로 이동하여 ios 인증서를 다시 만든다
```
bundle exec fastlane match appstore --force
또는
fastlane match appstore --force
```
- 다시 만들면 1번에서 보았던 profile 리스트 화면에서 `match AppStore xxx` 라는 이름으로 profile이 만들어졌는지 확인한다.

## 4. pod install 하고 배포하기

<TagLinks />

<Comment />
