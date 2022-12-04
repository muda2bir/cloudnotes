import { ACTIONS } from "../App";
import Login from "../components/Login";
import Note from "../components/Note";
import Signup from "../components/Signup";
import ShowNote from "../components/ShowNote";
import { setTrigger } from "../features/popuptrigger/triggerSlice";

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOGIN:
      action.payload(setTrigger(true));
      return <Login />;
    case ACTIONS.SIGNUP:
      action.payload(setTrigger(true));
      return <Signup />;
    case ACTIONS.NOTE:
      action.payload(setTrigger(true));
      return <Note />;
    case ACTIONS.SHOWNOTE:
      action.payload.dispatcher(setTrigger(true));
      return (
        <ShowNote noteID={action.payload.noteID} note={action.payload.note} />
      );
    default:
      return state;
  }
}
