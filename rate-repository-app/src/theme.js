import { Platform } from "react-native";

const theme = {
  colors: {
    primary: "#0366d6",
    textPrimary: "#24292e",
    textSecondary: "#586069",
    mainBackground: "#e1e4e8",
    cardBackground: "#ffffff",
    border: "#d1d5da",
    languageTag: "#6f42c1",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 18,
    title: 22,
  },
  fontFamilies: {
    regular: Platform.select({
      ios: "System",
      android: "sans-serif",
      web: "system-ui",
      default: "sans-serif",
    }),
    medium: Platform.select({
      ios: "System",
      android: "sans-serif-medium",
      web: "system-ui",
      default: "sans-serif-medium",
    }),
  },
};

export default theme;
