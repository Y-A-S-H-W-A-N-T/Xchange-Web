import { configureStore, combineReducers } from '@reduxjs/toolkit'
import newsReducer from '../slices/newsSlice'
import communitySlice from '../slices/communitySlice'
import roomSlice from '../slices/roomSlice'
import userSlice from '../slices/userSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
    user: userSlice,
    news: newsReducer,
    communities: communitySlice,
    rooms: roomSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})


const persistor = persistStore(store);

export { store, persistor };
