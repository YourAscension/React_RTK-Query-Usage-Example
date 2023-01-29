import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../products/queries/products-api";

export const store = configureStore({
  reducer: {
    //Подключаем productsApi, указываем название reducer
    [productsApi.reducerPath]: productsApi.reducer,

    //**Здесь могут быть как обычные редьюсеры, так и редьюсеры из RTK Query
  },

  //middleware - логика, которая выполняется в момент запуска Actions до его выполнения
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware),
});
