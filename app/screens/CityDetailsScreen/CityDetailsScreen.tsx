import { useLayoutEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Image } from "expo-image";

import { AppStackScreenProps } from "@/navigation/AppNavigator";
import { colors } from "@/theme";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { ListItem, ListItemSeparator } from "@/components/ui/ListItem";
import Loader from "@/components/ui/Loader";
import Text from "@/components/ui/Text";
import { translate as t } from "@/i18n";
import useCity from "@/hooks/useCity";

interface CityDetailsScreenProps extends AppStackScreenProps<"CityDetails"> {}

export default function CityDetailsScreen({
  navigation,
  route,
}: CityDetailsScreenProps) {
  const { name, picture } = route.params;
  const { data, isError, isLoading } = useCity(name);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, []);

  if (isLoading) return <Loader animating={isLoading} />;

  if (isError)
    return <ErrorMessage message={t("cityDetailsScreen.errorMessage")} />;

  const { temperatures } = data[0];

  return (
    <View style={styles.container}>
      <Image
        cachePolicy="memory-disk"
        contentFit="cover"
        source={picture}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.heading} tx="cityDetailsScreen.heading" />
        <FlatList
          data={temperatures}
          keyExtractor={(item) => item.time}
          ItemSeparatorComponent={() => <ListItemSeparator />}
          renderItem={({ item }) => (
            <ListItem title={item.time} title2={item.degrees} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.bgWhite, flex: 1 },
  content: {
    margin: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 28,
    marginBottom: 10,
    padding: 15,
  },
  image: {
    height: 150,
    marginBottom: 10,
    width: "100%",
  },
});
