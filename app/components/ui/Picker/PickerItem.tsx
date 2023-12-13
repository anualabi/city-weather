import { Pressable, StyleProp, StyleSheet, TextStyle } from "react-native";

import Text from "@/components/ui/Text";

export interface PickerItemProps {
  label: string;
  onPress?: () => void;
  itemStyle?: StyleProp<TextStyle>;
}

export default function PickerItem({
  itemStyle,
  label,
  onPress,
}: PickerItemProps) {
  return (
    <Pressable onPress={onPress}>
      <Text style={[styles.text, itemStyle]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
});
