import type { LoaderFunctionArgs } from "react-router";

export async function loader(args: LoaderFunctionArgs) {
  return {};
}

export default function Account() {

    return <div>
        <h1>Account</h1>
    </div>;

}