import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colours: {
      primary: string;
      primaryDark: string;
      secondary: string;
      tertiary: string;
      accent: string;
      background: string;
      foreground: string;
      text: string;
      black: string;
      shadow: string;
      error: string;
      success: string;
      chart: string[];
    };
  }
}
