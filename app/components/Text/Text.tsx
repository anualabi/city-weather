import i18n from "i18n-js";
import { forwardRef } from "react";
import {
  StyleProp,
  StyleSheet,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from "react-native";

export interface TextProps extends RNTextProps {
  text?: string;
  txOptions?: i18n.TranslateOptions;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

const Text = forwardRef<RNText, TextProps>(function Text(props, ref) {
  const { txOptions, text, children, style, ...rest } = props;

  return (
    <RNText ref={ref} {...rest} style={[styles.text, style]}>
      {children}
    </RNText>
  );
});

const styles = StyleSheet.create({
  text: { fontSize: 16 },
});

export default Text;
