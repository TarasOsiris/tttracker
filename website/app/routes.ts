import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("drills", "routes/drills.tsx"),
  route("drills/:slug", "routes/drill.tsx"),
] satisfies RouteConfig;
