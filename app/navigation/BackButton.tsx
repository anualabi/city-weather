import { useNavigation } from "@react-navigation/native";
import Icon from "@/components/ui/Icon";

export const BackButton = () => {
  const navigation = useNavigation();

  return <Icon name="arrow-left" onPress={() => navigation.goBack()} />;
};

export default BackButton;
