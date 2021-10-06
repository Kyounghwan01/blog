---
title: react-native android 애뮬레이터, 디바이스 세팅
meta:
  - name: description
    content: react-native android 애뮬레이터, 디바이스 세팅
  - property: og:title
    content: react-native android 애뮬레이터, 디바이스 세팅
  - property: og:description
    content: react-native android 애뮬레이터, 디바이스 세팅
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/react-native/android-setting/
tags: ["react-native", "react"]
---

# react-native android 애뮬레이터, 디바이스 세팅

## react-native를 위한 기초 설치

```bash
brew install watchman

npm install -g react-native-cli

xcode 실행 -> preference -> Locations -> Command Line Tools -> 보이는 값 선택 (ex Xcode 12.5)

sudo gem install cocoapods

brew tap AdoptOpenJDK/openjdk

brew install --cask adoptopenjdk/openjdk/adoptopenjdk15
```

## java version 확인

```
/usr/libexec/java_home -V
```

- 여기서 버전이 16 이상이면 아래를 따르고 16이하면 다음으로 넘어가세요.

```bash
1. vim ~/.bash_profile

2. 코드 삽입
export JAVA_HOME=/Library/Java/JavaVirtualMachines/adoptopenjdk-15.jdk/Contents/Home

3. source ~/.bash_profile
```

## 안드로이드 스튜디오 설치

먼저 안드로이드 스튜디오를 설치합니다.

## 안드로이드 환경변수 등록

안드로이드에서 사용할 환경변수를 등록합니다.

```bash
1. vim ~/.bash_profile

2. 아래 코드 삽입
export ANDROID_HOME=/Users/xxx/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

3. source ~/.bash_profile
```

## gradle clean

```
cd android && ./gradlew clean
```

## 안드로이드 폰 연결

- 맥 기준으로 설명드립니다.

1. https://www.android.com/filetransfer/ 여기 들어가서 파일트랜스퍼 설치
2. 핸드폰 개발자 모드켜도 usb 디버깅 on
3. usb 연결 확인.
4. 와이파이가 필요한 기능이 있다면 컴퓨터와 동일한 와이파이에 붙어야합니다.
5. yarn android

## 에러

- 맞닥드린 에러에 대해 설명드립니다.

```bash
error Failed to install the app. Make sure you have the Android development environment set up:


cd android && ./gradlew clean

chmod +x gradlew
```

```bash
Failed to install the app. Please accept all necessary Android SDK licenses using Android SDK Manager: "$ANDROID_HOME/tools/bin/sdkmanager --licenses".
Error: Command failed: ./gradlew app:installDebug -PreactNativeDevServerPort=8081

1. 안드로이드 스튜디오 실행
2. project-name/android 파일 open
3. preferences (cma + ,) -> Appearance & Behavior -> system settings -> android sdk -> sdk tools 클릭 -> google play licensing library 체크 하고 apply 클릭
```

```
> Task :app:processReleaseMainManifest FAILED

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:processReleaseMainManifest'.
> Unable to make field private final java.lang.String java.io.File.path accessible: module java.base does not "opens java.io" to unnamed module @68e332bc

-- java 버전 에러 java --version 쳐서 16이상이면 15로 내림

/usr/libexec/java_home -V 에 16, 15 동시에 있으면 16이 메인 버전이 되는 것 같음 / bash_profile에 아래 추가해서 버전 강제화
export JAVA_HOME=/Library/Java/JavaVirtualMachines/adoptopenjdk-15.jdk/Contents/Home


참고 : https://stackoverflow.com/questions/66696339/first-react-native-app-task-appprocessdebugmainmanifest-failed
```

<TagLinks />

<Comment />
