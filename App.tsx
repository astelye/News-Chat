import React from 'react';
import { AppNavigator } from './src/navigation/AppNavigator';

const App = () => {
  // O App agora inicia o gerenciador de rotas em vez de uma tela única
  return <AppNavigator />;
};

export default App;