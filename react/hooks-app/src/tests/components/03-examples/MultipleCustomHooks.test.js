import React from "react";
import { shallow } from "enzyme";
import { MultipleCustomHooks } from "../../../components/03-examples/MultipleCustomHooks";
import { useFetch } from "../../../hooks/useFetch";
import { useCounter } from "../../../hooks/useCounter";

jest.mock("../../../hooks/useFetch");
jest.mock("../../../hooks/useCounter", () => ({
  useCounter: () => [10, jest.fn(), jest.fn(), jest.fn()],
}));

describe("Pruebas en MultipleCustomHooks", () => {
  /* useCounter.mockReturnValue({
    counter: 10,
    increment: () => {},
    decrement: () => {},
    reset: () => {},
  }); */

  test("debe mostrarse correctamente", () => {
    useFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    const wrapper = shallow(<MultipleCustomHooks />);

    expect(wrapper).toMatchSnapshot();
  });

  test("debe de mostrar la informacion", () => {
    useFetch.mockReturnValue({
      data: [
        {
          author: "Jorge",
          quote: "Hola Mundo",
        },
      ],
      loading: false,
      error: null,
    });

    const wrapper = shallow(<MultipleCustomHooks />);
    expect(wrapper.find(".alert").exists()).toBe(false);
    expect(wrapper.find(".mb-0").text().trim()).toBe("Hola Mundo");
    expect(wrapper.find("footer").text().trim()).toBe("Jorge");
  });
});
