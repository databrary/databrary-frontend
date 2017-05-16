/**
 * Created by maksim on 5/15/17.
 */

import {createStore} from "redux";
import app from "./reducers";
let store = createStore(app);

export default store