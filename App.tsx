import { QueryClientProvider } from "@tanstack/react-query";

import AppNavigator from "@/navigation/AppNavigator";
import { queryClient } from "@/services/react-query";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigator />
    </QueryClientProvider>
  );
}
