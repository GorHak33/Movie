import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          "@primary-color": "#1890ff", // Primary color
          "@border-radius-base": "4px", // Border radius
        },
      },
    },
  },
  resolve: {
    alias: {
      // Fix for Ant Design Less imports
      "antd/dist/antd.less": "antd/dist/antd.less",
      // Swiper fixes if needed
      "swiper/css": "swiper/swiper.min.css",
      "swiper/css/navigation": "swiper/modules/navigation.min.css",
      "swiper/css/pagination": "swiper/modules/pagination.min.css",
      "swiper/modules": "swiper/modules",
    },
  },
});
