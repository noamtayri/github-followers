import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AccountState {
  account: string;
}

const initialState: AccountState = {
  account: '',
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<string>) => {
      state.account = action.payload;
    },
  },
});

export const { setAccount } = accountSlice.actions;

export default accountSlice.reducer;
