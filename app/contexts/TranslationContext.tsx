import { createContext, useContext, useEffect, useMemo, useState } from "react";
import i18n from "i18n-js";
import { useDatabase } from "@/hooks/useDatabase";

type TranslationContextValue = {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
};

const TranslationContext = createContext<TranslationContextValue | undefined>(
  undefined
);

export const TranslationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { getData, storeData } = useDatabase();
  const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.locale);

  const setLanguage = async (lang: string) => {
    i18n.locale = lang;
    setCurrentLanguage(lang);
    await storeData("APP_LANGUAGE", lang);
  };

  useEffect(() => {
    const initializeLanguage = async () => {
      const { data, error } = await getData("APP_LANGUAGE");
      if (data && typeof data === "string") {
        i18n.locale = data;
        setCurrentLanguage(data);
      } else if (error) {
        console.error("Error getting stored language:", error);
      }
    };

    initializeLanguage();
  }, []);

  const contextValue = useMemo(() => {
    return { currentLanguage, setLanguage };
  }, [currentLanguage, setLanguage]);

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
