import {
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

import { colors } from "@/theme";
import Text from "@/components/ui/Text";

export interface OfflineNoticeProps {
  message?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function OfflineNotice({
  message = "WeatherApp is offline",
  style,
  textStyle,
}: OfflineNoticeProps) {
  const { isInternetReachable, type } = useNetInfo();

  if (type !== "unknown" && isInternetReachable === false)
    return (
      <View style={[styles.container, style]} testID="offlineNotice">
        <Text
          accessibilityLabel="offlineNoticeText"
          style={[styles.text, textStyle]}
        >
          {message}
        </Text>
      </View>
    );

  return null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.bgBlack,
    bottom: 0,
    elevation: Platform.OS === "android" ? 1 : 0,
    height: 40,
    justifyContent: "center",
    opacity: 0.7,
    position: "absolute",
    width: "100%",
    zIndex: 10,
  },
  text: {
    color: colors.textWhite,
    fontSize: 14,
  },
});
