import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Registra o componente principal que chamamos de 'newschat'
AppRegistry.registerComponent(appName, () => App);