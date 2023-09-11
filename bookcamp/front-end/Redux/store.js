// 在 App.js 文件中，使用 Provider 组件来包裹你的应用，并将创建的 Redux store 作为 Provider 的 store 属性。
// 使用 redux-persist 的 PersistGate 组件来包裹你的应用，以确保应用的 UI 不会在数据从本地存储中加载之前渲染。
// 使用 useDispatch 和 useSelector hooks 来与 Redux store 进行交互。
// 使用 dispatch 发送 action 更新 store。
// 使用 useSelector 获取 store 中的数据。


import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from 'redux-thunk';

let defaultState = {
  book: [],
  order: [],
}

// state ={} 是一個初始值
const cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "NEW_BOOK":
      return { ...state, book: action.payload };
    case "Order":
      return { ...state, order: action.payload };
    default:
      return state;
  }
};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

const persistor = persistStore(store); //用於持久化 Redux store 中的數據

export { store, persistor };