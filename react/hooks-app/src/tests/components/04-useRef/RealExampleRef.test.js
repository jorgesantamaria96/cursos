import React from "react";
import { RealExampleRef } from "../../../components/04-useRef/RealExampleRef";
import { shallow } from "enzyme";

describe("Pruebas en el componente RealExampleRef", () => {
  const wrapper = shallow(<RealExampleRef />);
  test("debe rebderizar correctamente", () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("MultipleCustomHooks").exists()).toBe(false);
  });

  test("debe de mostrar el componente MultipleCustomHooks", () => {
    wrapper.find("button").simulate("click");

    expect(wrapper.find("MultipleCustomHooks").exists()).toBe(true);
  });
});
