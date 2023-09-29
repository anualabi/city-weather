import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackScreenProps } from "@react-navigation/stack";

import BackButton from "./BackButton";
import CityDetailsScreen from "@/screens/CityDetailsScreen";
import HomeScreen from "@/screens/HomeScreen";
import Icon from "@/components/ui/Icon";
import SettingsScreen from "@/screens/SettingsScreen";
import { translate as t } from "@/i18n";

type AppStackParamList = {
  Home: undefined;
  CityDetails: { name: string; picture: string };
  Settings: { name: string };
};

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  StackScreenProps<AppStackParamList, T>;

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerLeft: () => <BackButton />,
      headerTitleAlign: "center",
      headerTitleStyle: { fontSize: 20 },
    }}
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={({ navigation }) => ({
        headerLeft: undefined,
        headerRight: () => (
          <Icon name="cog" onPress={() => navigation.navigate("Settings")} />
        ),
        headerTitle: t("homeScreen.headerTitle"),
      })}
    />
    <Stack.Screen name="CityDetails" component={CityDetailsScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
