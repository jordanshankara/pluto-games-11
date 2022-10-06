import { combineReducers } from "redux";
import header from "./header";
import score from "./score";
import button from "./button";
import login from "./login";
import profile from "./profile";
import games from "./games";
import gameDetails from "./game-details";
import rps from "./rps";
import snakeGame from "./snake-game";
import dummy from "./dummy";
import history from "./history";

export default combineReducers({
  button,
  header,
  score,
  login,
  profile,
  games,
  gameDetails,
  rps,
  snakeGame,
  dummy,
  history,
});
