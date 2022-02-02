import { mount } from "enzyme";
import { AuthContext } from "../../auth/AuthContext";
import { AppRouter } from "../../routers/AppRouter";

describe("Pruebas en el componente <AppRouter />", () => {
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: false,
    },
  };

  test("debe mostrar el Login si no está autenticado", () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("debe de mostrar el componente de Marvel si está autenticado", () => {
    const contextValue = {
      dispatch: jest.fn(),
      user: {
        logged: true,
        name: "Jorge",
      },
    };

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );

    expect(wrapper.find(".navbar").exists()).toBe(true);
  });
});
