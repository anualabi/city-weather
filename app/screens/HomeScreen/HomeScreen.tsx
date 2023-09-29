import { useCallback, useState } from "react";
import { FlatList, ImageBackground, StyleSheet } from "react-native";

import ErrorMessage from "@/components/ErrorMessage/";
import ListItem from "@/components/ListItem";
import Loader from "@/components/Loader";
import { useCities } from "@/hooks/useWeather";

export default function HomeScreen() {
  const { data, isError, isLoading, refetch } = useCities();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    refetch().finally(() => {
      setRefreshing(false);
    });
  }, [refetch]);

  if (isLoading) return <Loader animating={isLoading} />;

  if (isError) return <ErrorMessage message="Error" />;

  return (
    <ImageBackground
      blurRadius={3}
      source={require("@/assets/weather.png")}
      style={styles.imageContainer}
    >
      <FlatList
        data={data}
        keyExtractor={(item) => item.date}
        onRefresh={onRefresh}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <ListItem
            image={item.city.picture}
            showChevron
            title={item.city.name}
          />
        )}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  subtitle: { fontWeight: "bold", textAlign: "center", marginTop: 5 },
});
