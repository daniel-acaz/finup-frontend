import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  
  layout("layouts/PublicLayout.tsx", [
    route("login", "pages/login/login.tsx"),
  ]),
  
  layout("layouts/ProtectedLayout.tsx", [
    route("invoices", "pages/invoices/invoices.tsx"),
    route("account", "pages/account/account.tsx"),
    route("new", "pages/new/new.tsx")
  ]),

] satisfies RouteConfig;