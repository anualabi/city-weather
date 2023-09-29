import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import Icon from "@/components/Icon";
import Text from "@/components/Text";

export interface ListItemProps {
  iconColor?: string;
  iconSize?: number;
  image?: string;
  onPress?: () => void;
  showChevron?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  title: string | number;
  title2?: string | number;
}

export default function ListItem({
  iconColor = "black",
  iconSize = 35,
  image,
  onPress,
  showChevron,
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
      {image && (
        <Image
          accessible
          accessibilityLabel="List item image"
          style={styles.image}
          source={{ uri: image }}
          testID="list-item-image"
        />
      )}
      <View style={styles.title}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
        {title2 && <Text style={[styles.text, textStyle]}>{title2}</Text>}
      </View>
      {showChevron && (
        <Icon
          name="chevron-right"
          size={iconSize}
          color={iconColor}
          testID="chevron-icon"
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "row",
    opacity: 0.8,
    padding: 10,
    marginVertical: 8,
  },
  image: {
    height: 50,
    marginRight: 10,
    width: 50,
  },
  text: { fontSize: 18, fontWeight: "bold" },
  title: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
});
