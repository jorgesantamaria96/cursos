import React from "react";
import { useForm } from "../../hooks/useForm";

export const TodoAdd = ({ handleAddTodo }) => {
  const [{ description }, handleInputChange, reset] = useForm({
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (description.trim().length <= 1) {
      return;
    }

    const newTodo = {
      id: new Date().getTime(),
      desc: description,
      done: false,
    };

    handleAddTodo(newTodo);

    reset();
  };

  return (
    <>
      <h4>Agregar TODO</h4>
      <hr />

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleInputChange}
          placeholder="Aprender..."
          autoComplete="off"
        />

        <button
          className="btn btn-outline-primary mt-1 btn-block"
          type="submit"
        >
          Agregar
        </button>
      </form>
    </>
  );
};
