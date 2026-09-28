import type { Config } from "@react-router/dev/config";
import { drills } from "./app/content/drills";

export default {
  ssr: false,
  async prerender() {
    return ["/", "/drills", ...drills.map((d) => `/drills/${d.slug}`)];
  },
} satisfies Config;
