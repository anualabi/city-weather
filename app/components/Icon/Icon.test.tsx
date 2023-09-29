import renderer from "react-test-renderer";
import "@testing-library/jest-native/extend-expect";
import { fireEvent, render } from "@testing-library/react-native";

import Icon, { IconProps } from "./Icon";
import { IconName } from "@/types";

const customRender = (props: IconProps) => {
  return render(<Icon {...props} />);
};

describe("Icon component", () => {
  test("should render correctly", () => {
    const tree = renderer.create(<Icon name="arrow-left" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("should render the icon", () => {
    const { getByTestId } = customRender({
      name: "home" as IconName,
      color: "red",
      size: 40,
    });

    const icon = getByTestId("icon");
    expect(icon).toBeDefined();
  });

  test("should handle press events", () => {
    const onPress = jest.fn();
    const { getByRole } = customRender({
      name: "home" as IconName,
      onPress,
    });

    const button = getByRole("button");
    fireEvent.press(button);
    expect(onPress).toHaveBeenCalled();
  });
});
