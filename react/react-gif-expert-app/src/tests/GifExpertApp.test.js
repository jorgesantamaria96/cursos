import { shallow } from "enzyme";

import GifExpertApp from "../GifExpertApp";

describe("Pruebas en <GifExpertApp />", () => {
  test("debe de mostrarse correctamente", () => {
    const wrapper = shallow(<GifExpertApp />);

    expect(wrapper).toMatchSnapshot();
  });

  test("debe demostrar una lista de categorias", () => {
    const categories = ["Messi", "Dragon Ball"];
    const wrapper = shallow(<GifExpertApp defaultCategories={categories} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("GifGrid").length).toBe(categories.length);
  });
});
