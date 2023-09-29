import renderer from "react-test-renderer";
import "@testing-library/jest-native/extend-expect";
import { fireEvent, render } from "@testing-library/react-native";
import Picker, { PickerProps } from "../Picker";

const items = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
];

const customRender = (props: PickerProps) => {
  return render(<Picker {...props} />);
};

describe("PickerItem component", () => {
  test("should render correctly", () => {
    const tree = renderer
      .create(
        <Picker items={[]} onSelectItem={() => {}} selectedItem={undefined} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("should render the placeholder when no item is selected", () => {
    const { getByText } = customRender({
      items: items,
      placeholder: "Select an item",
      onSelectItem: () => {},
      selectedItem: undefined,
    });

    expect(getByText("Select an item")).toBeTruthy();
  });

  test("should open the picker modal when pressed", () => {
    const { getByText, getByTestId } = customRender({
      items: items,
      placeholder: "Select an item",
      onSelectItem: () => {},
      selectedItem: undefined,
    });

    fireEvent.press(getByText("Select an item"));
    expect(getByTestId("picker-modal")).toBeTruthy();
  });
});
