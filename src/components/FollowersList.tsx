import React from 'react';
import './FollowersList.scss';
import { useAppSelector } from '../app/hooks';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export function FollowersList() {
  const followers = useAppSelector((state) => state.followers.followers) || [];

  return (
    <List
      className="followers-list-list-container"
      sx={{ width: 360, bgcolor: 'background.paper' }}
    >
      {followers.map((follower, index) => (
        <div key={follower.id}>
          <ListItem
            className="followers-list-list-item"
            onClick={() => window.open(follower.html_url, '_blank')?.focus()}
            alignItems="flex-start"
          >
            <ListItemAvatar>
              <Avatar alt={follower.login} src={follower.avatar_url} />
            </ListItemAvatar>
            <ListItemText
              primary={follower.login}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    id: {follower.id}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          {index < followers.length - 1 && <Divider />}
        </div>
      ))}
    </List>
  );
}
