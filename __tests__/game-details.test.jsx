import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import GameDetails from "../pages/games/[id]";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
// import reducer, { gameAdded } from "../../backup/slice/gameDetailsSlice";
// import { testReducer } from "../../backup/slice/testReducer";

const mockStore = configureStore([thunk]);

describe("Game Details", () => {
  fit("Game Title should be displayed", async () => {
    const store = mockStore({ gameDetails: { gameDetails: {} } });

    const { container } = render(
      <Provider store={store}>
        <GameDetails />
      </Provider>
    );
    const titleText = container.querySelector("#title")?.textContent;
    console.log(titleText);
    expect(titleText).not.toBeNull();
  });
});
