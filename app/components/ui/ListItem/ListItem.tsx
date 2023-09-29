import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import { colors } from "@/theme";
import Text from "@/components/ui/Text";

export interface ListItemProps {
  onPress?: () => void;
  rightIcon?: React.ReactNode;
  showChevron?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  title: string | number;
  title2?: string | number;
}

export function ListItem({
  onPress,
  rightIcon,
  style,
  textStyle,
  title,
  title2,
}: ListItemProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.container, style]}
    >
      <View style={styles.title}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
        {title2 && <Text style={[styles.text, textStyle]}>{title2}</Text>}
      </View>
      {rightIcon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.bgWhite,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text: { fontSize: 18, fontWeight: "bold" },
  title: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
});
