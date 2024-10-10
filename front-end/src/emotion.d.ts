import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colours: {
      primary: string;
      secondary: string;
      tertiary: string;
      accent: string;
      background: string;
      foreground: string;
      text: string;
      black: string;
      shadow: string;
    };
  }
}