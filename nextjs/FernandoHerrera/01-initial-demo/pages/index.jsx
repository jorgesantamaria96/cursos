import Link from "next/link";
import { Mainlayout } from "../components/layouts/Mainlayout";

export default function HomePage() {
  return (
    <Mainlayout>
      <h1>Home Page</h1>

      <h1 className={"title"}>
        Ir a <Link href="/about">About</Link>
      </h1>

      <p className={"description"}>
        Get started by editing <code className={"code"}>pages/index.jsx</code>
      </p>
    </Mainlayout>
  );
}
