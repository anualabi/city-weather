import renderer from "react-test-renderer";
import "@testing-library/jest-native/extend-expect";
import { fireEvent, render } from "@testing-library/react-native";
import PickerItem, { PickerItemProps } from "../PickerItem";

const customRender = (props: PickerItemProps) => {
  return render(<PickerItem {...props} />);
};

describe("PickerItem component", () => {
  test("should render correctly", () => {
    const tree = renderer.create(<PickerItem label="Click me!" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("should render the label", () => {
    const { getByText } = customRender({ label: "Test Label" });
    expect(getByText("Test Label")).toBeTruthy();
  });

  test("should handle press", () => {
    const onPressMock = jest.fn();
    const { getByText } = customRender({
      label: "Press Me",
      onPress: onPressMock,
    });

    fireEvent.press(getByText("Press Me"));
    expect(onPressMock).toHaveBeenCalled();
  });
});
