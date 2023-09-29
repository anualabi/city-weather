import { StyleSheet } from "react-native";

import { useTranslation } from "@/contexts/TranslationContext";
import Picker from "@/components/ui/Picker";

const languages = [
  { label: "English", value: "en" },
  { label: "Dutch", value: "nl" },
  { label: "German", value: "de" },
];

export default function LanguageSelector() {
  const { currentLanguage, setLanguage } = useTranslation();

  const selectedLang = languages.find((lang) => lang.value === currentLanguage);

  return (
    <Picker
      items={languages}
      itemStyle={styles.language}
      onSelectItem={(item) => setLanguage(item.value)}
      selectedItem={selectedLang}
      testID="language-selector"
    />
  );
}

const styles = StyleSheet.create({
  language: { textAlign: "center" },
});
