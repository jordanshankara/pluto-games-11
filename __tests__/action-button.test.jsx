import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ActionButton } from "../components/rps/ActionButton";

describe("RPS Action Button Component", () => {
  it("render action button without props", () => {
    const { container } = render(<ActionButton />);
    const choice = container.querySelector("#actionText").textContent;
    expect(choice).toEqual("");
  });
  it("render action button with props", () => {
    const onActionSelected = jest.fn();
    const action = "paper";
    const { container } = render(
      <ActionButton action={action} onActionSelected={onActionSelected} />
    );
    const choice = container.querySelector("#actionText").textContent;
    expect(choice).toEqual(action);
  });
});
