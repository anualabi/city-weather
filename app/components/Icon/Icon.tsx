import { Pressable, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { IconName } from "@/types";

export interface IconProps {
  color?: string;
  onPress?: () => void;
  name: IconName;
  size?: number;
  testID?: string;
}

export default function Icon({
  color = "black",
  onPress,
  name,
  size = 40,
  testID,
}: IconProps) {
  const containerStyle: ViewStyle = {
    alignItems: "center",
    borderRadius: size / 2,
    height: size,
    justifyContent: "center",
    width: size,
  };

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={containerStyle}
    >
      <MaterialCommunityIcons
        color={color}
        name={name}
        size={size * 0.6}
        testID={testID || "icon"}
      />
    </Pressable>
  );
}
