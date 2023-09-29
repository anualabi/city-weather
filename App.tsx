import "@/i18n";
import { QueryClientProvider } from "@tanstack/react-query";

import AppNavigator from "@/navigation/AppNavigator";
import { TranslationProvider } from "@/contexts/TranslationContext";
import OfflineNotice from "@/components/OfflineNotice";
import { queryClient } from "@/services/react-query";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TranslationProvider>
        <OfflineNotice />
        <AppNavigator />
      </TranslationProvider>
    </QueryClientProvider>
  );
}
