import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #1e272e;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const AppContent = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <AppContainer>
      <Sidebar />
      <MainContent>
        <TaskInput />
        <TaskList />
      </MainContent>
    </AppContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
};

export default App;