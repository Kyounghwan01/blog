---
title: firebase v9 문법 정리
meta:
  - name: description
    content: firebase v9 문법 정리, firebase, storage, real time database, firestore, hosting
  - property: og:title
    content: firebase v9 문법 정리, firebase, storage, real time database, firestore, hosting
  - property: og:description
    content: firebase v9 문법 정리, firebase, storage, real time database, firestore, hosting
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/firebase/
tags: ["firebase"]
---

# firebase v9 문법 정리

firebase가 8버전에서 9버전으로 올라가면서 문법이 많이 바뀌었습니다. 바뀐 점은 문법이 react hooks스러워졌습니다. hooks을 쓰시는 분들이면 문법이 더 이해하기 쉽게 바뀌어서 저는 개인적으로 바뀐 버전이 더 편했습니다. 그럼 바로 아래에서 fireStore에서 crud, storage에 image 더하고, 삭제하는 법, 페이지네이션, 유니크 값 처리까지 알아보도록 하겠습니다!

## 전제조건

- 라이브러리는 react입니다.
- firebase 프로젝트가 세팅되어 있고 react에 firebase 설정 값이 이미 세팅 되어 있다고 가정합니다.
- firebase 버전은 9이상입니다.

## fireStore database crud

먼저 firebase를 설정하는 config 파일에서 db를 가져옵니다. 저의 경우 설정파일은 아래와 같습니다. 혹시 아직도 환경변수를 코드에 적는 분이 계신다면 보안상 굉장히 위험하니 지금부터라도 dotenv를 사용하시기를 강력히 권고드립니다. (참고: [react에서 dotenv 사용하기](https://kyounghwan01.github.io/blog/React/react-env/))

```ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

// 이 값을 사용합니다.
export const db = getFirestore(app);
```

### create

create기능은 firestore의 `addDoc` 메소드를 사용합니다. 기본적인 문법은 아래와 같습니다.

#### 문법

```ts
addDoc("키를 통해 가져온 db", "payload");
```

#### 예시

위 문법 react 코드에 대입하면 아래와 같이 사용 가능합니다.

```ts
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore/lite";

function App() {
  const usersCollectionRef = collection(db, "users");

  // users 콜렉션에 { name: 'kyounghwan', age: 29 }인 row를 추가합니다.
  const addData = async () => {
    try {
      const res = await addDoc(usersCollectionRef, {
        age: 29,
        name: "kyounghwan"
      });
      console.log(res); // res는 undefined입니다.
    } catch (e) {
      console.log(e);
    }
  };
  return <button onClick={addData}>추가</button>;
}

export default App;
```

### read

read는 `query`, `getDocs`라는 메소드로 가져옵니다. `query`에는 조건을 넣을 수 있는데 제가 사용한 조건만 기술하겠습니다. 이외에도 여러 조건이 있으니 꼭 공식문서를 참조해주세요!

#### 문법

- 먼저 query로 firebase에서 사용하는 query로 변환하고 `getDocs`로 row를 가져옵니다.

```ts
const q = await query(usersCollectionRef);

const data = await getDocs(q);
const newData = data.docs.map(doc => ({
  ...doc.data()
}));
setUsers(newData);
```

#### query 조건 문법

제가 사용한 query 문법은 아래와 같습니다.

- `orderBy(key, 'desc')` : sort 기능으로 desc, ase로 구분합니다. 두가지 이상 조건으로 orderBy를 하는것을 파이어베이스는 bad case로 생각합니다. 그러나 두가지 이상 조건을 걸어야 할때는 firebase에서 `색인`을 추가합니다. (색인 추가 안하면 에러 뜹니다)
- `limit(number)` : 몇개까지 보여줄지 정하는 값
- `where(key, 연산, value)` : filter 기능으로 연산에는 (<, >, >=, <=, !=, ==)가 있습니다. orderBy와 같이 여러 key에서 where을 사용하지 말라고 권고합니다. 사용해야할 때는 `색인`을 추가합니다.
- `startAfter(마지막요소)` : 페이지네이션 기능으로 어느 값 이후 값을 보여줄지 정합니다. 신기하게 value로 숫자를 넣는 것이 아닌 요소값을 넣어야합니다. 사용 방법은 예시에서 확인하시면 됩니다.

```ts
const q = await query(usersCollectionRef);
```

#### 예시

```ts
const q = await query(
  usersCollectionRef,
  where("name", "!=", "Nkh"),
  orderBy("name", "desc"),
  orderBy("age", "desc"),
  limit(1)
);

const data = await getDocs(q);
const newData = data.docs.map(doc => ({ ...doc.data() }));
setUsers(newData);
```

#### 페이지네이션 예시

```ts
const q = await query(usersCollectionRef, limit(2));

const documentSnapshots = await getDocs(q); // 2번까지 가져옴

const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]; // 가장 최근인 2번만 가져옴

const next = query(usersCollectionRef, startAfter(lastVisible), limit(25));

const data = await getDocs(next); // 2번 이후 3번부터 27번까지 가져옴
const newData = data.docs.map(doc => ({ ...doc.data() }));
setUsers(newData);
```

### update

- 업데이트할 데이터를 `doc`라는 메소드로 가져오고 `updateDoc`라는 메소드로 값을 바꿉니다.
- `updateDoc`의 두번째 값으로 기존에 있는 key값을 넣고 value를 넣으면 기존 값이 대체되고, 없는 key와 value를 넣으면 key, value가 추가됩니다. (v8의 경우 `merge: true`라는 속성값을 넣어야했는데 v9부터는 없어진 것 같습니다.)

#### 예시

```ts
import { updateDoc, doc } from "firebase/firestore/lite";
const updateUser = async (id: string, age: number) => {
  // 원하는 데이터 가져옴
  const userDoc = doc(db, "users", id);
  try {
    const res = await updateDoc(userDoc, { age: age + 1 });
    console.log(res); // res는 undefined
  } catch (e) {
    console.log(e);
  } finally {
    console.log("end");
  }
};
```

### delete

delete는 update와 매우 유사합니다. 바로 예제로 들어가겠습니다.

#### 예제

```ts
import { deleteDoc, doc } from "firebase/firestore/lite";

const deleteUser = async (id: string) => {
  const userDoc = doc(db, "users", id);
  try {
    const res = await deleteDoc(userDoc);
    console.log(res); // res는 undefined
  } catch (e) {
    console.log(e);
  } finally {
    console.log("end");
  }
};
```

## storage

storage는 이미지나 동영상을 넣는 저장공간으로 aws의 s3라고 보시면 됩니다. 아래 예시에서는 image 저장에 대한 부분만 다룹니다. 먼저 firebase에 storage를 활성화하고 규칙 탭에 들어가서 아래와 같이 코드를 수정해주세요.

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth == null;
    }
  }
}
```

문법을 별로 설명할 것이 없어서 제가 구현한 코드로 들어가서 설명드리겠습니다. [공식 사이트에 storage 부분](https://firebase.google.com/docs/storage/web/upload-files)을 구현하였습니다. 공식사이트에 코드에 대한 상세한 코멘트가 있으니 참조 부탁드리겠습니다.

```js
import { useState, useEffect, useRef } from "react";
import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from "firebase/storage";

// storage를 가져옵니다. 처음 firebase init하는 코드에 넣지 않아도 됩니다.
const storage = getStorage();

const FileInput = () => {
  const [file, setFile] = useState("");
  const [previewURL, setPreviewURL] = useState("");
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    if (file !== "") {
      setPreview(
        <img className="img_preview" src={previewURL} alt="previewImage" />
      );
    }
    return () => {};
  }, [file, previewURL]);

  const handleFileOnChange = event => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFile(file);
      setPreviewURL(reader.result);

      saveToFirebaseStorage(file);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleFileButtonClick = e => {
    e.preventDefault();
    fileRef.current.click();
  };

  // 여기가 upload 함수입니다.
  const saveToFirebaseStorage = file => {
    const uniqueKey = new Date().getTime();
    const newName = file.name
      .replace(/[~`!#$%^&*+=\-[\]\\';,/{}()|\\":<>?]/g, "")
      .split(" ")
      .join("");

    const metaData = {
      contentType: file.type
    };

    const storageRef = sRef(storage, "Images/" + newName + uniqueKey);
    const UploadTask = uploadBytesResumable(storageRef, file, metaData);
    UploadTask.on(
      "state_changed",
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      error => {
        alert(`error: image upload error ${JSON.stringify(error)}`);
      },
      () => {
        getDownloadURL(UploadTask.snapshot.ref).then(downloadUrl => {
          console.log(`완료 url: ${downloadUrl}`);
        });
      }
    );
  };

  // 여기가 delete 코드입니다.
  const deleteFile = () => {
    const desertRef = sRef(storage, "Images/파일이름을넣어주세요");

    deleteObject(desertRef)
      .then(() => {
        console.log(`delete success`);
      })
      .catch(error => {
        console.log(`delete ${error}`);
      });
  };

  return (
    <div>
      <div className="priveiw-rapping">{preview}</div>
      <div style={{ padding: 10 }}>
        <input
          ref={fileRef}
          hidden={true}
          id="file"
          type="file"
          onChange={handleFileOnChange}
        ></input>

        <button onClick={handleFileButtonClick}>UPLOAD</button>
        <button onClick={deleteFile}>DELETE</button>
      </div>
    </div>
  );
};

export default FileInput;
```

위에서 fireStore와 storage를 알아보았습니다. 이외 추가적으로 더 필요한 기능에 대
해서는 [firebase 공식문서](https://firebase.google.com/docs/build)에서 참조하시길 바라겠습니다. 한국어 버전도 있지만 v9의 경우 전부 번역되지 않아 일부 문서가 v8버전으로 나오기 때문에 영문으로 보시기를 권유드립니다! 부족한 글을 끝까지 읽어주셔서 감사합니다!!

<TagLinks />

<Comment />
