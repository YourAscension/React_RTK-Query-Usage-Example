import { useState } from "react";
import styles from "./List.module.css";
import Item from "../item/Item";
import { useGetProductsQuery, useDeleteProductMutation } from "../../../redux/products/queries/products-api";

function List() {
  //Делаем управляемый select
  const [count, setCount] = useState("");
  //При вызове хука происходит запрос к серверу на адрес http://localhost:3001/products
  //Хук возвращает данные - data
  //А также разные статусы: isLoading, isError и т.д.

  //Указываем переменную select count, чтобы задать параметр limit
  const { data = [], isLoading } = useGetProductsQuery(count);

  const [deleteProduct] = useDeleteProductMutation();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  const deleteProductHandle = async (id) => {
    console.log("Clicked");
    await deleteProduct(id).unwrap();
  };

  const products = data.map((product) => (
    <Item deleteProduct={deleteProductHandle} key={product.id} id={product.id} title={product.name} />
  ));

  return (
    <div>
      <div>
        <select value={count} onChange={(e) => setCount(e.target.value)}>
          <option value="">All</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </div>
      <div className={styles.listContainer}>{products}</div>
    </div>
  );
}

export default List;
