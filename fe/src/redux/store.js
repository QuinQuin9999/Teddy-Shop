import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/userSlide";
import cartReducer from "./slices/cartSlide";
import collectionReducer from "./slices/collectionSlice"

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ['product'],
};
const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  cart: cartReducer,
  collection: collectionReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);