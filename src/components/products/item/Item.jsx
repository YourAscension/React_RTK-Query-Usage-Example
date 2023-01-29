import React from "react";
import styles from "./Item.module.css";
import Button from "../../ui/button/Button";

function Item(props) {
  const { id, title, deleteProduct } = props;

  return (
    <div className={styles.itemContainer}>
      <div>
        {id}.{title}
      </div>
      <div>
        <Button onClick={() => deleteProduct(id)}>x</Button>
      </div>
    </div>
  );
}

export default Item;
