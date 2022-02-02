import { mount } from "enzyme";
import { HerosApp } from "../HerosApp";

describe("Pruebas en el component <HerosApp />", () => {
  const wrapper = mount(<HerosApp />);

  test("debe de mostrar el componente correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
