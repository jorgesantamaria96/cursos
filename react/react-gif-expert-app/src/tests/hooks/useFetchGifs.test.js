import { useFetchGifs } from "../../hooks/useFetchGifs";
import { renderHook } from "@testing-library/react-hooks";

describe("Pruebas en el hook useFetchGifs", () => {
  const category = "Goku";

  test("debe de retornar el estado inicial", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetchGifs(category));
    const { data, loading } = result.current;
    await waitForNextUpdate();

    expect(data).toEqual([]);
    expect(loading).toEqual(true);
  });

  test('debe de retornar un arreglo de imagenes y loading en false', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetchGifs(category));
    await waitForNextUpdate();
    
    const { data, loading } = result.current;

    expect(data.length).toEqual(10);
    expect(loading).toEqual(false);
  })
  
});
