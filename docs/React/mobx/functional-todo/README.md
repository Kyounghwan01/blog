---
title: mobx functional todolist 만들기
meta:
  - name: description
    content: mobx functional todolist 만들기, react, mobx, state management, mobx, react, async, runInAction, observable, computed, action, autorun
  - property: og:title
    content: mobx functional todolist 만들기
  - property: og:description
    content: mobx functional todolist 만들기, react, mobx, state management, mobx, react, async, runInAction, observable, computed, action, autorun
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/mobx/functional-todo/
tags: ["react", "mobx"]
---

# mobx functional todolist 만들기

기존 mobx-react에 의해 `observer`로 래핑된 함수형 컴포넌트의 경우 hook (useState 등등)을 사용할 경우 `훅은 함수형 컴포넌트에서만 사용할 수 있다`라는 오류를 발생시킵니다.

mobx-react의 `observer`가 클래스 컴포넌트를 리턴하기 때문입니다.

그래서 mobx와 함수형 컴포넌트를 사용하려면 `mobx-react-lite`를 사용합니다.

## mobx-react-lite

`mobx-react-lite`는 함수형 컴포넌트에서만 사용할수 있는 api만을 제공합니다.

그래서 `mobx-react-lite`는 `Provide`, `inject`를 제공하지 않습니다. 그래서 `React.createContext` api를 사용하여 `store`를 만들고, mobx의 store를 사용하고자 하는 컴포넌트에서는 mobx-react-lite의 `observer` 객체로 감싼 후, react의 `useContext`를 이용하여 store에 접근합니다.

이후 `store` 내부의 `action` 함수를 발동시키면 `store` 내부의 `observer`가 변하고, observer 값에 의존하고 있는 `view`가 **리렌더링**됩니다.

아래부터 todolist를 만들어보면서 mobx에 대해 알아봅시다!

## tsconfig.json

가장 먼저 데코레이터를 사용하기 위해 `tsconfig.json`에 아래와 같은 속성을 추가합니다.

```json {17}
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react",
    "experimentalDecorators": true
  },
  "include": ["src"]
}
```

## store

mobx의 저장소인 `store`를 생성합니다.

`observable`로 todos를 생성합니다.

`action`으로는 todo를 더하는 함수, 토글하는 함수, 지우는 함수를 만듭니다.

`computed`로 todo의 전체 수, complete 수, complete하지 않은 수를 리턴합니다.

react의 `createContext`를 이용해 store를 생성합니다.

```ts
// stores/TodoStore.ts
import { observable, action, computed, reaction } from "mobx";
import { createContext } from "react";
import { v4 as uuidv4 } from "uuid";

export interface Todo {
  id?: string;
  title: string;
  completed: boolean;
}

class TodoStore {
  constructor() {
    reaction(
      () => this.todos,
      _ => console.log(this.todos.length)
    );
  }

  @observable todos: Todo[] = [
    { id: uuidv4(), title: "Item #1", completed: false },
    { id: uuidv4(), title: "Item #2", completed: false },
    { id: uuidv4(), title: "Item #3", completed: false },
    { id: uuidv4(), title: "Item #4", completed: false },
    { id: uuidv4(), title: "Item #5", completed: true },
    { id: uuidv4(), title: "Item #6", completed: false }
  ];

  @action addTodo = (todo: Todo) => {
    this.todos.push({ ...todo, id: uuidv4() });
  };

  @action toggleTodo = (id: string) => {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    });
  };

  @action removeTodo = (id: string) => {
    this.todos = this.todos.filter(todo => todo.id !== id);
  };

  @computed get info() {
    return {
      total: this.todos.length,
      completed: this.todos.filter(todo => todo.completed).length,
      notCompleted: this.todos.filter(todo => !todo.completed).length
    };
  }
}

export default createContext(new TodoStore());
```

## components

### AddTodo.tsx

```tsx
// components/AddTodo.tsx
import React, { useContext, useState } from "react";
import TodoStore from "../stores/TodoStore";
import { observer } from "mobx-react-lite";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const todoStore = useContext(TodoStore);
  const { addTodo, info } = todoStore;

  return (
    <>
      <div className="alert alert-primary">
        <div className="d-inline col-4">
          Total items: &nbsp;
          <span className="badge badge-info">{info.total}</span>
        </div>
        <div className="d-inline col-4">
          Finished items: &nbsp;
          <span className="badge badge-info">{info.completed}</span>
        </div>
        <div className="d-inline col-4">
          Unfinished items: &nbsp;
          <span className="badge badge-info">{info.notCompleted}</span>
        </div>
      </div>
      <div className="form-group">
        <input
          className="form-control"
          type="text"
          value={title}
          placeholder="Todo title..."
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <button
          className="btn btn-primary"
          onClick={_ => {
            addTodo({
              title: title,
              completed: false
            });
            setTitle("");
          }}
        >
          Add Todo
        </button>
      </div>
    </>
  );
};

export default observer(AddTodo);
```

### TodoList.tsx

```tsx
// components/TodoList.tsx
import React, { useContext } from "react";
import TodoStore from "../stores/TodoStore";
import { observer } from "mobx-react-lite";

const TodoList = () => {
  const todoStore = useContext(TodoStore);
  const { todos, toggleTodo, removeTodo } = todoStore;
  return (
    <>
      <div className="row">
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Completed?</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.completed ? "✅" : ""}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={_ => toggleTodo(todo.id!)}
                  >
                    Toggle
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={_ => removeTodo(todo.id!)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default observer(TodoList);
```

### App.tsx

```tsx
// ./App.tsx
import React from "react";
import TodoList from "./components/TodoList";
import TodoAdd from "./components/AddTodo";

const App = () => {
  return (
    <div className="container">
      <h1>Todos</h1>
      <TodoAdd />
      <TodoList />
    </div>
  );
};

export default App;
```

## package.json

```json
{
  "name": "mobx-test",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.3.2",
    "@testing-library/user-event": "^7.1.2",
    "@types/jest": "^24.0.0",
    "@types/node": "^12.0.0",
    "@types/react": "^16.9.0",
    "@types/react-dom": "^16.9.0",
    "@types/uuid": "^3.4.6",
    "bootstrap": "^4.4.1",
    "mobx": "^5.15.1",
    "mobx-react-lite": "^1.5.2",
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "react-scripts": "^3.4.0",
    "typescript": "~3.7.2",
    "uuid": "^3.3.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

<TagLinks />

<Comment />
