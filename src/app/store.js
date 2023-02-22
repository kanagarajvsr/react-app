import { configureStore } from '@reduxjs/toolkit';
import authRecuder from "./authslice";

export const store = configureStore({
  reducer: {
    auth: authRecuder,
  },
});
