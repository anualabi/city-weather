import renderer from "react-test-renderer";
import { render } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import ErrorMessage, { ErrorMessageProps } from "./ErrorMessage";

const customRender = (props: ErrorMessageProps) => {
  return render(<ErrorMessage {...props} />);
};

describe("ErrorMessage component", () => {
  test("should render correctly", () => {
    const tree = renderer
      .create(<ErrorMessage message="An error occurred" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("should apply custom styles", () => {
    const { getByTestId } = customRender({
      message: "An error occurred",
      containerStyle: { backgroundColor: "grey" },
    });

    expect(getByTestId("errorContainer")).toHaveStyle({
      backgroundColor: "grey",
    });
  });
});
