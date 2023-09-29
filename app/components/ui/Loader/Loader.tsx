import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  View,
} from "react-native";

import { colors } from "@/theme";

export interface LoaderProps extends ActivityIndicatorProps {
  animating: boolean;
  color?: string;
  size?: number | "small" | "large";
}

export default function Loader({
  animating,
  color = colors.bgBlack,
  size = "large",
  ...props
}: LoaderProps) {
  return (
    <View style={styles.container} testID="loader">
      <ActivityIndicator
        animating={animating}
        color={color}
        size={size}
        testID="activity-indicator"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", flex: 1, justifyContent: "center" },
});
