import { act, renderHook } from "@testing-library/react-hooks";
import { useForm } from "../../hooks/useForm";

describe("Pruebas en useForm", () => {
  const initialForm = {
    name: "jorge",
    email: "jorge@jorge.com",
  };

  test("debe de retornar el formulario por defecto", () => {
    const { result } = renderHook(() => useForm(initialForm));

    const [, handleInputChange, reset] = result.current;

    expect(typeof handleInputChange).toBe("function");
    expect(typeof reset).toBe("function");
  });

  test("debde de cambiar el valor del formulario (cambiar nombre)", () => {
    const { result } = renderHook(() => useForm(initialForm));

    const [, handleInputChange, reset] = result.current;

    act(() => {
      handleInputChange({
        target: {
          name: "name",
          value: "beto",
        },
      });
    });

    const [formValues] = result.current;

    expect(formValues).toEqual({ name: "beto", email: 'jorge@jorge.com' });
  });

  test("debe resetear el estado", () => {
    const { result } = renderHook(() => useForm(initialForm));

    const [, handleInputChange, reset] = result.current;

    act(() => {
      handleInputChange({
        target: {
          name: "name",
          value: "beto",
        },
      });

      reset();
    });

    const [formValues] = result.current;

    expect(formValues).toEqual(initialForm);
  });
});
