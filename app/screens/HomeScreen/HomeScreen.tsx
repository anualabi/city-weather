import { useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import ErrorMessage from "@/components/ui/ErrorMessage";
import Icon from "@/components/ui/Icon";
import { ListItem, ListItemSeparator } from "@/components/ui/ListItem";
import Loader from "@/components/ui/Loader";
import useCities from "@/hooks/useCities";
import { translate as t } from "@/i18n";
import { AppStackScreenProps } from "@/navigation/AppNavigator";
import { colors } from "@/theme";

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { data, isError, isLoading, refetch } = useCities();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    refetch().finally(() => {
      setRefreshing(false);
    });
  }, [refetch]);

  if (isLoading) return <Loader animating={isLoading} />;

  if (isError) return <ErrorMessage message={t("homeScreen.errorMessage")} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={() => <ListItemSeparator />}
        onRefresh={onRefresh}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <ListItem
            onPress={() => navigation.navigate("CityDetails", item)}
            rightIcon={
              <Icon
                onPress={() => navigation.navigate("CityDetails", item)}
                name="chevron-right"
              />
            }
            title={item.name}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgWhite,
    flex: 1,
  },
});
