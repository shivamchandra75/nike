// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve("index.html"),
        result: resolve("src/result/result.html"),
        men: resolve("src/men/men.html"),
        women: resolve("src/women/women.html"),
        exclusive: resolve("src/exclusive/exclusive.html"),
        cart: resolve("src/cart/cart.html"),
        product: resolve("src/product/product.html"),
      },
    },
  },
});
