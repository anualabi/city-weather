import i18n from "i18n-js";
import { forwardRef } from "react";
import {
  StyleProp,
  StyleSheet,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from "react-native";

import { translate, TxKeyPath } from "@/i18n";

export interface TextProps extends RNTextProps {
  tx?: TxKeyPath;
  text?: string;
  txOptions?: i18n.TranslateOptions;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

const Text = forwardRef<RNText, TextProps>(function Text(props, ref) {
  const { tx, txOptions, text, children, style, ...rest } = props;

  const i18nText = tx && translate(tx, txOptions);
  const content = i18nText ?? text ?? children;

  return (
    <RNText ref={ref} {...rest} style={[styles.text, style]}>
      {content}
    </RNText>
  );
});

const styles = StyleSheet.create({
  text: { fontSize: 16 },
});

export default Text;
