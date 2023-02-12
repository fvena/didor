// eslint-disable-next-line import/no-unresolved
import { defineConfig } from "vitest/config";
import Vue from "@vitejs/plugin-vue";

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [
    Vue({
      reactivityTransform: true,
    }),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    outputFile: `./tests-report.xml`,
    coverage: {
      all: true,
      include: ["**/*.{js,ts,vue}"],
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/.{idea,git,cache,output,temp}/**",
        "**/*.{config.ts,d.ts}",
        "**/*.{test,spec}.{js,ts}",
        "**/{index, main}.{js,ts}",
        "tools/style-guide",
      ],
    },
    reporters: "junit",
  },
});
