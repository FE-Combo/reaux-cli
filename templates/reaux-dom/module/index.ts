import Main from "./components/Main";
import { register, Model } from "{frame}";
import {AllState} from "src/state";
import { State } from "./type";

const initialState: State = {};

class ActionHandler extends Model<State, AllState> {
  async onReady() {}
}

export const { actions, View } = register(new ActionHandler("{namespace}", initialState), Main);
