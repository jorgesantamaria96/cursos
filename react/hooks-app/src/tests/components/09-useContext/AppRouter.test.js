import { mount } from "enzyme";
import React from "react";
import { AppRouter } from "../../../components/09-useContext/AppRouter";
import { UserContext } from "../../../components/09-useContext/UserContex";

describe("Pruebas sobre el componente <AppRouter />", () => {
  const user = {
    id: 1,
    name: "Jorge",
  };

  const wrapper = mount(
    <UserContext.Provider
      value={{
        user,
      }}
    >
      <AppRouter />
    </UserContext.Provider>
  );

  test("debe de renderizar el componente correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
