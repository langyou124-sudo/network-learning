import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // 这些页面在挂载后从 localStorage / 浏览器 API 读一次数据：
      // SSR 期间没有 window，只能用 effect 里的 setState。
      // 彻底消除需要改成 useSyncExternalStore，已记入 PLAN 的已知问题，先不阻塞 CI。
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
