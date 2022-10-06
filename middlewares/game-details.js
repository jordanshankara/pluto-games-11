import { get, child, ref } from 'firebase/database';
import { FETCH_FAIL, FETCH_SUCCESS } from '../redux/actions/game-details';
import { getDb } from '../services/firebase';

export function fetchGameDetails(id) {
  return function gameDetailsThunk(dispatch, getState) {
    const database = getDb();
    const dataRef = ref(database);
    get(child(dataRef, `games/${id}`))
      .then((snapshot) => {
        const gameState = snapshot.val();
        dispatch({
          type: FETCH_SUCCESS,
          payload: gameState,
        });
      })
      .catch((err) => {
        dispatch({
          type: FETCH_FAIL,
          payload: err.message,
        });
      });
  };
}
