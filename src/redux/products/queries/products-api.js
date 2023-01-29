import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  //название reducer
  reducerPath: "productsApi",

  //Конкретизируем с какими сущностями работаем в этом API
  tagTypes: ["Products"],
  //Базовый запрос, т.е. основная ссылка
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),

  //endpoints - параметры, которые будем присоединять к базовому URL
  endpoints: (builder) => ({
    //После вызова getProducts URL Будет выглядеть так: http://localhost:3001/products
    getProducts: builder.query({
      //limit - параметры для лимитирования. Если параметров нет, то лимит не добавится
      //значение limit - то, что мы указали в качестве аргумента при вызове useGetProductsQuery
      query: (limit = "") => `/products?${limit && `_limit=${limit}`} `,
      //На этапе получения товаров уточняем с чем мы работаем, устанавливаем теги
      providesTags: (result) =>
        result
          ? //Для каждого полученного элемента устанавливаем тег Products, обращаясь к их id.
            [...result.map(({ id }) => ({ type: "Products", id })), { type: "Products", id: "LIST" }]
          : //Если элементов нет, то просто сообщаем к чему относятся эти данные
            [{ type: "Products", id: "LIST" }],
    }),

    //При работе с данными используется mutation
    addProduct: builder.mutation({
      //body - структура данных, которую хотим добавить
      query: (newProduct) => ({
        url: "products",
        method: "POST",
        body: newProduct,
      }),
      //Указываем для какого тега это действие
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
  }),
});

//Экспортируем хуки экшенов
export const { useGetProductsQuery, useAddProductMutation, useDeleteProductMutation } = productsApi;
