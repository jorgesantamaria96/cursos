import { shallow } from "enzyme";
import { TodoListItem } from "../../../components/08-useReducer/TodoListItem";
import { demoTodos } from "../../fixtures/demoTodos";

describe("Pruebas en el componente <TodoListItem />", () => {
  const handleDelete = jest.fn();
  const handleToggle = jest.fn();

  const wrapper = shallow(
    <TodoListItem
      todo={demoTodos[0]}
      index={0}
      handleDelete={handleDelete}
      handleToggle={handleToggle}
    />
  );

  test("debe de renderizar el componente correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de llamar la función handleDelete", () => {
    wrapper.find("button").simulate("click");
    expect(handleDelete).toHaveBeenCalledWith(demoTodos[0].id);
  });

  test("debe de llamar a la función handleToggle", () => {
    wrapper.find("p").simulate("click");
    expect(handleToggle).toHaveBeenCalledWith(demoTodos[0].id);
  });

  test("debe de mostrar el texto correctamente", () => {
    const p = wrapper.find("p").text().trim();
    expect(p).toBe("1. Aprender React");
  });

  test("debe de tener la clase complete si el todo.done esta en true", () => {
    const todo = demoTodos[0];
    todo.done = true;

    const wrapper = shallow(<TodoListItem todo={todo} />);
    expect(wrapper.find("p").hasClass("complete")).toBe(true);
  });
});
