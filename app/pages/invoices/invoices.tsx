import type { LoaderFunctionArgs } from "react-router";

export async function loader(args: LoaderFunctionArgs) {
  return {};
}

export default function Invoices() {

    return <div>
        <h1>INVOICES</h1>
    </div>;

}