import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17211b",
        leaf: "#2f6b45",
        cream: "#f8f6ef",
        saffron: "#e89036"
      }
    }
  },
  plugins: []
};

export default config;
