import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
    route("invoices", "pages/invoices/invoices.tsx"),
    route("account", "pages/account/account.tsx"),
    route("new", "pages/new/new.tsx")
] satisfies RouteConfig;
