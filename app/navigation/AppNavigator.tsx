import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import CitiesScreen from "@/screens/HomeScreen";
import CityDetailsScreen from "@/screens/CityDetailsScreen";
import Icon from "@/components/Icon";

type RootStackParamList = {
  Cities: undefined;
  CityDetails: { name: string; picture: string };
  Settings: { name: string };
};

export type CitiesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Cities"
>;

export type CityDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "CityDetails"
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const getBackIcon = (navigation: { goBack: () => void }) => {
  return () => <Icon name="arrow-left" onPress={() => navigation.goBack()} />;
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
          options={{
            headerLeft: undefined,
          }}
        />
        <Stack.Screen name="CityDetails" component={CityDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
