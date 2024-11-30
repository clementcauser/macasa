import authReducer from "@/features/auth/slice";
import counterSlice from "@/features/counter/slice";

const reducers = {
  counter: counterSlice,
  auth: authReducer,
};

export default reducers;
