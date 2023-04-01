import { FollowersList } from './FollowersList';
import { useAppSelector } from '../app/hooks';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { SortButtons } from './SortButtons';
import { ShowMoreButton } from './ShowMoreButton';

export function FollowersListContainer() {
  const followers = useAppSelector((state) => state.followers.followers) || [];
  const status = useAppSelector((state) => state.followers.status);
  const followersTotalAmount = useAppSelector(
    (state) => state.followers.followersTotalAmount
  );

  return (
    <Box sx={{ display: 'flex' }} alignItems="center" flexDirection="column">
      {followers.length > 0 && (
        <>
          <SortButtons />
          <FollowersList />
        </>
      )}
      <Box marginTop={1}>
        {status === 'loading' && <CircularProgress />}
        {status === 'success' &&
          followers.length > 0 &&
          followersTotalAmount !== followers.length && <ShowMoreButton />}
      </Box>
    </Box>
  );
}
