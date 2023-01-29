import { useState } from "react";
import Button from "../../ui/button/Button";
import Input from "../../ui/input/Input";
import { useAddProductMutation } from "../../../redux/products/queries/products-api";

function Form() {
  const [input, setInput] = useState("");

  const [addProduct, { isError }] = useAddProductMutation();

  const inputHandle = (e) => {
    setInput(e.target.value);
  };

  const addProductHandle = async (e) => {
    e.preventDefault();
    if (input) {
      //unwrap позволяет получить ответ после выполнения действия (например ошибку)
      const response = await addProduct({ name: input }).unwrap;
      setInput("");

      //Получаем promise
      //[[PromiseState]]: "fulfilled"
      //[[PromiseResult]]: Object {id: 13,name: "bread"}
      console.log(response());
    }
  };

  return (
    <form onSubmit={addProductHandle}>
      <Input value={input} onInput={inputHandle} type="text" placeholder="Type here..." />
      <Button>Submit</Button>
    </form>
  );
}

export default Form;
