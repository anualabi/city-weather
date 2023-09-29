import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import HomeScreen from "@/screens/HomeScreen";

type RootStackParamList = {
  Cities: undefined;
  CityDetails: { name: string; picture: string };
  Settings: { name: string };
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Cities"
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 20 },
        }}
      >
        <Stack.Screen name="Cities" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
