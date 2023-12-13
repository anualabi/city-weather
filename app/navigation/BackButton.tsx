import Icon from "@/components/ui/Icon";
import { useNavigation } from "@react-navigation/native";

export const BackButton = () => {
  const navigation = useNavigation();

  return <Icon name="arrow-left" onPress={() => navigation.goBack()} />;
};

export default BackButton;
