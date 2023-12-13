import "@testing-library/jest-native/extend-expect";
import { fireEvent, render } from "@testing-library/react-native";
import renderer from "react-test-renderer";

import { ListItem, ListItemProps } from "./ListItem";

const customRender = (props: ListItemProps) => {
  return render(<ListItem {...props} />);
};

describe("ListItem component", () => {
  test("should render correctly", () => {
    const tree = renderer.create(<ListItem title="Sample Title" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("should render the title", () => {
    const { getByText } = customRender({ title: "Test Title" });
    expect(getByText("Test Title")).toBeTruthy();
  });

  test("should render secondary title when provided", () => {
    const { getByText } = customRender({
      title: "Test Title",
      title2: "Test Title 2",
    });

    expect(getByText("Test Title 2")).toBeTruthy();
  });

  test("should call onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByRole } = customRender({
      title: "Test Title",
      onPress: onPressMock,
    });
    fireEvent.press(getByRole("button"));
    expect(onPressMock).toHaveBeenCalled();
  });
});
