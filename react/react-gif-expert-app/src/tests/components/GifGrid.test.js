import { shallow } from "enzyme";
import { GifGrid } from "../../components/GifGrid";
import { useFetchGifs } from "../../hooks/useFetchGifs";

describe("Pruebas en <GridGif />", () => {
  const category = "Goku";

  test("debe mostrar el componente correctamente", () => {
    const wrapper = shallow(<GifGrid category={category} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de mostrar items cuando se cargan las imagenes useFetchGifs", () => {

    const wrapper = shallow(<GifGrid category={category} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('p').exists()).toBe(true);
    expect(wrapper.find('GifGridItem').length).toBe(0);
  });
});
