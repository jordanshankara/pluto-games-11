import { render } from "@testing-library/react";
import React from "react";
import GameDetails from "../pages/games/[id]";
// import * as GameDetailsMiddleware from "../middlewares/game-details";
import { Provider, useSelector } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme";

const mockStore = configureMockStore([thunk]);

describe("Game Details", () => {
  fit("Game Title should be displayed", () => {
    // console.log("Value for Middleware: ", GameDetailsMiddleware);
    // Object.defineProperty(GameDetailsMiddleware, "fetchGameDetails", {
    //   value: jest.fn(),
    //   writable: true,
    //   enumerable: true,
    // });

    // jest.spyOn(ReactRedux, "useSelector").mockReturnValue({});
    const store = mockStore({ gameDetails: { gameDetails: {} } });

    const wrapper = mount(
      <Provider store={store}>
        <GameDetails />
      </Provider>
    );
    const titleText = wrapper.find("#title");
    expect(titleText).not.toBeNull();
  });
});
