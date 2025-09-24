import type { Route } from "./+types/home";
import Invoices from "~/pages/invoices/invoices";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
export default function Home() {
  return (
      <Invoices />
  );
}
