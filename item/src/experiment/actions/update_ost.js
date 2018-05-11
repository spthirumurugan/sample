export const UPDATE_OST = 'experiment/onScreenTextUpdate';

export default function updateOst() {
  return (dispatch, getState) => {
    const { ostContend } = getState().experiment;
    dispatch({
      type: UPDATE_OST,
      payload: {
        screenText: ostContend.ostTop[0].ost
      }
    });
  };
}
