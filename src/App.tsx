import { store } from './app/store';
import { Provider } from 'react-redux';
import { GithubFollowersPage } from './components/GithubFollowersPage';
import Container from '@mui/material/Container';

function App() {
  return (
    <div className="github-followers-wrapper">
      <Provider store={store}>
        <Container fixed>
          <GithubFollowersPage />
        </Container>
      </Provider>
    </div>
  );
}

export default App;
