import { Children } from 'react';
import { ChallengesProvider } from '../contexts/ChallengesContext';

function AppProvider({ children }) {
  return (
    <ChallengesProvider>
      {children}
    </ChallengesProvider>
  );
}

export default AppProvider;
