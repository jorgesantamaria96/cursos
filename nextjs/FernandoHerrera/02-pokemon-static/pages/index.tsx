import { GetStaticProps } from "next";
import { Button } from "@nextui-org/react";
import type { NextPage } from "next";
import { Layout } from "../components/layouts";
import pokeApi from "../api/pokeApi";

const HomePage: NextPage = (props) => {
  console.log({ props });
  return (
    <Layout title="Listado de Pokemons">
      <Button color="gradient">Hola Mundo</Button>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get("/pokemon?limit=150");

  return {
    props: {
      pokemons: data.results,
    },
  };
};

export default HomePage;
