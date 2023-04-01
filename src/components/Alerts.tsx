import { useAppSelector } from '../app/hooks';
import Alert from '@mui/material/Alert';

export function Alerts() {
  const status = useAppSelector((state) => state.followers.status);
  const followers = useAppSelector((state) => state.followers.followers) || [];

  return (
    <>
      {status === 'account-not-found' && (
        <Alert severity="error">Account wasn't found</Alert>
      )}
      {status === 'failed' && (
        <Alert severity="error">something went wrong</Alert>
      )}
      {status === 'success' && followers.length === 0 && (
        <Alert severity="info">Account has no followers</Alert>
      )}
    </>
  );
}
