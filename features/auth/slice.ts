import { firebaseAuth } from "@/constants/firebase";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { onAuthStateChanged, User, UserInfo } from "firebase/auth";

type AuthState = {
  user: UserInfo | null;
  loading: boolean;
};

const initialState: AuthState = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo | null>) => {
      state.loading = false;
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { actions: authActions } = authSlice;
export default authSlice.reducer;

const { setLoading, setUser } = authActions;

export const listenToAuthChanges = () => (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      const { email, displayName, phoneNumber, photoURL, uid, providerId } =
        currentUser;

      dispatch(
        setUser({ email, displayName, phoneNumber, photoURL, uid, providerId })
      );
    } else {
      dispatch(setUser(null));
    }
    dispatch(setLoading(false));
  });
};
