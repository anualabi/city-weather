import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import CitiesScreen from "@/screens/HomeScreen";
import CityDetailsScreen from "@/screens/CityDetailsScreen";
import Icon from "@/components/Icon";
import SettingsScreen from "@/screens/SettingsScreen";
import { translate as t } from "@/i18n";

type RootStackParamList = {
  Cities: undefined;
  CityDetails: { name: string; picture: string };
  Settings: { name: string };
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Cities"
>;

export type CityDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "CityDetails"
>;

export type SettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Settings"
>;

type SettingsIconProps = {
  navigation: NativeStackScreenProps<
    RootStackParamList,
    "Cities"
  >["navigation"];
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const getBackIcon = (navigation: { goBack: () => void }) => {
  return () => <Icon name="arrow-left" onPress={() => navigation.goBack()} />;
};

const getSettingsIcon = (navigation: SettingsIconProps["navigation"]) => {
  return () => (
    <Icon
      name="cog"
      onPress={() => navigation.navigate("Settings", { name: "Settings" })}
    />
  );
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerBackTitleVisible: false,
          headerLeft: getBackIcon(navigation),
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 20 },
        })}
      >
        <Stack.Screen
          name="Cities"
          component={CitiesScreen}
          options={({ navigation }) => ({
            headerLeft: undefined,
            headerRight: getSettingsIcon(navigation),
            headerTitle: t("citiesScreen.headerTitle"),
          })}
        />
        <Stack.Screen name="CityDetails" component={CityDetailsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
