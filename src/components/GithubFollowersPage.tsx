import { useCallback, useEffect, useState } from 'react';
import { setAccount } from '../features/account/accountSlice';
import { setPage } from '../features/pagination/paginationSlice';
import {
  getFollowersList,
  getFollowersTotalAmount,
  emptyFollowers,
} from '../features/followers/followersSlice';
import { FollowersListContainer } from './FollowersListContainer';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Alerts } from './Alerts';
import debounce from 'lodash.debounce';

export function GithubFollowersPage() {
  const account = useAppSelector((state) => state.account.account);
  const dispatch = useAppDispatch();
  const [inputElementValue, setInputElementValue] = useState<string>(account);

  const onAccountInputChange = useCallback(
    debounce((account: string) => {
      dispatch(setAccount(account));
    }, 300),
    []
  );

  useEffect(() => {
    onAccountInputChange(inputElementValue);
  }, [inputElementValue, onAccountInputChange]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputElementValue(e.target.value);
  };

  const getFollowersOnClick = () => {
    dispatch(emptyFollowers());
    dispatch(getFollowersList());
    dispatch(getFollowersTotalAmount());
    dispatch(setPage(1));
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Enter') {
      getFollowersOnClick();
    }
  };

  return (
    <Box
      marginTop={10}
      sx={{ display: 'flex' }}
      alignItems="center"
      flexDirection="column"
    >
      <Typography variant="h2" gutterBottom color="rgba(25, 118, 210, 0.9)">
        GitHub Followers
      </Typography>
      <Box marginBottom={2}>
        <TextField
          id="github-account-input"
          label="GitHub Account"
          value={inputElementValue}
          onChange={handleInputChange}
          onKeyDown={onInputKeyDown}
        />
      </Box>
      <Box marginBottom={10}>
        <Tooltip
          arrow
          placement="top"
          title={inputElementValue === '' ? 'Insert GitHub account' : ''}
        >
          <span>
            <Button
              variant="contained"
              onClick={() => getFollowersOnClick()}
              disabled={inputElementValue === ''}
            >
              Get Followers
            </Button>
          </span>
        </Tooltip>
      </Box>
      <Alerts />
      <FollowersListContainer />
    </Box>
  );
}
