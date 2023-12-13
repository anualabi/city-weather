import i18n from "i18n-js";
import { forwardRef } from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleProp,
  StyleSheet,
  TextStyle,
} from "react-native";

import { translate, TxKeyPath } from "@/i18n";
import { colors } from "@/theme";

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
  text: { color: colors.text, fontSize: 16 },
});

export default Text;
