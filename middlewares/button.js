import { DONE, PROCESSING, STATIC } from '../redux/actions/button';

export const ProcessTime = 2000;
export function buttonProcess() {
  return function buttonProcessing(dispatch, getState) {
    dispatch({
      type: PROCESSING,
    });
    setTimeout(() => {
      dispatch({
        type: DONE,
      });
      setTimeout(() => {
        dispatch({
          type: STATIC,
        });
      }, 1000);
    }, ProcessTime);
  };
}
