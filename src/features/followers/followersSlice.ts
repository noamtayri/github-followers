import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import type {
  GitHubUser,
  SortingByType,
  SortingDirectionType,
} from '../../types';

interface FollowersState {
  status: 'idle' | 'loading' | 'failed' | 'success' | 'account-not-found';
  followers: GitHubUser[];
  followersTotalAmount: number;
}

const initialState: FollowersState = {
  status: 'idle',
  followers: [],
  followersTotalAmount: -1,
};

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
}>();

export const getFollowersList = createAppAsyncThunk(
  'followers/getFollowers',
  async (_, thunkAPI) => {
    const account = thunkAPI.getState().account.account;
    const response = await fetch(
      `https://api.github.com/users/${account}/followers`
    );
    const followers = await response.json();

    if (followers.message === 'Not Found') {
      return thunkAPI.rejectWithValue('Not Found');
    } else if (!!followers.message) {
      return thunkAPI.rejectWithValue('Error');
    }

    return followers;
  }
);

export const loadMoreFollowers = createAppAsyncThunk(
  'followers/loadMoreFollowers',
  async (page: number, thunkAPI) => {
    const account = thunkAPI.getState().account.account;
    const response = await fetch(
      `https://api.github.com/users/${account}/followers?page=${page}`
    );
    const followers = await response.json();
    return followers;
  }
);

export const getFollowersTotalAmount = createAppAsyncThunk(
  'followers/getFollowersTotalAmount',
  async (_, thunkAPI) => {
    const account = thunkAPI.getState().account.account;
    const response = await fetch(`https://api.github.com/users/${account}`);
    const userData = await response.json();
    return userData.followers;
  }
);

export const followersSlice = createSlice({
  name: 'followers',
  initialState,
  reducers: {
    sortFollowers: (
      state,
      action: PayloadAction<{
        sortBy: SortingByType;
        direction: SortingDirectionType;
      }>
    ) => {
      state.followers = state.followers.sort((a, b) => {
        const elementA = a[`${action.payload.sortBy}`];
        const elementB = b[`${action.payload.sortBy}`];
        const readyToCompareElementA =
          typeof elementA === 'string' ? elementA.toUpperCase() : elementA; // ignore upper and lowercase
        const readyToCompareElementB =
          typeof elementB === 'string' ? elementB.toUpperCase() : elementB; // ignore upper and lowercase

        if (readyToCompareElementA < readyToCompareElementB) {
          return action.payload.direction === 'descent' ? -1 : 1;
        }
        if (readyToCompareElementA > readyToCompareElementB) {
          return action.payload.direction === 'descent' ? 1 : -1;
        }

        return 0;
      });
    },
    emptyFollowers: (state) => {
      state.followers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFollowersList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFollowersList.fulfilled, (state, action) => {
        state.status = 'success';
        state.followers = action.payload;
      })
      .addCase(getFollowersList.rejected, (state, action) => {
        if (action.payload === 'Not Found') {
          state.status = 'account-not-found';
        } else {
          state.status = 'failed';
        }
      })
      .addCase(loadMoreFollowers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadMoreFollowers.fulfilled, (state, action) => {
        state.status = 'success';
        state.followers = [...state.followers, ...action.payload];
      })
      .addCase(getFollowersTotalAmount.fulfilled, (state, action) => {
        state.followersTotalAmount = action.payload;
      });
  },
});

export const { sortFollowers, emptyFollowers } = followersSlice.actions;

export default followersSlice.reducer;
