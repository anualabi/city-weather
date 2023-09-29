import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  StyleProp,
  TextInputProps,
  TextStyle,
  Modal,
  Pressable,
  View,
} from "react-native";
import Constants from "expo-constants";

import { colors } from "@/theme";
import Icon from "../Icon/Icon";
import PickerItem from "./PickerItem";
import Text from "@/components/ui/Text";

type item = { label: string; value: string };

export interface PickerProps extends TextInputProps {
  items: item[];
  itemStyle?: StyleProp<TextStyle>;
  numberOfColumns?: number | undefined;
  onSelectItem: (item: item) => void;
  placeholder?: string;
  selectedItem: item | undefined;
  testID?: string;
}

export default function Picker({
  items,
  itemStyle,
  numberOfColumns = 1,
  onSelectItem,
  placeholder,
  selectedItem,
  testID,
}: PickerProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}
        testID={testID}
      >
        <View style={styles.container}>
          <Text style={styles.text}>
            {selectedItem ? selectedItem.value : placeholder}
          </Text>
          <Icon name="chevron-down" />
        </View>
      </Pressable>
      <Modal animationType="slide" testID="picker-modal" visible={modalVisible}>
        <View style={styles.modalContent}>
          <Icon name="close" onPress={() => setModalVisible(false)} />
          <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <PickerItem
                label={item.label}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
                itemStyle={itemStyle}
              />
            )}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 5,
    padding: 5,
    width: 90,
  },
  modalContent: {
    alignItems: "center",
    borderRadius: 20,
    paddingTop: Constants.statusBarHeight,
  },
  placeholder: { color: colors.text, flex: 1 },
  text: {
    color: "black",
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
});
