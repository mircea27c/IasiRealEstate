import sizes from "./sizes";

interface FontConfig {
  family: string;
  sizes: {
    small: string;
    medium: string;
    large: string;
    title: string;
  };
  weights: {
    thin: string;
    regular: string;
    thick: string;
    black: string;
  };
}

const font: FontConfig = {
  family: `font-family: "DM Sans", sans-serif;`,
  sizes: {
    small: `font-size: ${sizes.size10};`,
    medium: `font-size: ${sizes.size18};`,
    large: `font-size: ${sizes.size36};`,
    title: `font-size: ${sizes.size48};`,
  },
  weights: {
    thin: "font-weight: 300;",
    regular: "font-weight: 450;",
    thick: "font-weight: 700;",
    black: "font-weight: 900;",
  },
};

export default font;
