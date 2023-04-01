import { loadMoreFollowers } from '../features/followers/followersSlice';
import { setPage } from '../features/pagination/paginationSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export function ShowMoreButton() {
  const page = useAppSelector((state) => state.pagination.page);
  const dispatch = useAppDispatch();

  return (
    <Box>
      <Button
        onClick={() => {
          dispatch(loadMoreFollowers(page + 1));
          dispatch(setPage(page + 1));
        }}
        variant="text"
      >
        Show more
      </Button>
    </Box>
  );
}
