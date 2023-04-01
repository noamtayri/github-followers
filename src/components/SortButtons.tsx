import { useState } from 'react';
import { sortFollowers } from '../features/followers/followersSlice';
import { useAppDispatch } from '../app/hooks';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import type { SortingByType, SortingDirectionType } from '../types';

export function SortButtons() {
  const [sortDetails, setSortDetails] = useState<
    { sortBy: SortingByType; direction: SortingDirectionType } | undefined
  >(undefined);
  const dispatch = useAppDispatch();

  const getIconBySortDirection = () => {
    if (sortDetails?.direction === 'descent') {
      return <ArrowDownwardIcon />;
    } else if (sortDetails?.direction === 'ascend') {
      return <ArrowUpwardIcon />;
    } else {
      return null;
    }
  };

  const getSortIcon = (buttonName: SortingByType) => {
    switch (buttonName) {
      case 'login':
        if (sortDetails?.sortBy === 'login') {
          return getIconBySortDirection();
        } else {
          return null;
        }
      case 'id':
        if (sortDetails?.sortBy === 'id') {
          return getIconBySortDirection();
        } else {
          return null;
        }
      default:
        return null;
    }
  };

  const renderSortButton = (buttonName: SortingByType, buttonText: string) => (
    <Button
      variant="outlined"
      size="small"
      startIcon={getSortIcon(buttonName)}
      onClick={() => {
        dispatch(
          sortFollowers({
            sortBy: buttonName,
            direction: sortDetails?.direction || 'descent',
          })
        );
        setSortDetails({
          sortBy: buttonName,
          direction: sortDetails?.direction === 'ascend' ? 'descent' : 'ascend',
        });
      }}
    >
      {buttonText}
    </Button>
  );

  return (
    <Box
      sx={{ display: 'flex' }}
      alignItems="center"
      flexDirection="row"
      marginBottom={2}
    >
      {renderSortButton('login', 'sort by name')}
      {renderSortButton('id', 'sort by id')}
    </Box>
  );
}
