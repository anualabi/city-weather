import renderer from "react-test-renderer";
import { render } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";

import Loader, { LoaderProps } from "./Loader";

const customRender = (props: LoaderProps) => {
  return render(<Loader {...props} />);
};

describe("Loader component", () => {
  test("should render correctly", () => {
    const tree = renderer.create(<Loader animating={false} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("should render correctly", () => {
    const { getByTestId } = customRender({ animating: true });
    expect(getByTestId("loader")).toBeDefined();
  });

  test("should show ActivityIndicator when animating is true", () => {
    const { getByTestId } = customRender({ animating: true });
    expect(getByTestId("activity-indicator")).toBeDefined();
  });

  test("should hide ActivityIndicator when animating is false", () => {
    const { getByTestId } = customRender({ animating: false });
    const activityIndicator = getByTestId("activity-indicator");
    expect(activityIndicator.props.animating).toBe(false);
  });
});
