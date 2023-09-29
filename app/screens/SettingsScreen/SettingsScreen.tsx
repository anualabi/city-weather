import { useEffect, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";

import { AppStackScreenProps } from "@/navigation/AppNavigator";
import LanguageSelector from "@/components/LanguageSelector";
import Text from "@/components/ui/Text";
import { translate as t } from "@/i18n";
import { useTranslation } from "@/contexts/TranslationContext";

interface SettingsScreenProps extends AppStackScreenProps<"Settings"> {}

export default function SettingsScreen({ navigation }: SettingsScreenProps) {
  const { currentLanguage } = useTranslation();

  useEffect(() => {}, [currentLanguage]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t("settingsScreen.headerTitle"),
    });
  }, [currentLanguage]);

  return (
    <View style={styles.container}>
      <View style={styles.language}>
        <Text tx="settingsScreen.languageSelect" />
        <LanguageSelector />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginVertical: 10 },
  language: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
