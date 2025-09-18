import type { Route } from "./+types/home";
import { New } from "../pages/new/new";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
export default function Home() {
  return (
      <New />
  );
}
