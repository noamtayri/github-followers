import { useRef, useEffect } from 'react';
import { loadMoreFollowers } from '../features/followers/followersSlice';
import { setPage } from '../features/pagination/paginationSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export function ShowMoreButton() {
  const buttonRef = useRef(null);
  const page = useAppSelector((state) => state.pagination.page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreFn();
        }
      },
      { threshold: 1 }
    );

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    return () => {
      if (buttonRef.current) {
        observer.unobserve(buttonRef.current);
      }
    };
  }, [buttonRef]);

  const loadMoreFn = () => {
    dispatch(loadMoreFollowers(page + 1));
    dispatch(setPage(page + 1));
  };

  return (
    <Box>
      <Button ref={buttonRef} onClick={loadMoreFn} variant="text">
        Show more
      </Button>
    </Box>
  );
}
