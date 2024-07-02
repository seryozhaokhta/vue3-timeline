// src/plugins/theme.js

export const themes = {
  light: {
    dark: false,
    colors: {
      primary: "#1976D2",
      secondary: "#424242",
      node: "#81c784",
      path: "#78909c",
      epoch: "#b0bec5", // Добавляем цвет для epoch-circle
    },
    variables: {
      background: "#ffffff",
      text: "#333333",
      cardBackground: "#f5f5f5",
    },
  },
  dark: {
    dark: true,
    colors: {
      primary: "#212121",
      secondary: "#BDBDBD",
      node: "#CFCFCF",
      path: "#F0F0F0",
      epoch: "#424242", // Добавляем цвет для epoch-circle
    },
    variables: {
      background: "#333333",
      text: "#ffffff",
      cardBackground: "#212121",
    },
  },
};
