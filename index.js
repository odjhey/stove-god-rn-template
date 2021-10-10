import {App} from './app/app.tsx';
import {name as appName} from './app/app.json';
import {AppRegistry} from 'react-native';

AppRegistry.registerComponent(appName, () => App);
