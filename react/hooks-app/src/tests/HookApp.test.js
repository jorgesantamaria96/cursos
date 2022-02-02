import { shallow } from "enzyme";
import { HooksApp } from "../HooksApp";

describe("Pruebas sobre el componente <Hookspp />", () => {
  test("debe renderizar el componente correctamente", () => {
    const wrapper = shallow(<HooksApp />);

    expect(wrapper).toMatchSnapshot();
  });
});
