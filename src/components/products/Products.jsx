import { useState, useEffect } from "react";
import Form from "./form/Form";
import List from "./list/List";

function Products() {
  return (
    <div>
      <div>
        <Form />
      </div>
      <div>
        <List />
      </div>
    </div>
  );
}

export default Products;
