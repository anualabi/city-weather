import { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";

import { CityDetailsScreenProps } from "@/navigation/AppNavigator";
import ErrorMessage from "@/components/ErrorMessage";
import ListItem from "@/components/ListItem";
import Loader from "@/components/Loader";
import Text from "@/components/Text";
import { useCityDetails } from "@/hooks/useWeather";

export default function CityDetailsScreen({
  navigation,
  route,
}: CityDetailsScreenProps) {
  const { name, picture } = route.params;
  const { data, isError, isLoading } = useCityDetails(name);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, []);

  if (isLoading) return <Loader animating={isLoading} />;

  if (isError) return <ErrorMessage message="Error" />;

  const { temperatures } = data[0];

  return (
    <View>
      <Image
        cachePolicy="memory-disk"
        contentFit="cover"
        source={picture}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text>Temperatires</Text>
        {temperatures.map(({ time, degrees }) => (
          <ListItem key={time} title={time} title2={degrees} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 28,
    marginBottom: 10,
  },
  image: {
    height: 150,
    marginBottom: 10,
    width: "100%",
  },
});