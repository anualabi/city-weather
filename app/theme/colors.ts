const palette = {
  neutral: "#343434",
  secondary: "#E2E2E2",
  danger: "#C03403",
  black: "#000000",
  white: "#FFFFFF",
} as const;

export const colors = {
  palette,
  /** The default border color. **/
  border: palette.secondary,
  /** The default text color in many components. **/
  text: palette.neutral,
  /** Error messages. **/
  error: palette.danger,
  bgWhite: palette.white,
  textWhite: palette.white,
  bgBlack: palette.black,
  textBlack: palette.black,
};
