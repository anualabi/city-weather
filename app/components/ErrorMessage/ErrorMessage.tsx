import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import Text from "@/components/Text";

export interface ErrorMessageProps {
  containerStyle?: StyleProp<ViewStyle>;
  message: string;
  textStyle?: StyleProp<TextStyle>;
}

export default function ErrorMessage({
  containerStyle,
  message,
  textStyle,
}: ErrorMessageProps) {
  if (!message) {
    return null;
  }

  return (
    <View style={[styles.container, containerStyle]} testID="errorContainer">
      <Text style={[styles.text, textStyle]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  text: { color: "red", fontSize: 18, lineHeight: 28, textAlign: "center" },
});
