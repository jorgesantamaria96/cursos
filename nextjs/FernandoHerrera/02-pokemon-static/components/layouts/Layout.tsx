import { FC } from "react";

import Head from "next/head";

interface Props {
  title?: string;
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || "PokemonApp"}</title>
        <meta name="author" content="Jorge Santamaria" />
        <meta name="description" content={`Informacion sobre el Pokemon ${title}`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
      </Head>

      {/* <Navbar /> */}

      <main>{children}</main>
    </>
  );
};
