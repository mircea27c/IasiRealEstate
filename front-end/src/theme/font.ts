import sizes from "./sizes";
import { BREAKPOINT_MOBILE } from "./responsiveSizes";

interface FontConfig {
  family: string;
  sizes: {
    small: string;
    medium: string;
    large: string;
    title: string;
    header: string;
  };
  weights: {
    thin: string;
    regular: string;
    thick: string;
    black: string;
  };
}

const getResponsiveFontSize = (desktopSize: string, mobileSize: string) => `
  font-size: ${desktopSize};
  @media (max-width: ${BREAKPOINT_MOBILE}){
    font-size: ${mobileSize};
  }
`;

const font: FontConfig = {
  family: `font-family: "DM Sans", sans-serif;`,
  sizes: {
    small: getResponsiveFontSize(sizes.size14, sizes.size12),
    medium: getResponsiveFontSize(sizes.size18, sizes.size14),
    large: getResponsiveFontSize(sizes.size24, sizes.size20),
    title: getResponsiveFontSize(sizes.size32, sizes.size24),
    header: getResponsiveFontSize(sizes.size72, sizes.size32),
  },
  weights: {
    thin: "font-weight: 300;",
    regular: "font-weight: 450;",
    thick: "font-weight: 700;",
    black: "font-weight: 900;",
  },
};

export default font;
