import { View, StyleSheet } from "react-native";

import { colors } from "@/theme";

export function ListItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: colors.border,
    height: StyleSheet.hairlineWidth,
  },
});
